# Workflow Orchestration

## 1. Plan Mode Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

## 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

## 3. Self-Improvement Loop

- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

## 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behaviour between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

## 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

## 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

# Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

---

# Project Services & Conventions

## Pre-built Folders — Check these before creating anything new

| Folder                | Purpose                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `lib/infra/axios.ts`  | Singleton HTTP client — reusable `get`, `post`, `put`, `delete` with auto 401 redirect                   |
| `lib/infra/api.ts`    | **All API URLs live here**, grouped by domain. Add new endpoints here, never hardcode URLs in components |
| `lib/infra/gsap.ts`   | GSAP singleton — only use if the user explicitly requests GSAP for a specific interaction. Never for scroll/page animations — those use the CSS system |
| `lib/infra/swiper.ts` | Swiper singleton — modules + CSS imported here. **Always import Swiper modules from here, never from `swiper` directly** |
| `lib/utils/format.ts` | **ALL** formatting/conversion helpers go here — dates, durations, initials, input converters, ms→hours, etc. NEVER define these inline in components |
| `lib/utils/cn.ts`     | Tailwind class merging ONLY (`cn`) — not for general utilities                                           |
| `configs/`            | App-wide constants (RBAC rules, auth routes, etc.)                                                       |
| `providers/`          | React context providers — check here before writing a new one                                            |

## Animations & Carousels — Mandatory libraries

- **Scroll animations**: use the built-in CSS + IntersectionObserver system — add `data-animate="fade-up"`, `data-animate="stagger"`, or `data-animate="fade-in"` to elements. `PageAnimations` in `app/layout.tsx` handles the rest. See `.claude/animate.md` for full reference.
- **Hero animations**: use `HeroAnimator` component with `.hero-brand`, `.hero-headline`, `.hero-sub`, `.hero-ctas` class names on hero elements. See `.claude/animate.md`.
- **Never use**: GSAP, Framer Motion, AOS, or any other JS animation library for scroll/page animations — the CSS system is intentionally lightweight and smooth
- **Carousels / sliders**: always use Swiper (`swiper/react`) with modules from `@/lib/infra/swiper.ts` — never build custom carousel logic or use other libraries (Embla, Keen Slider, etc.)
- Simple CSS transitions (hover, focus) are fine with Tailwind

## Key utility functions already in `lib/utils/format.ts`

Date helpers: `toDateStr`, `todayDateStr`, `daysAgoDateStr`, `startOfMonthDateStr`, `startOfLastMonthDateStr`, `endOfLastMonthDateStr`
Display formatters: `formatDate`, `formatTime`, `formatDuration` (HH:MM:SS), `formatDurationBetween` (compact "2h 30m", seconds rounded), `formatDurationMs` (accurate "Xh Ym Zs" from ms), `formatDayLabel` (weekday label), `formatInitials`
Number/time: `msToHours`, `avgHours`
Input helpers: `toDateInput` (ISO → `<input type="date">` value), `toIntInput` (number|null → string)

**DRY rule**: Before writing any formatting/conversion function in a component, check `lib/utils/format.ts` first. If it doesn't exist there, add it there — never inline it.

## UI Components — shadcn/ui available but not mandatory

shadcn/ui components are available in `@/components/ui/` and can be used when convenient:

