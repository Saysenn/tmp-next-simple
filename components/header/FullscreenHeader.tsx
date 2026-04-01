"use client";

// ─────────────────────────────────────────────────────────────
// FullscreenHeader — Slides DOWN from the top, covers full screen
//
// Style: Full-page takeover with large, left-aligned nav items.
// - Uses CSS variables from globals.css for all colours
// - Slides in from top with translateY animation
//
// IMPORTANT: Must be rendered OUTSIDE <header> to avoid the
// backdrop-filter stacking context trapping this fixed panel.
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import Logo from "@/components/header/Logo";
import { headerNav, siteConfig } from "@/configs/header";

type Props = { open: boolean; onClose: () => void; pathname: string; allSizes?: boolean };

export default function FullscreenHeader({ open, onClose, pathname, allSizes = false }: Props) {
  const hide = allSizes ? "" : "md:hidden";
  return (
    <div
      className={`fixed inset-0 z-70 flex flex-col transition-transform duration-300 ease-out ${hide} ${
        open ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
      }`}
      style={{ background: "var(--bg-base)" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 h-16 border-b shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        <Logo
          type={siteConfig.logoType}
          imageSrc={siteConfig.logoImageSrc}
          name={siteConfig.name}
        />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
          style={{ color: "var(--nav-color-solid)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-6 pt-4">
        <nav className="flex flex-col gap-1">
          {headerNav.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className="flex items-center px-4 py-3 rounded-xl text-lg font-normal transition-colors"
                style={
                  isActive
                    ? { color: "var(--accent)", background: "var(--accent-light)" }
                    : { color: "var(--nav-color-solid)" }
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom strip */}
      <div className="px-8 py-5 border-t shrink-0" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--nav-color-solid)", opacity: 0.5 }}>{siteConfig.copyright}</p>
      </div>
    </div>
  );
}
