"use client";

import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props { config: CookiesConfig; }

// BAR — 0px radius, dark, ultra-flat
export default function CookieBannerBar({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();
  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } = config.content;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ backgroundColor: "var(--text-heading)" }}
    >
      <div className="px-6 py-3 flex items-center gap-4 flex-wrap sm:flex-nowrap">
        <span
          className="shrink-0 text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1"
          style={{ backgroundColor: "var(--accent)", color: "#fff", borderRadius: 0 }}
        >
          Cookies
        </span>

        <p className="flex-1 min-w-0" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
          {description}{" "}
          <a href={privacyHref} style={{ color: "var(--accent)", textDecoration: "underline" }}>Privacy</a>
          {" & "}
          <a href={termsHref} style={{ color: "var(--accent)", textDecoration: "underline" }}>Terms</a>
        </p>

        <div className="flex shrink-0 items-center">
          <button
            onClick={decline}
            className="transition-opacity hover:opacity-60"
            style={{ color: "rgba(255,255,255,0.4)", background: "transparent", border: "none", padding: "10px 18px", fontSize: 13, cursor: "pointer" }}
          >
            {declineLabel}
          </button>
          <button
            onClick={accept}
            className="text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--accent)", borderRadius: 0, padding: "10px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            {acceptLabel} →
          </button>
        </div>
      </div>
    </div>
  );
}
