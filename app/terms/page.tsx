import type { Metadata } from "next";

// TODO: Replace all placeholder text with your actual terms and conditions content.
// TODO: Update companyName, contactEmail, jurisdiction, and lastUpdated below.

const companyName = "MyApp"; // TODO: Replace with your company name
const contactEmail = "legal@example.com"; // TODO: Replace with your legal/contact email
const jurisdiction = "England and Wales"; // TODO: Replace with your governing jurisdiction
const lastUpdated = "March 2026"; // TODO: Update when publishing

export const metadata: Metadata = {
  title: `Terms & Conditions — ${companyName}`,
  description: `Terms and Conditions for using ${companyName}.`,
};

export default function TermsPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--text-heading)" }}>
            Terms &amp; Conditions
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-10" style={{ color: "var(--text-body)" }}>
          {/* 1. Acceptance */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              1. Acceptance of Terms
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Customise this acceptance clause */}
              By accessing or using {companyName}&rsquo;s website and services, you agree to be
              bound by these Terms &amp; Conditions and our{" "}
              <a
                href="/privacy"
                className="underline hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                Privacy Policy
              </a>
              . If you do not agree, please do not use our services.
            </p>
          </section>

          {/* 2. Use of Service */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              2. Use of Service
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              {/* TODO: Describe permitted and prohibited uses */}
              You agree to use our services only for lawful purposes and in a manner that does not
              infringe the rights of others. You must not:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Use our services to transmit spam or unsolicited communications</li>
              <li>Attempt to gain unauthorised access to any part of our systems</li>
              <li>Use our services for any fraudulent or unlawful purpose</li>
              <li>Scrape, crawl, or systematically extract data without our written consent</li>
              {/* TODO: Add more restrictions as applicable */}
            </ul>
          </section>

          {/* 3. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              3. Intellectual Property
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Specify ownership and licences */}
              All content, trademarks, logos, and intellectual property displayed on this website
              are owned by or licensed to {companyName}. You may not reproduce, distribute, or
              create derivative works without our prior written consent.
            </p>
          </section>

          {/* 4. User Content */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              4. User Submissions
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Describe how you handle form submissions, user content, etc. */}
              Any information you submit to us via contact or subscribe forms is governed by our
              Privacy Policy. By submitting information, you grant us a non-exclusive licence to
              use that information solely for the purpose of responding to your enquiry or
              providing the requested service.
            </p>
          </section>

          {/* 5. Disclaimers */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              5. Disclaimers &amp; Limitation of Liability
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              {/* TODO: Review with a legal professional */}
              Our services are provided &ldquo;as is&rdquo; without warranties of any kind, express
              or implied. We do not guarantee that our website will be uninterrupted, error-free,
              or free from viruses.
            </p>
            <p className="text-sm leading-relaxed">
              To the fullest extent permitted by law, {companyName} shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of our
              services.
            </p>
          </section>

          {/* 6. Third-Party Links */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              6. Third-Party Links
            </h2>
            <p className="text-sm leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the
              content, privacy practices, or terms of any third-party sites. Visiting them is at
              your own risk.
            </p>
          </section>

          {/* 7. Privacy */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              7. Privacy
            </h2>
            <p className="text-sm leading-relaxed">
              Your use of our services is also governed by our{" "}
              <a
                href="/privacy"
                className="underline hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                Privacy Policy
              </a>
              , which is incorporated into these Terms by reference.
            </p>
          </section>

          {/* 8. Changes */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              8. Changes to Terms
            </h2>
            <p className="text-sm leading-relaxed">
              We reserve the right to update these Terms at any time. We will indicate the date of
              the most recent revision at the top of this page. Continued use of our services
              after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* 9. Governing Law */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              9. Governing Law
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Confirm jurisdiction with your legal adviser */}
              These Terms are governed by the laws of {jurisdiction}. Any disputes shall be
              subject to the exclusive jurisdiction of the courts of {jurisdiction}.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-heading)" }}>
              10. Contact Us
            </h2>
            <p className="text-sm leading-relaxed">
              {/* TODO: Add your registered company address */}
              If you have any questions about these Terms, please contact us at:{" "}
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
