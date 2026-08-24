export const START_PROJECT_EMAIL = {
  to: "inquiries@rich-fx.com",
  subject: "RichFX project starter",
} as const;

export const USE_ETSY = true;

export const START_PROJECT_ETSY_URL = "https://www.etsy.com/shop/RichFX";

export const START_PROJECT_CTA = {
  href: `mailto:${START_PROJECT_EMAIL.to}`,
  label: "Start a project",
} as const;
