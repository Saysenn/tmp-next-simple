"use client";

// ─────────────────────────────────────────────────────────────
// DrawerHeader — Slides in from the LEFT
//
// Style: Glassmorphism sidebar panel.
// - bg-white/90 + backdrop-blur-2xl for frosted glass
// - Left border active indicator (PerformAI-style)
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
      {/* Backdrop — blurs and dims page content to the right */}
      <div
        className={`fixed inset-0 z-60 backdrop-blur-md bg-black/25 transition-opacity duration-300 ${hide} ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Glassmorphism drawer panel */}
      <div
        className={`fixed top-0 left-0 z-70 h-full w-[280px] flex flex-col
          bg-white/90 dark:bg-gray-950/90
          backdrop-blur-2xl
          border-r border-white/40 dark:border-white/10
          shadow-[4px_0_32px_rgba(0,0,0,0.12)]
          transition-transform duration-300 ease-out
          ${hide}
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/60 dark:border-gray-700/40">
          <Logo
            type={siteConfig.logoType}
            imageSrc={siteConfig.logoImageSrc}
            name={siteConfig.name}
          />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 dark:hover:bg-gray-800/60 dark:hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1.5 1.5l13 13M14.5 1.5l-13 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links — PerformAI left border active indicator */}
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
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border-l-2 ${
                  isActive
                    ? "border-l-indigo-500 bg-indigo-50/80 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    : "border-l-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 hover:border-l-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer strip */}
        <div className="px-5 py-4 border-t border-gray-200/60 dark:border-gray-700/40">
          <p className="text-xs text-gray-400 dark:text-gray-600">{siteConfig.name}</p>
        </div>
      </div>
    </>
  );
}
