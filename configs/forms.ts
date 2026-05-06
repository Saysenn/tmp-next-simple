// configs/forms.ts — form behaviour config
// To switch form variant: change the import in the page directly.
//   e.g. app/contact/page.tsx → swap ContactFormClassic for ContactFormCard

export type SubscribeFormType =
  | "inline"    // horizontal: email input + button in one row
  | "card"      // centered card with name + email
  | "waitlist"; // full hero: heading, subscriber count, name + email + role

export type CaptchaProvider =
  | "turnstile"      // Cloudflare Turnstile — NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY
  | "recaptcha-v2"   // Google reCAPTCHA v2 — NEXT_PUBLIC_RECAPTCHA_SITE_KEY + RECAPTCHA_SECRET_KEY
  | "recaptcha-v3";  // Google reCAPTCHA v3 — same keys as v2

export type AllowedCvFileType = "pdf" | "doc" | "docx";

export type FormsConfig = {
  enableContactForm: boolean;
  enableSubscribeForm: boolean;
  enableApplicationForm: boolean;
  captchaProvider: CaptchaProvider;
  contactForm: {
    showPhone: boolean;
    requireCaptcha: boolean;
  };
  subscribeForm: {
    showNameField: boolean;
    showRoleField: boolean;
    subscriberCount: number;
    roleOptions: string[];
    requireCaptcha: boolean;
  };
  applicationForm: {
    showPhone: boolean;
    showPosition: boolean;
    showCoverLetter: boolean;
    requireCaptcha: boolean;
    maxFileSizeMb: number;
    allowedFileTypes: AllowedCvFileType[];
  };
};

export const formsConfig: FormsConfig = {
  enableContactForm: true,
  enableSubscribeForm: true,
  enableApplicationForm: true,

  // "turnstile" | "recaptcha-v2" | "recaptcha-v3"
  captchaProvider: "recaptcha-v2",

  contactForm: {
    showPhone: true,
    requireCaptcha: false,
  },

  applicationForm: {
    showPhone: true,
    showPosition: true,
    showCoverLetter: true,
    requireCaptcha: false,
    maxFileSizeMb: 5,
    allowedFileTypes: ["pdf", "doc", "docx"],
  },

  subscribeForm: {
    showNameField: true,
    showRoleField: false,
    subscriberCount: 1240,
    requireCaptcha: false,
    roleOptions: [
      "Founder / CEO",
      "Product Manager",
      "Developer",
      "Designer",
      "Investor",
      "Other",
    ],
  },
};
