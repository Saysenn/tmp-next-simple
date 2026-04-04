import {
  Body, Button, Container, Head, Hr, Html,
  Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

// ── Brand — update hex values here when rebranding ───────────
const ACCENT   = "#6ed39a";
const DARK     = "#062125";
const DARK_MID = "#083433";
// ─────────────────────────────────────────────────────────────

type Props = { name: string; email: string; phone?: string; message?: string };

export default function ContactEmailClassic({ name, email, phone, message }: Props) {
  const year     = new Date().getFullYear();
  const date     = new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const siteName = mailConfig.fromName;
  const siteUrl  = mailConfig.siteUrl;
  const initial  = name.charAt(0).toUpperCase();

  return (
    <Html lang="en">
      <Head />
      <Preview>New enquiry from {name}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>

          <Section style={{ ...s.header, backgroundColor: DARK }}>
            <Text style={s.brandName}>{siteName}</Text>
            <Text style={{ ...s.headerLabel, color: ACCENT }}>New Enquiry</Text>
          </Section>

          <Section style={s.content}>
            <Text style={s.date}>{date}</Text>

            {/* Sender card */}
            <Section style={s.senderCard}>
              <table>
                <tr>
                  <td style={s.avatarCell}>
                    <div style={{ ...s.avatar, backgroundColor: DARK }}>{initial}</div>
                  </td>
                  <td style={s.senderInfo}>
                    <Text style={s.senderName}>{name}</Text>
                    <Link href={`mailto:${email}`} style={{ ...s.senderEmail, color: ACCENT }}>{email}</Link>
                    {phone && (
                      <Text style={s.senderPhone}>
                        <Link href={`tel:${phone}`} style={s.senderPhoneLink}>{phone}</Link>
                      </Text>
                    )}
                  </td>
                </tr>
              </table>
            </Section>

            {/* Message */}
            {message ? (
              <Section style={s.fieldSection}>
                <Text style={s.fieldLabel}>Message</Text>
                <Section style={{ ...s.messageBox, borderLeftColor: ACCENT }}>
                  <Text style={s.messageText}>{message}</Text>
                </Section>
              </Section>
            ) : (
              <Section style={s.fieldSection}>
                <Text style={s.noMessage}>No message provided.</Text>
              </Section>
            )}

            <Section style={s.btnSection}>
              <Button href={`mailto:${email}`} style={{ ...s.btn, backgroundColor: DARK }}>
                Reply to {name.split(" ")[0]}
              </Button>
            </Section>
          </Section>

          <Hr style={s.footerDivider} />
          <Section style={s.footer}>
            <Text style={s.footerCompany}>{siteName}</Text>
            {siteUrl && (
              <Text style={s.footerSite}>
                <Link href={siteUrl} style={{ color: "#9ca3af", textDecoration: "none" }}>{siteUrl.replace(/^https?:\/\//, "")}</Link>
              </Text>
            )}
            <Text style={s.copyright}>© {year} {siteName}. All rights reserved.</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const s = {
  body:          { backgroundColor: "#f4f5f4", fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif", margin: "0", padding: "0" },
  container:     { width: "100%", margin: "0 auto", backgroundColor: "#ffffff" },
  header:        { padding: "32px 40px 28px" },
  brandName:     { margin: "0 0 4px", color: "#ffffff", fontSize: "20px", fontWeight: "700", letterSpacing: "-0.3px" },
  headerLabel:   { margin: "0", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "1.2px" },
  content:       { padding: "36px 40px" },
  date:          { margin: "0 0 20px", color: "#9ca3af", fontSize: "13px" },
  senderCard:    { backgroundColor: "#f9fafb", borderRadius: "8px", padding: "20px", marginBottom: "24px", border: "1px solid #e5e7eb" },
  avatarCell:    { width: "50px", verticalAlign: "top" as const },
  avatar:        { width: "46px", height: "46px", borderRadius: "50%", color: "#ffffff", fontSize: "18px", fontWeight: "600" as const, lineHeight: "46px", textAlign: "center" as const },
  senderInfo:    { paddingLeft: "16px", verticalAlign: "top" as const },
  senderName:    { margin: "0 0 4px", color: "#111827", fontSize: "16px", fontWeight: "600" },
  senderEmail:   { fontSize: "14px", textDecoration: "none" },
  senderPhone:   { margin: "4px 0 0", fontSize: "13px" },
  senderPhoneLink: { color: "#6b7280", textDecoration: "none" },
  fieldSection:  { marginBottom: "24px" },
  fieldLabel:    { margin: "0 0 8px", color: "#9ca3af", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "1px", fontWeight: "600" },
  messageBox:    { backgroundColor: "#f9fafb", borderLeft: "3px solid", padding: "16px 20px", borderRadius: "0 6px 6px 0" },
  messageText:   { margin: "0", color: "#374151", fontSize: "15px", lineHeight: "1.6", whiteSpace: "pre-wrap" as const },
  noMessage:     { margin: "0", color: "#9ca3af", fontSize: "14px", fontStyle: "italic" as const },
  btnSection:    { textAlign: "center" as const, paddingTop: "8px" },
  btn:           { color: "#ffffff", padding: "12px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" },
  footerDivider: { borderColor: "#e5e7eb", margin: "0" },
  footer:        { backgroundColor: "#f9fafb", padding: "20px 40px", textAlign: "center" as const },
  footerCompany: { margin: "0 0 2px", color: "#6b7280", fontSize: "13px", fontWeight: "600" },
  footerSite:    { margin: "0 0 6px", fontSize: "12px" },
  copyright:     { margin: "0", color: "#d1d5db", fontSize: "11px" },
};
