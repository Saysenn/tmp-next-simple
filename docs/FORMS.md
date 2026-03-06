# Forms

Config files: **`configs/forms.ts`** (layout, fields, CAPTCHA) · **`configs/mail.ts`** (provider, credentials)

---

## Contact form

```ts
contactFormType: "minimal",   // single centered column
contactFormType: "detailed",  // two-column: dark info panel + form
```

`"detailed"` pulls address/email/phone from `configs/footer.ts → companyInfo`.

| Option | Default | Description |
|--------|---------|-------------|
| `showPhone` | `true` | show/hide phone field |
| `requireCaptcha` | `false` | require CAPTCHA before submit |

---

## Subscribe form

```ts
subscribeFormType: "inline",    // [name?] [email] [button] in one row
subscribeFormType: "card",      // centered card with name + email
subscribeFormType: "waitlist",  // full hero with social proof + role dropdown
```

| Option | Default | Description |
|--------|---------|-------------|
| `showNameField` | `true` | show name field |
| `showRoleField` | `false` | show role dropdown (`waitlist` only) |
| `subscriberCount` | `1240` | social proof number (`0` to hide) |
| `roleOptions` | see config | dropdown options |
| `requireCaptcha` | `false` | require CAPTCHA before submit |

Hide a form entirely: `enableContactForm: false` / `enableSubscribeForm: false`

---

## Mail provider (`configs/mail.ts`)

**Resend** (recommended):
```
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxx
RESEND_FROM_EMAIL=hello@yourdomain.com
MAIL_FROM_NAME=MyApp
CONTACT_EMAIL=you@yourdomain.com
```

**SMTP / Gmail**:
```
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=you@gmail.com
```

> Gmail: generate an App Password at myaccount.google.com/apppasswords (requires 2FA).

No provider configured → submissions are logged to the console (dev fallback).

---

## CAPTCHA

```ts
captchaProvider: "turnstile",   // or "recaptcha-v2" | "recaptcha-v3"
contactForm:   { requireCaptcha: true },
subscribeForm: { requireCaptcha: true },
```

| Provider | Type | Env vars |
|----------|------|----------|
| `"turnstile"` | Cloudflare widget | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` |
| `"recaptcha-v2"` | Google checkbox | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET_KEY` |
| `"recaptcha-v3"` | Google invisible | same as v2 |

reCAPTCHA v3 applies a score threshold of `0.5` server-side.

---

## API endpoints

| Route | Purpose |
|-------|---------|
| `POST /api/v1/contact` | contact form submissions |
| `POST /api/v1/subscribe` | waitlist signups |

Both routes: rate-limited · honeypot · email validation · HTML sanitization · optional CAPTCHA.

---

## File structure

```
configs/
  mail.ts               ← provider + credentials
  forms.ts              ← layout + field toggles + CAPTCHA

lib/services/
  mail.ts               ← sendEmail(), sanitizeInput(), validateEmailStrict()
  captcha.ts            ← server-side token verification

components/forms/
  ContactForm.tsx           ← switcher
  ContactFormMinimal.tsx
  ContactFormDetailed.tsx
  SubscribeForm.tsx         ← switcher
  SubscribeFormInline.tsx
  SubscribeFormCard.tsx
  SubscribeFormWaitlist.tsx

app/api/v1/
  contact/route.ts
  subscribe/route.ts

emails/
  ContactFormEmail.tsx
  SubscribeEmail.tsx
```
