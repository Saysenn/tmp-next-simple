"use client";

// ─────────────────────────────────────────────────────────────
// DropdownHeader — Expands BELOW the header bar
//
// Style: Compact panel anchored to the bottom edge of the header.
// - Smooth max-height + opacity animation
// - Uses CSS variables from globals.css for all colours
// - No overlay backdrop
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import { headerNav } from "@/configs/header";

type Props = { open: boolean; onClose: () => void; pathname: string; allSizes?: boolean };

export default function DropdownHeader({ open, onClose, pathname, allSizes = false }: Props) {
  const hide = allSizes ? "" : "md:hidden";
  return (
    <div
      className={`absolute top-full left-0 right-0 z-40 backdrop-blur-md border-t overflow-hidden transition-all duration-200 ease-out shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${hide} ${
        open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"
      }`}
      style={{ background: "var(--bg-header)", borderColor: "var(--border)" }}
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
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={
                isActive
                  ? { background: "var(--accent-light)", color: "var(--accent)" }
                  : { color: "var(--nav-color-solid)" }
              }
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
