import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import ApplicationEmail from "@/emails/ApplicationEmail";
import { sendEmail, sanitizeInput, validateEmailStrict } from "@/lib/services/mail";
import { verifyCaptchaToken } from "@/lib/services/captcha";
import { mailConfig } from "@/configs/mail";
import { formsConfig } from "@/configs/forms";

// ─── Rate limit ───────────────────────────────────────────────
// Stricter than contact form — file uploads are heavier
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3;

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) rateLimitStore.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

// ─── Allowed MIME types ────────────────────────────────────────
const ALLOWED_MIME_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/x-pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

// ─── Magic byte validation ─────────────────────────────────────
// Validates actual file contents, not just the reported MIME type
function validateMagicBytes(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 8) return false;

  if (mimeType === "application/pdf" || mimeType === "application/x-pdf") {
    // %PDF
    return buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;
  }

  if (mimeType === "application/msword") {
    // MS-CFB format: D0 CF 11 E0
    return buffer[0] === 0xD0 && buffer[1] === 0xCF && buffer[2] === 0x11 && buffer[3] === 0xE0;
  }

  if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    // ZIP local file header: PK\x03\x04 — more specific than bare PK check
    return buffer[0] === 0x50 && buffer[1] === 0x4B && buffer[2] === 0x03 && buffer[3] === 0x04;
  }

  return false;
}

function generatePlainText(
  name: string, email: string, phone: string,
  position: string, coverLetter: string, cvFilename: string
): string {
  return `
NEW CV APPLICATION
==================

From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}${position ? `Position: ${position}\n` : ""}${cvFilename ? `CV: ${cvFilename} (attached)\n` : ""}
${coverLetter ? `Cover Letter:\n${coverLetter}` : "No cover letter provided."}

----
Sent from the application form.
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    // ── Content-Type check ──
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
    }

    // ── Rate limit ──
    const ip = getRateLimitKey(request);
    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    const formData = await request.formData();

    // ── Honeypot ──
    const honeypot = formData.get("website");
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Your application has been submitted successfully." });
    }

    // ── Extract + sanitise text fields ──
    const rawName = ((formData.get("name") as string) ?? "").trim().replace(/[\r\n]/g, " ");
    const name = sanitizeInput(rawName);
    const email = ((formData.get("email") as string) ?? "").trim();
    const phone = sanitizeInput(((formData.get("phone") as string) ?? "").trim());
    const position = sanitizeInput(((formData.get("position") as string) ?? "").trim());
    const coverLetter = sanitizeInput(((formData.get("coverLetter") as string) ?? "").trim());
    const captchaToken = (formData.get("captchaToken") as string) ?? null;

    // ── Required field validation ──
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Name must be between 2 and 100 characters." }, { status: 400 });
    }

    if (phone && phone.length > 30) {
      return NextResponse.json({ error: "Phone number is too long." }, { status: 400 });
    }

    if (position.length > 200) {
      return NextResponse.json({ error: "Position is too long." }, { status: 400 });
    }

    if (coverLetter.length > 5000) {
      return NextResponse.json({ error: "Cover letter is too long (max 5000 characters)." }, { status: 400 });
    }

    const emailValidation = validateEmailStrict(email);
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 });
    }

    if (!mailConfig.contactEmail) {
      console.error("[Apply] CONTACT_EMAIL is not configured");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    // ── CAPTCHA ──
    if (formsConfig.applicationForm.requireCaptcha) {
      if (!captchaToken) {
        return NextResponse.json({ error: "CAPTCHA token missing." }, { status: 400 });
      }
      const passed = await verifyCaptchaToken(captchaToken, formsConfig.captchaProvider);
      if (!passed) {
        return NextResponse.json({ error: "CAPTCHA verification failed." }, { status: 400 });
      }
    }

    // ── CV file validation ──
    const cvFile = formData.get("cv") as File | null;
    let cvBuffer: Buffer | null = null;
    let cvFilename = "";

    if (cvFile && cvFile.size > 0) {
      const maxBytes = formsConfig.applicationForm.maxFileSizeMb * 1024 * 1024;

      if (cvFile.size > maxBytes) {
        return NextResponse.json(
          { error: `CV file must be under ${formsConfig.applicationForm.maxFileSizeMb}MB.` },
          { status: 400 }
        );
      }

      const mimeType = cvFile.type.toLowerCase();
      const detectedType = ALLOWED_MIME_TYPES[mimeType];

      if (!detectedType) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload a PDF, DOC, or DOCX file." },
          { status: 400 }
        );
      }

      if (!formsConfig.applicationForm.allowedFileTypes.includes(detectedType as "pdf" | "doc" | "docx")) {
        return NextResponse.json(
          { error: "This file type is not accepted for applications." },
          { status: 400 }
        );
      }

      // Extension check — prevent filename spoofing
      const ext = cvFile.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { error: "Invalid file extension. Please upload a PDF, DOC, or DOCX file." },
          { status: 400 }
        );
      }

      const arrayBuffer = await cvFile.arrayBuffer();
      cvBuffer = Buffer.from(arrayBuffer);

      // Magic bytes — validate actual file contents
      if (!validateMagicBytes(cvBuffer, mimeType)) {
        return NextResponse.json(
          { error: "File contents do not match the declared type." },
          { status: 400 }
        );
      }

      // Sanitise filename — strip path traversal and special chars
      cvFilename = cvFile.name.replace(/[^a-zA-Z0-9._\-\s]/g, "_").replace(/\s+/g, "_");
    }

    // ── Send email ──
    const emailComponent = ApplicationEmail({ name, email, phone, position, coverLetter, cvFilename });
    const html = await render(emailComponent);
    const text = generatePlainText(name, email, phone, position, coverLetter, cvFilename);

    await sendEmail({
      to: mailConfig.contactEmail,
      replyTo: email,
      subject: `[Application] CV from ${name}${position ? ` — ${position}` : ""}`,
      html,
      text,
      ...(cvBuffer ? {
        attachments: [{ filename: cvFilename, content: cvBuffer, contentType: cvFile!.type }],
      } : {}),
    });

    return NextResponse.json(
      { success: true, message: "Your application has been submitted successfully." },
      { headers: { "X-RateLimit-Remaining": remaining.toString() } }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Application form error:", msg);
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}
