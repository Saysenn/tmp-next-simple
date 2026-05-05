"use client";

import { useState } from "react";
import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props { config: CookiesConfig; }

// FLOAT — 20px radius panel, pill trigger
export default function CookieBannerFloat({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();
  const [expanded, setExpanded] = useState(false);

  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } = config.content;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2.5">
      {expanded && (
        <div
          className="w-[280px]"
          style={{
            backgroundColor: "var(--bg-base)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            boxShadow: "0 16px 48px rgba(0,0,0,0.16)",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-3.5 flex items-center justify-between"
            style={{
              backgroundColor: "var(--bg-soft)",
              borderBottom: "1px solid var(--border)",
              borderRadius: "20px 20px 0 0",
            }}
          >
            <div className="flex items-center gap-2">
              <span aria-hidden>🍪</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-heading)" }}>{title}</span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              style={{ fontSize: 12, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="p-5">
            <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-muted)", marginBottom: 16 }}>
              {description}{" "}
              <a href={privacyHref} className="underline" style={{ color: "var(--accent)" }}>Privacy</a>
              {" & "}
              <a href={termsHref} className="underline" style={{ color: "var(--accent)" }}>Terms</a>.
            </p>

            <div className="flex gap-2">
              <button
                onClick={decline}
                className="flex-1 transition-opacity hover:opacity-70"
                style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 10, padding: "9px 0", fontSize: 13, cursor: "pointer" }}
              >
                {declineLabel}
              </button>
              <button
                onClick={accept}
                className="flex-1 text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent)", borderRadius: 10, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                {acceptLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? "Close cookie settings" : "Cookie settings"}
        aria-expanded={expanded}
        className="flex items-center gap-2 text-white transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "var(--accent)",
          borderRadius: 999,
          padding: "10px 18px",
          fontSize: 13,
          fontWeight: 600,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
      >
        🍪 Cookies
      </button>
    </div>
  );
}
