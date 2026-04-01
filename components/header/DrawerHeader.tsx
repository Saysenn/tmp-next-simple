"use client";

// ─────────────────────────────────────────────────────────────
// DrawerHeader — Slides in from the LEFT
//
// Style: Glassmorphism sidebar panel.
// - Uses CSS variables from globals.css for all colours
// - Left border active indicator
// - Blurred + dimmed backdrop on the right side
//
// IMPORTANT: Must be rendered OUTSIDE <header> to avoid the
// backdrop-filter stacking context trapping this fixed panel.
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import Logo from "@/components/header/Logo";
import { headerNav, siteConfig } from "@/configs/header";

type Props = { open: boolean; onClose: () => void; pathname: string; allSizes?: boolean };

export default function DrawerHeader({ open, onClose, pathname, allSizes = false }: Props) {
  const hide = allSizes ? "" : "md:hidden";
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-60 backdrop-blur-md transition-opacity duration-300 ${hide} ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.35)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 z-70 h-full w-[280px] flex flex-col backdrop-blur-2xl shadow-[4px_0_32px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out border-r ${hide} ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "var(--bg-header)", borderColor: "var(--border)" }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <Logo
            type={siteConfig.logoType}
            imageSrc={siteConfig.logoImageSrc}
            name={siteConfig.name}
          />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "var(--nav-color-solid)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1.5 1.5l13 13M14.5 1.5l-13 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {headerNav.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border-l-2"
                style={
                  isActive
                    ? { borderLeftColor: "var(--accent)", background: "var(--accent-light)", color: "var(--accent)" }
                    : { borderLeftColor: "transparent", color: "var(--nav-color-solid)" }
                }
              >
                {link.label}
              </Link>
            );
          })}

          {siteConfig.cta.enabled && (
            <div className="pt-3">
              <Link
                href={siteConfig.cta.href}
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ background: "var(--accent)", color: "var(--bg-pure)" }}
              >
                {siteConfig.cta.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          )}
        </nav>

        {/* Footer strip */}
        <div className="px-5 py-4 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--nav-color-solid)", opacity: 0.5 }}>{siteConfig.name}</p>
        </div>
      </div>
    </>
  );
}
