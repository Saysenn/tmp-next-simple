# Email System

Sends notification emails on contact form and subscribe form submissions via Resend or SMTP.

## Quick start

```ts
// configs/email-templates.ts — pick a design variant
export const emailTemplatesConfig = {
  contactTemplate: "minimal",   // "bold" | "classic" | "minimal"
  subscribeTemplate: "minimal", // "bold" | "classic" | "minimal"
};

// configs/mail.ts — provider + credentials (reads from env vars)
// configs/forms.ts — enable CAPTCHA, toggle fields
```

## Template variants

| Variant | Description |
|---------|-------------|
| `bold` | Purple gradient header, emoji, date badge — modern/playful |
| `classic` | Navy/teal gradient, clean typography — professional |
| `minimal` | No header section, table-based layout — ultra-light |

Each variant exists for both form types:
- `ContactEmailBold`, `ContactEmailClassic`, `ContactEmailMinimal`
- `SubscribeEmailBold`, `SubscribeEmailClassic`, `SubscribeEmailMinimal`

## Config API

| Key | File | Description |
|-----|------|-------------|
| `contactTemplate` | `configs/email-templates.ts` | Template for contact form emails |
| `subscribeTemplate` | `configs/email-templates.ts` | Template for subscribe form emails |
| `provider` | `configs/mail.ts` | `"resend"` or `"smtp"` |
| `fromName` | `configs/mail.ts` | Sender display name |
| `contactEmail` | `configs/mail.ts` | Where notifications are delivered |
| `requireCaptcha` | `configs/forms.ts` | Enforce CAPTCHA before sending |

## Environment variables

```
EMAIL_PROVIDER=resend
MAIL_FROM_NAME=MyApp
CONTACT_EMAIL=you@example.com

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=onboarding@resend.dev

# SMTP (alternative)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM_EMAIL=
```

## File structure

```
configs/email-templates.ts  — select contact/subscribe template variant
configs/mail.ts             — provider, from address, credentials from env
emails/
  ContactEmailBold.tsx      — bold contact template
  ContactEmailClassic.tsx   — classic contact template
  ContactEmailMinimal.tsx   — minimal contact template
  SubscribeEmailBold.tsx    — bold subscribe template
  SubscribeEmailClassic.tsx — classic subscribe template
  SubscribeEmailMinimal.tsx — minimal subscribe template
  index.ts                  — re-exports all templates
lib/services/mail.ts        — sendEmail(), sanitizeInput(), validateEmailStrict()
lib/services/captcha.ts     — verifyCaptchaToken() for Turnstile / reCAPTCHA
app/api/v1/contact/route.ts — contact form API handler
app/api/v1/subscribe/route.ts — subscribe form API handler
```
