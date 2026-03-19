"use client";

/**
 * FooterRecruit — Dark gradient footer with offices, contact, and subscribe form.
 * Matches the Social Work Partners reference footer layout.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "./_social-icons";
import type { FooterConfig, HeaderConfig } from "@/lib/config";
import { socialLinks } from "@/configs/footer";

interface Props {
  brand: Pick<HeaderConfig, "logo" | "logoType" | "logoImageSrc">;
  config: FooterConfig;
}

export default function FooterRecruit({ brand, config }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/v1/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer style={{ background: "var(--gradient-footer)" }}>
      {/* Top row — logo + socials */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex items-center justify-between gap-4 flex-wrap border-b border-white/10">
        <div className="flex-shrink-0">
          {brand.logoImageSrc ? (
            <Image
              src={brand.logoImageSrc}
              alt={brand.logo}
              width={120}
              height={48}
              className="h-12 w-auto object-contain"
            />
          ) : (
            <span className="text-xl font-bold text-white">{brand.logo}</span>
          )}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.12)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--secondary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
            >
              <span className="text-white">
                <SocialIcon label={s.label} />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Main grid — offices | contact | subscribe */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Col 1 — Offices */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--secondary)" }}>
              Offices
            </h3>
            <address className="not-italic space-y-2">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-light-muted)" }}>
                <strong className="text-white font-medium">London Office</strong><br />
                {config.companyInfo.address}
              </p>
            </address>
            {config.companyInfo.companyNumber && (
              <p className="mt-4 text-xs" style={{ color: "var(--text-light-muted)" }}>
                {config.companyInfo.companyNumber}
              </p>
            )}
          </div>

          {/* Col 2 — Contact Us */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--secondary)" }}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              {config.companyInfo.email && (
                <li>
                  <a
                    href={`mailto:${config.companyInfo.email}`}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-light-muted)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--secondary)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-light-muted)"; }}
                  >
                    {config.companyInfo.email}
                  </a>
                </li>
              )}
              {config.companyInfo.phone && (
                <li>
                  <a
                    href={`tel:${config.companyInfo.phone}`}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-light-muted)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--secondary)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-light-muted)"; }}
                  >
                    {config.companyInfo.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3 — Subscribe */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--secondary)" }}>
              Subscribe for Updates &amp; Free Resources
            </h3>
            {status === "success" ? (
              <p className="text-sm" style={{ color: "var(--secondary)" }}>
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  required
                  className="w-full px-4 py-2.5 rounded text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-2.5 rounded text-sm font-semibold tracking-wide text-white transition-colors disabled:opacity-60"
                  style={{ background: "var(--secondary)", color: "#0d2e2a" }}
                  onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.background = "var(--secondary-hover)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--secondary)"; }}
                >
                  {status === "loading" ? "Submitting…" : "SUBMIT"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--text-light-muted)" }}>
            {config.copyright}
          </p>
          <div className="flex items-center gap-4">
            {config.legalLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                {i > 0 && <span className="text-white/20">|</span>}
                <Link
                  href={link.href}
                  className="text-xs transition-colors"
                  style={{ color: "var(--text-light-muted)" }}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
