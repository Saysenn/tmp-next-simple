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
| `lib/utils/format.ts` | **ALL** formatting/conversion helpers go here — dates, durations, initials, input converters, ms→hours, etc. NEVER define these inline in components |
| `lib/utils/cn.ts`     | Tailwind class merging ONLY (`cn`) — not for general utilities                                           |
| `configs/`            | App-wide constants (RBAC rules, auth routes, etc.)                                                       |
| `providers/`          | React context providers — check here before writing a new one                                            |

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

# Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.