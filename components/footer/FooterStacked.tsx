/**
 * FooterStacked — 3-row centred footer.
 *
 * Row 1: Logo centred + tagline
 * Row 2: 2-col contact block — Contact (phone + email) | Office (address + company number)
 * Row 3: All nav links in a single horizontal row, wraps on mobile
 * Bottom bar: Copyright left · Legal links right
 */

import Image from "next/image";
import Link from "next/link";
import type { FooterConfig, HeaderConfig } from "@/lib/config";

interface Props {
  brand: Pick<HeaderConfig, "logo" | "logoType" | "logoImageSrc">;
  config: FooterConfig;
}

export default function FooterStacked({ brand, config }: Props) {
  const allNavLinks = config.sections.flatMap((s) => s.links);

  return (
    <footer className="bg-(--surface-dark,#0f172a) text-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Row 1 — Logo + tagline */}
        <div className="flex flex-col items-center gap-3 py-12 border-b border-white/10">
          {brand.logoType === "image" && brand.logoImageSrc ? (
            <div className="relative w-[160px] h-[56px]">
              <Image
                src={brand.logoImageSrc}
                alt={brand.logo}
                fill
                sizes="160px"
                className="object-contain p-1"
              />
            </div>
          ) : (
            <span className="text-2xl font-bold tracking-tight">{brand.logo}</span>
          )}
          {config.tagline && (
            <p className="text-sm text-center max-w-sm" style={{ color: "var(--text-light-muted, rgba(255,255,255,0.55))" }}>
              {config.tagline}
            </p>
          )}
        </div>

        {/* Row 2 — Contact left | Office right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10 border-b border-white/10">

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Contact
            </h3>
            <ul className="space-y-2">
              {config.companyInfo.phone && (
                <li>
                  <a
                    href={`tel:${config.companyInfo.phone}`}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "var(--text-light-muted, rgba(255,255,255,0.55))" }}
                  >
                    {config.companyInfo.phone}
                  </a>
                </li>
              )}
              {config.companyInfo.email && (
                <li>
                  <a
                    href={`mailto:${config.companyInfo.email}`}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "var(--text-light-muted, rgba(255,255,255,0.55))" }}
                  >
                    {config.companyInfo.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Office */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Office
            </h3>
            <address className="not-italic space-y-1">
              {config.companyInfo.address && (
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-light-muted, rgba(255,255,255,0.55))" }}
                >
                  {config.companyInfo.address}
                </p>
              )}
              {config.companyInfo.companyNumber && (
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--text-light-muted, rgba(255,255,255,0.4))" }}
                >
                  {config.companyInfo.companyNumber}
                </p>
              )}
            </address>
          </div>
        </div>

        {/* Row 3 — Nav links */}
        {allNavLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-6 border-b border-white/10">
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:text-white"
                style={{ color: "var(--text-light-muted, rgba(255,255,255,0.55))" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Bottom bar — copyright · legal */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <p
            className="text-xs"
            style={{ color: "var(--text-light-muted, rgba(255,255,255,0.4))" }}
          >
            {config.copyright}
          </p>
          <div className="flex items-center gap-4">
            {config.legalLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                {i > 0 && (
                  <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
                )}
                <Link
                  href={link.href}
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: "var(--text-light-muted, rgba(255,255,255,0.4))" }}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
