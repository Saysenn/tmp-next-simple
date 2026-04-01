GLOBAL RULES: Always follow @.claude/CLAUDE.md, @.claude/legal.md, and @.claude/pages.md — these govern code style, legal compliance, and page structure. Apply @.claude/animate.md last, after all sections are built.

---

# HOW THIS PROMPT WORKS

Every time this prompt runs, follow these 5 stages in order. Do not skip any stage. Do not build anything until Stage 3 is fully confirmed.

---

# Stage 1 — Pre-Flight Asset Checks

Run these before asking the user anything.

**Check A — Required files in `/public`:**
Look for `public/bg.webp` and `public/logo.webp`. If either is missing, stop and say:
> "`[filename]` is missing from `/public`. Please add it before we proceed — it is needed for the hero background and header logo."

Do not move forward until both files exist.

**Check B — Design references:**
If no design images (mockups, screenshots, Figma exports, brand guides) were attached to this message, ask once:
> "No design references were attached. Would you like to add some before I start, or shall I proceed using the default template layout? You can share references later to refine."

Wait for their answer before continuing.

---

# Stage 2 — Company Intake

Ask all questions below before building anything. Present them as a single grouped message so the user can answer in one reply. Mark each group clearly.

---

**GROUP A — Company Basics** *(all required)*
1. Company name
2. Tagline or one-line description (if any)
3. Full registered address
4. City and country
5. Email address
6. Phone number
7. Website domain (if already known)

**GROUP B — What They Do** *(all required)*
8. Primary service or product
9. Secondary services (up to 3)
10. Industry or sector
11. Target clients (e.g. local authorities, SMEs, NHS trusts, private companies)
12. Target candidates or end users (if relevant — e.g. social workers, contractors, job seekers)

**GROUP C — Tone & Positioning** *(all required)*
13. Brand tone (e.g. corporate, friendly, premium, modern, trustworthy)
14. Unique selling points (e.g. fast turnaround, no hidden fees, specialist focus)
15. Words, phrases, or services to avoid mentioning entirely

**GROUP D — Pages to Build** *(all required — confirm each one)*
16. Home — always included
17. About — include?
18. Services — include?
19. Clients page (hero CTA scrolls to contact form) — include?
20. Candidates page (hero CTA scrolls to application form) — include?
21. Contact — always included
22. Terms & Privacy — always included
23. Modern Slavery / Anti-Slavery statement — include? (recommended for recruitment/payroll)
24. Any other pages? (do not assume — ask explicitly)

**GROUP E — Branding** *(optional — skip if not provided)*
25. Logo already in `public/logo.webp`? Confirm or provide path
26. Primary brand colour (hex or plain description)
27. Font preference (or leave as project default)

**GROUP F — Header & Footer**
28. Which header type to use? (nav / floating-nav / split-nav / stacked — default: nav)
29. CTA button in header — enabled? If yes, label and link
30. Which footer layout? Options: columns / minimal / centered / brand / split / recruit / stacked — ask the user, never assume. Footer is config-driven via `configs/footer.ts`.

---

Once the user has answered all groups, move to Stage 3. Do not start writing code or content before then.

---

# Stage 3 — Confirm Before Building

Summarise everything collected in a short table:

| Field | Value |
|---|---|
| Company name | ... |
| Primary service | ... |
| Pages to build | ... |
| Header type | ... |
| Tone | ... |
| Anything to avoid | ... |

Then ask:
> "Does this look correct? I'll proceed once you confirm."

Do not build anything until the user confirms.

---

# Stage 4 — Generate Content

Once confirmed:

1. Write all company details into `configs/footer.ts` as the single source of truth — never hardcode inline
2. Open `@.claude/sample-content.md` and rewrite it using the confirmed details:
   - Replace all placeholder names, sector references, and service descriptions
   - Keep the same page and section structure unless the user requested changes
   - For recruitment/workforce companies, follow `@.claude/rec-pay-content-logic.md` in addition
   - British English throughout — see CLAUDE.md Language section
   - Do not fabricate stats, testimonials, years of experience, or placement numbers
   - Do not add sections beyond what was confirmed in Stage 2

---

# Stage 5 — Build Pages

Build only the confirmed pages, in this order: Home → About → Services (if any) → Clients (if any) → Candidates (if any) → Contact → Legal pages.

For each page:
- Pull content from the updated `sample-content.md`
- Follow section order and UX rules from `@.claude/pages.md`
- Apply animation patterns from `@.claude/animate.md`
- Follow all styling and component rules from `@.claude/CLAUDE.md`
- Never hardcode company info — always reference `configs/footer.ts`
- **Plan every section before writing JSX** — purpose, layout pattern, contrast with neighbours
- **Inline `style={{}}` must use CSS variables** — `var(--accent)`, `var(--text-muted)`, etc. Never hardcode hex in inline styles
- **All CTAs and buttons inside sections must have `mt-8`** on their className for professional spacing
- **No `max-w-*` on `<p>` tags** — width is always controlled by the parent container

---

# Content Rules (apply throughout)

- No fabricated stats, reviews, years of experience, or placement numbers
- No repeated messaging across pages — each page must serve a distinct purpose
- No sections or pages beyond what was confirmed
- No unverifiable claims (e.g. "UK-wide network", "thousands of placements")
- Concise copy — less is more, never pad
- Honest, direct tone — no bluffing, no generic agency language
