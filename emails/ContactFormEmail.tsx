import {
  Body, Button, Container, Head, Hr, Html,
  Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

// ── Brand — update hex values here when rebranding ───────────
const ACCENT    = "#6ed39a";
const DARK      = "#062125";
const DARK_MID  = "#083433";
// ─────────────────────────────────────────────────────────────

type Props = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

export default function ContactFormEmail({ name, email, phone, message }: Props) {
  const year   = new Date().getFullYear();
  const date   = new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const siteName = mailConfig.fromName;
  const siteUrl  = mailConfig.siteUrl;

  return (
    <Html lang="en">
      <Head />
      <Preview>New enquiry from {name}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>

          {/* Header */}
          <Section style={{ ...s.header, backgroundColor: DARK }}>
            <Text style={s.brandName}>{siteName}</Text>
            <Text style={{ ...s.headerLabel, color: ACCENT }}>New Enquiry</Text>
          </Section>

          {/* Content */}
          <Section style={s.content}>
            <Text style={s.date}>{date}</Text>

            {/* Sender card */}
            <Section style={s.card}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tr>
                  <td style={s.avatarCell}>
                    <div style={{ ...s.avatar, backgroundColor: DARK_MID }}>
                      {name.charAt(0).toUpperCase()}
                    </div>
                  </td>
                  <td style={s.senderMeta}>
                    <Text style={s.senderName}>{name}</Text>
                    <Link href={`mailto:${email}`} style={{ ...s.link, color: ACCENT }}>{email}</Link>
                    {phone && (
                      <Text style={s.senderPhone}>
                        <Link href={`tel:${phone}`} style={s.mutedLink}>{phone}</Link>
                      </Text>
                    )}
                  </td>
                </tr>
              </table>
            </Section>

            {/* Message */}
            <Text style={s.fieldLabel}>Message</Text>
            {message ? (
              <Section style={{ ...s.messageBox, borderLeftColor: ACCENT }}>
                <Text style={s.messageText}>{message}</Text>
              </Section>
            ) : (
              <Text style={s.noMessage}>No message provided.</Text>
            )}

            {/* CTA */}
            <Section style={s.btnSection}>
              <Button href={`mailto:${email}`} style={{ ...s.btn, backgroundColor: DARK }}>
                Reply to {name.split(" ")[0]}
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={s.divider} />
          <Section style={s.footer}>
            <Text style={s.footerCompany}>{siteName}</Text>
            {siteUrl && (
              <Text style={s.footerSite}>
                <Link href={siteUrl} style={s.mutedLink}>{siteUrl.replace(/^https?:\/\//, "")}</Link>
              </Text>
            )}
            <Text style={s.copyright}>© {year} {siteName}. All rights reserved.</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ────────────────────────────────────────────────────
const s = {
  body:        { backgroundColor: "#f4f5f4", fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif", margin: "0", padding: "0" },
  container:   { maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" as const, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  header:      { padding: "32px 40px 28px" },
  brandName:   { margin: "0 0 4px", color: "#ffffff", fontSize: "20px", fontWeight: "700", letterSpacing: "-0.3px" },
  headerLabel: { margin: "0", fontSize: "13px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "1.2px" },
  content:     { padding: "36px 40px" },
  date:        { margin: "0 0 24px", color: "#9ca3af", fontSize: "13px" },
  card:        { backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "20px", marginBottom: "28px" },
  avatarCell:  { width: "48px", verticalAlign: "top" as const },
  avatar:      { width: "44px", height: "44px", borderRadius: "50%", color: "#ffffff", fontSize: "17px", fontWeight: "700" as const, lineHeight: "44px", textAlign: "center" as const },
  senderMeta:  { paddingLeft: "16px", verticalAlign: "top" as const },
  senderName:  { margin: "0 0 4px", color: "#111827", fontSize: "15px", fontWeight: "600" },
  senderPhone: { margin: "4px 0 0", fontSize: "13px" },
  link:        { fontSize: "13px", textDecoration: "none", fontWeight: "500" },
  mutedLink:   { color: "#9ca3af", textDecoration: "none", fontSize: "13px" },
  fieldLabel:  { margin: "0 0 10px", color: "#9ca3af", fontSize: "11px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "1px" },
  messageBox:  { backgroundColor: "#f9fafb", borderLeft: "3px solid", borderRadius: "0 6px 6px 0", padding: "16px 20px", marginBottom: "28px" },
  messageText: { margin: "0", color: "#374151", fontSize: "15px", lineHeight: "1.7", whiteSpace: "pre-wrap" as const },
  noMessage:   { margin: "0 0 28px", color: "#9ca3af", fontSize: "14px", fontStyle: "italic" as const },
  btnSection:  { textAlign: "center" as const, paddingTop: "4px" },
  btn:         { color: "#ffffff", padding: "13px 36px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none", display: "inline-block" },
  divider:     { borderColor: "#e5e7eb", margin: "0" },
  footer:      { backgroundColor: "#f9fafb", padding: "24px 40px", textAlign: "center" as const },
  footerCompany: { margin: "0 0 2px", color: "#6b7280", fontSize: "13px", fontWeight: "600" },
  footerSite:  { margin: "0 0 8px", fontSize: "12px" },
  copyright:   { margin: "0", color: "#d1d5db", fontSize: "11px" },
};
