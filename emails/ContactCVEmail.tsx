import {
  Body, Container, Head, Hr, Html,
  Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

type Props = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  cvFilename?: string;
};

export default function ContactCVEmail({ name, email, phone, message, cvFilename }: Props) {
  const year = new Date().getFullYear();
  const siteName = mailConfig.fromName;
  const siteUrl = mailConfig.siteUrl;

  return (
    <Html>
      <Head />
      <Preview>New message from {name}{cvFilename ? " (CV attached)" : ""}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>{siteName}</Text>
          </Section>

          <Section style={content}>
            <Text style={heading}>New Contact Message</Text>
            {cvFilename && (
              <Text style={badge}>📎 CV attached: {cvFilename}</Text>
            )}

            <Hr style={divider} />

            <Text style={label}>From</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>
              <Link href={`mailto:${email}`} style={link}>{email}</Link>
            </Text>

            {phone && (
              <>
                <Text style={label}>Phone</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}

            <Hr style={divider} />

            <Text style={label}>Message</Text>
            <Text style={messageBody}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              © {year}{" "}
              <Link href={siteUrl} style={footerLink}>{siteName}</Link>
              {" "}· Sent via contact form
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ───────────────────────────────────────────────────

const main = { backgroundColor: "#f4f4f5", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const container = { maxWidth: "600px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "12px", overflow: "hidden" as const, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" };
const header = { backgroundColor: "#4f46e5", padding: "28px 40px" };
const headerText = { color: "#ffffff", fontSize: "20px", fontWeight: "700", margin: "0" };
const content = { padding: "36px 40px" };
const heading = { fontSize: "22px", fontWeight: "700", color: "#111827", margin: "0 0 4px" };
const badge = { display: "inline-block" as const, backgroundColor: "#eef2ff", color: "#4f46e5", fontSize: "13px", padding: "4px 12px", borderRadius: "20px", margin: "8px 0 20px" };
const divider = { borderColor: "#e5e7eb", margin: "20px 0" };
const label = { fontSize: "11px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.05em", margin: "12px 0 2px" };
const value = { fontSize: "15px", color: "#111827", margin: "0 0 4px" };
const messageBody = { fontSize: "15px", color: "#374151", lineHeight: "1.7", whiteSpace: "pre-wrap" as const, backgroundColor: "#f9fafb", borderLeft: "3px solid #e5e7eb", padding: "12px 16px", borderRadius: "4px", margin: "4px 0" };
const link = { color: "#4f46e5" };
const footer = { backgroundColor: "#f9fafb", padding: "20px 40px", borderTop: "1px solid #e5e7eb" };
const footerText = { fontSize: "12px", color: "#9ca3af", margin: "0", textAlign: "center" as const };
const footerLink = { color: "#9ca3af" };
