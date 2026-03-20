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
| `fade-up` | Fades in + slides up 32px | Single elements (one button, one image) |
| `stagger` | Direct children enter in sequence (0.12s apart) | Text blocks (eyebrow → h2 → p), card grids, lists — **default choice for most containers** |
| `fade-in` | Pure opacity fade | Iframes (maps), images |

**Rule: prefer `stagger` over `fade-up` for any container with 2+ children.** Each direct child (eyebrow, h2, p, ul, link) enters individually, which reads far more polished than the whole block moving at once.

## File Structure

```
components/animations/PageAnimations.tsx  — IntersectionObserver, re-runs on pathname change
components/animations/HeroAnimator.tsx    — adds "hero-loaded" to .hero-section on pathname change
app/globals.css                           — all CSS lives here (pre-hide + transitions + hero)
```

## How It Works

### Scroll animations
- CSS pre-hides `[data-animate]` elements at `opacity: 0` (and `translateY(32px)` for fade-up/stagger)
- `PageAnimations` watches `usePathname()` — the observer re-runs on every route change
- On each navigation: `"in-view"` is removed from all elements, then a fresh `IntersectionObserver` is created after a 50ms paint delay
- When element enters viewport: `"in-view"` class added, `unobserve()` called
- CSS `transition` on `[data-animate].in-view` animates to `opacity: 1 / translateY(0)`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — fast start, smooth glide to rest

### Hero sequence
- `.hero-brand/headline/sub/ctas` start at `opacity: 0` via CSS
- `HeroAnimator` watches `usePathname()` — removes `"hero-loaded"` then re-adds it after 50ms on every navigation
- CSS `@keyframes hero-fade-up` + `animation-delay` staggers each element in
- `forwards` fill-mode keeps elements visible after animation

## Critical Rules

**1. No rootMargin on the IntersectionObserver.**
rootMargin shrinks the detection area. Elements already in the viewport on page load may never trigger, staying invisible forever.

**2. Both `PageAnimations` and `HeroAnimator` must use `usePathname()` as a `useEffect` dependency.**
Next.js App Router shares the layout across navigations — the layout never remounts. Without `usePathname`, the observer only runs on initial load. All subsequent page visits show elements frozen at `opacity: 0` until a hard refresh.
Fix pattern:
```tsx
const pathname = usePathname();
useEffect(() => {
  // reset + re-observe
}, [pathname]);
```

**3. Always include the 50ms timeout before observing.**
The new page's DOM is painted asynchronously after navigation. Observing immediately can miss elements that haven't rendered yet, especially on slower devices.

**4. Never mix a JS animation library with CSS transitions on the same property.**
Previous GSAP bug: GSAP animated `transform` via inline style → `clearProps` removed it → CSS `translateY(32px)` snapped back. User saw elements animate then jump.
Rule: CSS owns `opacity` and `transform` entirely.

**5. Pre-hide via CSS, not JS.**
JS pre-hiding runs after hydration — there's a window where elements flash visible. CSS pre-hiding applies from the first paint.

## Timing

| Element | Duration | Easing | Delay |
|---|---|---|---|
| `fade-up` | 1.3s | cubic-bezier(0.22, 1, 0.36, 1) | — |
| `fade-in` | 1.4s | cubic-bezier(0.22, 1, 0.36, 1) | — |
| `stagger` children | 1.3s | cubic-bezier(0.22, 1, 0.36, 1) | +0.20s per child (up to 10) |
| Hero brand | 1.0s | cubic-bezier(0.22, 1, 0.36, 1) | 0.10s |
| Hero headline | 1.1s | cubic-bezier(0.22, 1, 0.36, 1) | 0.35s |
| Hero subtext | 1.0s | cubic-bezier(0.22, 1, 0.36, 1) | 0.65s |
| Hero CTAs | 0.9s | cubic-bezier(0.22, 1, 0.36, 1) | 0.95s |
