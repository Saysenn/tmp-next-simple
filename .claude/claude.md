# Workflow Orchestration

## 1. Plan Mode Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
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
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

## 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

## 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

# Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

# Project Services & Conventions

## Pre-built Folders — Check these before creating anything new

| Folder                | Purpose                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `lib/infra/axios.ts`  | Singleton HTTP client — reusable `get`, `post`, `put`, `delete` with auto 401 redirect                   |
| `lib/infra/api.ts`    | **All API URLs live here**, grouped by domain. Add new endpoints here, never hardcode URLs in components |
| `lib/infra/gsap.ts`   | GSAP singleton — plugins registered here. **Always import `gsap` and `ScrollTrigger` from here, never from `gsap` directly** |
| `lib/infra/swiper.ts` | Swiper singleton — modules + CSS imported here. **Always import Swiper modules from here, never from `swiper` directly** |
| `lib/utils/format.ts` | **ALL** formatting/conversion helpers go here — dates, durations, initials, input converters, ms→hours, etc. NEVER define these inline in components |
| `lib/utils/cn.ts`     | Tailwind class merging ONLY (`cn`) — not for general utilities                                           |
| `configs/`            | App-wide constants (RBAC rules, auth routes, etc.)                                                       |
| `providers/`          | React context providers — check here before writing a new one                                            |

## Animations & Carousels — Mandatory libraries

- **Animations**: always use GSAP (`@/lib/infra/gsap.ts`) — never use raw CSS `@keyframes` or other JS animation libraries (Framer Motion, AOS, etc.) for complex animations
- **Scroll-triggered animations**: use `ScrollTrigger` from `@/lib/infra/gsap.ts` — never `IntersectionObserver` manually for animation purposes
- **Carousels / sliders**: always use Swiper (`swiper/react`) with modules from `@/lib/infra/swiper.ts` — never build custom carousel logic or use other libraries (Embla, Keen Slider, etc.)
- Simple CSS transitions (hover, fade, slide) are fine with Tailwind — GSAP is for multi-step or scroll-driven sequences

## Key utility functions already in `lib/utils/format.ts`

Date helpers: `toDateStr`, `todayDateStr`, `daysAgoDateStr`, `startOfMonthDateStr`, `startOfLastMonthDateStr`, `endOfLastMonthDateStr`
Display formatters: `formatDate`, `formatTime`, `formatDuration` (HH:MM:SS), `formatDurationBetween` (compact "2h 30m", seconds rounded), `formatDurationMs` (accurate "Xh Ym Zs" from ms), `formatDayLabel` (weekday label), `formatInitials`
Number/time: `msToHours`, `avgHours`
Input helpers: `toDateInput` (ISO → `<input type="date">` value), `toIntInput` (number|null → string)

**DRY rule**: Before writing any formatting/conversion function in a component, check `lib/utils/format.ts` first. If it doesn't exist there, add it there — never inline it.

## UI Components — Always use shadcn/ui wrappers, never raw HTML equivalents

