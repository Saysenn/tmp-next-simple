// configs/forms.ts — control which form layouts appear and how they behave

export type ContactFormType =
  | "classic"        // accent info panel left, boxed inputs right
  | "conversational" // sentence-driven inline inputs
  | "card"           // underline-only inputs, circular send button
  | "asymmetric"     // serif headline left, 2-col grid right
  | "progressive";   // start CTA → 3 guided steps (service → details → message)

export type ApplicationFormType =
  | "corporate"    // 60/40 split, compliance-heavy, sticky info panel
  | "steps"        // multi-step with progress bar
  | "editorial"    // luxury serif headline, underline-only inputs
  | "modular"      // card grid, free-order, skill chips
  | "progressive"; // start CTA → 3 guided steps (details → experience → CV)

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
  contactFormType: ContactFormType;
  applicationFormType: ApplicationFormType;
  subscribeFormType: SubscribeFormType;
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
  // "classic" | "conversational" | "card" | "asymmetric" | "progressive"
  contactFormType: "classic",

  // "corporate" | "steps" | "editorial" | "modular" | "progressive"
  applicationFormType: "corporate",

  // "inline" | "card" | "waitlist"
  subscribeFormType: "inline",

  enableContactForm: true,
  enableSubscribeForm: true,
  enableApplicationForm: true,

  // "turnstile" | "recaptcha-v2" | "recaptcha-v3"
  captchaProvider: "turnstile",

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
