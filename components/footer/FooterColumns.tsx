/**
 * FooterColumns — 4 fixed columns: Contents | Company | Legal | Contact
 * Best for: SaaS products, startups, B2B sites.
 */

import Link from "next/link";
import { SocialIcons } from "./_social-icons";
import Logo from "@/components/header/Logo";
import type { FooterConfig, HeaderConfig } from "@/lib/config";

interface Props {
  brand: Pick<HeaderConfig, "logo" | "logoType" | "logoImageSrc">;
  config: FooterConfig;
}

export default function FooterColumns({ brand, config }: Props) {
  const company = config.sections.find((s) => s.title === "Company");

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Contents */}
          <div>
            <Logo type={brand.logoType} name={brand.logo} imageSrc={brand.logoImageSrc} />
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              {config.tagline}
            </p>
            {config.socials.length > 0 && (
              <div className="mt-5">
                <SocialIcons socials={config.socials} />
              </div>
            )}
          </div>

          {/* Col 2 — Company */}
          {company && (
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {company.links.map((link) => (
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
          )}

          {/* Col 3 — Legal */}
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

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              {config.companyInfo.address && (
                <li className="text-sm text-gray-500 leading-relaxed">
                  {config.companyInfo.address}
                </li>
              )}
              {config.companyInfo.email && (
                <li>
                  <a
                    href={`mailto:${config.companyInfo.email}`}
                    className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    {config.companyInfo.email}
                  </a>
                </li>
              )}
              {config.companyInfo.phone && (
                <li>
                  <a
                    href={`tel:${config.companyInfo.phone}`}
                    className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    {config.companyInfo.phone}
                  </a>
                </li>
              )}
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
