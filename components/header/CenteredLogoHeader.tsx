"use client";

import { siteConfig } from "@/configs/header";
import Logo from "@/components/header/Logo";

export default function CenteredLogoHeader() {
  return (
    <header
      className={`${
        siteConfig.headerSticky ? "sticky top-0 z-50" : "relative"
      } bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
        <Logo
          type={siteConfig.logoType}
          imageSrc={siteConfig.logoImageSrc}
          name={siteConfig.name}
        />
      </div>
    </header>
  );
}
