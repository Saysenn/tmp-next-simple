// configs/forms.ts — control which form layouts appear and how they behave

export type ContactFormType =
  | "minimal"          // Batch 1 — single centered column
  | "detailed"         // Batch 1 — two-column: left info panel + right form
  | "classic"          // Batch 2 — accent info panel left, boxed inputs right
  | "conversational"   // Batch 2 — sentence-driven inline inputs
  | "card"             // Batch 2 — underline-only inputs, circular send button
  | "asymmetric"       // Batch 2 — serif headline left, 2-col grid right
  | "progressive";     // Batch 2 — start CTA → 3 guided steps (service → details → message)

export type ApplicationFormType =
  | "standard"     // Batch 1 — single column, all fields optional
  | "corporate"    // Batch 2 — 60/40 split, compliance-heavy, sticky info panel
  | "steps"        // Batch 2 — multi-step with progress bar
  | "editorial"    // Batch 2 — luxury serif headline, underline-only inputs
  | "modular"      // Batch 2 — card grid, free-order, skill chips
  | "progressive"; // Batch 2 — start CTA → 3 guided steps (details → experience → CV)

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
  enableContactCVForm: boolean;
  captchaProvider: CaptchaProvider;
  contactForm: {
    showPhone: boolean;
    requireCaptcha: boolean;
  };
  contactCVForm: {
    showPhone: boolean;      // show phone field (required when shown)
    requireCaptcha: boolean;
    maxFileSizeMb: number;
    allowedFileTypes: AllowedCvFileType[];
  };
  subscribeForm: {
    showNameField: boolean;
    showRoleField: boolean;
    subscriberCount: number;
    roleOptions: string[];
    requireCaptcha: boolean;
  };
  applicationForm: {
    showPhone: boolean;       // show optional phone field
    showPosition: boolean;    // show optional "position applied for" field
    showCoverLetter: boolean; // show optional cover letter textarea
    requireCaptcha: boolean;
    maxFileSizeMb: number;    // max CV file size (default: 5)
    allowedFileTypes: AllowedCvFileType[]; // accepted file types
  };
};

export const formsConfig: FormsConfig = {
  // "minimal" | "detailed" | "classic" | "conversational" | "card" | "asymmetric" | "progressive"
  contactFormType: "minimal",

  // "standard" | "corporate" | "steps" | "editorial" | "modular" | "progressive"
  applicationFormType: "standard",

  // "inline" | "card" | "waitlist"
  subscribeFormType: "inline",

  enableContactForm: true,
  enableSubscribeForm: true,
  enableApplicationForm: true,
  enableContactCVForm: true,

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
    // "pdf" | "doc" | "docx"
    allowedFileTypes: ["pdf", "doc", "docx"] as ("pdf" | "doc" | "docx")[],
  },

  contactCVForm: {
    showPhone: true,
    requireCaptcha: false,
    maxFileSizeMb: 5,
    // "pdf" | "doc" | "docx"
    allowedFileTypes: ["pdf", "doc", "docx"] as AllowedCvFileType[],
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
