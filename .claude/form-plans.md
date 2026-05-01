# Form Variety Design System

This document defines **12 unique UI patterns**:
- 4 Application Forms
- 4 Contact Forms
- 4 Cookie Modals

basically I want you to redesign each exsiting forms also on this template.

Each variant differs in **layout, tone, UX flow, and visual identity** to avoid repetition and “AI sameness”. All examples use **UK-based placeholders**.
and also the form fonts should be based on the current website mainly used font on globals.css so if you gonna put large titles on the forms, you better use the font used on the hero sections.

---

# GLOBAL DESIGN PRINCIPLES
- Avoid identical spacing patterns across variants
- Mix: minimal, editorial, corporate, and creative styles
- Use varied alignment (left, centered, split, asymmetrical)
- Different interaction styles (multi-step, inline, card, sidebar)
- Vary tone: formal, friendly, premium, modern

---

# APPLICATION FORMS (4 VARIANTS)

## 1. Corporate Split Layout (Recruitment Agency Style)
**Feel:** Structured, compliance-heavy, HR-driven

### Layout
- 2-column fixed grid (60/40)
- Left: vertically stacked grouped inputs
- Right: static info panel (no form fields)
- Section dividers with subtle rules

### Sections & Inputs (strict grouping)
**A. Identity**
- Title (Mr/Ms/Mx dropdown)
- Full Name ("Oliver James Smith")
- Date of Birth (UK format DD/MM/YYYY)

**B. Contact**
- Email ("oliver.smith@gmail.com")
- Phone ("+44 7700 900123")
- Address line 1 ("221B Baker Street")
- Postcode ("NW1 6XE")

**C. Compliance**
- National Insurance Number ("QQ123456C")
- Right to Work (Yes/No radio)

**D. Employment**
- Current Employer
- Notice Period (dropdown: 1 week, 2 weeks, 1 month)

**E. Upload**
- CV Upload
- Cover Letter Upload

### Interaction Pattern
- Scroll-heavy (no pagination)
- Sticky sidebar CTA
- Validation on blur (not realtime)

---

## 2. Multi-Step Progress Form (Guided UX)
**Feel:** Step-by-step onboarding, reduces cognitive load

### Layout
- Single centered container (max-width ~520px)
- Progress indicator (Step dots, not bar)
- One question cluster per screen

### Steps (strict isolation)
**Step 1 – Identity**
- First Name ("Amelia")
- Last Name ("Turner")

**Step 2 – Role Fit**
- Desired Role ("Care Assistant")
- Experience Level (0–1, 1–3, 3+ years)

**Step 3 – Logistics**
- Availability (toggle buttons)
- Preferred City ("Manchester")

**Step 4 – Final Check**
- Summary (read-only blocks)
- Agreement checkbox

### Interaction Pattern
- Next/Back buttons only (no scrolling)
- Data saved per step
- Microcopy guidance under each field

---

## 3. Editorial Minimal (Luxury / Executive Hiring)
**Feel:** Slow, intentional, typography-led

### Layout
- Single column, large vertical rhythm
- Inputs spaced far apart (one per viewport chunk feel)

### Inputs (no grouping visually)
- Name ("Charlotte Bennett")
- Email
- Phone
- LinkedIn URL ("linkedin.com/in/charlottebennett")
- Personal Statement (long textarea)

### Interaction Pattern
- Inline validation only on submit
- Inputs use underline only (no boxes)
- CTA appears only at end (no sticky)

### Distinctive Traits
- No labels above → placeholders act as prompts
- Focus = expand input line

---

## 4. Card-Based Modular Form (Tech Hiring)
**Feel:** Non-linear, flexible, interactive

### Layout
- Masonry/grid card layout
- Each card = independent section
- Cards can be completed in any order

### Cards & Inputs
**Card 1: Profile**
- Name
- Email

**Card 2: Skills**
- Multi-select chips ("React", "Node.js", "TypeScript")

**Card 3: Work Links**
- Portfolio URL
- GitHub URL

**Card 4: Compensation**
- Salary Expectation (£30k–£45k slider)

