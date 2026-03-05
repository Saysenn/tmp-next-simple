"use client";

// ─────────────────────────────────────────────────────────────
// FullscreenHeader — Slides DOWN from the top, covers full screen
//
// Style: Clean full-page takeover with large, left-aligned nav items.
// - Slides in from top with translateY animation
// - Nav links start at the top (below header bar), not centered
// - Logo + close button in top bar
// - Copyright in footer strip
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
      className={`fixed inset-0 z-70
        bg-white dark:bg-gray-950
        flex flex-col
        transition-transform duration-300 ease-out
        ${hide}
        ${open ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <Logo
          type={siteConfig.logoType}
          imageSrc={siteConfig.logoImageSrc}
          name={siteConfig.name}
        />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Nav — starts at top, not centered */}
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
                className={`flex items-center px-4 py-3 rounded-xl text-lg font-normal transition-colors ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300"
                    : "text-gray-800 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-indigo-300 dark:hover:bg-gray-800/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom strip */}
      <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800 shrink-0">
        <p className="text-xs text-gray-400 dark:text-gray-600">{siteConfig.copyright}</p>
      </div>
    </div>
  );
}
