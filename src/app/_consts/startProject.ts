export const START_PROJECT_EMAIL = {
  to: "inquiries@rich-fx.com",
  subject: "RichFX project starter",
} as const;

export const START_PROJECT_CTA = {
  href: `mailto:${START_PROJECT_EMAIL.to}`,
  label: "Start a project",
} as const;
