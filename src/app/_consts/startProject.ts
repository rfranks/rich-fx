export const START_PROJECT_EMAIL = {
  to: "richardfranksjr@hotmail.com",
  subject: "RichFX project starter",
} as const;

export const START_PROJECT_CTA = {
  href: `mailto:${START_PROJECT_EMAIL.to}`,
  label: "Start a project",
} as const;
