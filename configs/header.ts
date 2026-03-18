// configs/header.ts — header layout and navigation config

export type LogoType =
  | "text"        // bold site name only
  | "image"       // image only, larger size — no text
  | "image-text"  // image + site name
  | "icon-text";  // geometric icon + site name

export type MobileMenuType =
  | "drawer"      // slides in from the left
  | "dropdown"    // expands below the header bar
  | "fullscreen"; // slides down from the top, full screen

export type HeaderType =
  | "nav"            // logo + desktop nav + mobile hamburger (default)
  | "floating-nav"   // 3-col: logo | glass pill nav (centered) | cta
  | "cta"            // logo + single CTA button, no nav
  | "menu-only"      // logo + Menu button on all screen sizes
  | "centered-logo"; // centered logo only, no nav

export type NavLinkStyle =
  | "bg-fill"          // background pill changes on hover/active (default)
  | "underline-center" // underline expands from center outward
  | "underline-left"   // underline slides in from left to right
  | "text-accent"      // text color shifts to accent, no background
  | "dot-below";       // small dot appears below the active/hovered item

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CtaConfig = {
  enabled: boolean; // toggle CTA button on/off across all header types
  label: string;
  href: string;
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
  navLinkStyle: NavLinkStyle;
  cta: CtaConfig;
};

export const siteConfig: HeaderConfig = {
  name: "MyApp",
  description: "Your app description here.",
  copyright: `© ${new Date().getFullYear()} MyApp. All rights reserved.`,

  // "text" | "image" | "image-text" | "icon-text"
  logoType: "icon-text",
  logoImageSrc: "/logo.png",

  // "nav" | "floating-nav" | "cta" | "menu-only" | "centered-logo"
  headerType: "floating-nav",

  // "drawer" | "dropdown" | "fullscreen"
  mobileMenuType: "drawer",

  headerSticky: true,

  // "bg-fill" | "underline-center" | "underline-left" | "text-accent" | "dot-below"
  navLinkStyle: "bg-fill",
 
  cta: {
    enabled: true,
    label: "Get Started",
    href: "/get-started",
  },
};

export const headerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Why Choose Us", href: "/why-us" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];
