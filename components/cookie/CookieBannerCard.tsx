"use client";

import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props {
  config: CookiesConfig;
}

export default function CookieBannerCard({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();

  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } =
    config.content;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 right-4 z-50 w-80 rounded-xl p-5"
      style={{
        backgroundColor: "var(--bg-base)",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      {/* Cookie icon + title */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg select-none" aria-hidden>
          🍪
        </span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-heading)" }}>
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
        {description}{" "}
        <a
          href={privacyHref}
          className="underline hover:opacity-80 transition-opacity"
          style={{ color: "var(--accent)" }}
        >
          Privacy Policy
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

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={decline}
          className="flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
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
          className="flex-1 rounded-lg px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {acceptLabel}
        </button>
      </div>
    </div>
  );
}
