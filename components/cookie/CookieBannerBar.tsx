"use client";

import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props {
  config: CookiesConfig;
}

export default function CookieBannerBar({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();

  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } =
    config.content;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{
        backgroundColor: "var(--bg-base)",
        borderColor: "var(--border)",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold" style={{ color: "var(--text-heading)" }}>
              {title}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={decline}
              className="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
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
              className="rounded-md px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {acceptLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
