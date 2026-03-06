// configs/forms.ts — control which form layouts appear and how they behave

export type ContactFormType =
  | "minimal"   // single centered column
  | "detailed"; // two-column: left info panel + right form

export type SubscribeFormType =
  | "inline"    // horizontal: email input + button in one row
  | "card"      // centered card with name + email
  | "waitlist"; // full hero: heading, subscriber count, name + email + role

export type CaptchaProvider =
  | "turnstile"      // Cloudflare Turnstile — NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY
  | "recaptcha-v2"   // Google reCAPTCHA v2 — NEXT_PUBLIC_RECAPTCHA_SITE_KEY + RECAPTCHA_SECRET_KEY
  | "recaptcha-v3";  // Google reCAPTCHA v3 — same keys as v2

export type FormsConfig = {
  contactFormType: ContactFormType;
  subscribeFormType: SubscribeFormType;
  enableContactForm: boolean;
  enableSubscribeForm: boolean;
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
};

export const formsConfig: FormsConfig = {
  // "minimal" | "detailed"
  contactFormType: "minimal",

  // "inline" | "card" | "waitlist"
  subscribeFormType: "inline",

  enableContactForm: true,
  enableSubscribeForm: true,

  // "turnstile" | "recaptcha-v2" | "recaptcha-v3"
  captchaProvider: "turnstile",

  contactForm: {
    showPhone: true,
    requireCaptcha: false,
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
