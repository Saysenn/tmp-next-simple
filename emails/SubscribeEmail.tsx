import {
  Body, Head, Hr, Html,
  Link, Preview, Section, Text,
} from "@react-email/components";
import { mailConfig } from "@/configs/mail";

type Props = {
  name?: string;
  email: string;
  role?: string;
};

export default function SubscribeEmail({ name, email, role }: Props) {
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

        <Section style={s.wrap}>
          <Text style={s.company}>{siteName}</Text>
          <Hr style={s.hr} />
          <Text style={s.date}>{date}</Text>

          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tbody>
              {name && (
                <tr>
                  <td style={s.label}>Name</td>
                  <td style={s.value}>{name}</td>
                </tr>
              )}
              <tr>
                <td style={s.label}>Email</td>
                <td style={s.value}>
                  <Link href={`mailto:${email}`} style={s.link}>{email}</Link>
                </td>
              </tr>
              {role && (
                <tr>
                  <td style={s.label}>Role</td>
                  <td style={s.value}>{role}</td>
                </tr>
              )}
            </tbody>
          </table>

          <Text style={s.reply}>
            <Link href={`mailto:${email}`} style={s.replyLink}>Reply to {displayName.split(" ")[0]} →</Link>
          </Text>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            © {year} {siteName}{siteUrl ? ` · ${siteUrl.replace(/^https?:\/\//, "")}` : ""}
          </Text>
        </Section>

      </Body>
    </Html>
  );
}

const s = {
  body:      { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif", margin: "0", padding: "0" },
  wrap:      { padding: "32px 40px" },
  company:   { margin: "0 0 16px", color: "#9ca3af", fontSize: "13px" },
  hr:        { borderColor: "#e5e7eb", margin: "20px 0" },
  date:      { margin: "0 0 20px", color: "#9ca3af", fontSize: "13px" },
  label:     { color: "#6b7280", fontSize: "13px", padding: "4px 20px 4px 0", width: "80px", verticalAlign: "top" as const },
  value:     { color: "#111827", fontSize: "14px", padding: "4px 0", verticalAlign: "top" as const },
  link:      { color: "#111827", textDecoration: "underline" },
  reply:     { margin: "20px 0 0" },
  replyLink: { color: "#111827", fontSize: "14px", textDecoration: "none" },
  footer:    { margin: "0", color: "#9ca3af", fontSize: "12px" },
};
