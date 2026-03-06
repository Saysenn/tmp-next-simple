// configs/site.ts — switch between maintenance / coming-soon / full site modes

export type SiteMode = "maintenance" | "coming-soon" | "full";

export type SiteConfig = {
  mode: SiteMode;
  maintenance: {
    heading: string;
    message: string;
    expectedBack?: string;
    contactEmail?: string;
  };
  comingSoon: {
    headline: string;  // use \n for line breaks
    subline: string;
    showCountdown: boolean;
    launchDate?: string; // ISO 8601, only used when showCountdown is true
  };
};

export const siteConfig: SiteConfig = {
  // "maintenance" | "coming-soon" | "full"
  mode: "coming-soon",

  maintenance: {
    heading: "We'll be back soon",
    message:
      "We're performing scheduled maintenance to improve your experience. Thank you for your patience.",
    expectedBack: "a few hours",
    contactEmail: "hello@myapp.com",
  },

  comingSoon: {
    headline: "Something great\nis coming soon",
    subline:
      "We're putting the finishing touches on something you'll love. Sign up to be the first to know when we launch.",
    showCountdown: false,
    launchDate: "2026-06-01T00:00:00Z",
  },
};
