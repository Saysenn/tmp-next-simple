import {
  Body, Container, Head, Hr, Html,
  Link, Preview, Section, Text,
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

  return (
    <Html>
      <Head />
      <Preview>New CV application from {name}{position ? ` — ${position}` : ""}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={label}>APPLICATION FORM</Text>
            <Text style={title}>New CV Submission</Text>
            <Text style={date}>
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long", year: "numeric", month: "long", day: "numeric",
              })}
            </Text>
          </Section>

          <Hr style={dividerTop} />

          {/* Applicant details */}
          <Section style={content}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tr>
                <td style={fieldKey}>Name</td>
                <td style={fieldVal}>{name}</td>
              </tr>
              <tr>
                <td style={fieldKey}>Email</td>
                <td style={fieldVal}>
                  <Link href={`mailto:${email}`} style={linkStyle}>{email}</Link>
                </td>
              </tr>
              {phone && (
                <tr>
                  <td style={fieldKey}>Phone</td>
                  <td style={fieldVal}>
                    <Link href={`tel:${phone}`} style={linkStyle}>{phone}</Link>
                  </td>
                </tr>
              )}
              {position && (
                <tr>
                  <td style={fieldKey}>Position</td>
                  <td style={fieldVal}>{position}</td>
                </tr>
              )}
              {cvFilename && (
                <tr>
                  <td style={fieldKey}>CV</td>
                  <td style={fieldVal}>
                    <span style={cvBadge}>📎 {cvFilename}</span>
                  </td>
                </tr>
              )}
            </table>

            {coverLetter && (
              <>
                <Hr style={dividerMid} />
                <Text style={msgLabel}>Cover Letter</Text>
                <Text style={msgText}>{coverLetter}</Text>
              </>
            )}

            <Hr style={dividerMid} />

            <Text style={replyText}>
              <Link href={`mailto:${email}`} style={replyLink}>
                → Reply to {name.split(" ")[0]}
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              {siteName}
              {siteUrl && (
                <> · <Link href={siteUrl} style={footerLink}>{siteUrl.replace(/^https?:\/\//, "")}</Link></>
              )}
              {" · "}© {year}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#ffffff", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const container = { maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff" };
const header = { padding: "32px 0 24px" };
const label = { margin: "0 0 6px", color: "#a0aec0", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "2px" };
const title = { margin: "0 0 6px", color: "#1a202c", fontSize: "26px", fontWeight: "700" };
const date = { margin: "0", color: "#718096", fontSize: "13px" };
const dividerTop = { borderColor: "#e2e8f0", margin: "0 0 28px" };
const dividerMid = { borderColor: "#e2e8f0", margin: "24px 0" };
const content = { padding: "0" };
const fieldKey = { color: "#a0aec0", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px", padding: "8px 20px 8px 0", width: "80px", verticalAlign: "top" as const };
const fieldVal = { color: "#2d3748", fontSize: "14px", padding: "8px 0", verticalAlign: "top" as const };
const linkStyle = { color: "#4f46e5", textDecoration: "none" };
const cvBadge = { display: "inline-block", fontSize: "13px", color: "#4f46e5", fontWeight: "600" };
const msgLabel = { margin: "0 0 8px", color: "#a0aec0", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px" };
const msgText = { margin: "0", color: "#4a5568", fontSize: "15px", lineHeight: "1.7", whiteSpace: "pre-wrap" as const };
const replyText = { margin: "0" };
const replyLink = { color: "#4f46e5", fontSize: "14px", fontWeight: "600", textDecoration: "none" };
const footer = { borderTop: "1px solid #e2e8f0", padding: "20px 0" };
const footerText = { margin: "0", color: "#a0aec0", fontSize: "12px" };
const footerLink = { color: "#a0aec0", textDecoration: "none" };
