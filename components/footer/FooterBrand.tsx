/**
 * FooterBrand — bold brand statement with indigo gradient accent line
 * Best for: startups, product launches, high-impact landing pages.
 */

import Link from "next/link";
import { SocialIcon } from "./_social-icons";
import type { FooterConfig, HeaderConfig } from "@/lib/config";

interface Props {
  brand: Pick<HeaderConfig, "logo">;
  config: FooterConfig;
}

export default function FooterBrand({ brand, config }: Props) {
  return (
    <footer className="relative overflow-hidden bg-gray-50">
      {/* Gradient accent line */}
      <div className="h-[3px] w-full bg-linear-to-r from-indigo-500 to-purple-500" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Main brand statement */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Built for the{" "}
            <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              future.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base text-gray-500">{config.tagline}</p>
        </div>

        {/* Social icons */}
        {config.socials.length > 0 && (
          <div className="mb-12 flex flex-wrap items-center gap-3">
            {config.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 transition-colors hover:border-indigo-500 hover:text-indigo-600"
              >
                <SocialIcon label={social.label} />
                <span className="capitalize">{social.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center">
          <span className="text-sm font-bold text-gray-900">{brand.logo}</span>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
            <span>{config.copyright}</span>
            {config.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
