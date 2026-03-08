// ─── Cookie Consent Configuration ────────────────────────────────────────────
// Toggle the banner on/off and switch between 5 layout variants here.
// See docs/COOKIES.md for full documentation.

export type CookieBannerVariant = "bar" | "card" | "modal" | "drawer" | "float";

export interface CookiesConfig {
  /** Set to false to completely disable the cookie consent banner */
  cookieBannerEnabled: boolean;

  /**
   * Layout variant for the cookie banner.
   * - "bar"    → Fixed thin bar at bottom, full width (most common)
   * - "card"   → Floating card, bottom-right corner
   * - "modal"  → Centered modal with overlay backdrop
   * - "drawer" → Tall slide-up panel from bottom, full width
   * - "float"  → Compact floating bubble, bottom-left
   */
  cookieBannerVariant: CookieBannerVariant;

  /** How many days to store the consent decision in localStorage */
  cookieExpireDays: number;

  /** Text content shown in the banner */
  content: {
    title: string;
    description: string;
    acceptLabel: string;
    declineLabel: string;
    /** Href for "Privacy Policy" link */
    privacyHref: string;
    /** Href for "Terms" link */
    termsHref: string;
  };
}

export const cookiesConfig: CookiesConfig = {
  // ── Toggle ────────────────────────────────────────────────────────────────
  cookieBannerEnabled: true,

  // ── Layout ────────────────────────────────────────────────────────────────
  // Change this to any of: "bar" | "card" | "modal" | "drawer" | "float"
  cookieBannerVariant: "bar",

  // ── Storage ───────────────────────────────────────────────────────────────
  cookieExpireDays: 365,

  // ── Content ───────────────────────────────────────────────────────────────
  content: {
    title: "We use cookies",
    description:
      "We use cookies and similar technologies to improve your experience, analyse traffic, and personalise content. You can accept all cookies or decline non-essential ones.",
    acceptLabel: "Accept all",
    declineLabel: "Decline",
    privacyHref: "/privacy",
    termsHref: "/terms",
  },
};
