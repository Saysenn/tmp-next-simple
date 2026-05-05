"use client";

import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props { config: CookiesConfig; }

export default function CookieBannerDrawer({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();
  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } = config.content;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "var(--bg-base)",
        borderTop: "1px solid var(--border)",
        boxShadow: "0 -16px 60px rgba(0,0,0,0.1)",
        borderRadius: "20px 20px 0 0",
      }}
    >
      {/* Drag handle */}
      <div className="pt-3 pb-0 flex justify-center">
        <div className="h-1 w-8 rounded-full" style={{ backgroundColor: "var(--border-strong)" }} />
      </div>

      <div className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1 flex items-start gap-4">
          <div
            className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg text-base"
            style={{ backgroundColor: "var(--bg-soft)", border: "1px solid var(--border)" }}
          >
            🍪
          </div>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-heading)", marginBottom: 4 }}>
              {title}
            </h2>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--text-muted)" }}>
              {description}{" "}
              <a href={privacyHref} className="underline" style={{ color: "var(--accent)" }}>Privacy Policy</a>
              {" · "}
              <a href={termsHref} className="underline" style={{ color: "var(--accent)" }}>Terms</a>
            </p>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col gap-2 shrink-0">
          <button
            onClick={accept}
            className="flex-1 sm:flex-none sm:w-36 text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)", borderRadius: 999, padding: "11px 20px", fontSize: 14, fontWeight: 600 }}
          >
            {acceptLabel}
          </button>
          <button
            onClick={decline}
            className="flex-1 sm:flex-none sm:w-36 transition-opacity hover:opacity-70"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: 999, padding: "11px 20px", fontSize: 14, background: "transparent" }}
          >
            {declineLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
