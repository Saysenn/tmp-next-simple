/**
 * FooterCentered — centered stacked: logo → tagline → socials → divider → legal + copyright
 * Best for: creative agencies, personal brands, portfolio sites.
 */

import Link from "next/link";
import { SocialIcon } from "./_social-icons";
import type { FooterConfig, HeaderConfig } from "@/lib/config";

interface Props {
  brand: Pick<HeaderConfig, "logo">;
  config: FooterConfig;
}

export default function FooterCentered({ brand, config }: Props) {
  return (
    <footer className="border-t border-gray-200 bg-white py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        {/* Logo */}
        <p className="text-lg font-bold text-gray-900">{brand.logo}</p>

        {/* Tagline */}
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
          {config.tagline}
        </p>

        {/* Social icons */}
        {config.socials.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            {config.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-indigo-500 hover:text-indigo-600"
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="my-8 h-px bg-gray-200" />

        {/* Copyright */}
        <p className="text-xs text-gray-400">{config.copyright}</p>

        {/* Legal links */}
        {config.legalLinks.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {config.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-gray-400 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
