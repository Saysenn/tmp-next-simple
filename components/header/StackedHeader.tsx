"use client";

/**
 * StackedHeader — centred logo on top row, nav links centred below.
 * Matches the Social Work First reference design.
 */

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerNav, siteConfig } from "@/configs/header";
import DrawerHeader from "@/components/header/DrawerHeader";
import DropdownHeader from "@/components/header/DropdownHeader";
import FullscreenHeader from "@/components/header/FullscreenHeader";

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md transition-colors"
      style={{ color: "var(--text-heading)" }}
    >
      <span className={`block w-5 h-0.5 transition-all duration-300 ${open ? "rotate-45 translate-y-1" : ""}`} style={{ backgroundColor: "var(--text-heading)" }} />
      <span className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${open ? "opacity-0" : ""}`} style={{ backgroundColor: "var(--text-heading)" }} />
      <span className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} style={{ backgroundColor: "var(--text-heading)" }} />
    </button>
  );
}

export default function StackedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const type = siteConfig.mobileMenuType;
  const isDropdown = type === "dropdown";

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen && !isDropdown ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isDropdown]);

  const menuProps = { open: menuOpen, onClose: () => setMenuOpen(false), pathname };

  return (
    <>
      <header
        className={siteConfig.headerSticky ? "sticky top-0 z-50" : "relative"}
        style={{ background: "#ffffff", borderBottom: "1px solid var(--border)" }}
      >
        {/* Top row — centred logo */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 flex items-center justify-between md:justify-center">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center focus:outline-none">
            {siteConfig.logoImageSrc ? (
              <Image
                src={siteConfig.logoImageSrc}
                alt={siteConfig.name}
                width={280}
                height={80}
                className="h-20 w-auto object-contain"
                priority
              />
            ) : (
              <span
                className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase"
                style={{ color: "var(--text-heading)", letterSpacing: "0.18em" }}
              >
                {siteConfig.name}
              </span>
            )}
          </Link>

          {/* Hamburger — mobile only */}
          <HamburgerButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
        </div>

        {/* Bottom row — centred nav (desktop only) */}
        <div
          className="hidden md:block border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-8 h-11">
            {headerNav.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`nav-underline-left pb-0.5 text-sm font-medium transition-colors ${isActive ? "is-active" : ""}`}
                  style={{
                    color: isActive ? "var(--primary)" : "var(--text-heading)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {isDropdown && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <DropdownHeader {...menuProps} />
          </div>
        )}
      </header>

      {type === "drawer" && <DrawerHeader {...menuProps} />}
      {type === "fullscreen" && <FullscreenHeader {...menuProps} />}
    </>
  );
}
