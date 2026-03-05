/**
 * FooterColumns — brand | nav sections | legal + social
 * Best for: SaaS products, startups, B2B sites.
 */

import Link from "next/link";
import { SocialIcons } from "./_social-icons";
import type { FooterConfig, HeaderConfig } from "@/lib/config";

interface Props {
  brand: Pick<HeaderConfig, "logo">;
  config: FooterConfig;
}

export default function FooterColumns({ brand, config }: Props) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid: brand col + section cols + legal col */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-lg font-bold text-gray-900">{brand.logo}</p>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">
              {config.tagline}
            </p>
            {config.socials.length > 0 && (
              <div className="mt-5">
                <SocialIcons socials={config.socials} />
              </div>
            )}
          </div>

          {/* Nav sections */}
          {config.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              {config.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">{config.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
