import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Img, Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

type Props = { name?: string; email: string; role?: string };

export default function SubscribeEmailClassic({ name, email, role }: Props) {
  const year = new Date().getFullYear();
  const siteName = mailConfig.fromName;
  const siteUrl = mailConfig.siteUrl;
  const logoUrl = mailConfig.logoUrl;
  const displayName = name || email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <Html>
      <Head />
      <Preview>New early access signup from {displayName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            {logoUrl && (
              <Img src={logoUrl} alt={siteName} height="48" style={logo} />
            )}
            <Heading style={headerTitle}>New Early Access Signup</Heading>
            <Text style={headerDate}>
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long", year: "numeric", month: "long", day: "numeric",
              })}
            </Text>
          </Section>

          {/* Content */}
          <Section style={content}>
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

            {/* Details rows */}
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

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Someone signed up for early access on{" "}
              {siteUrl ? (
                <Link href={siteUrl} style={footerLink}>{siteUrl.replace(/^https?:\/\//, "")}</Link>
              ) : (
                siteName
              )}
            </Text>
            <Text style={copyright}>© {year} {siteName}. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f8fafb", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const container = { maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden" as const, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" };
const header = { background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", padding: "40px 30px", textAlign: "center" as const };
const logo = { margin: "0 auto 20px" };
const headerTitle = { color: "#ffffff", fontSize: "24px", fontWeight: "600", margin: "0" };
const headerDate = { color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: "10px 0 0" };
const content = { padding: "40px 30px" };
const subscriberCard = { backgroundColor: "#f0f4ff", borderRadius: "12px", padding: "24px", marginBottom: "30px" };
const avatarCell = { width: "50px", verticalAlign: "top" as const };
const avatar = { width: "50px", height: "50px", background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", borderRadius: "50%", color: "#ffffff", fontSize: "20px", fontWeight: "600" as const, lineHeight: "50px", textAlign: "center" as const };
const subscriberInfo = { paddingLeft: "16px", verticalAlign: "top" as const };
const subscriberName = { margin: "0 0 4px", color: "#1a1a2e", fontSize: "18px", fontWeight: "600" };
const subscriberEmail = { color: "#4f46e5", fontSize: "14px", textDecoration: "none" };
const subscriberRole = { margin: "4px 0 0", color: "#64748b", fontSize: "13px" };
const detailsSection = { backgroundColor: "#f8fafc", borderRadius: "8px", padding: "20px", marginBottom: "24px" };
const detailLabel = { color: "#94a3b8", fontSize: "12px", textTransform: "uppercase" as const, letterSpacing: "0.5px", fontWeight: "600", padding: "8px 12px 8px 0", width: "100px", verticalAlign: "top" as const };
const detailValue = { color: "#334155", fontSize: "14px", padding: "8px 0", verticalAlign: "top" as const };
const linkStyle = { color: "#4f46e5", textDecoration: "none" };
const buttonSection = { textAlign: "center" as const };
const replyButton = { background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", color: "#ffffff", padding: "14px 32px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", textDecoration: "none" };
const divider = { borderColor: "#e8eef2", margin: "0" };
const footer = { backgroundColor: "#f8fafb", padding: "30px", textAlign: "center" as const };
const footerText = { margin: "0 0 8px", color: "#94a3b8", fontSize: "13px" };
const footerLink = { color: "#1a1a2e", fontWeight: "600", fontSize: "14px", textDecoration: "none" };
const copyright = { margin: "0", color: "#b0bec5", fontSize: "12px" };
