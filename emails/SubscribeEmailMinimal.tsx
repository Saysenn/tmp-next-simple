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

type Props = { name?: string; email: string; role?: string };

export default function SubscribeEmailMinimal({ name, email, role }: Props) {
  const year        = new Date().getFullYear();
  const date        = new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const siteName    = mailConfig.fromName;
  const siteUrl     = mailConfig.siteUrl;
  const displayName = name || email;

  return (
    <Html lang="en">
      <Head />
      <Preview>New subscriber — {displayName} joined the list</Preview>
      <Body style={s.body}>
        <Container style={s.container}>

          <Section style={{ ...s.header, backgroundColor: DARK }}>
            <Text style={s.brandName}>{siteName}</Text>
            <Text style={{ ...s.headerLabel, color: ACCENT }}>New Subscriber</Text>
          </Section>

          <Section style={s.content}>
            <Text style={s.date}>{date}</Text>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              {name && (
                <tr>
                  <td style={s.key}>Name</td>
                  <td style={s.val}>{name}</td>
                </tr>
              )}
              <tr>
                <td style={s.key}>Email</td>
                <td style={s.val}>
                  <Link href={`mailto:${email}`} style={{ color: ACCENT, textDecoration: "none" }}>{email}</Link>
                </td>
              </tr>
              {role && (
                <tr>
                  <td style={s.key}>Role</td>
                  <td style={s.val}>{role}</td>
                </tr>
              )}
              <tr>
                <td style={s.key}>Signed up</td>
                <td style={s.val}>{new Date().toLocaleString("en-GB")}</td>
              </tr>
            </table>

            <Section style={s.btnSection}>
              <Button href={`mailto:${email}`} style={{ ...s.btn, backgroundColor: DARK }}>
                Reply to {displayName.split(" ")[0]}
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
  key:           { color: "#9ca3af", fontSize: "11px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px", padding: "8px 20px 8px 0", width: "90px", verticalAlign: "top" as const },
  val:           { color: "#1f2937", fontSize: "14px", padding: "8px 0", verticalAlign: "top" as const },
  btnSection:    { textAlign: "center" as const, paddingTop: "24px" },
  btn:           { color: "#ffffff", padding: "12px 32px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", textDecoration: "none" },
  footerDivider: { borderColor: "#e5e7eb", margin: "0" },
  footer:        { backgroundColor: "#f9fafb", padding: "20px 40px", textAlign: "center" as const },
  footerCompany: { margin: "0 0 2px", color: "#6b7280", fontSize: "13px", fontWeight: "600" },
  footerSite:    { margin: "0 0 6px", fontSize: "12px" },
  copyright:     { margin: "0", color: "#d1d5db", fontSize: "11px" },
};
