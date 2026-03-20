# Animation Architecture

CSS transitions + Intersection Observer. No animation library. Two layers: scroll-reveal for all pages, hero sequence for homepage.

## Quick Start

**Step 1 — Mark elements in JSX:**
```tsx
<div data-animate="fade-up">...</div>          // heading / text block
<div data-animate="stagger">                   // card grid — children stagger in
  {items.map(i => <div key={i.id}>...</div>)}
</div>
<iframe data-animate="fade-in" ... />          // pure opacity fade
```

**Step 2 — `PageAnimations` is already in `app/layout.tsx`. Nothing else needed.**

**Step 3 — Hero on-load (homepage only):**
```tsx
import HeroAnimator from "@/components/animations/HeroAnimator";

<section className="hero-section ...">
  <p className="hero-brand">...</p>
  <h1 className="hero-headline">...</h1>
  <p className="hero-sub">...</p>
  <div className="hero-ctas">...</div>
</section>
<HeroAnimator />
```

## Options

| `data-animate` | Effect | Use on |
|---|---|---|
| `fade-up` | Fades in + slides up 24px | Section headings, text blocks, CTAs |
| `stagger` | Children enter in sequence (0.08s apart) | Card grids, lists |
| `fade-in` | Pure opacity fade | Iframes (maps), images |

## File Structure

```
components/animations/PageAnimations.tsx  — IntersectionObserver, adds "in-view" class
components/animations/HeroAnimator.tsx    — adds "hero-loaded" to .hero-section on mount
app/globals.css                           — all CSS lives here (pre-hide + transitions + hero)
```

## How It Works

### Scroll animations
- CSS pre-hides `[data-animate]` elements at `opacity: 0` (and `translateY(24px)` for fade-up/stagger)
- `PageAnimations` runs `IntersectionObserver` with `threshold: 0.1`, **no rootMargin**
  - No rootMargin is critical — with rootMargin elements in the viewport on page load may not fire
- When element enters viewport: `"in-view"` class added, `unobserve()` called
- CSS `transition` on `[data-animate].in-view` animates to `opacity: 1 / translateY(0)`

### Hero sequence
- `.hero-brand/headline/sub/ctas` start at `opacity: 0` via CSS
- `HeroAnimator` adds `"hero-loaded"` to `.hero-section` after mount
- CSS `@keyframes hero-fade-up` + `animation-delay` staggers each element in
- `forwards` fill-mode keeps elements visible after animation

## Critical Rules

**1. No rootMargin on the IntersectionObserver.**
rootMargin shrinks the detection area. Elements already in the viewport on page load may never trigger, staying invisible forever.

**2. Never mix a JS animation library with CSS transitions on the same property.**
Previous GSAP bug: GSAP animated `transform` via inline style → `clearProps` removed it → CSS `translateY(24px)` snapped back. User saw elements animate then jump.
Rule: CSS owns `opacity` and `transform` entirely.

**3. Pre-hide via CSS, not JS.**
JS pre-hiding runs after hydration — there's a window where elements flash visible. CSS pre-hiding applies from the first paint.

## Timing

| Element | Duration | Delay |
|---|---|---|
| `fade-up` | 0.6s | — |
| `fade-in` | 0.8s | — |
| `stagger` children | 0.5s | +0.08s per child (up to 10) |
| Hero brand | 0.7s | 0.05s |
| Hero headline | 0.9s | 0.25s |
| Hero subtext | 0.8s | 0.55s |
| Hero CTAs | 0.7s | 0.80s |
