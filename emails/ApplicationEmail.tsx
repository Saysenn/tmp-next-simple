import {
  Body, Button, Container, Head, Hr, Html,
  Img, Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

type Props = {
  name: string;
  email: string;
  phone?: string;
  position?: string;
  coverLetter?: string;
  cvFilename?: string;
};

export default function ApplicationEmail({ name, email, phone, position, coverLetter, cvFilename }: Props) {
  const year = new Date().getFullYear();
  const siteName = mailConfig.fromName;
  const siteUrl = mailConfig.siteUrl;
  const logoUrl = mailConfig.logoUrl || `${siteUrl}/logo.webp`;

  return (
    <Html>
      <Head />
      <Preview>New CV application from {name}{position ? ` — ${position}` : ""}</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Logo header */}
          <Section style={logoHeader}>
            <Img src={logoUrl} alt={siteName} height="44" style={logoImg} />
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={heading}>New CV Application</Text>
            <Text style={subheading}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </Text>

            <Hr style={divider} />

            {/* Applicant card */}
            <Section style={applicantCard}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={avatarCell}>
                    <div style={avatar}>{name.charAt(0).toUpperCase()}</div>
                  </td>
                  <td style={applicantMeta}>
                    <Text style={applicantName}>{name}</Text>
                    <Link href={`mailto:${email}`} style={applicantEmail}>{email}</Link>
                    {phone && (
                      <Text style={applicantPhone}>
                        <Link href={`tel:${phone}`} style={phoneLink}>{phone}</Link>
                      </Text>
                    )}
                  </td>
                  <td style={dateBadgeCell}>
                    <Text style={dateBadge}>
                      {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* Details */}
            <Section style={detailsSection}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                {position && (
                  <tr>
                    <td style={detailLabel}>Position</td>
                    <td style={detailValue}>{position}</td>
                  </tr>
                )}
                {cvFilename && (
                  <tr>
                    <td style={detailLabel}>CV</td>
                    <td style={detailValue}>
                      <span style={cvBadge}>📎 {cvFilename}</span>
                    </td>
                  </tr>
                )}
              </table>
            </Section>

            {coverLetter && (
              <Section style={msgSection}>
                <Text style={msgLabel}>Cover Letter</Text>
                <Text style={msgText}>{coverLetter}</Text>
              </Section>
            )}

            <Section style={btnSection}>
              <Button href={`mailto:${email}`} style={replyBtn}>
                Reply to {name.split(" ")[0]}
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={footerDivider} />
          <Section style={footer}>
            <Text style={footerText}>
              {siteName}
              {siteUrl && (
                <> · <Link href={siteUrl} style={footerLink}>{siteUrl.replace(/^https?:\/\//, "")}</Link></>
              )}
            </Text>
            <Text style={copyright}>© {year} {siteName}. All rights reserved.</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f4f4f5", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const container = { maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" as const, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" };
const logoHeader = { backgroundColor: "#ffffff", padding: "32px 40px 24px", textAlign: "center" as const, borderBottom: "1px solid #e5e7eb" };
const logoImg = { margin: "0 auto", display: "block" };
const content = { padding: "36px 40px" };
const heading = { margin: "0 0 4px", color: "#111827", fontSize: "22px", fontWeight: "700" };
const subheading = { margin: "0 0 24px", color: "#6b7280", fontSize: "13px" };
const divider = { borderColor: "#e5e7eb", margin: "0 0 24px" };
const applicantCard = { backgroundColor: "#f9fafb", borderRadius: "8px", padding: "20px", marginBottom: "20px", border: "1px solid #e5e7eb" };
const avatarCell = { width: "52px", verticalAlign: "middle" as const };
const avatar = { width: "46px", height: "46px", backgroundColor: "#111827", borderRadius: "50%", color: "#fff", fontSize: "18px", fontWeight: "700" as const, lineHeight: "46px", textAlign: "center" as const };
const applicantMeta = { paddingLeft: "14px", verticalAlign: "middle" as const };
const applicantName = { margin: "0 0 2px", color: "#111827", fontSize: "16px", fontWeight: "700" };
const applicantEmail = { color: "#4f46e5", fontSize: "13px", textDecoration: "none" };
const applicantPhone = { margin: "3px 0 0", fontSize: "13px" };
const phoneLink = { color: "#6b7280", textDecoration: "none" };
const dateBadgeCell = { textAlign: "right" as const, verticalAlign: "middle" as const };
const dateBadge = { margin: "0", color: "#9ca3af", fontSize: "12px" };
const detailsSection = { backgroundColor: "#f9fafb", borderRadius: "6px", padding: "16px 20px", marginBottom: "20px", border: "1px solid #e5e7eb" };
const detailLabel = { color: "#9ca3af", fontSize: "11px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px", padding: "6px 16px 6px 0", width: "80px", verticalAlign: "top" as const };
const detailValue = { color: "#1f2937", fontSize: "14px", padding: "6px 0", verticalAlign: "top" as const };
const cvBadge = { fontSize: "13px", color: "#4f46e5", fontWeight: "600" };
const msgSection = { marginBottom: "24px" };
const msgLabel = { margin: "0 0 8px", color: "#9ca3af", fontSize: "11px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px" };
const msgText = { margin: "0", color: "#374151", fontSize: "15px", lineHeight: "1.7", whiteSpace: "pre-wrap" as const, backgroundColor: "#f9fafb", borderRadius: "6px", padding: "16px 20px", border: "1px solid #e5e7eb" };
const btnSection = { textAlign: "center" as const };
const replyBtn = { backgroundColor: "#111827", color: "#ffffff", padding: "13px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" };
const footerDivider = { borderColor: "#e5e7eb", margin: "0" };
const footer = { backgroundColor: "#f9fafb", padding: "24px 40px", textAlign: "center" as const };
const footerText = { margin: "0 0 4px", color: "#9ca3af", fontSize: "12px" };
const footerLink = { color: "#6b7280", textDecoration: "none" };
const copyright = { margin: "0", color: "#d1d5db", fontSize: "11px" };
