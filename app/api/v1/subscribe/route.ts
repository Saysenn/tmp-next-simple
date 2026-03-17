import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import { SubscribeEmailBold, SubscribeEmailClassic, SubscribeEmailMinimal } from "@/emails";
import { sendEmail, sanitizeInput, validateEmailStrict } from "@/lib/services/mail";
import { verifyCaptchaToken } from "@/lib/services/captcha";
import { mailConfig } from "@/configs/mail";
import { formsConfig } from "@/configs/forms";
import { emailTemplatesConfig } from "@/configs/email-templates";

const subscribeTemplates = {
  bold: SubscribeEmailBold,
  classic: SubscribeEmailClassic,
  minimal: SubscribeEmailMinimal,
};

type SubscribeFormData = {
  name?: string;
  email: string;
  role?: string;
  captchaToken?: string | null;
  website?: string; // Honeypot field
};

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3; // Stricter than contact form

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

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("content-type") !== "application/json") {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
    }

    const ip = getRateLimitKey(request);
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" } }
      );
    }

    const body: SubscribeFormData = await request.json();

    // Honeypot — silently accept to avoid alerting bots
    if (body.website) {
      console.log("[Security] Subscribe honeypot triggered");
      return NextResponse.json({ success: true, message: "You've been added to the waitlist!" });
    }

    const email = body.email?.trim();
    // Strip newlines to prevent email header injection via subject line
    const rawName = body.name ? body.name.trim().replace(/[\r\n]/g, " ") : undefined;
    const name = rawName ? sanitizeInput(rawName) : undefined;
    const rawRole = body.role ? body.role.trim() : undefined;
    if (rawRole && !formsConfig.subscribeForm.roleOptions.includes(rawRole)) {
      return NextResponse.json({ error: "Invalid role selection" }, { status: 400 });
    }
    const role = rawRole ? sanitizeInput(rawRole) : undefined;
    const captchaToken = body.captchaToken ?? null;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailValidation = validateEmailStrict(email);
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 });
    }

    if (!mailConfig.contactEmail) {
      console.error("[Subscribe] CONTACT_EMAIL is not configured");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    if (name && name.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }

    if (name && name.length > 100) {
      return NextResponse.json({ error: "Name is too long" }, { status: 400 });
    }

    if (role && role.length > 100) {
      return NextResponse.json({ error: "Role is too long" }, { status: 400 });
    }

    if (formsConfig.subscribeForm.requireCaptcha) {
      if (!captchaToken) {
        return NextResponse.json({ error: "Captcha token missing" }, { status: 400 });
      }
      const passed = await verifyCaptchaToken(captchaToken, formsConfig.captchaProvider);
      if (!passed) {
        return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
      }
    }

    const Template = subscribeTemplates[emailTemplatesConfig.subscribeTemplate];
    const emailComponent = Template({ name, email, role });
    const html = await render(emailComponent);

    await sendEmail({
      to: mailConfig.contactEmail,
      replyTo: email,
      subject: `[Early Access] New signup from ${name || email}`,
      html,
    });

    return NextResponse.json(
      { success: true, message: "You've been added to the waitlist!" },
      { headers: { "X-RateLimit-Remaining": remaining.toString() } }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Subscribe form error:", msg);
    return NextResponse.json({ error: "Failed to sign up. Please try again." }, { status: 500 });
  }
}
