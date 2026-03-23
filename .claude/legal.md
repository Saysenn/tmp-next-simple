# Legal & Compliance Rules

## ⚠️ Before Starting Any Legal or Compliance Task

**Always verify company info is complete before proceeding.** If any of the following are missing or placeholder values, STOP and ask the user to provide them before writing any legal page, email template, or compliance component.

**Required — must have all five before proceeding:**
- [ ] Company name
- [ ] Location / address
- [ ] Contact phone number
- [ ] Contact email
- [ ] Jurisdiction (e.g. England & Wales, United States — Delaware, etc.)

**Optional — include if provided, skip if not:**
- [ ] Company registration number
- [ ] VAT number
- [ ] ICO / data protection registration number

Do not proceed with drafting Terms, Privacy Policy, or any legal content until all five required fields are confirmed. A legal page with placeholder `[Company Name]` or `[Address]` is worse than no page at all.

---

## Company Info — Source of Truth

Store all company details in a single config file (e.g. `configs/footer.ts → companyInfo` or equivalent). Import from there everywhere — never hardcode inline in components, email templates, or legal pages.

---

## Required Legal Pages — Must Always Exist

Every project must ship with all three. Do not consider a build complete without them.

| Page               | Route      | Status   |
| ------------------ | ---------- | -------- |
| Privacy Policy     | `/privacy` | Required |
| Terms & Conditions | `/terms`   | Required |
| Cookie Policy      | Embedded in banner or `/cookies` | Required |

### Privacy Policy must cover:
- What personal data is collected (name, email, phone, IP, cookies)
- Legal basis for processing (GDPR Art. 6 — legitimate interest / consent)
- Data retention periods
- Third-party processors used (email provider, captcha, maps, analytics — list what's active)
- User rights: access, rectification, erasure, portability, objection
- Supervisory authority contact (e.g. ICO for UK: `https://ico.org.uk`)
- Contact email for data requests
- Last updated date — keep current

### Terms & Conditions must cover:
- Description of services (not legal/financial advice disclaimer where relevant)
- Governing law and jurisdiction
- Limitation of liability
- Intellectual property
- Acceptable use
- Company details
- Last updated date

---

## Cookie Banner — Required on Every Site

**Rules:**
- Must appear on first visit before any non-essential scripts load
- Must offer Accept / Reject / Manage Preferences (three options minimum)
- Store consent in `localStorage` (key: `cookie-consent` or project equivalent)
- Non-essential scripts (analytics, marketing) must only load after consent is granted
- Do not pre-tick non-essential categories
- Banner must link to the Privacy Policy

**Consent categories:**

| Category  | Required | Default              |
| --------- | -------- | -------------------- |
| Essential | Yes      | Always on, no toggle |
| Analytics | No       | Off                  |
| Marketing | No       | Off                  |

---

## Anti-Slavery Statement — Optional

Recommended for clients in labour supply, payroll, recruitment, staffing, or manufacturing sectors (Modern Slavery Act 2015 — UK).

- Route: `/anti-slavery`
- Add to footer legal links if built
- Must state: company stance, supply chain checks, due diligence process, staff training, annual sign-off
- Include the year in the heading — review annually

---

## GDPR / CCPA Compliance Checklist

Apply whenever building forms, API routes, or data-handling features:

### Forms & Data Collection
- Every form collecting personal data must include a consent checkbox linking to the Privacy Policy
- Never collect more data than needed (data minimisation principle)
- Clearly label optional vs required fields
- Do not store form submissions server-side unless explicitly required

### API Routes
- Never log full request bodies containing PII
- Treat email addresses, phone numbers, and names as PII at all times
- Ephemeral tokens (captcha, OTP) must never be stored

### Emails
- Every outbound email must include: company name, address, and an unsubscribe/opt-out mechanism
- Marketing emails require explicit opt-in — never pre-ticked
- Transactional emails are exempt from opt-in but must still include company address

### Data Retention
- Contact form submissions: delete or anonymise after 12 months
- Newsletter subscribers: retain until unsubscribe
- Server logs: purge after 30 days

---

## Pages

See `.claude/pages.md` for all page rules — default pages, optional pages (Clients, Candidates, Anti-Slavery), and per-page UX requirements.

## Footer — Company Info
The footer must display the company name, address, and contact email at minimum. Never hardcode — always pull from the config.

---

## Footer Legal Links — Always Include

The footer must always expose at minimum:

```
/terms         — Terms & Conditions
/privacy       — Privacy Policy
/anti-slavery  — Anti-Slavery Statement (if built)
```

---

## File Structure (typical)

```
app/privacy/page.tsx          — Privacy Policy
app/terms/page.tsx            — Terms & Conditions
app/anti-slavery/page.tsx     — Anti-Slavery Statement (optional)
components/cookie/            — Cookie banner component(s)
configs/footer.ts             — Source of truth for company info & legal links
```
