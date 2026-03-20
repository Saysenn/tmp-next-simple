# Animation Architecture

GSAP-based scroll-reveal system. Two layers: a global scroll animator and a per-hero on-load animator.

## Quick Start

**Step 1 — Mark elements in JSX:**
```tsx
// Section heading block
<div data-animate="fade-up">...</div>

// Card grid — children stagger in
<div data-animate="stagger">
  {items.map(i => <div key={i.id}>...</div>)}
</div>

// Iframe / image — pure fade
<iframe data-animate="fade-in" ... />
```

**Step 2 — Add `PageAnimations` to layout (already in `app/layout.tsx`):**
```tsx
import PageAnimations from "@/components/animations/PageAnimations";
// inside <body>:
<PageAnimations />
```

**Step 3 — Hero on-load sequence (homepage only):**
```tsx
import HeroAnimator from "@/components/animations/HeroAnimator";
// Add class names to hero elements:
<p className="hero-brand">...</p>
<h1 className="hero-headline">...</h1>
<p className="hero-sub">...</p>
<div className="hero-ctas">...</div>
// Render at top of page JSX:
<HeroAnimator />
```

## Options

| `data-animate` value | Effect | Use on |
|---|---|---|
| `fade-up` | Slides up 48px + fades in | Section headings, text blocks, CTA areas |
| `stagger` | Children enter in sequence (0.13s apart) | Card grids, list containers, accordion lists |
| `fade-in` | Pure opacity fade, no translate | Iframes (maps), images |

## File Structure

```
components/animations/PageAnimations.tsx  — global scroll system, added to layout
components/animations/HeroAnimator.tsx    — homepage hero on-load timeline
lib/infra/gsap.ts                         — GSAP singleton, plugins registered here
```

## Architecture

### PageAnimations (`components/animations/PageAnimations.tsx`)
- `"use client"` component, renders `null`
- Uses `usePathname` — re-initialises on every route change
- `gsap.context()` wraps all animations — `ctx.revert()` + `ScrollTrigger.kill()` on unmount/navigation, no leaks
- **No-flash rule**: before registering ScrollTrigger, checks `el.getBoundingClientRect().top > window.innerHeight` — only sets `opacity:0` on elements below the fold. Elements already in view are never touched.
- Uses `ScrollTrigger.batch()` for `fade-up` and `fade-in` — one ScrollTrigger instance handles all matching elements, not one per element
- Uses individual `ScrollTrigger.create()` per `stagger` parent so children can be targeted directly

### HeroAnimator (`components/animations/HeroAnimator.tsx`)
- `useRef(false)` guard — runs once per mount only
- `gsap.timeline()` with staggered delays — brand → headline → subtext → CTAs
- Uses `fromTo` safely here because hero is always above the fold and the timeline starts immediately, so no visible flash

### GSAP Singleton (`lib/infra/gsap.ts`)
- Always import `gsap` and `ScrollTrigger` from here, never from `gsap` directly
- Plugins registered once: `ScrollTrigger`, `ScrollToPlugin`
- Global defaults: `ease: "power4.out"`, `duration: 1.0`

## Performance Rules

- **Only animate `opacity` and `transform`** — no `width`, `height`, `top`, `left`, or any layout property. GPU-accelerated only.
- **`once: true`** on all ScrollTriggers — elements animate in once and stay visible, no re-triggering on scroll back up
- **`clearProps: "transform"`** after animation — releases GPU composite layer when motion is complete
- **No `willChange` left on elements** — only set during active animation via GSAP, cleared immediately after
- **`ScrollTrigger.batch()`** over individual triggers — batches multiple elements into one observer, dramatically reduces overhead on content-heavy pages
- **No `requestAnimationFrame` wrapper** — running GSAP setup synchronously in `useEffect` avoids the one-frame flash where elements appear visible before being hidden

## The Double-Animation Bug (and How to Avoid It)

**Root cause:** `gsap.fromTo(allElements, {opacity:0}, ...)` sets every matching element to `opacity:0` on registration — including elements already visible in the viewport. The browser paints them visible (SSR), React hydrates, GSAP hides them, ScrollTrigger fires, they animate back in. User sees: visible → invisible → animate.

**Fix:** Never use `fromTo` in batch/scroll triggers. Instead:
1. Query all elements manually
2. Check `getBoundingClientRect().top > window.innerHeight`
3. Only `gsap.set(el, { opacity: 0, y: 48 })` if the element is below the fold
4. Then register the batch/trigger using `gsap.to()` (not `fromTo`)

```ts
// WRONG — flashes for in-view elements
ScrollTrigger.batch("[data-animate='fade-up']", {
  onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 48 }, { opacity: 1, y: 0 }),
});

// CORRECT — only hides off-screen elements
document.querySelectorAll("[data-animate='fade-up']").forEach(el => {
  if (el.getBoundingClientRect().top > window.innerHeight) {
    gsap.set(el, { opacity: 0, y: 48 });
  }
});
ScrollTrigger.batch("[data-animate='fade-up']", {
  onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1 }),
  once: true,
});
```

## Timing Reference

| Animation | Duration | Ease | Stagger |
|---|---|---|---|
| `fade-up` | 1.1s | `power4.out` | 0.12s |
| `stagger` children | 0.9s | `power3.out` | 0.13s |
| `fade-in` | 1.4s | `power2.inOut` | 0.1s |
| Hero brand | 0.8s | `power4.out` | — |
| Hero headline | 1.3s | `expo.out` | — |
| Hero subtext | 1.0s | `power4.out` | — |
| Hero CTAs | 0.85s | `power4.out` | — |
