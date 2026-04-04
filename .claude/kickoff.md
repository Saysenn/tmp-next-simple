# Project Kickoff Protocol

Use this file whenever starting a new project with this template.
It defines what to ask, what to auto-configure, and what requires manual action.

---

## When to Run

Trigger this protocol whenever:
- The user says "set up this project for [company]", "start a new project", or "use this template"
- The configs still contain `"MyApp"` or other placeholder values
- The `.env` has empty or default credentials

---

## Step 1 — Ask the Kickoff Questionnaire

Send this as a **single message**. Never split it. Never skip questions or assume defaults.
Every question maps directly to a config file or `.env`.
Wait for the user's full answers before editing any file.

```
To configure the project, I need the following. Answer what applies — skip anything marked optional.

COMPANY IDENTITY
 1. Company name
 2. Tagline / one-line description
 3. Full address (UK postal format)
 4. Contact / enquiry email
 5. Phone number
 6. Company registration number (optional)
 7. Production website URL  e.g. https://mycompany.co.uk

SOCIAL LINKS
 8. Paste any that apply: LinkedIn / Twitter/X / Instagram / Facebook / GitHub / YouTube

BRAND COLOURS
 9. Accent colour hex — main CTA / highlight colour
10. Dark background hex — primary dark bg (hero, dark sections, email header)
11. Mid-dark hex — secondary dark shade (cards, borders on dark bg)

EMAIL
12. Email provider: resend | smtp
13. Credentials:
    — Resend: RESEND_API_KEY + verified from-address
    — SMTP: host / port / user / pass / from-address
14. Email address to receive form notifications (CONTACT_EMAIL)

CAPTCHA
15. Provider: turnstile | recaptcha-v2 | recaptcha-v3 | none
16. Site key + secret key (skip if none)

SITE SETUP
17. Site mode: full | coming-soon | maintenance
18. Header type: nav | floating-nav | split-nav | stacked | cta
19. Footer layout: columns | minimal | centered | brand | split | recruit | stacked
20. Mobile menu type: drawer | dropdown | fullscreen
21. CTA button — label + destination URL
22. Navigation links — list each: label + href

FORMS
23. Which forms to enable: contact | subscribe | cv-upload | apply | all | none

ASSETS (manual — I cannot automate file placement)
24. Confirm once logo.webp + logo-invert.webp are placed in /public/
```

---

## Step 2 — Auto-Configure in This Exact Order

Once the user answers, update these files in sequence. Do not skip any.

| Order | File | What to update |
|---|---|---|
| 1 | `configs/header.ts` | name, description, copyright, CTA label+href, nav links, headerType, mobileMenuType, logoType |
| 2 | `configs/footer.ts` | companyInfo (address, email, phone, reg), socialLinks, footerSections, footerLayout |
| 3 | `configs/mail.ts` | fromName fallback, siteUrl fallback |
| 4 | `configs/site.ts` | mode + relevant maintenance/coming-soon copy |
| 5 | `configs/forms.ts` | enabled form flags, captchaProvider, requireCaptcha |
| 6 | `app/globals.css` | ALL 4 colour groups — :root, header scroll vars, .section-dark, .section-light |
| 7 | `emails/*.tsx` | ACCENT / DARK / DARK_MID hex constants at top of every active template |
| 8 | `.env` | MAIL_FROM_NAME, CONTACT_EMAIL, NEXT_PUBLIC_SITE_URL, provider creds, captcha keys |

---

## Step 3 — Report What Requires Manual Action

After auto-configure, tell the user these files must be placed manually:

| Asset | Path | Notes |
|---|---|---|
| Primary logo | `/public/logo.webp` | Used in header (solid state) |
| Inverted logo | `/public/logo-invert.webp` | Used in header (transparent/hero state) |
| Hero background | `/public/bg.webp` | Required — hero sections always use bg.webp |
| Favicon | `/public/favicon.ico` | Browser tab icon |
| Apple touch icon | `/public/apple-touch-icon.png` | 180×180px, iOS home screen |
| OG image | `/public/og.png` | Optional — 1200×630px, social sharing preview |

Also remind them:
- Page copy (hero headlines, about, services descriptions) still needs to be written
- Legal pages (/privacy, /terms) need real company-specific content — see `.claude/legal.md`

---

## Step 4 — Verify No Placeholder Values Remain

After all config updates, grep `configs/` for these strings and fix any that survive:

```
"MyApp"
"hello@myapp.com"
"123 Business Street"
"+1 (555)"
"Your app description"
"New York, NY"
"Reg. No. 12345678"
```

Do not mark the kickoff complete until all are gone.

---

## Config Source-of-Truth Reference

Quick lookup — never guess where something lives:

| What | File → field |
|---|---|
| Site name, tagline, copyright | `configs/header.ts` → `siteConfig.name / description / copyright` |
| Logo paths | `configs/header.ts` → `logoImageSrc / logoInvertImageSrc` |
| CTA button | `configs/header.ts` → `cta.label / cta.href` |
| Navigation links | `configs/header.ts` → `headerNav[]` |
| Header type / mobile menu | `configs/header.ts` → `headerType / mobileMenuType` |
| Company address / email / phone / reg | `configs/footer.ts` → `companyInfo` |
| Social media links | `configs/footer.ts` → `socialLinks[]` |
| Footer nav columns | `configs/footer.ts` → `footerSections[]` |
| Footer layout | `configs/footer.ts` → `footerLayout` |
| Legal links | `configs/footer.ts` → `legalLinks[]` |
| Email from-name | `configs/mail.ts` → `fromName` (also `MAIL_FROM_NAME` in `.env`) |
| Email delivery address | `.env` → `CONTACT_EMAIL` |
| Email provider credentials | `.env` → `RESEND_*` or `SMTP_*` |
| Production URL | `.env` → `NEXT_PUBLIC_SITE_URL` |
| Site mode | `configs/site.ts` → `mode` |
| Colour scheme (web) | `app/globals.css` → `:root` variables |
| Email brand colours | `emails/*.tsx` → `ACCENT / DARK / DARK_MID` constants at top of each file |
| Form feature flags | `configs/forms.ts` |
| Captcha provider + keys | `configs/forms.ts` → `captchaProvider` + `.env` captcha vars |
| Cookie consent text | `configs/cookies.ts` |
| Active email template variant | `configs/email-templates.ts` |
| SEO title + description | auto-sourced from `configs/header.ts` via `app/layout.tsx` — no separate file needed |
