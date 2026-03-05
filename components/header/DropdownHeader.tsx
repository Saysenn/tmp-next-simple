"use client";

// ─────────────────────────────────────────────────────────────
// DropdownHeader — Expands BELOW the header bar
//
// Style: Compact panel anchored to the bottom edge of the header.
// - Smooth max-height + opacity animation
// - Pill-style active state
// - Subtle shadow, no overlay backdrop
//
// NOTE: Renders inside the header container with absolute positioning.
// The header container must have `position: relative` set.
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import { headerNav } from "@/configs/header";

type Props = { open: boolean; onClose: () => void; pathname: string; allSizes?: boolean };

export default function DropdownHeader({ open, onClose, pathname, allSizes = false }: Props) {
  const hide = allSizes ? "" : "md:hidden";
  return (
    <div
      className={`absolute top-full left-0 right-0 z-40
        bg-white/95 dark:bg-gray-900/95
        backdrop-blur-md
        border-t border-gray-200/80 dark:border-gray-700/60
        shadow-[0_8px_24px_rgba(0,0,0,0.08)]
        overflow-hidden
        transition-all duration-200 ease-out
        ${hide}
        ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"}`}
    >
      <nav className="px-4 py-3 flex flex-col gap-0.5">
        {headerNav.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={onClose}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/60"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
