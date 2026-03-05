/**
 * FooterSplit — two-tone zones: upper (brand + legal pills) / lower (copyright + socials)
 * Best for: apps with dense navigation, multi-section sites, B2B SaaS.
 */

import Link from "next/link";
import { SocialIcons } from "./_social-icons";
import type { FooterConfig, HeaderConfig } from "@/lib/config";

interface Props {
  brand: Pick<HeaderConfig, "logo">;
  config: FooterConfig;
}

export default function FooterSplit({ brand, config }: Props) {
  return (
    <footer>
      {/* Upper zone */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            {/* Left — logo + tagline */}
            <div className="max-w-xs">
              <p className="text-base font-bold text-gray-900">{brand.logo}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{config.tagline}</p>
            </div>

            {/* Right — legal links as pill badges */}
            {config.legalLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {config.legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-gray-200 px-4 py-1.5 text-xs text-gray-500 transition-colors hover:border-indigo-500 hover:text-indigo-600"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lower zone */}
      <div className="bg-gray-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-gray-400">{config.copyright}</p>
            {config.socials.length > 0 && <SocialIcons socials={config.socials} />}
          </div>
        </div>
      </div>
    </footer>
  );
}
