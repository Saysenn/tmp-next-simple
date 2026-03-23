# Page Rules

## Default Pages — Build by Default

**Always build these 5 pages by default, nothing more:**

| Page    | Route      |
| ------- | ---------- |
| Home    | `/`        |
| About   | `/about`   |
| Contact | `/contact` |
| Terms   | `/terms`   |
| Privacy | `/privacy` |

**Never add extra pages without explicitly asking the user first.** Ask once, clearly: "Do you want a [Page] page?" — if they say no or don't respond, skip it.

---

## Optional Pages — Ask Before Building

| Page        | Route         | When to suggest                                  |
| ----------- | ------------- | ------------------------------------------------ |
| Clients     | `/clients`    | When the site targets business clients           |
| Candidates  | `/candidates` | When the site involves recruitment / job seekers |
| Services    | `/services`   | When the company offers distinct service lines   |
| Anti-Slavery| `/anti-slavery` | Labour, payroll, recruitment, staffing sectors |

---

## Page-Level Requirements

### Home (`/`)
- No forced sections — only build what the user asks for
- Never add testimonials, reviews, or pricing without being asked

### About (`/about`)
- Must include an embedded map at the confirmed company address
  - Use an `<iframe>` pointing to the confirmed address
  - Always add a descriptive `title` attribute to the iframe for accessibility
  - If address is not confirmed, skip and note it as pending — never embed a wrong location
- May include a reviews / testimonials section — only if relevant, never forced

### Contact (`/contact`)
- Must display a company info block pulled from the config source of truth:
  - Company name, full address, phone number, email address, jurisdiction (if relevant)
- Must include the contact form (controlled by `formsConfig.enableContactForm`)
- **UX**: If the page has a form, the hero or intro CTA should scroll to the form — use an anchor (`#contact-form`) so links from other pages can deep-link directly to it

### Terms (`/terms`)
- Must include all required legal clauses — see `legal.md`
- Pull company details from config, never hardcode

### Privacy (`/privacy`)
- Must include all required GDPR/CCPA clauses — see `legal.md`
- Pull company details from config, never hardcode

---

## Optional Page Specs

### Clients (`/clients`)
A landing page targeting prospective business clients.

**Required sections (in order):**
1. **Hero** — bold headline, short sub-copy, one primary CTA button
   - CTA label: e.g. "Get in touch" or "Work with us"
   - CTA target: `/contact#contact-form` — deep-links directly to the contact form
   - UX: smooth scroll if navigating within the same page; full navigation if cross-page
2. **Value proposition** — what the company offers clients (ask user for content)
3. Any additional sections the user requests

**UX rules:**
- Hero CTA must land the user directly at the contact form, not just the top of the contact page
- On mobile, the CTA must be easily tappable — minimum 44px touch target
- Never add a contact form directly on this page — always direct to `/contact#contact-form`

### Candidates (`/candidates`)
A landing page targeting job seekers / applicants.

**Required sections (in order):**
1. **Hero** — welcoming headline, short sub-copy, one primary CTA button
   - CTA label: e.g. "Apply now" or "Submit your CV"
   - CTA target: `#application-form` — smooth-scrolls to the application form on the same page
   - UX: use `<a href="#application-form">` or a scroll utility — never navigate away
2. **Application form** — render `<ApplicationForm />` with `id="application-form"`
   - Form is anchored so the hero CTA scrolls directly to it
3. Any additional sections the user requests (e.g. why join us, roles available)

**UX rules:**
- The application form must be on the same page — do not redirect to a separate form page
- Hero CTA must visually indicate it scrolls down (e.g. a subtle down-arrow or animation is fine)
- On mobile, the form must be full-width and easy to complete — no cramped layouts
- Always render `<ApplicationForm />` from `components/forms/ApplicationForm.tsx` — never duplicate form logic

### Anti-Slavery (`/anti-slavery`)
- Must state: company stance, supply chain checks, due diligence, staff training, annual sign-off
- Include the year in the heading — note it must be reviewed annually
- Add to footer legal links if this page is built

---

## Anchor / Deep-Link Conventions

| Target                     | Anchor ID          | Used by                        |
| -------------------------- | ------------------ | ------------------------------ |
| Contact form               | `#contact-form`    | Clients page CTA, nav links    |
| Application form           | `#application-form`| Candidates page CTA            |

Always add the `id` to the section wrapper, not the form element itself, so the scroll lands above the form with breathing room.

---

## File Structure

```
app/page.tsx                  — Home
app/about/page.tsx            — About
app/contact/page.tsx          — Contact
app/terms/page.tsx            — Terms & Conditions
app/privacy/page.tsx          — Privacy Policy
app/clients/page.tsx          — Clients (optional)
app/candidates/page.tsx       — Candidates (optional)
app/anti-slavery/page.tsx     — Anti-Slavery Statement (optional)
```
