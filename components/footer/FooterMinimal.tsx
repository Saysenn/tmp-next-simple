/**
 * FooterMinimal — single compact bar: logo · legal links · social icons
 * Best for: landing pages, single-product sites, minimal aesthetics.
 */

import Link from "next/link";
import { SocialIcons } from "./_social-icons";
import type { FooterConfig, HeaderConfig } from "@/lib/config";

interface Props {
  brand: Pick<HeaderConfig, "logo">;
  config: FooterConfig;
}

export default function FooterMinimal({ brand, config }: Props) {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Logo */}
          <span className="text-sm font-bold text-gray-900">{brand.logo}</span>

          {/* Copyright + legal links */}
          <p className="text-center text-xs text-gray-400 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>{config.copyright}</span>
            {config.legalLinks.length > 0 && (
              <>
                <span className="text-gray-300">·</span>
                {config.legalLinks.map((link, i) => (
                  <span key={link.href} className="flex items-center gap-2">
                    {i > 0 && <span className="text-gray-300">·</span>}
                    <Link href={link.href} className="hover:text-indigo-600 transition-colors">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </>
            )}
          </p>

          {/* Social icons */}
          {config.socials.length > 0 && <SocialIcons socials={config.socials} />}
        </div>
      </div>
    </footer>
  );
}