| Need                | Use (from `@/components/ui/`)                                                      |
| ------------------- | ---------------------------------------------------------------------------------- |
| Dropdown/select     | `SelectRoot`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`        |
| Dialog/modal        | `DialogRoot`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`      |
| Button              | `Button` — supports `variant`, `size`, `isLoading` props                           |
| Text input          | `Input` — never raw `<input>` except inside shadcn components                      |
| Label               | `Label` — pairs with `htmlFor`                                                     |
| Card layout         | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`                |

**Never use raw `<select>`, `<input>` (standalone), or `<button>` directly in page/feature components.**

## HTTP Requests — Layer order: api.ts → axios.ts → React Query

- **NEVER** import `axios` directly in components
- **ALL API URLs** must be defined in `lib/infra/api.ts` — never hardcode in components
- `axios.ts` baseURL is `/api` — so paths in `api.ts` start with `/v1/...` (not `/api/v1/...`), and direct axiosService calls use `/auth/...` (not `/api/auth/...`)
- **Import React Query directly** from `@tanstack/react-query` — no wrapper:
  - `useQuery({ queryKey, queryFn: () => APIService.x.list() })` — for GET
  - `useMutation({ mutationFn: (data) => APIService.x.create(data), onSuccess })` — for mutations
  - `useQueryClient` — import from `@tanstack/react-query` directly
  - `isAxiosError` from `axios` is acceptable for error type-checking only

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

# Legal & Compliance

See `.claude/legal.md` for the full ruleset. Summary:

- **Ask first**: Before writing any legal page or compliance component, verify all company info is complete. If anything is missing or placeholder, STOP and ask the user.
- **Required pages**: Every project must ship with `/privacy`, `/terms`, and a cookie consent banner. Do not consider a project complete without them.
- **Cookie banner**: `components/cookie/CookieBannerModal.tsx` — must show on first visit, offer Accept / Reject / Manage Preferences, and gate non-essential scripts behind consent.
- **Anti-slavery**: Optional but recommended for payroll/labour sectors — route `/anti-slavery`, add to footer legal links if built.
- **Company info source of truth**: store in a single config file (e.g. `configs/footer.ts`) — never hardcode company details inline in components or pages.
- **Default pages**: Only build `/`, `/about`, `/contact`, `/terms`, `/privacy` by default. Never add Services, Why Us, FAQ, Pricing, or any other page without asking the user first. Ask once per page — if no confirmation, skip it.
- **Page requirements**: Homepage must have a reviews section. About page must have a map. Contact page must show company info block. Footer must show company name, address, and email.
- **Footer layout standard**: 4 columns — (1) Logo + description + social icons, (2) Company links, (3) Legal links, (4) Contact info. **Strictly ask the user before building the footer: "Do you want to proceed with the standard 4-column footer layout (Logo/Description/Socials | Company | Legal | Contact)?" — never implement without explicit confirmation.**
- **GDPR/CCPA**: Forms need consent checkboxes, API routes must not log PII, all outbound emails must include company address and opt-out.

# Styling Rules

## Color Scheme — Never Hardcode Colors

- **All accent colors** must use CSS variables from `app/globals.css` (`var(--accent)`, `var(--accent-hover)`, `var(--accent-light)`, etc.) — never hardcode hex values or Tailwind color classes like `indigo-600` for brand colors
- To change the color scheme, tell the user: **"Adjust the CSS variables in `app/globals.css` — change `--accent` to retheme the whole site"**
- Background, text, and border colors should use the defined variables where possible

## Layout — Never Force a Structure

- **Never impose a specific page layout or section order** without asking first
- **Never add sections** (hero, features, testimonials, pricing, FAQ, etc.) beyond what was asked
- **Never assume a grid or column count** — ask if the layout preference isn't explicit
- Simple, clean, and minimal is the default — let the user drive visual decisions
- If unsure about a layout choice, describe the options and ask before building

## Component Styling — Defaults Only

- Use Tailwind utility classes for all styling — no inline `style=` props unless unavoidable
- Default to the project's existing spacing, typography, and color patterns — don't introduce new design languages
- Never add animations or transitions that weren't asked for — Tailwind hover/focus transitions are fine, GSAP only when explicitly requested

## UI/UX Craftsmanship — Think Like a Senior Designer

Every section and component you build must feel intentional and polished. Before writing JSX, ask yourself: *"Would a senior UI/UX designer be proud of this?"*

- **Avoid cookie-cutter layouts** — don't default to the same centered-heading + paragraph + button pattern every time. Vary alignment (left-aligned hero, offset grids, asymmetric splits), whitespace, and visual hierarchy
- **Think in contrast and rhythm** — alternate dense and breathable sections, vary type sizes deliberately, use spacing to guide the eye
- **Use visual anchors** — subtle background tints, gradient accents, bordered cards, or decorative elements to break monotony without clutter
- **Typography matters** — use size, weight, and color contrast to establish clear hierarchy (headline → subheading → body → caption). Never make everything the same size
- **Responsive means intentional at every breakpoint** — mobile layout should be a deliberate design decision, not just stacked columns
- **Micro-details count** — rounded corners, shadow depth, icon sizing, and padding consistency signal quality. Match them across the page
- **When in doubt, go asymmetric** — a left-aligned stat block, an offset image, a pull quote in a side column — these signal craft over templates
- **Leverage the right UI pattern for the content:**
  - **Breadcrumbs** — use on any page deeper than 1 level (e.g. blog post, service detail, docs). Never make users guess where they are
  - **Accordions** — use for FAQs, feature breakdowns, long content lists. Prefer over walls of text
  - **Carousels (Swiper)** — use for testimonials, portfolio items, team members, logo grids, or any repeating card set with 4+ items. Always import from `@/lib/infra/swiper.ts`
  - Choose the pattern that best serves the content — don't force flat lists when a smarter component exists

# Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.