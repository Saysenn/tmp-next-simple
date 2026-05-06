"use client";

// TopBar — thin utility bar rendered above every header type.
// Left: short SEO description. Right: legal/utility links.
// Toggle via siteConfig.topbar.enabled in configs/header.ts.

import Link from "next/link";
import { siteConfig } from "@/configs/header";

export default function TopBar() {
  const { topbar } = siteConfig;
  if (!topbar.enabled) return null;

  return (
    <div
      className="w-full border-b"
      style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">

        {/* Left — SEO description, desktop only */}
        <p
          className="hidden sm:block truncate shrink lg:flex items-center justify-center"
          style={{ color: "var(--text-muted)", fontSize: 13,margin:0 }}
        >
          {topbar.description}
        </p>

        {/* Right — legal/utility links, always right-aligned */}
        <nav className="flex items-center shrink-0 ml-auto sm:ml-0">
          {topbar.links.map((link, i) => (
            <span key={link.href} className="flex items-center leading-none">
              {i > 0 && (
                <span
                  className="mx-2 select-none"
                  style={{ color: "var(--text-faint)", fontSize: 12 }}
                >
                  ·
                </span>
              )}
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="whitespace-nowrap transition-colors hover:underline leading-none"
                style={{ color: "var(--text-muted)", fontSize: 13 }}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

      </div>
    </div>
  );
}
