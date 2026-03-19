// lib/services/captcha.ts — server-side CAPTCHA token verification

import type { CaptchaProvider } from "@/configs/forms";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

type RecaptchaResponse = {
  success: boolean;
  score?: number; // v3 only: 0.0–1.0 (higher = more likely human)
  "error-codes"?: string[];
};

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    });
    const data: TurnstileResponse = await res.json();
    return data.success;
  } catch {
    return false;
  }
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    });
    const data: RecaptchaResponse = await res.json();
    if (data.score !== undefined) {
      return data.success && data.score >= 0.5;
    }
    return data.success;
  } catch {
    return false;
  }
}

export async function verifyCaptchaToken(
  token: string,
  provider: CaptchaProvider
): Promise<boolean> {
  switch (provider) {
    case "turnstile":
      return verifyTurnstile(token);
    case "recaptcha-v2":
    case "recaptcha-v3":
      return verifyRecaptcha(token);
    default:
      return false;
  }
}
