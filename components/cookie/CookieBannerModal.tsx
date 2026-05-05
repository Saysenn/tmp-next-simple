"use client";

import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props { config: CookiesConfig; }

// MODAL — 4px radius (near-square), split dark/light, sharp contrast
export default function CookieBannerModal({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();
  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } = config.content;

  return (
    <>
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="w-full max-w-lg overflow-hidden flex flex-col sm:flex-row"
          style={{ borderRadius: 4, boxShadow: "0 40px 100px rgba(0,0,0,0.3)" }}
        >
          {/* Left — dark panel */}
          <div
            className="sm:w-[160px] shrink-0 flex flex-col items-start justify-between p-7"
            style={{ backgroundColor: "var(--text-heading)" }}
          >
            <span className="text-3xl select-none" aria-hidden>🍪</span>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
                Notice
              </p>
              <h2 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>
                {title}
              </h2>
            </div>
          </div>

          {/* Right — light panel */}
          <div
            className="flex-1 flex flex-col justify-between p-7"
            style={{ backgroundColor: "var(--bg-base)" }}
          >
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-body)", marginBottom: 12 }}>
                {description}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 24 }}>
                Read our{" "}
                <a href={privacyHref} className="underline" style={{ color: "var(--accent)" }}>Privacy Policy</a>
                {" and "}
                <a href={termsHref} className="underline" style={{ color: "var(--accent)" }}>Terms</a>.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={accept}
                className="w-full text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent)", borderRadius: 4, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                {acceptLabel}
              </button>
              <button
                onClick={decline}
                className="w-full transition-opacity hover:opacity-70"
                style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 4, padding: "11px 0", fontSize: 14, cursor: "pointer" }}
              >
                {declineLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