### Interaction Pattern
- No strict flow
- Completion indicators per card
- Expand/collapse cards

---

# CONTACT FORMS (4 VARIANTS)

## 1. Classic Business Contact (Structured)
**Feel:** Traditional B2B

### Layout
- 2-column (form + info)
- Inputs stacked, uniform width

### Inputs
- Full Name ("James Walker")
- Email
- Phone
- Company ("Walker & Co Ltd")
- Inquiry Type (dropdown)
- Message

### Pattern
- Straight linear completion
- Submit at bottom only

---

## 2. Conversational Inline Form
**Feel:** Human, guided, sentence-driven

### Layout
- Text + inline inputs embedded

### Structure
"Hi, I’m [Name] from [City], and I need help with [Service]. You can contact me via [Email]."

### Inputs
- Name ("Sophia Green")
- City ("Birmingham")
- Service (Hiring / Support / General)
- Email

### Pattern
- Tab-to-next input flow
- Feels like typing a sentence, not filling a form

---

## 3. Minimal Center Card (Startup Style)
**Feel:** Fast, frictionless

### Layout
- Centered card, max 4 inputs

### Inputs
- Name
- Email
- Subject ("Partnership Opportunity")
- Message

### Pattern
- No sections
- Autofocus first field
- One-click submit

---

## 4. Split Asymmetric Contact (Creative Agency)
**Feel:** Bold, expressive layout

### Layout
- Left: large headline + irregular spacing
- Right: staggered input alignment (not perfectly vertical)

### Inputs
- Name
- Email
- Phone
- Project Budget (£5k–£10k dropdown)
- Message

### Pattern
- Inputs offset slightly (intentional imperfection)
- CTA placed mid-form, not bottom

---

# COOKIE MODALS (4 VARIANTS)

## 1. Bottom Bar Minimal
**Layout Pattern:** Full-width strip

### Structure
- Text left
- Buttons right (inline)

### Behaviour
- Non-blocking
- Disappears on accept

---

## 2. Centered Modal (Compliance Heavy)
**Layout Pattern:** Box modal + backdrop

### Structure
- Title
- Paragraph
- Button stack (vertical)

### Behaviour
- Must interact before closing
- Includes policy links

---

## 3. Side Panel Preferences
**Layout Pattern:** Slide-in right panel

### Structure
- Category toggles (stacked switches)
- Expandable sections

### Behaviour
- Real-time toggle updates
- Save preferences CTA

---

## 4. Floating Card (Playful UX)
**Layout Pattern:** Small floating box (bottom-left)

### Structure
- Short sentence
- 2 casual buttons

### Behaviour
- Draggable or dismissible
- Reappears after reload if ignored

---

# CONTENT & INFORMATION REQUIREMENTS PER VARIANT

## APPLICATION FORMS

### 1. Corporate Split
- Right panel must include:
  - Company logo
  - Short hiring message
  - Office address (UK-based)
  - Contact email
- Optional: small office image

### 2. Multi-Step
- No extra content panels
- Each step includes helper text (guidance)
- Final step includes:
  - Summary preview
  - Terms & conditions checkbox

### 3. Editorial Minimal
- No additional UI elements
- Optional small footer note:
  - "We review every application personally"
- No logos inside form area

### 4. Card-Based Modular
- Optional side/top info:
  - Job summary (role, salary range, location)
- Each card may include:
  - Helper tooltip

---

## CONTACT FORMS

### 1. Classic Business
- Right panel includes:
  - Office address (e.g. London HQ)
  - Embedded map (Google Maps iframe)
  - Phone number
  - Opening hours

### 2. Conversational
- No map
- Optional small footer:
  - "We typically reply within 24 hours"

### 3. Minimal Card
- No additional info
- Optional:
  - Small brand logo above form

### 4. Asymmetric Creative
- Left panel includes:
  - Large brand statement
  - Optional stats ("50+ clients", "10+ years")
- No map (keeps layout clean and expressive)

---

## COOKIE MODALS

