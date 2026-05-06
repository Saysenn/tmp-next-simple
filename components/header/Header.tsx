"use client";

// Header switcher — change headerType in configs/header.ts to switch layouts.
// "nav"           → logo + desktop nav + mobile hamburger (default)
// "floating-nav"  → 3-col: logo | glass pill nav (centered) | cta
// "split-nav"     → 3-col: nav links | logo (centered) | cta
// "stacked"       → 2-row: centred logo on top, centred nav below
// "cta"           → logo + single CTA button, no nav
// "menu-only"     → logo + Menu button on all sizes
// "centered-logo" → centred logo only, no nav
//
// Scroll effect — set headerScrollEffect: true in siteConfig to enable:
// Header starts transparent over the hero, transitions to solid on scroll.
// Set logoInvertImageSrc for an alternate logo used in the transparent state.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerNav, siteConfig } from "@/configs/header";
import Logo from "@/components/header/Logo";
import TopBar from "@/components/header/TopBar";
import CTAHeader from "@/components/header/CTAHeader";
import MenuOnlyHeader from "@/components/header/MenuOnlyHeader";
import CenteredLogoHeader from "@/components/header/CenteredLogoHeader";
import FloatingNavHeader from "@/components/header/FloatingNavHeader";
import SplitNavHeader from "@/components/header/SplitNavHeader";
import StackedHeader from "@/components/header/StackedHeader";
import DrawerHeader from "@/components/header/DrawerHeader";
import DropdownHeader from "@/components/header/DropdownHeader";
import FullscreenHeader from "@/components/header/FullscreenHeader";

// ─── Nav link styles ──────────────────────────────────────────
import { getNavClass, getNavStyle } from "@/components/header/navLinkStyles";

// ─── DesktopNav ───────────────────────────────────────────────

function DesktopNav({ pathname, transparent = false }: { pathname: string; transparent?: boolean }) {
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
            className={getNavClass(isActive)}
            style={getNavStyle(isActive, transparent)}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

// ─── NavHeader (default) ──────────────────────────────────────

function NavHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const type = siteConfig.mobileMenuType;
  const isDropdown = type === "dropdown";
  const scrollEffect = siteConfig.headerScrollEffect;

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen && !isDropdown ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isDropdown]);

  useEffect(() => {
    if (!scrollEffect) return;
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollEffect]);

  const menuProps = { open: menuOpen, onClose: () => setMenuOpen(false), pathname };

  // header-solid class is defined in globals.css and uses CSS variables — no inline style needed
  const headerClass = `${
    siteConfig.headerSticky ? "fixed top-0 z-50" : "relative"
  } w-full transition-[background-color,border-color,backdrop-filter] duration-300 ease-in-out ${
    !scrollEffect || scrolled ? "header-solid" : ""
  }`;

  // Logo: swap to invert src when scroll effect is active and not yet scrolled
  const logoSrc =
    scrollEffect && !scrolled && siteConfig.logoInvertImageSrc
      ? siteConfig.logoInvertImageSrc
      : siteConfig.logoImageSrc;

  const transparent = scrollEffect && !scrolled;

  return (
    <>
      <header className={headerClass}>
        <TopBar />
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <Logo
              type={siteConfig.logoType}
              imageSrc={logoSrc}
              name={siteConfig.name}
              size={siteConfig.logoSize}
            />
            <div className="ml-auto flex items-center gap-1">
              <DesktopNav pathname={pathname} transparent={scrollEffect && !scrolled} />

              {siteConfig.cta.enabled && (
                <Link
                  href={siteConfig.cta.href}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-2"
                  style={
                    transparent
                      ? { background: "var(--accent-light)", color: "var(--accent)" }
                      : { background: "var(--accent)", color: "var(--bg-pure)" }
                  }
                >
                  {siteConfig.cta.label}
                </Link>
              )}

              {/* Hamburger */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md transition-colors ml-1"
                style={{ color: transparent ? "var(--nav-color-transparent)" : "var(--nav-color-solid)" }}
              >
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1" : ""}`} />
                <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
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

// ─── Switcher ─────────────────────────────────────────────────

export default function Header() {
  if (siteConfig.headerType === "cta")           return <CTAHeader />;
  if (siteConfig.headerType === "menu-only")     return <MenuOnlyHeader />;
  if (siteConfig.headerType === "centered-logo") return <CenteredLogoHeader />;
  if (siteConfig.headerType === "floating-nav")  return <FloatingNavHeader />;
  if (siteConfig.headerType === "split-nav")     return <SplitNavHeader />;
  if (siteConfig.headerType === "stacked")       return <StackedHeader />;
  return <NavHeader />;
}
