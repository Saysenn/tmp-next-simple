import type { Metadata } from "next";

// TODO: Replace all placeholder text with your actual privacy policy content.
// TODO: Update companyName, contactEmail, and lastUpdated below.

const companyName = "MyApp"; // TODO: Replace with your company name
const contactEmail = "privacy@example.com"; // TODO: Replace with your contact email
const lastUpdated = "March 2026"; // TODO: Update when publishing

export const metadata: Metadata = {
  title: `Privacy Policy — ${companyName}`,
  description: `Privacy Policy for ${companyName}. Learn how we collect, use, and protect your data.`,
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--text-heading)" }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="prose-section space-y-10" style={{ color: "var(--text-body)" }}>
          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              1. Introduction
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Write your introduction */}
              {companyName} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed
              to protecting your personal data and your right to privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit
              our website. Please read it carefully.
            </p>
          </section>

          {/* 2. Data We Collect */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              2. Data We Collect
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              {/* TODO: List all categories of data you actually collect */}
              We may collect the following categories of personal data:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: "var(--text-body)" }}>
              <li>
                <strong>Contact information</strong> — name, email address, phone number (when
                submitted via contact forms)
              </li>
              <li>
                <strong>Usage data</strong> — pages visited, time spent, browser type, IP address
              </li>
              <li>
                <strong>Communications</strong> — messages you send us via contact or subscribe
                forms
              </li>
              {/* TODO: Add more as applicable */}
            </ul>
          </section>

          {/* 3. How We Use Your Data */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              3. How We Use Your Data
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              {/* TODO: Describe each purpose with its legal basis */}
              We use your data for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>To respond to your enquiries and provide customer support</li>
              <li>To send you updates and notifications you have opted in to</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
              {/* TODO: Add more as applicable */}
            </ul>
          </section>

          {/* 4. Cookies */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              4. Cookies &amp; Tracking Technologies
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              {/* TODO: List the exact cookies/third-party services you use */}
              We use cookies and similar tracking technologies to improve your browsing experience.
              You can control your cookie preferences via the cookie consent banner displayed on
              your first visit.
            </p>
            <p className="text-sm leading-relaxed">
              We may use the following third-party services that set cookies:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              <li>
                <strong>Cloudflare Turnstile</strong> — bot protection (
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                  style={{ color: "var(--accent)" }}
                >
                  Cloudflare Privacy Policy
                </a>
                )
              </li>
              {/* TODO: Add reCAPTCHA, analytics, etc. as applicable */}
            </ul>
          </section>

          {/* 5. Data Sharing */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              5. Sharing Your Data
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Describe who you share data with and why */}
              We do not sell your personal data. We may share your data with trusted third-party
              service providers who assist us in operating our website, subject to confidentiality
              obligations. We may also disclose your data where required by law.
            </p>
          </section>

          {/* 6. Data Retention */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              6. Data Retention
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Specify actual retention periods */}
              We retain your personal data only for as long as necessary for the purposes set out
              in this policy, or as required by applicable law. When no longer needed, we securely
              delete or anonymise your data.
            </p>
          </section>

          {/* 7. Your Rights */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              7. Your Rights
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              {/* TODO: Confirm applicable rights based on your jurisdiction */}
              Under UK GDPR and applicable data protection law, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Request erasure (&ldquo;right to be forgotten&rdquo;)</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="underline hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                {contactEmail}
              </a>
              .
            </p>
          </section>

          {/* 8. International Transfers */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              8. International Data Transfers
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Describe any international transfers and safeguards */}
              Your data may be transferred to and processed in countries outside the UK or EEA. We
              ensure appropriate safeguards are in place (e.g. standard contractual clauses) before
              any such transfer.
            </p>
          </section>

          {/* 9. Changes */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              9. Changes to This Policy
            </h2>
            <p className="text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by updating the &ldquo;Last updated&rdquo; date at the top of this page.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              10. Contact Us
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Add your registered address and Data Protection Officer (if applicable) */}
              If you have any questions about this Privacy Policy or how we handle your data,
              please contact us at:{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="underline hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                {contactEmail}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
