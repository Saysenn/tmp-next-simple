"use client";

import { cookiesConfig } from "@/configs/cookies";
import CookieBannerBar from "./CookieBannerBar";
import CookieBannerCard from "./CookieBannerCard";
import CookieBannerModal from "./CookieBannerModal";
import CookieBannerDrawer from "./CookieBannerDrawer";
import CookieBannerFloat from "./CookieBannerFloat";

/**
 * Cookie consent banner entry point.
 * Controlled entirely by `configs/cookies.ts`:
 *   - cookieBannerEnabled  → toggle on/off
 *   - cookieBannerVariant  → "bar" | "card" | "modal" | "drawer" | "float"
 */
export default function CookieBanner() {
  if (!cookiesConfig.cookieBannerEnabled) return null;

  switch (cookiesConfig.cookieBannerVariant) {
    case "bar":
      return <CookieBannerBar config={cookiesConfig} />;
    case "card":
      return <CookieBannerCard config={cookiesConfig} />;
    case "modal":
      return <CookieBannerModal config={cookiesConfig} />;
    case "drawer":
      return <CookieBannerDrawer config={cookiesConfig} />;
    case "float":
      return <CookieBannerFloat config={cookiesConfig} />;
    default:
      return <CookieBannerBar config={cookiesConfig} />;
  }
}
