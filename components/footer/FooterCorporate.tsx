import Image from "next/image";
import Link from "next/link";
import type { FooterConfig, HeaderConfig } from "@/lib/config";

interface Props {
  brand: Pick<HeaderConfig, "logo" | "logoType" | "logoImageSrc">;
  config: FooterConfig;
}

const BG      = "var(--section-bg, #1f2937)";
const CONTENT = "var(--section-body, #9ca3af)";
const LABEL   = "var(--section-muted, #6b7280)";
const COMPANY = "var(--section-heading, #f9fafb)";
const DIVIDER = "var(--section-border, rgba(255,255,255,0.1))";
const SERIF   = "var(--font-cormorant), Georgia, serif";

function IconBox({ children, href }: { children: React.ReactNode; href?: string }) {
  const box = (
    <div
      className="flex items-center justify-center shrink-0"
      style={{ width: 32, height: 32, border: `1px solid ${DIVIDER}`, color: CONTENT }}
    >
      {children}
    </div>
  );
  return href ? <a href={href}>{box}</a> : box;
}

export default function FooterCorporate({ brand, config }: Props) {
  const { companyInfo } = config;
  const legalName = companyInfo.legalName ?? brand.logo;

  const details = [
    { label: "Company Name",       value: legalName },
    { label: "Company Number",     value: companyInfo.companyNumber ?? "—" },
    { label: "VAT Number",         value: companyInfo.vatNumber ?? "—" },
    { label: "Registered Address", value: companyInfo.address ?? "—" },
  ];

  return (
    <footer style={{ backgroundColor: BG }}>
      <div className="mx-auto" style={{ maxWidth: 960, padding: "52px 40px 32px" }}>

        {/* Row 1 — vertical bar + logo + name  ·  tagline right */}
        <div className="flex items-start justify-between gap-8 pb-0">
          <div className="flex items-start gap-4">
            {/* <div className="w-px self-stretch mt-1" style={{ backgroundColor: DIVIDER }} /> */}

            <div className="flex flex-col items-start gap-2">
              {brand.logoType === "image" && brand.logoImageSrc ? (
                <div className="relative" style={{ width: 80, height: 80 }}>
                  <Image
                    src={brand.logoImageSrc}
                    alt={brand.logo}
                    fill
                    sizes="80px"
                    className="object-contain"
                    style={{ filter: "brightness(0) saturate(0) invert(1) opacity(0.5)" }}
                  />
                </div>
              ) : null}
              {/* <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color: CONTENT,
                }}
              >
                {brand.logo}
              </span> */}
            </div>
          </div>

          {config.tagline && (
            <p
              className="text-right italic mt-1"
              style={{
                color: CONTENT,
                fontFamily: SERIF,
                fontSize: 20,
                lineHeight: 1.4,
                maxWidth: 140,
              }}
            >
              {config.tagline}
            </p>
          )}
        </div>

        {/* Company legal name */}
        <div className="pb-4">
          <p
            style={{
              fontSize: 16,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: COMPANY,
              fontFamily: SERIF,
            }}
          >
            {legalName}
          </p>
        </div>

        <hr style={{ borderColor: DIVIDER }} />

        {/* Row 2 — Contact icons */}
        <div className="flex items-center justify-between gap-3 flex-wrap py-5">
          {companyInfo.email && (
            <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 group">
              <IconBox>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="1.5" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </IconBox>
              <span style={{ fontSize: 12, letterSpacing: "0.04em", color: CONTENT }}>
                {companyInfo.email}
              </span>
            </a>
          )}

          {companyInfo.phone && (
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-3">
              <IconBox>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.49-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </IconBox>
              <span style={{ fontSize: 12, letterSpacing: "0.04em", color: CONTENT }}>
                {companyInfo.phone}
              </span>
            </a>
          )}

          {companyInfo.address && (
            <div className="flex items-center gap-3">
              <IconBox>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21C12 21 5 13.5 5 8.5a7 7 0 0114 0c0 5-7 12.5-7 12.5z" />
                  <circle cx="12" cy="8.5" r="2.5" />
                </svg>
              </IconBox>
              <span style={{ fontSize: 12, letterSpacing: "0.04em", color: CONTENT }}>
                {companyInfo.address}
              </span>
            </div>
          )}
        </div>

        <hr style={{ borderColor: DIVIDER }} />

        {/* Row 3 — Company details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 py-7">
          {details.map(({ label, value }) => (
            <div key={label}>
              <p
                style={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: LABEL,
                  marginBottom: 10,
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: 12, color: CONTENT }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        <hr style={{ borderColor: DIVIDER }} />

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5">
          <p style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: LABEL }}>
            {config.copyright}
          </p>
          <div className="flex items-center">
            {config.legalLinks.length > 0 ? (
              config.legalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center gap-4">
                  {i > 0 && <span style={{ color: DIVIDER }}>·</span>}
                  <Link
                    href={link.href}
                    className="transition-opacity hover:opacity-80"
                    style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: LABEL }}
                  >
                    {link.label}
                  </Link>
                </span>
              ))
            ) : (
              <p style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: LABEL }}>
                Crafted with care — details to follow.
              </p>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
