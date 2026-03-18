"use client";

// FloatingNavHeader — 3-column layout: Logo | Glass pill nav | CTA
// Mobile collapses to Logo + hamburger (uses mobileMenuType from config)

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerNav, siteConfig } from "@/configs/header";
import Logo from "@/components/header/Logo";
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
      className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-1" : ""}`} />
      <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
      <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
    </button>
  );
}

function GlassNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden md:flex items-center gap-0.5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/40 rounded-full px-2 py-1 shadow-sm">
      {headerNav.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-700/60"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function FloatingNavHeader() {
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
        className={`${
          siteConfig.headerSticky ? "sticky top-0 z-50" : "relative"
        }`}
      >
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 grid-cols-2 items-center h-16 py-3">

            {/* Col 1: Logo */}
            <div className="flex items-center">
              <Logo
                type={siteConfig.logoType}
                imageSrc={siteConfig.logoImageSrc}
                name={siteConfig.name}
              />
            </div>

            {/* Col 2: Glass pill nav — desktop only */}
            <div className="hidden md:flex justify-center">
              <GlassNav pathname={pathname} />
            </div>

            {/* Col 3: CTA + hamburger */}
            <div className="flex items-center justify-end gap-2">
              {siteConfig.cta.enabled && (
                <Link
                  href={siteConfig.cta.href}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
                >
                  {siteConfig.cta.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
              <HamburgerButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
            </div>

          </div>
          {isDropdown && <DropdownHeader {...menuProps} />}
        </div>
      </header>
      {type === "drawer" && <DrawerHeader {...menuProps} />}
      {type === "fullscreen" && <FullscreenHeader {...menuProps} />}
    </>
  );
}
