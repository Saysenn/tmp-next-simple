# Reusable Prompt — Recruitment + Workforce Support Website

Use this prompt when building a new recruitment agency website with light workforce/payment support. Fill in the bracketed fields and run it in one go.

---

## THE PROMPT

Build a complete, professional website for a UK-based recruitment agency with light workforce and payment support services.

**Company details:**
- Brand name: [INSERT — e.g. "Diverse Rec Payroll"]
- Registered name: [INSERT — e.g. "Diverse Rec Payroll Ltd"]
- Company number: [INSERT]
- VAT number: [INSERT]
- Registered address: [INSERT full address]
- Phone: [INSERT]
- Email: [INSERT]
- Logo: `/public/logo.webp` (transparent WebP — must use `unoptimized` prop on Next.js Image)
- Hero background: `/public/bg.mp4` (video)

**Sectors (pick 4):**
- [e.g. Health & Social Care]
- [e.g. Public Sector]
- [e.g. Consultancy]
- [e.g. Architecture & Infrastructure]

**Target clients:** [e.g. Local authorities, NHS trusts, private organisations]
**Target candidates:** [e.g. Social workers, nurses, consultants, engineers]

---

## CONTENT RULES (non-negotiable)

- **70% recruitment, 30% workforce/payment support** — the site reads as a recruitment agency, not a payroll company
- Payroll described only as "workforce support", "payment administration", or "contractor payments" — never "payroll bureau", "umbrella company", "CIS", "PAYE", "RTI", "HMRC", or any technical tax term
- **No fabricated stats, testimonials, years of experience, or placement numbers** — company may be new
- No hyphens, em dashes, or en dashes in visible copy — rephrase sentences instead
- No unverifiable claims ("UK-wide network", "hundreds of placements", "market-leading")
- No technical acronyms in public copy (no NMC, HCPC, ASYE, MCA, DOLS, etc.) — say "professional body" instead
- Each page serves a distinct purpose — no repeated messaging across pages
- Concise copy — less is more, never pad paragraphs
- British English throughout (enquire, colour, organise, centre)
- Startup-friendly, honest, direct — no generic agency bluffing

---

## DESIGN DECISIONS

- **Colour scheme:** black and white only — no brand colours. CSS variable `--accent: #000000`
- **Header:** `floating-nav` — black background, white text, glass pill nav, white CTA button
- **Hero:** full-screen video (`/bg.mp4`), heavy glassmorphism overlay (`bg-black/60 backdrop-blur-2xl`), centered content, `HeroAnimator` for sequence animation
- **Logo:** image-only (`logoType: "image"`), `unoptimized` on Next.js Image to preserve WebP transparency
- **Footer:** `brand` layout — bold statement, company details with SVG icons, legal links, no socials until confirmed
- **Cookie banner:** `modal` variant
- **Contact form:** `minimal` variant
- **Application form:** `standard` variant (for candidates page)
- **Mobile menu:** `drawer` type, black background
- **Animations:** CSS + IntersectionObserver system — `data-animate="stagger"` on multi-child containers, `data-animate="fade-up"` on single elements. `PageAnimations` uses `usePathname()` to re-run on every route change with 50ms delay

---

## PAGES TO BUILD

Build in this order:

1. **Home** — Hero (video + glassmorphism, dual CTAs: "Hire Talent" → /clients, "Submit Your CV" → /candidates), Who We Are (2-path cards), Sectors (4-card grid), How We Work (3 steps, dark section), CTA Banner
2. **About** — Hero, Who We Are (2-col text + 4 focus cards), Values (3 cards), Registered Details (dark section, from config), Google Maps embed, CTA (dark)
3. **Services** — Hero, Placement Types (Permanent/Temporary/Contract), Workforce Support (dark, 3 items), Practice Areas (4 sectors with role sub-lists), CTA (dark)
4. **Clients** — Hero (CTA → `/contact#contact-form`), Why Work With Us (2-col), What We Offer (6 cards), How It Works (4 steps, dark), Organisations We Serve, CTA (dark)
5. **Candidates** — Hero (CTA → `#application-form`), Why Register (2-col + 4 stat cards), Compliance (6 cards), Payments (dark, 2-col + 4 mini cards), Application Form (id="application-form")
6. **Contact** — Hero, Form section (id="contact-form") with blob shapes left + ContactFormMinimal right, FAQ accordion
7. **Legal pages** — Privacy, Terms, Cookie Policy, Anti-Slavery (all import from `configs/footer.ts`, never hardcode company info)

