# Cookie Consent System

GDPR/UK GDPR compliant cookie consent banner. Fully config-driven — change one line to toggle or swap layout.

---

## Quick Start

Open `configs/cookies.ts`:

```ts
export const cookiesConfig: CookiesConfig = {
  cookieBannerEnabled: true,        // ← set false to hide banner entirely
  cookieBannerVariant: "bar",       // ← change layout here (see variants below)
  cookieExpireDays: 365,
  content: { ... },
};
```

That's it. No component changes needed.

---

## Variants

| Variant | Description | Best for |
|---------|-------------|----------|
| `"bar"` | Fixed thin bar at bottom, full width | Default — least intrusive |
| `"card"` | Floating card, bottom-right corner | Clean / modern sites |
| `"modal"` | Centered modal with backdrop overlay | When consent is required before use |
| `"drawer"` | Tall slide-up panel from bottom, full width | More detail / richer content |
| `"float"` | Compact floating bubble, bottom-left. Click to expand | Minimal, non-blocking |

Switch by changing `cookieBannerVariant` in `configs/cookies.ts`.

---

## Config API

```ts
interface CookiesConfig {
  cookieBannerEnabled: boolean;         // Master toggle — false = no banner at all
  cookieBannerVariant: CookieBannerVariant; // "bar" | "card" | "modal" | "drawer" | "float"
  cookieExpireDays: number;             // Days to persist consent in localStorage
  content: {
    title: string;                      // Banner heading
    description: string;                // Body text
    acceptLabel: string;                // Accept button label
    declineLabel: string;               // Decline button label
    privacyHref: string;                // Link to privacy policy page
    termsHref: string;                  // Link to terms page
  };
}
```

---

## How Consent is Stored

- Stored in `localStorage` under key `cookie-consent`
- Values: `"accepted"` or `"declined"`
- Banner is hidden once either value is stored
- Clears automatically if you call `reset()` from `useCookieConsent`

### useCookieConsent hook

```ts
import { useCookieConsent } from "@/hooks/useCookieConsent";

const { consent, accept, decline, reset, mounted } = useCookieConsent();
// consent  → "accepted" | "declined" | null
// mounted  → false during SSR (use to avoid hydration mismatch)
```

---

## File Structure

```
configs/
  cookies.ts                  ← master config (toggle + variant + content)

hooks/
  useCookieConsent.ts         ← localStorage-backed consent state

components/cookie/
  CookieBanner.tsx            ← switcher entry point (add to layout)
  CookieBannerBar.tsx         ← "bar" variant
  CookieBannerCard.tsx        ← "card" variant
  CookieBannerModal.tsx       ← "modal" variant
  CookieBannerDrawer.tsx      ← "drawer" variant
  CookieBannerFloat.tsx       ← "float" variant

app/
  privacy/page.tsx            ← Privacy Policy template
  terms/page.tsx              ← Terms & Conditions template
```

---

## Privacy & Terms Pages

Template pages live at:
- `/privacy` → `app/privacy/page.tsx`
- `/terms` → `app/terms/page.tsx`

Each file has `// TODO` comments marking every section that needs real content. Update the constants at the top of each file:

```ts
const companyName = "MyApp";           // Your company name
const contactEmail = "legal@example.com"; // Your contact email
const jurisdiction = "England and Wales"; // Your governing jurisdiction
const lastUpdated = "March 2026";
```

> **Important:** Have a legal professional review both pages before publishing.

---

## Compliance Notes (UK GDPR / ePrivacy)

- The **"Decline"** button is always present and equally prominent — required for valid consent
- Consent is not pre-ticked or assumed — banner is shown until user actively chooses
- Cloudflare Turnstile (CAPTCHA) sets cookies — reference to their privacy policy is included in the Privacy Policy template
- For analytics or marketing cookies, you should gate those scripts behind `consent === "accepted"` checks
