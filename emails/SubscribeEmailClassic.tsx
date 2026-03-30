import {
  Body, Button, Container, Head, Hr, Html,
  Img, Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

type Props = { name?: string; email: string; role?: string };

export default function SubscribeEmailClassic({ name, email, role }: Props) {
  const year = new Date().getFullYear();
  const siteName = mailConfig.fromName;
  const siteUrl = mailConfig.siteUrl;
  const logoUrl = mailConfig.logoUrl || `${siteUrl}/logo.webp`;
  const displayName = name || email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <Html>
      <Head />
      <Preview>New subscriber — {displayName} has signed up</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Logo header */}
          <Section style={logoHeader}>
            <Img src={logoUrl} alt={siteName} height="44" style={logoImg} />
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={heading}>New Subscriber</Text>
            <Text style={subheading}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </Text>

            {/* Subscriber card */}
            <Section style={subscriberCard}>
              <table>
                <tr>
                  <td style={avatarCell}>
                    <div style={avatar}>{initial}</div>
                  </td>
                  <td style={subscriberInfo}>
                    {name && <Text style={subscriberName}>{name}</Text>}
                    <Link href={`mailto:${email}`} style={subscriberEmail}>{email}</Link>
                    {role && <Text style={subscriberRole}>{role}</Text>}
                  </td>
                </tr>
              </table>
            </Section>

            {/* Details */}
            <Section style={detailsSection}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                {name && (
                  <tr>
                    <td style={detailLabel}>Name</td>
                    <td style={detailValue}>{name}</td>
                  </tr>
                )}
                <tr>
                  <td style={detailLabel}>Email</td>
                  <td style={detailValue}>
                    <Link href={`mailto:${email}`} style={linkStyle}>{email}</Link>
                  </td>
                </tr>
                {role && (
                  <tr>
                    <td style={detailLabel}>Role</td>
                    <td style={detailValue}>{role}</td>
                  </tr>
                )}
                <tr>
                  <td style={detailLabel}>Signed up</td>
                  <td style={detailValue}>{new Date().toLocaleString("en-GB")}</td>
                </tr>
              </table>
            </Section>

            <Section style={buttonSection}>
              <Button href={`mailto:${email}`} style={replyButton}>
                Reply to {name ? name.split(" ")[0] : "subscriber"}
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              Someone signed up on{" "}
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
const subscriberCard = { backgroundColor: "#f9fafb", borderRadius: "8px", padding: "20px", marginBottom: "20px", border: "1px solid #e5e7eb" };
const avatarCell = { width: "50px", verticalAlign: "top" as const };
const avatar = { width: "46px", height: "46px", backgroundColor: "#111827", borderRadius: "50%", color: "#ffffff", fontSize: "18px", fontWeight: "600" as const, lineHeight: "46px", textAlign: "center" as const };
const subscriberInfo = { paddingLeft: "16px", verticalAlign: "top" as const };
const subscriberName = { margin: "0 0 4px", color: "#111827", fontSize: "16px", fontWeight: "600" };
const subscriberEmail = { color: "#4f46e5", fontSize: "14px", textDecoration: "none" };
const subscriberRole = { margin: "4px 0 0", color: "#6b7280", fontSize: "13px" };
const detailsSection = { backgroundColor: "#f9fafb", borderRadius: "6px", padding: "16px 20px", marginBottom: "24px", border: "1px solid #e5e7eb" };
const detailLabel = { color: "#9ca3af", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "0.5px", fontWeight: "600", padding: "7px 12px 7px 0", width: "90px", verticalAlign: "top" as const };
const detailValue = { color: "#1f2937", fontSize: "14px", padding: "7px 0", verticalAlign: "top" as const };
const linkStyle = { color: "#4f46e5", textDecoration: "none" };
const buttonSection = { textAlign: "center" as const, paddingTop: "4px" };
const replyButton = { backgroundColor: "#111827", color: "#ffffff", padding: "13px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" };
const divider = { borderColor: "#e5e7eb", margin: "0" };
const footer = { backgroundColor: "#f9fafb", padding: "24px 40px", textAlign: "center" as const };
const footerText = { margin: "0 0 4px", color: "#9ca3af", fontSize: "12px" };
const footerLink = { color: "#6b7280", textDecoration: "none" };
const copyright = { margin: "0", color: "#d1d5db", fontSize: "11px" };
