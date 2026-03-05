// ─────────────────────────────────────────────────────────────
// lib/config.ts
//
// Shared type definitions consumed by all header and footer
// variant components. Data is sourced from configs/header.ts
// and configs/footer.ts — one source of truth per domain.
// ─────────────────────────────────────────────────────────────

import { siteConfig, headerNav } from "@/configs/header";
import { socialLinks, footerSections, legalLinks, companyInfo } from "@/configs/footer";
import type { CompanyInfo } from "@/configs/footer";

// ─── Types ────────────────────────────────────────────────────

export type SocialItem = {
  label: string;
  href: string;
};

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type HeaderConfig = {
  logo: string;
  nav: LinkItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type FooterConfig = {
  tagline: string;
  copyright: string;
  sections: { title: string; links: LinkItem[] }[];
  legalLinks: LinkItem[];
  socials: SocialItem[];
  companyInfo: CompanyInfo;
};

// ─── Pre-filled instances (sourced from configs/header.ts + configs/footer.ts) ─

export const headerConfig: HeaderConfig = {
  logo: siteConfig.name,
  nav: headerNav,
  ctaLabel: siteConfig.ctaLabel,
  ctaHref: siteConfig.ctaHref,
};

export const footerConfig: FooterConfig = {
  tagline: siteConfig.description,
  copyright: siteConfig.copyright,
  sections: footerSections,
  legalLinks: legalLinks,
  socials: socialLinks.map((s) => ({ label: s.label, href: s.href })),
  companyInfo: companyInfo,
};
