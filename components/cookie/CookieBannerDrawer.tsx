"use client";

import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props {
  config: CookiesConfig;
}

export default function CookieBannerDrawer({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();

  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } =
    config.content;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl px-6 pt-6 pb-8"
      style={{
        backgroundColor: "var(--bg-base)",
        borderTop: "1px solid var(--border)",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
      }}
    >
      {/* Drag handle */}
      <div
        className="mx-auto mb-5 h-1 w-10 rounded-full"
        style={{ backgroundColor: "var(--border-strong)" }}
      />

      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl select-none" aria-hidden>
            🍪
          </span>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-heading)" }}>
            {title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-body)" }}>
          {description}
        </p>

        {/* Links */}
        <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
          Learn more in our{" "}
          <a
            href={privacyHref}
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href={termsHref}
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            Terms of Service
          </a>
          .
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {acceptLabel}
          </button>
          <button
            onClick={decline}
            className="flex-1 rounded-xl px-6 py-3 text-sm font-medium transition-colors"
            style={{
              color: "var(--text-muted)",
              backgroundColor: "var(--bg-subtle)",
              border: "1px solid var(--border)",
            }}
          >
            {declineLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
