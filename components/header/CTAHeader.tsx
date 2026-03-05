"use client";

// ─────────────────────────────────────────────────────────────
// CTAHeader — Logo + single Call-To-Action button
//
// Style: Minimal, focused header for landing pages.
// - No nav links, no hamburger
// - Logo on the left, CTA button on the right (always visible)
// - CTA label/href configured in siteConfig.ctaLabel / ctaHref
//
// To use: set headerType: "cta" in configs/navigation.ts
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import Logo from "@/components/header/Logo";
import { siteConfig } from "@/configs/header";

export default function CTAHeader() {
  return (
    <header
      className={`${
        siteConfig.headerSticky ? "sticky top-0 z-50" : "relative"
      } bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo
            type={siteConfig.logoType}
            imageSrc={siteConfig.logoImageSrc}
            name={siteConfig.name}
          />

          <Link
            href={siteConfig.ctaHref ?? "/"}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
          >
            {siteConfig.ctaLabel ?? "Get Started"}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
