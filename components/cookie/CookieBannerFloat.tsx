"use client";

import { useState } from "react";
import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props {
  config: CookiesConfig;
}

export default function CookieBannerFloat({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();
  const [expanded, setExpanded] = useState(false);

  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } =
    config.content;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      {/* Expanded panel */}
      {expanded && (
        <div
          className="w-72 rounded-xl p-4"
          style={{
            backgroundColor: "var(--bg-base)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
          }}
        >
          <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-heading)" }}>
            {title}
          </h3>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
            {description}{" "}
            <a
              href={privacyHref}
              className="underline hover:opacity-80 transition-opacity"
              style={{ color: "var(--accent)" }}
            >
              Privacy
            </a>{" "}
            &amp;{" "}
            <a
              href={termsHref}
              className="underline hover:opacity-80 transition-opacity"
              style={{ color: "var(--accent)" }}
            >
              Terms
            </a>
            .
          </p>
          <div className="flex gap-2">
            <button
              onClick={decline}
              className="flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors"
              style={{
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border)",
              }}
            >
              {declineLabel}
            </button>
            <button
              onClick={accept}
              className="flex-1 rounded-lg px-2 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {acceptLabel}
            </button>
          </div>
        </div>
      )}

      {/* Floating bubble trigger */}
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? "Close cookie settings" : "Cookie settings"}
        aria-expanded={expanded}
        className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white shadow-lg transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--accent)" }}
      >
        <span className="text-sm" aria-hidden>
          🍪
        </span>
        {expanded ? "Close" : "Cookie settings"}
      </button>
    </div>
  );
}
