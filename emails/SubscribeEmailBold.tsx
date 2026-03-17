import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Img, Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

type Props = { name?: string; email: string; role?: string };

export default function SubscribeEmailBold({ name, email, role }: Props) {
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
          {/* Accent header */}
          <Section style={header}>
            {logoUrl && (
              <Img src={logoUrl} alt={siteName} height="40" style={logo} />
            )}
            <Text style={headerIcon}>🎉</Text>
            <Heading style={headerTitle}>New Signup!</Heading>
            <Text style={headerSub}>
              {displayName} joined the early access list
            </Text>
          </Section>

          {/* Subscriber row */}
          <Section style={content}>
            <Section style={subscriberRow}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={avatarCell}>
                    <div style={avatar}>{initial}</div>
                  </td>
                  <td style={subscriberMeta}>
                    {name && <Text style={subscriberName}>{name}</Text>}
                    <Link href={`mailto:${email}`} style={subscriberEmail}>{email}</Link>
                    {role && <Text style={subscriberRole}>{role}</Text>}
                  </td>
                  <td style={dateBadgeCell}>
                    <Text style={dateBadge}>
                      {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* Detail pills */}
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

            <Section style={btnSection}>
              <Button href={`mailto:${email}`} style={replyBtn}>
                Reply to {name ? name.split(" ")[0] : "subscriber"}
              </Button>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Sent via {siteName}
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

const main = { backgroundColor: "#f5f3ff", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const container = { maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "20px", overflow: "hidden" as const, boxShadow: "0 8px 32px rgba(79,70,229,0.12)" };
const header = { background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", padding: "44px 36px", textAlign: "center" as const };
const logo = { margin: "0 auto 16px", filter: "brightness(0) invert(1)" };
const headerIcon = { margin: "0 0 12px", fontSize: "40px", lineHeight: "1" };
const headerTitle = { color: "#ffffff", fontSize: "26px", fontWeight: "700", margin: "0 0 8px" };
const headerSub = { color: "rgba(255,255,255,0.82)", fontSize: "14px", margin: "0" };
const content = { padding: "36px 32px" };
const subscriberRow = { backgroundColor: "#faf9ff", borderRadius: "12px", padding: "20px", marginBottom: "24px", border: "1px solid #ede9fe" };
const avatarCell = { width: "52px", verticalAlign: "middle" as const };
const avatar = { width: "48px", height: "48px", background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", borderRadius: "50%", color: "#fff", fontSize: "20px", fontWeight: "700" as const, lineHeight: "48px", textAlign: "center" as const };
const subscriberMeta = { paddingLeft: "14px", verticalAlign: "middle" as const };
const subscriberName = { margin: "0 0 2px", color: "#1e1b4b", fontSize: "17px", fontWeight: "700" };
const subscriberEmail = { color: "#4f46e5", fontSize: "13px", textDecoration: "none" };
const subscriberRole = { margin: "3px 0 0", color: "#6b7280", fontSize: "13px" };
const dateBadgeCell = { textAlign: "right" as const, verticalAlign: "middle" as const };
const dateBadge = { margin: "0", color: "#9ca3af", fontSize: "12px" };
const detailsSection = { backgroundColor: "#faf9ff", borderRadius: "10px", padding: "16px 20px", marginBottom: "28px", border: "1px solid #ede9fe" };
const detailLabel = { color: "#a5b4fc", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "0.5px", padding: "6px 16px 6px 0", width: "80px", verticalAlign: "top" as const };
const detailValue = { color: "#374151", fontSize: "14px", padding: "6px 0", verticalAlign: "top" as const };
const linkStyle = { color: "#4f46e5", textDecoration: "none" };
const btnSection = { textAlign: "center" as const };
const replyBtn = { background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "15px", fontWeight: "700", textDecoration: "none", letterSpacing: "0.3px" };
const divider = { borderColor: "#ede9fe", margin: "0" };
const footer = { backgroundColor: "#faf9ff", padding: "24px 32px", textAlign: "center" as const };
const footerText = { margin: "0 0 4px", color: "#9ca3af", fontSize: "13px" };
const footerLink = { color: "#6366f1", textDecoration: "none" };
const copyright = { margin: "0", color: "#c4b5fd", fontSize: "12px" };
