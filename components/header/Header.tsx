"use client";

// ─────────────────────────────────────────────────────────────
// Header — entry point, switches on siteConfig.headerType
//
// "nav"       → NavHeader  (logo + desktop nav + mobile hamburger)
// "cta"       → CTAHeader  (logo + single CTA button)
// "menu-only" → MenuOnlyHeader (logo + Menu button on all sizes)
//
// Change headerType in configs/navigation.ts to switch layouts.
// ─────────────────────────────────────────────────────────────

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerNav, siteConfig } from "@/configs/header";
import Logo from "@/components/header/Logo";
import CTAHeader from "@/components/header/CTAHeader";
import MenuOnlyHeader from "@/components/header/MenuOnlyHeader";
import DrawerHeader from "@/components/header/DrawerHeader";
import DropdownHeader from "@/components/header/DropdownHeader";
import FullscreenHeader from "@/components/header/FullscreenHeader";

// ─── NavHeader (default) ──────────────────────────────────────

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

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {headerNav.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function NavHeader() {
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
        } bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo
              type={siteConfig.logoType}
              imageSrc={siteConfig.logoImageSrc}
              name={siteConfig.name}
            />
            <DesktopNav pathname={pathname} />
            <HamburgerButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
          </div>
          {isDropdown && <DropdownHeader {...menuProps} />}
        </div>
      </header>
      {type === "drawer" && <DrawerHeader {...menuProps} />}
      {type === "fullscreen" && <FullscreenHeader {...menuProps} />}
    </>
  );
}

// ─── Switcher ─────────────────────────────────────────────────

export default function Header() {
  if (siteConfig.headerType === "cta") return <CTAHeader />;
  if (siteConfig.headerType === "menu-only") return <MenuOnlyHeader />;
  return <NavHeader />;
}
