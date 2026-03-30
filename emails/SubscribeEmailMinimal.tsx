import {
  Body, Container, Head, Hr, Html,
  Img, Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

type Props = { name?: string; email: string; role?: string };

export default function SubscribeEmailMinimal({ name, email, role }: Props) {
  const year = new Date().getFullYear();
  const siteName = mailConfig.fromName;
  const siteUrl = mailConfig.siteUrl;
  const logoUrl = mailConfig.logoUrl || `${siteUrl}/logo.webp`;
  const displayName = name || email;

  return (
    <Html>
      <Head />
      <Preview>New subscriber — {displayName} has signed up</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Logo header */}
          <Section style={logoHeader}>
            <Img src={logoUrl} alt={siteName} height="40" style={logoImg} />
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={label}>New Subscription</Text>
            <Text style={title}>New Signup</Text>
            <Text style={date}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </Text>

            <Hr style={dividerTop} />

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              {name && (
                <tr>
                  <td style={fieldKey}>Name</td>
                  <td style={fieldVal}>{name}</td>
                </tr>
              )}
              <tr>
                <td style={fieldKey}>Email</td>
                <td style={fieldVal}>
                  <Link href={`mailto:${email}`} style={linkStyle}>{email}</Link>
                </td>
              </tr>
              {role && (
                <tr>
                  <td style={fieldKey}>Role</td>
                  <td style={fieldVal}>{role}</td>
                </tr>
              )}
              <tr>
                <td style={fieldKey}>Signed up</td>
                <td style={fieldVal}>{new Date().toLocaleString("en-GB")}</td>
              </tr>
            </table>

            <Hr style={dividerMid} />

            <Text style={replyText}>
              <Link href={`mailto:${email}`} style={replyLink}>
                Reply to {name ? name.split(" ")[0] : "subscriber"} →
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

const main = { backgroundColor: "#f4f4f5", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const container = { maxWidth: "560px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" as const, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" };
const logoHeader = { backgroundColor: "#ffffff", padding: "28px 40px 20px", textAlign: "center" as const, borderBottom: "1px solid #e5e7eb" };
const logoImg = { margin: "0 auto", display: "block" };
const content = { padding: "32px 40px" };
const label = { margin: "0 0 4px", color: "#9ca3af", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "2px" };
const title = { margin: "0 0 4px", color: "#111827", fontSize: "24px", fontWeight: "700" };
const date = { margin: "0 0 20px", color: "#6b7280", fontSize: "13px" };
const dividerTop = { borderColor: "#e5e7eb", margin: "0 0 20px" };
const dividerMid = { borderColor: "#e5e7eb", margin: "20px 0" };
const fieldKey = { color: "#9ca3af", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px", padding: "7px 20px 7px 0", width: "90px", verticalAlign: "top" as const };
const fieldVal = { color: "#1f2937", fontSize: "14px", padding: "7px 0", verticalAlign: "top" as const };
const linkStyle = { color: "#4f46e5", textDecoration: "none" };
const replyText = { margin: "0" };
const replyLink = { color: "#111827", fontSize: "14px", fontWeight: "600", textDecoration: "none" };
const footer = { borderTop: "1px solid #e5e7eb", padding: "20px 40px" };
const footerText = { margin: "0", color: "#9ca3af", fontSize: "12px", textAlign: "center" as const };
const footerLink = { color: "#9ca3af", textDecoration: "none" };