| Need                | Available component                                                                |
| ------------------- | ---------------------------------------------------------------------------------- |
| Dropdown/select     | `SelectRoot`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`        |
| Dialog/modal        | `DialogRoot`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`      |
| Button              | `Button` — supports `variant`, `size`, `isLoading` props                           |
| Text input          | `Input` — pairs with `Label`                                                       |
| Card layout         | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`                |

Raw HTML elements (`<input>`, `<button>`, `<select>`, `<textarea>`) are perfectly acceptable — use whichever keeps the code simpler and consistent with the surrounding component.

## HTTP Requests — Layer order: api.ts → axios.ts → React Query

- **NEVER** import `axios` directly in components
- **ALL API URLs** must be defined in `lib/infra/api.ts` — never hardcode in components
- `axios.ts` baseURL is `/api` — so paths in `api.ts` start with `/v1/...` (not `/api/v1/...`), and direct axiosService calls use `/auth/...` (not `/api/auth/...`)
- **Import React Query directly** from `@tanstack/react-query` — no wrapper:
  - `useQuery({ queryKey, queryFn: () => APIService.x.list() })` — for GET
  - `useMutation({ mutationFn: (data) => APIService.x.create(data), onSuccess })` — for mutations
  - `useQueryClient` — import from `@tanstack/react-query` directly
  - `isAxiosError` from `axios` is acceptable for error type-checking only

---

# Documentation

- **Always create docs** for any new feature, config file, API route, or reusable component system
- Docs live in `docs/` — one file per feature area (e.g. `docs/FORMS.md`, `docs/MAIL.md`)
- Update existing docs if a feature touches them
- Docs are non-negotiable: if you built it, document it

## Doc Format — Strict Order, No Fluff

1. **One-line summary** — what it does, nothing more
2. **Quick start** — the minimum code/config to make it work (≤10 lines)
3. **Options table** — variants/props in a tight table: `Option | Type | Description`
4. **Config API** — only non-obvious fields, one line each
5. **File structure** — flat list of paths, one-line purpose per file

## Doc Rules

- No intros, no "Welcome to X", no motivation paragraphs
- No "As you can see" / "Note that" / filler phrases
- Every sentence must be actionable or reference something concrete
- Code blocks only for things you'd actually copy-paste
- Max 1 blank line between sections
- If a section has nothing useful to say, omit it entirely

---

# Legal & Compliance

See `.claude/legal.md` for the full ruleset. Summary:

- **Ask first**: Before writing any legal page or compliance component, verify all company info is complete. If anything is missing or placeholder, STOP and ask the user.
- **Required pages**: Every project must ship with `/privacy`, `/terms`, and a cookie consent banner. Do not consider a project complete without them.
- **Cookie banner**: `components/cookie/CookieBannerModal.tsx` — must show on first visit, offer Accept / Reject / Manage Preferences, and gate non-essential scripts behind consent.
- **Anti-slavery**: Optional but recommended for payroll/labour sectors — route `/anti-slavery`, add to footer legal links if built.
- **Company info source of truth**: store in `configs/footer.ts` — never hardcode company details inline in components or pages.
- **Pages**: See `.claude/pages.md` for all page rules — default pages, optional pages (Clients, Candidates, etc.), and per-page UX/content requirements. Never add pages beyond the defaults without asking first.
- **Footer**: Layout is config-driven via `configs/footer.ts` — ask the user which layout to use before building. Never prescribe or assume a layout.
- **GDPR/CCPA**: Forms need consent checkboxes, API routes must not log PII, all outbound emails must include company address and opt-out.

---

# Styling Rules

## Color Scheme — Never Hardcode Colors

- **All accent/brand colors** must use CSS variables from `app/globals.css` (`var(--accent)`, `var(--accent-hover)`, `var(--accent-light)`, etc.) — never hardcode hex values or Tailwind color classes like `indigo-600` for brand colors
- Neutral colors (`gray-*`, `white`, `black`) are fine as Tailwind classes
- To retheme, always tell the user: **"Adjust the CSS variables in `app/globals.css` — change `--accent` to retheme the whole site"**

## Applying a New Colour Scheme — Full Mapping Required

When the user provides a new colour scheme (hex values, palette, or CSS variables), **always update ALL of the following in `app/globals.css`** — never only update `:root`:

1. **`:root` base variables** — `--accent`, `--accent-hover`, `--accent-light`, `--accent-muted`, `--bg-pure`, `--bg-base`, `--bg-soft`, `--bg-subtle`, `--text-heading`, `--text-body`, `--text-muted`, `--text-faint`, `--border`, `--border-strong`, `--gradient-hero`, `--gradient-card`
2. **Header scroll variables** — `--bg-header`, `--nav-color-solid`, `--nav-color-transparent`. Rule: if `--bg-header` is light → `--nav-color-solid` must be dark. If dark → must be light.
3. **`.section-dark`** — update `--section-bg`, `--section-heading`, `--section-body`, `--section-muted`, `--section-border`, `--section-accent`, `--section-accent-light`, `--section-btn-bg`, `--section-btn-text` to match the dark palette
4. **`.section-light`** — same variables, mapped to the light contrast palette

Never leave any of these groups out of sync with the others. A colour scheme update is only complete when all four groups are updated.

5. **Email template brand constants** — after updating `app/globals.css`, sync the `ACCENT`, `DARK`, and `DARK_MID` hex constants at the top of every active email template in `emails/`. CSS variables are stripped by email clients — templates must use raw hex values that match the new palette.

5. **Email template brand constants** — after updating `app/globals.css`, sync the `ACCENT`, `DARK`, and `DARK_MID` hex constants at the top of every active email template in `emails/`. CSS variables are stripped by email clients — templates must use raw hex values that match the new palette.

## Inline CSS — Always Use CSS Variables

- When writing inline `style={{}}` props, always use CSS variables from `app/globals.css` rather than hardcoded hex values
- Correct: `style={{ color: "var(--accent)" }}` — Wrong: `style={{ color: "#4f46e5" }}`
- This keeps theming consistent and ensures retheme works everywhere, including email templates and components that cannot use Tailwind classes

## Layout — Never Force a Structure

- **Never impose a specific page layout or section order** without asking first
- **Never add sections** (hero, features, testimonials, pricing, FAQ, etc.) beyond what was asked
- If unsure about layout *structure* (number of sections, page order), ask before building

## Forms — Mandatory Recolour on Every Project

All form components in `components/forms/` must use the CSS utility classes from `app/globals.css` — never hardcode `indigo-*`, `gray-*`, or any brand colour directly in form components.

| Element | Class to use |
|---|---|
| Input / textarea / select | `form-input` |
| Label | `form-label` |
| Submit button | `form-btn` |
| File upload drop zone | `form-upload-zone` + `drag-over` class on drag |
| Uploaded file pill | `form-file-pill` |
| Success state wrapper | `form-success` |
| Success icon circle | `form-success-icon` |

These classes use `--section-*` CSS variables, so they automatically adapt to `section-dark` and `section-light` parent contexts. When placed inside `section-light`, inputs get light borders and dark text. Inside `section-dark`, they get dark borders and light text — zero extra work. When rebranding, only `app/globals.css` needs updating.

## Component Styling — Defaults Only

- Use Tailwind utility classes for all styling — no inline `style=` props unless unavoidable
- Default to the project's existing spacing, typography, and colour patterns — don't introduce new design languages
- Never add animations or transitions that weren't asked for — Tailwind hover/focus transitions are fine
- **Never add `max-w-*` classes to `<p>` tags** — paragraph width is controlled by its parent container, not the element itself. Adding `max-w-2xl`, `max-w-prose`, or any width constraint directly on a `<p>` breaks layout consistency and fights the grid.
- **CTAs and buttons inside sections must have `mt-8` on their className** — this gives consistent, professional spacing between body content and the call-to-action. Never leave a CTA immediately flush against the text above it.
- **Hero section containers must use `section-hero` as the default className on every page** — always include it on every hero `<section>` (e.g. `<section className="section-hero relative ..."`). It provides responsive padding and top spacing out of the box. Do not add custom `pt-*` or `py-*` to hero sections unless intentionally overriding. This applies to every page, not just the homepage.
- **Mobile menu components must use CSS variables for all colours** — drawer, dropdown, and fullscreen menus in `components/header/` must never use hardcoded Tailwind colour classes (`indigo-*`, `gray-*`, `white`) or hex values for brand/theme colours. Use `var(--accent)`, `var(--accent-light)`, `var(--bg-header)`, `var(--nav-color-solid)`, `var(--text-heading)`, `var(--border)` etc. so they stay in sync with the desktop header and the active theme.
- **Every non-hero section must use `section-dark` or `section-light` class** — add one of these to every `<section>` on every page (e.g. `<section className="section-dark py-24 px-4">`). Inside that section, always use `var(--section-heading)`, `var(--section-body)`, `var(--section-muted)`, `var(--section-border)`, `var(--section-accent)`, `var(--section-accent-light)`, `var(--section-btn-bg)`, `var(--section-btn-text)` — never hardcode colours inside a section. This keeps alternating dark/light sections consistent and themeable from one place in `app/globals.css`.

---

# Section Planning & Creative Design

## Plan Before You Build

Before writing JSX for any page, mentally plan every section first:
- What is the **purpose** of this section? (inform, persuade, convert, reassure)
- What **layout pattern** best serves the content? (split, grid, offset, full-bleed, stacked)
- How does it **contrast** with the section above and below? (dense vs spacious, dark vs light, image vs text)
- Only then write the code

## Be Deliberately Creative

Every page and every section must feel intentional and distinct. Before writing JSX, ask: *"Would a senior UI/UX designer be proud of this?"*

- **No cookie-cutter layouts** — never default to the same centred-heading + paragraph + button pattern every time. Vary alignment (left-aligned hero, offset grids, asymmetric splits), whitespace, and visual hierarchy
- **No identical sections** — each section on a page must look and feel different from its neighbours. Alternate background tones, flip column order, change type scale
- **Think in contrast and rhythm** — alternate dense and breathable sections, vary type sizes deliberately, use spacing to guide the eye
- **Use visual anchors** — subtle background tints, gradient accents, bordered cards, or decorative elements to break monotony without clutter
- **Typography matters** — use size, weight, and colour contrast to establish clear hierarchy (headline → subheading → body → caption). Never make everything the same size
- **Responsive is intentional** — mobile layout is a deliberate design decision, not just stacked columns
- **Micro-details count** — rounded corners, shadow depth, icon sizing, and padding consistency signal quality. Match them across the page
- **When in doubt, go asymmetric** — a left-aligned stat block, an offset image, a pull quote in a side column — these signal craft over templates

## Use the Right Pattern for the Content

- **Breadcrumbs** — any page deeper than 1 level (blog post, service detail, docs)
- **Accordions** — FAQs, feature breakdowns, long content lists. Prefer over walls of text
- **Carousels (Swiper)** — testimonials, portfolio items, team members, logo grids, or any repeating card set with 4+ items. Always import from `@/lib/infra/swiper.ts`
- Choose the pattern that best serves the content — don't force flat lists when a smarter component exists

---

# Language

- **British English only** — use British spellings in all copy, UI text, comments, and documentation
- Common differences: enquire (not inquire), colour (not color), organise (not organize), analyse (not analyze), centre (not center), licence/n (not license/n), realise (not realize), travelling (not traveling)
- This applies to user-facing strings, placeholder text, form labels, email templates, and docs — not to code identifiers (variable/function names stay in standard ASCII)

---

# Navigation Behaviour

- **Scroll to top on navigation**: When a user clicks any nav link, the page must always start at the top. This is the intended UX — never preserve scroll position across route changes.
- Do not use `scroll={false}` on `<Link>` components unless explicitly asked.
- Do not add any `scrollRestoration` logic or `window.scrollTo` overrides that would break this default.

---

# Performance & Core Web Vitals

Every styling and asset decision must consider initial page load. A visually polished page that loads slowly fails the user before they see it.

- **Images**: always use `next/image` with explicit `width` and `height`. Add `priority` on above-the-fold images (hero, logo). Use `loading="lazy"` on below-fold images — never add `priority` to everything.
- **Fonts**: always set `display: "swap"` on font declarations to prevent invisible text during load.
- **Hero sections always require a background image** — always use `public/bg.webp` (preferred) or an SVG as the hero background. Never leave a hero section with a plain colour or gradient only. Use `next/image` with `fill` and `priority` for `.webp` backgrounds, or an `<img>` / inline `<svg>` for SVG backgrounds.
- **Hero background format rules**: `.webp` is the preferred format for photographic/complex backgrounds. SVG is acceptable for geometric/illustrative backgrounds. Never use `.jpg`, `.png`, or unoptimised formats in the hero — they block LCP. Never use a video background without a `.webp` poster image fallback loaded first.
- **Hero background performance pattern**:
  ```tsx
  {/* Always use this pattern for webp hero backgrounds */}
  <div className="absolute inset-0 -z-10">
    <Image src="/bg.webp" alt="" fill sizes="100vw" className="object-cover" priority />
  </div>
  ```
- **Avoid layout shift** — always reserve space for images and dynamic content. Never let images pop in without dimensions.
- **CSS variables over inline hex** — already required, also faster for the browser to resolve in repaint cycles.
- **No render-blocking scripts** — third-party scripts (analytics, chat, maps) must be deferred or loaded behind cookie consent. Never load them unconditionally in `<head>`.
- **Keep component trees lean** — don't nest unnecessary wrapper `<div>`s. Every extra DOM node adds to paint time.
- **Swiper and GSAP are code-split by default** — only import them in the component that needs them, never at the top of a layout or page file.

---

# Email Templates

## Rebranding — Mandatory on Every Project

Email templates live in `emails/`. Whenever a project has forms (contact, subscribe, application, CV upload, etc.), find which email templates they use and rebrand all of them. Never leave default or placeholder email templates in place.

## How to Rebrand Email Templates

1. **Find all forms** — check `components/forms/` and any API routes in `app/api/` that call `sendEmail` or import from `emails/`
2. **Trace which template each form uses** — follow the import chain from the form → API route → email template
3. **Rebrand every template that is actively used** — unused variants (e.g. `ContactEmailBold.tsx` if only `ContactEmailMinimal.tsx` is wired up) do not need updating unless asked
4. **Source company info from `configs/footer.ts`** — never hardcode company name, address, or email inline in templates

## Email Template Rules

- **No logo image** — never use `<img>` or `<Img>` for logos. Use the company name as plain text sourced from `mailConfig.fromName`
- **Plain white, no decoration** — body and container both `backgroundColor: "#ffffff"`. No dark header bands, no coloured card boxes, no avatar circles, no coloured buttons. The email must look like it came from a real person, not a marketing tool
- **Full width** — `width: "100%"` on the container, never `maxWidth`. Email clients control the viewport width
- **Left-aligned** — all content, labels, values, and the footer. Never `textAlign: "center"` anywhere except possibly the footer line
- **Structure**: company name (gray, small) → thin divider → date → field table → divider + message (if any) → `Reply to [name] →` text link → divider → one-line footer
- **No Button component** — use a plain `<Link>` styled as text for the reply action: `"Reply to [name] →"`. `color: "#111827"`, no background, no border
- **Brand colour only on email links** — `ACCENT` hex used only on `mailto:` and `tel:` links. Never on backgrounds, headers, or borders
- **Inline styles only** — email clients strip `<style>` tags. All styles must be in the `s` object as inline props
- **Short, professional subject lines** — `"New enquiry from [Name]"`, `"Application received"` — no exclamation marks, no filler
- **One-line footer** — `© year Company · website.com` — nothing else

---

# Forms

## Auto-Rebranding — Forms in Active Use

When adding or editing forms, rebrand the specific form components that are wired up and visible on the site — not every form in the repo.

- **Identify active forms** — check which forms are imported in pages or sections currently in use. Only rebrand those
- **Placeholders** — use realistic UK-format examples: `"Jane Smith"`, `"jane@company.com"`, `"+44 7700 900000"`, `"020 7946 0958"` — never US formats
- **Form labels** — British English throughout: "Enquiry" not "Inquiry", "CV" not "Résumé", "Post code" not "Zip code"
- **Button copy** — action verbs that match the form purpose: `"Send message"`, `"Submit application"`, `"Reserve my spot"` — never generic `"Submit"`
- **Success messages** — if the site name adds clarity, use `mailConfig.fromName` or `siteConfig.name` in success copy

---

# Project Kickoff

See `.claude/kickoff.md` for the full protocol. Summary:
- When the user says "set up this project for [company]" or the configs still show `"MyApp"`, run the kickoff protocol — ask all questions first, then auto-configure all 8 files in one pass.
- Never leave placeholder values. After any setup task, grep `configs/` for `"MyApp"`, `"hello@myapp.com"`, `"123 Business Street"`, `"+1 (555)"`, `"Your app description"` and fix any survivors before reporting done.

---

# Work Efficiency Rules

Rules that prevent unnecessary reading, writing, and token waste.

## Read Only What You Need
- Target specific files — use Grep/Glob with precise patterns, not broad directory scans
- When fixing a bug in file X, read only file X — not all related files "just in case"
- If you need to understand a config value, read that config file directly — do not read every file that consumes it
- When checking which template is active, read `configs/email-templates.ts` and the one relevant API route — not all 4 routes

## Write Only What Was Asked
- Fix the bug that was reported. Do not refactor, clean up, or "improve" surrounding code
- Do not add comments, docstrings, or type annotations to code you didn't change
- Do not add error handling, loading states, or validation for scenarios that don't exist yet
- Do not introduce new abstractions or utilities unless the task explicitly requires them
- If one component has a bug, fix that component — do not touch other components that "might have the same issue"

## Check Config Before Coding
- Before editing any form, email template, header, or footer component — check the relevant config to confirm it is actually in use
- Before rebranding any template — check `configs/email-templates.ts` to know which variant is active (minimal/bold/classic). Only touch the active one
- Before building a new section or page — confirm which layout type is configured. Do not build for a layout that is not selected

## No Speculative Work
- Do not build things "in case the user needs them later"
- Do not add feature flags or configuration options that were not asked for
- Do not create alternative implementations — implement what was asked, not what you think might be preferred
- Do not suggest or implement improvements beyond the scope of the request

## Cleanup
- When the user says "clean up" or "remove unused code" — follow `.claude/cleanup.md` exactly
- Do not decide independently to delete files without being asked. Cleanup is intentional, not opportunistic

---

# Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
- **No placeholder survivors**: Before marking any setup or kickoff task done, grep for `"MyApp"`, `"hello@myapp.com"`, `"123 Business Street"`, `"+1 (555)"`, `"Your app description"` across `configs/`. If any survive, fix them before reporting complete.
