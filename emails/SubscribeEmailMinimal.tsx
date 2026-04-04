import {
  Body, Container, Head, Hr, Html,
  Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

// Update hex when rebranding
const ACCENT = "#6ed39a";

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
      <Preview>New subscriber — {displayName}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>

          <Section style={s.top}>
            <Text style={s.company}>{siteName}</Text>
          </Section>

          <Hr style={s.divider} />

          <Section style={s.content}>
            <Text style={s.date}>{date}</Text>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              {name && (
                <tr>
                  <td style={s.label}>Name</td>
                  <td style={s.value}>{name}</td>
                </tr>
              )}
              <tr>
                <td style={s.label}>Email</td>
                <td style={s.value}>
                  <Link href={`mailto:${email}`} style={{ color: ACCENT, textDecoration: "none" }}>{email}</Link>
                </td>
              </tr>
              {role && (
                <tr>
                  <td style={s.label}>Role</td>
                  <td style={s.value}>{role}</td>
                </tr>
              )}
              <tr>
                <td style={s.label}>Signed up</td>
                <td style={s.value}>{new Date().toLocaleString("en-GB")}</td>
              </tr>
            </table>

            <Text style={s.replyText}>
              <Link href={`mailto:${email}`} style={s.replyLink}>Reply to {displayName.split(" ")[0]} →</Link>
            </Text>
          </Section>

          <Hr style={s.divider} />

          <Section style={s.footer}>
            <Text style={s.footerText}>
              © {year} {siteName}
              {siteUrl && (
                <> · <Link href={siteUrl} style={{ color: "#9ca3af", textDecoration: "none" }}>{siteUrl.replace(/^https?:\/\//, "")}</Link></>
              )}
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

const s = {
  body:       { backgroundColor: "#ffffff", fontFamily: "'Helvetica Neue', Arial, sans-serif", margin: "0", padding: "0" },
  container:  { width: "100%", margin: "0 auto", backgroundColor: "#ffffff" },
  top:        { padding: "40px 48px 20px" },
  company:    { margin: "0", color: "#9ca3af", fontSize: "13px", fontWeight: "500" },
  divider:    { borderColor: "#e5e7eb", margin: "0" },
  content:    { padding: "32px 48px" },
  date:       { margin: "0 0 24px", color: "#9ca3af", fontSize: "13px" },
  label:      { color: "#9ca3af", fontSize: "11px", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px", padding: "6px 24px 6px 0", width: "72px", verticalAlign: "top" as const },
  value:      { color: "#111827", fontSize: "14px", padding: "6px 0", verticalAlign: "top" as const },
  replyText:  { margin: "24px 0 0" },
  replyLink:  { color: "#111827", fontSize: "14px", fontWeight: "500", textDecoration: "none" },
  footer:     { padding: "20px 48px 40px" },
  footerText: { margin: "0", color: "#9ca3af", fontSize: "12px" },
};
