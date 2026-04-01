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

const navLinkClass: Record<string, (active: boolean) => string> = {
  "bg-fill": (a) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      a ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`,
  "underline-center": (a) =>
    `px-3 py-1.5 text-sm font-medium relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-current after:transition-all after:duration-200 ${
      a ? "after:w-full text-gray-900" : "after:w-0 text-gray-600 hover:after:w-full hover:text-gray-900"
    }`,
  "underline-left": (a) =>
    `px-3 py-1.5 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-current after:transition-all after:duration-200 ${
      a ? "after:w-full text-gray-900" : "after:w-0 text-gray-600 hover:after:w-full hover:text-gray-900"
    }`,
  "text-accent": (a) =>
    `px-3 py-1.5 text-sm font-medium transition-colors ${
      a ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"
    }`,
  "dot-below": (a) =>
    `px-3 py-1.5 text-sm font-medium relative ${
      a
        ? "text-gray-900 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-gray-900 after:rounded-full"
        : "text-gray-600 hover:text-gray-900"
    }`,
};

function getNavClass(active: boolean) {
  const style = siteConfig.navLinkStyle ?? "bg-fill";
  return (navLinkClass[style] ?? navLinkClass["bg-fill"])(active);
}

// ─── DesktopNav ───────────────────────────────────────────────

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {headerNav.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className={`whitespace-nowrap ${getNavClass(pathname === link.href)}`}
        >
          {link.label}
        </Link>
      ))}
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

  // Scroll effect: transparent → solid. Static: always solid.
  const headerStyle = scrollEffect
    ? scrolled
      ? { backgroundColor: "#ffffff", borderBottom: "1px solid rgba(0,0,0,0.08)" }
      : { backgroundColor: "transparent" }
    : undefined;

  const headerClass = `${
    siteConfig.headerSticky ? "fixed top-0 z-50" : "relative"
  } w-full transition-all duration-300 ${
    !scrollEffect ? "bg-white/90 backdrop-blur-sm border-b border-gray-200" : ""
  }`;

  // Logo: swap to invert src when scroll effect is active and not yet scrolled
  const logoSrc =
    scrollEffect && !scrolled && siteConfig.logoInvertImageSrc
      ? siteConfig.logoInvertImageSrc
      : siteConfig.logoImageSrc;

  // Nav link colour override for transparent state
  const scrollNavStyle = scrollEffect && !scrolled
    ? { color: "rgba(255,255,255,0.85)" }
    : undefined;

  return (
    <>
      <header className={headerClass} style={headerStyle}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <Logo
              type={siteConfig.logoType}
              imageSrc={logoSrc}
              name={siteConfig.name}
              size={siteConfig.logoSize}
            />
            <div className="ml-auto flex items-center gap-1">
              {/* Desktop nav — colour overridden in scroll-effect transparent state */}
              {scrollEffect && !scrolled ? (
                <nav className="hidden md:flex items-center gap-1">
                  {headerNav.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="whitespace-nowrap px-4 py-1.5 text-sm font-medium transition-all duration-200"
                        style={{
                          color: isActive ? "var(--accent)" : "rgba(255,255,255,0.85)",
                          fontWeight: isActive ? 600 : 500,
                        }}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              ) : (
                <DesktopNav pathname={pathname} />
              )}

              {siteConfig.cta.enabled && (
                <Link
                  href={siteConfig.cta.href}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-2"
                  style={
                    scrollEffect && !scrolled
                      ? { background: "rgba(255,255,255,0.15)", color: "#ffffff", backdropFilter: "blur(8px)" }
                      : { background: "var(--accent)", color: "var(--text-invert, #ffffff)" }
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
                style={scrollNavStyle ?? { color: "var(--text-heading)" }}
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
