"use client";

import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props { config: CookiesConfig; }

// CARD — 32px radius, very pill-like, centred, serif heading
export default function CookieBannerCard({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();
  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } = config.content;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-6 right-6 z-50 w-[310px]"
      style={{
        backgroundColor: "var(--bg-base)",
        border: "1px solid var(--border)",
        borderRadius: 32,
        boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div className="p-7 flex flex-col gap-4">
        <div className="text-center">
          <div className="text-4xl mb-3 select-none" aria-hidden>🍪</div>
          <h3 style={{ color: "var(--text-heading)", fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>
            {title}
          </h3>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.65, textAlign: "center" }}>
          {description}{" "}
          <a href={privacyHref} className="underline" style={{ color: "var(--accent)" }}>Privacy</a>
          {" & "}
          <a href={termsHref} className="underline" style={{ color: "var(--accent)" }}>Terms</a>.
        </p>

        <button
          onClick={accept}
          className="w-full text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--accent)", borderRadius: 999, padding: "12px 0", fontSize: 16, fontWeight: 700, cursor: "pointer" }}
        >
          {acceptLabel}
        </button>

        <button
          onClick={decline}
          className="w-full text-center transition-opacity hover:opacity-60"
          style={{ color: "var(--text-muted)", background: "none", border: "none", fontSize: 13, cursor: "pointer" }}
        >
          {declineLabel}
        </button>
      </div>
    </div>
  );
}