### 1. Bottom Bar
- Includes:
  - Short message
  - Link to cookie policy
- No detailed controls

### 2. Center Modal
- Includes:
  - Title + paragraph
  - Link to full privacy policy
  - Optional company legal name

### 3. Side Panel
- Includes:
  - Detailed categories (Necessary, Analytics, Marketing)
  - Descriptions per category
  - Save preferences button

### 4. Floating Card
- Includes:
  - Short playful text
  - Optional emoji or icon
- No detailed policy text (kept lightweight)

---

# FINAL UNIQUENESS ENFORCEMENT

To ensure these do NOT feel like recolors of the same design:

- Some are **scroll forms**, others are **step-based**, others **non-linear**
- Input grouping varies: strict, none, conversational, modular
- CTA placement varies: sticky, inline, mid-form, end-only
- Alignment varies: centered, split, asymmetrical, sentence-based
- Interaction differs: click-next, scroll, free navigation, inline typing
- Supporting content differs: some include maps, some include branding, some include nothing
- Field types vary significantly (toggles, chips, sliders, sentence inputs)

This guarantees each form feels like it was designed by a **different senior designer**, not just recolored.

---

# DESIGN CONSTRAINT MATRIX (STRICT UNIQUENESS RULES)

To prevent visual or structural repetition, EACH variant MUST obey these constraints:

## 1. Borders
- Corporate Split: thin 1px sharp borders, square feel
- Multi-Step: soft invisible borders (shadow separation only)
- Editorial Minimal: NO borders at all (underline-only inputs)
- Card Modular: thick soft borders with elevation (card-based)

## 2. Layout System
- Corporate Split: fixed 60/40 grid
- Multi-Step: single centered column
- Editorial Minimal: full-width text flow (no container feel)
- Card Modular: masonry / grid system with independent blocks

## 3. Width Behavior
- Corporate Split: full desktop width usage
- Multi-Step: narrow (max 520px)
- Editorial Minimal: very wide margins (luxury spacing)
- Card Modular: fluid responsive grid, auto-fit cards

## 4. Typography System
- Corporate Split: sans-serif (formal UI font)
- Multi-Step: rounded modern UI font
- Editorial Minimal: serif or high-contrast editorial font
- Card Modular: tech/geometric monospace or modern grotesk mix

## 5. Corner Radius Rules
- Corporate Split: 2–4px (sharp compliance feel)
- Multi-Step: 12–16px (friendly UI feel)
- Editorial Minimal: 0px or near-zero (clean editorial feel)
- Card Modular: 18–24px (soft, app-like cards)

## 6. Input Style Differences
- Corporate Split: boxed inputs with labels above
- Multi-Step: floating labels or step-based prompts
- Editorial Minimal: underline-only inputs
- Card Modular: input inside cards with embedded controls

## 7. Placeholder Strategy
- Corporate Split: formal placeholders ("Enter full legal name")
- Multi-Step: guided placeholders ("What should we call you?")
- Editorial Minimal: minimal placeholders (single word hints)
- Card Modular: functional placeholders ("e.g. GitHub.com/username")

## 8. Information Density Rules
- Corporate Split: HIGH density (compliance-heavy)
- Multi-Step: MEDIUM density (guided flow)
- Editorial Minimal: VERY LOW density (breathing space)
- Card Modular: VARIABLE density per card

## 9. Supporting UI Elements
- Corporate Split: company info + optional image panel
- Multi-Step: progress tracker only
- Editorial Minimal: almost no supporting UI
- Card Modular: tooltips, badges, and optional summaries

## 10. Interaction Model
- Corporate Split: scroll + validation on blur
- Multi-Step: locked progression (step-by-step only)
- Editorial Minimal: submit-only validation
- Card Modular: free-order completion

---

# NON-NEGOTIABLE RULE

No two variants are allowed to share ALL of the following simultaneously:
- Layout system
- Typography style
- Border radius system
- Input style
- Information density
- Interaction model

If any 3 overlap, the design is considered INVALID and must be redesigned.

This ensures **true UI diversity, not cosmetic variation**.

