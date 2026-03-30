import {
  Body, Button, Container, Head, Hr, Html,
  Img, Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

type Props = { name: string; email: string; phone: string; message?: string };

export default function ContactEmailClassic({ name, email, phone, message }: Props) {
  const year = new Date().getFullYear();
  const siteName = mailConfig.fromName;
  const siteUrl = mailConfig.siteUrl;
  const logoUrl = mailConfig.logoUrl || `${siteUrl}/logo.webp`;

  return (
    <Html>
      <Head />
      <Preview>New enquiry from {name} via the contact form</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Logo header */}
          <Section style={logoHeader}>
            <Img src={logoUrl} alt={siteName} height="44" style={logoImg} />
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={heading}>New Contact Form Submission</Text>
            <Text style={subheading}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </Text>

            {/* Sender card */}
            <Section style={senderCard}>
              <table>
                <tr>
                  <td style={avatarCell}>
                    <div style={avatar}>{name.charAt(0).toUpperCase()}</div>
                  </td>
                  <td style={senderInfo}>
                    <Text style={senderName}>{name}</Text>
                    <Link href={`mailto:${email}`} style={senderEmail}>{email}</Link>
                    {phone && (
                      <Text style={senderPhone}>
                        <Link href={`tel:${phone}`} style={senderPhoneLink}>{phone}</Link>
                      </Text>
                    )}
                  </td>
                </tr>
              </table>
            </Section>

            {/* Message */}
            {message ? (
              <Section style={fieldSection}>
                <Text style={fieldLabel}>Message</Text>
                <Section style={messageBox}>
                  <Text style={messageText}>{message}</Text>
                </Section>
              </Section>
            ) : (
              <Section style={fieldSection}>
                <Text style={noMessage}>No message provided.</Text>
              </Section>
            )}

            <Section style={buttonSection}>
              <Button href={`mailto:${email}`} style={replyButton}>
                Reply to {name.split(" ")[0]}
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the contact form on{" "}
              {siteUrl ? (
                <Link href={siteUrl} style={footerLink}>{siteUrl.replace(/^https?:\/\//, "")}</Link>
              ) : siteName}
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
const senderCard = { backgroundColor: "#f9fafb", borderRadius: "8px", padding: "20px", marginBottom: "24px", border: "1px solid #e5e7eb" };
const avatarCell = { width: "50px", verticalAlign: "top" as const };
const avatar = { width: "46px", height: "46px", backgroundColor: "#111827", borderRadius: "50%", color: "#ffffff", fontSize: "18px", fontWeight: "600" as const, lineHeight: "46px", textAlign: "center" as const };
const senderInfo = { paddingLeft: "16px", verticalAlign: "top" as const };
const senderName = { margin: "0 0 4px", color: "#111827", fontSize: "16px", fontWeight: "600" };
const senderEmail = { color: "#4f46e5", fontSize: "14px", textDecoration: "none" };
const senderPhone = { margin: "4px 0 0", fontSize: "13px" };
const senderPhoneLink = { color: "#6b7280", textDecoration: "none" };
const fieldSection = { marginBottom: "24px" };
const fieldLabel = { margin: "0 0 8px", color: "#9ca3af", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "1px", fontWeight: "600" };
const messageBox = { backgroundColor: "#f9fafb", borderLeft: "3px solid #e5e7eb", padding: "16px 20px", borderRadius: "0 6px 6px 0" };
const messageText = { margin: "0", color: "#374151", fontSize: "15px", lineHeight: "1.6", whiteSpace: "pre-wrap" as const };
const noMessage = { margin: "0", color: "#9ca3af", fontSize: "14px", fontStyle: "italic" as const };
const buttonSection = { textAlign: "center" as const, paddingTop: "8px" };
const replyButton = { backgroundColor: "#111827", color: "#ffffff", padding: "13px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" };
const divider = { borderColor: "#e5e7eb", margin: "0" };
const footer = { backgroundColor: "#f9fafb", padding: "24px 40px", textAlign: "center" as const };
const footerText = { margin: "0 0 4px", color: "#9ca3af", fontSize: "12px" };
const footerLink = { color: "#6b7280", textDecoration: "none" };
const copyright = { margin: "0", color: "#d1d5db", fontSize: "11px" };
