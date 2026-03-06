// configs/header.ts — header layout and navigation config

export type LogoType =
  | "text"        // bold site name only
  | "image-text"  // image + site name
  | "icon-text";  // geometric icon + site name

export type MobileMenuType =
  | "drawer"      // slides in from the left
  | "dropdown"    // expands below the header bar
  | "fullscreen"; // slides down from the top, full screen

export type HeaderType =
  | "nav"            // logo + desktop nav + mobile hamburger (default)
  | "cta"            // logo + single CTA button, no nav
  | "menu-only"      // logo + Menu button on all screen sizes
  | "centered-logo"; // centered logo only, no nav

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type HeaderConfig = {
  name: string;
  description: string;
  copyright: string;
  logoType: LogoType;
  logoImageSrc?: string;
  headerType: HeaderType;
  mobileMenuType: MobileMenuType;
  headerSticky: boolean;
  ctaLabel?: string; // used when headerType is "cta"
  ctaHref?: string;  // used when headerType is "cta"
};

export const siteConfig: HeaderConfig = {
  name: "MyApp",
  description: "Your app description here.",
  copyright: `© ${new Date().getFullYear()} MyApp. All rights reserved.`,

  // "text" | "image-text" | "icon-text"
  logoType: "icon-text",
  logoImageSrc: "/logo.png",

  // "nav" | "cta" | "menu-only" | "centered-logo"
  headerType: "cta",

  // "drawer" | "dropdown" | "fullscreen"
  mobileMenuType: "drawer",

  headerSticky: true,

  ctaLabel: "Get Started",
  ctaHref: "/get-started",
};

export const headerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Why Choose Us", href: "/why-us" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];
