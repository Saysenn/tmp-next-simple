// configs/mail.ts — email provider and delivery settings

export type EmailProvider = "resend" | "smtp";

export type MailConfig = {
  provider: EmailProvider;
  fromName: string;
  contactEmail: string; // where form submissions are delivered
  resend: {
    apiKey: string;
    fromEmail: string;
  };
  smtp: {
    host: string;
    port: number;
    secure: boolean; // true = port 465 (SSL), false = 587 (STARTTLS)
    user: string;
    pass: string;
    fromEmail: string;
  };
};

export const mailConfig: MailConfig = {
  // EMAIL_PROVIDER=resend | smtp
  provider: (process.env.EMAIL_PROVIDER as EmailProvider) || "resend",

  fromName: process.env.MAIL_FROM_NAME || "MyApp",
  contactEmail: process.env.CONTACT_EMAIL || "",

  resend: {
    apiKey: process.env.RESEND_API_KEY || "",
    fromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  },

  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    fromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "",
  },
};
