"use client";

import { CookiesConfig } from "@/configs/cookies";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props {
  config: CookiesConfig;
}

export default function CookieBannerModal({ config }: Props) {
  const { consent, accept, decline, mounted } = useCookieConsent();

  if (!mounted || consent !== null) return null;

  const { title, description, acceptLabel, declineLabel, privacyHref, termsHref } =
    config.content;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="w-full max-w-md rounded-2xl p-8"
          style={{
            backgroundColor: "var(--bg-base)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          }}
        >
          {/* Icon */}
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl"
            style={{ backgroundColor: "var(--accent-light)" }}
          >
            🍪
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-heading)" }}>
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-body)" }}>
            {description}
          </p>

          {/* Links */}
          <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            Read our{" "}
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
            </a>{" "}
            to learn more.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={accept}
              className="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {acceptLabel}
            </button>
            <button
              onClick={decline}
              className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
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
    </>
  );
}
