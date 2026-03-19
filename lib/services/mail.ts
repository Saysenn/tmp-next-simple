// lib/services/mail.ts — shared email sender, used by all API routes

import nodemailer from "nodemailer";
import { Resend } from "resend";
import { mailConfig } from "@/configs/mail";

/** Escape HTML entities to prevent XSS in email bodies */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Blocks disposable, test, and suspicious email addresses */
export function validateEmailStrict(email: string): { valid: boolean; error?: string } {
  if (/[\r\n]/.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  const normalizedEmail = email.toLowerCase().trim();
  const [localPart, domain] = normalizedEmail.split("@");

  const blockedDomains = [
    "mailinator.com", "tempmail.com", "guerrillamail.com", "10minutemail.com",
    "throwaway.email", "fakeinbox.com", "trashmail.com", "tempinbox.com",
    "dispostable.com", "mailnesia.com", "maildrop.cc", "yopmail.com",
    "sharklasers.com", "getnada.com", "temp-mail.org", "mohmal.com",
    "fakemailgenerator.com", "emailondeck.com", "tempr.email", "discard.email",
    "mailsac.com", "mailcatch.com", "mytrashmail.com", "mt2009.com",
    "thankyou2010.com", "spam4.me", "grr.la", "guerrillamailblock.com",
    "pokemail.net", "spamgourmet.com", "armyspy.com", "cuvox.de",
    "dayrep.com", "einrot.com", "fleckens.hu", "gustr.com", "jourrapide.com",
    "rhyta.com", "superrito.com", "teleworm.us", "tempail.com",
  ];

  const testDomains = [
    "example.com", "example.org", "example.net", "test.com", "test.org",
    "domain.com", "email.com", "sample.com", "demo.com", "fake.com",
    "invalid.com", "placeholder.com", "yoursite.com", "yourdomain.com",
    "mysite.com", "website.com", "company.com", "business.com",
  ];

  if (blockedDomains.includes(domain)) {
    return { valid: false, error: "Please use a permanent email address" };
  }

  if (testDomains.includes(domain)) {
    return { valid: false, error: "Please use a real email address" };
  }

  const blockedLocalParts = [
    "test", "testing", "fake", "example", "sample", "demo", "dummy",
    "placeholder", "noreply", "no-reply", "donotreply", "nobody",
    "null", "void", "admin123", "user123", "asdf", "qwerty", "aaa",
    "xxx", "yyy", "zzz", "abc", "123", "temp", "temporary",
  ];

  if (blockedLocalParts.includes(localPart)) {
    return { valid: false, error: "Please use a real email address" };
  }

  const suspiciousPatterns = [
    /^test\d*@/,
    /^fake\d*@/,
    /^user\d+@/,
    /^temp\d*@/,
    /^[a-z]{1,2}\d{3,}@/,
    /^(.)\1{4,}@/,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(normalizedEmail)) {
      return { valid: false, error: "Please use a real email address" };
    }
  }

  return { valid: true };
}

export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

type SendEmailOptions = {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string; // plain-text fallback (SMTP only)
  attachments?: EmailAttachment[];
};

async function sendViaResend(options: SendEmailOptions) {
  const resend = new Resend(mailConfig.resend.apiKey);
  const from = `${mailConfig.fromName} <${mailConfig.resend.fromEmail}>`;

  const { error } = await resend.emails.send({
    from,
    to: [options.to],
    ...(options.replyTo ? { replyTo: [options.replyTo] } : {}),
    subject: options.subject,
    html: options.html,
    ...(options.attachments?.length ? {
      attachments: options.attachments.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    } : {}),
  });

  if (error) {
    throw new Error(error.message);
  }

  // intentionally no log — avoids PII in logs
}

async function sendViaSMTP(options: SendEmailOptions) {
  const { host, port, secure, user, pass, fromEmail } = mailConfig.smtp;

  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

  await transporter.sendMail({
    from: `"${mailConfig.fromName}" <${fromEmail}>`,
    to: options.to,
    ...(options.replyTo ? { replyTo: options.replyTo } : {}),
    subject: options.subject,
    html: options.html,
    ...(options.text ? { text: options.text } : {}),
    ...(options.attachments?.length ? {
      attachments: options.attachments.map((a) => ({
        filename: a.filename,
        content: a.content,
        contentType: a.contentType,
      })),
    } : {}),
  });

  // intentionally no log — avoids PII in logs
}

/** Send via the provider configured in configs/mail.ts. Logs when unconfigured. */
export async function sendEmail(options: SendEmailOptions) {
  const { provider, resend, smtp } = mailConfig;

  if (provider === "resend" && resend.apiKey) {
    await sendViaResend(options);
  } else if (provider === "smtp" && smtp.host) {
    await sendViaSMTP(options);
  } else {
    console.warn("[Mail] No provider configured — email not sent.");
  }
}
