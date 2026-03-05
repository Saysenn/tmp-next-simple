"use client";

// ─────────────────────────────────────────────────────────────
// MenuOnlyHeader — Logo + single "Menu" button (all screen sizes)
//
// Style: Ultra-minimal header. The hamburger/menu button is visible
// on ALL screen sizes (not just mobile). Opens the menu type
// configured in siteConfig.mobileMenuType.
//
// To use: set headerType: "menu-only" in configs/navigation.ts
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/header/Logo";
import DrawerHeader from "@/components/header/DrawerHeader";
import DropdownHeader from "@/components/header/DropdownHeader";
import FullscreenHeader from "@/components/header/FullscreenHeader";
import { siteConfig } from "@/configs/header";

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
    >
      {/* Animated bars */}
      <span className="flex flex-col justify-center items-center w-4 h-4 gap-[3px]">
        <span className={`block w-4 h-0.5 bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
        <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block w-4 h-0.5 bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
      </span>
      <span>{open ? "Close" : "Menu"}</span>
    </button>
  );
}

export default function MenuOnlyHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const type = siteConfig.mobileMenuType;
  const isDropdown = type === "dropdown";

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen && !isDropdown ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isDropdown]);

  const menuProps = { open: menuOpen, onClose: () => setMenuOpen(false), pathname, allSizes: true };

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
            <MenuButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
          </div>

          {/* Dropdown attaches inside — needs relative parent */}
          {isDropdown && <DropdownHeader {...menuProps} />}
        </div>
      </header>

      {/* Drawer and Fullscreen as siblings — avoids backdrop-filter stacking context */}
      {type === "drawer" && <DrawerHeader {...menuProps} />}
      {type === "fullscreen" && <FullscreenHeader {...menuProps} />}
    </>
  );
}