---

## SECTION PATTERNS

**Dark sections** — use `bg-black dark-section` class. Add `style={{ color: "white" }}` inline on h1/h2 to override global heading CSS. Body text uses `rgba(255,255,255,0.5)` via inline style or `.dark-section` CSS rule.

**Stats bar** — startup-friendly, no fake numbers. Use qualitative values: "End to end", "Compliant", "Dedicated", "4 sectors".

**CTA pattern** — most pages end with a dark rounded card (`rounded-3xl bg-black dark-section`) with white heading + 60% white body + white button.

**2-path cards (home)** — one dark card (For Clients) + one light bordered card (For Candidates), side by side.

**Section eyebrows** — `text-xs font-semibold text-black/40 uppercase tracking-widest mb-4` (or `text-white/30` on dark sections).

---

## FORMS ARCHITECTURE

All forms follow the switcher pattern:
- `ContactForm.tsx` → reads `formsConfig.contactFormType` → delegates to `ContactFormMinimal` or `ContactFormDetailed`
- `ApplicationForm.tsx` → reads `formsConfig.applicationFormType` → delegates to `ApplicationFormStandard`
- All form variants use `useCaptcha`, `CaptchaWidget`, honeypot field, loading/error/success states
- API routes: `/api/v1/contact` (JSON) and `/api/v1/apply` (multipart/FormData with CV file upload)
- CV upload: PDF/DOC/DOCX, max 10 MB, validated server-side, filename included in email notification

---

## CONFIG FILES

All company info lives in `configs/footer.ts` (`companyInfo` object) — imported by legal pages and about page. Never hardcode inline.

Header nav in `configs/header.ts` — include: Home, About, Services, Clients, Candidates, Contact.

Footer sections in `configs/footer.ts` — match the header nav links.

---

## CONTENT STRUCTURE PER PAGE

**Home hero:** "[Short verb phrase]. [Second short verb phrase]." e.g. "People placed. Payments handled."
**Home sub:** One sentence: who you connect + what you manage. No technical detail.
**About — Who We Are:** 3 short paragraphs. Para 1: sectors covered. Para 2: how you support end to end. Para 3: registered details + company number.
**Services — Workforce Support:** Frame as "Beyond the placement" — onboarding, compliance, payments. Never "payroll processing".
**Clients — Why Work With Us:** Para 1: sector knowledge + right match. Para 2: payment admin handled, single invoice, no internal burden.
**Candidates — Compliance section titles:** DBS and Disclosure, Professional Registration, Right to Work, CV Presentation, References, Dedicated Consultant.
**Candidates — Payments copy:** Accurate, on time, no invoicing required, full breakdown, consultant available.

---

## WHAT TO AVOID (learned from this build)

- Do not write "payroll specialists" anywhere on the contact page or forms — say "consultants"
- Do not name specific professional bodies by acronym (NMC, HCPC, SWE) — say "professional body"
- Do not use "payroll bureau", "umbrella company", or "CIS" anywhere
- Do not use "Request a Free Consultation" as the hero CTA — it implies payroll
- Do not use `invoice` on the candidates page — only on clients page where it is appropriate
- Do not hardcode company details in any page — always import from `configs/footer.ts`
- Do not add a "Number of employees" field on the application form — that is a client field
- Do not build fake stat numbers (e.g. "500+ placements", "10 years experience") — company may be new
