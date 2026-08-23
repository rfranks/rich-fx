import { START_PROJECT_PROJECT_OPTIONS } from "@/app/_consts/startProjectWizard";
import { START_PROJECT_EMAIL } from "@/app/_consts/startProject";
import { IMAGE_STYLE_SAMPLES } from "@/app/_consts/imageStyleSampler";
import type {
  StartProjectFormState,
  StartProjectProjectType,
} from "@/app/_types/startProjectWizard";

const projectLabels = new Map(
  START_PROJECT_PROJECT_OPTIONS.map((option) => [option.id, option.label]),
);
const imageStyleLabels = new Map(
  IMAGE_STYLE_SAMPLES.map((sample) => [sample.slug, sample.label]),
);

const line = (label: string, value: string) =>
  value.trim() ? `${label}: ${value.trim()}` : "";

export const buildStartProjectEmailBody = (form: StartProjectFormState) => {
  const projectType = form.projectType
    ? (projectLabels.get(form.projectType) ?? form.projectType)
    : "";
  const imageStyle = form.imageStyleSlug
    ? (imageStyleLabels.get(form.imageStyleSlug) ?? form.imageStyleSlug)
    : "";

  return [
    "Hi RichFX,",
    "",
    "I would like to start a project.",
    "",
    line("Project type", projectType),
    line("Image style", imageStyle),
    line("Occasion or purpose", form.occasion),
    line("Required text", form.requiredText),
    line("Target delivery date", form.deadline),
    line("Notes", form.notes),
    "",
    line("Name", form.name),
    line("Reply email", form.replyEmail),
    line("Phone", form.phone),
    line("SMS permission", form.allowSms ? "Yes" : "No"),
    "",
    "Thanks!",
  ]
    .filter((value, index, values) => {
      if (value !== "" || values[index - 1] !== "") {
        return true;
      }

      return false;
    })
    .join("\n");
};

export const buildStartProjectMailto = (form: StartProjectFormState) => {
  const projectType = form.projectType
    ? (projectLabels.get(form.projectType as StartProjectProjectType) ??
      "project")
    : "project";
  const subject = `${START_PROJECT_EMAIL.subject}: ${projectType}`;
  const body = buildStartProjectEmailBody(form);

  return `mailto:${START_PROJECT_EMAIL.to}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
};

export const formatStartProjectPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const country = digits.slice(0, 1);
  const area = digits.slice(1, 4);
  const prefix = digits.slice(4, 7);
  const lineNumber = digits.slice(7, 11);

  if (!digits) {
    return "";
  }

  if (digits.length <= 1) {
    return `+${country}`;
  }

  if (digits.length <= 4) {
    return `+${country} (${area}`;
  }

  if (digits.length <= 7) {
    return `+${country} (${area}) ${prefix}`;
  }

  return `+${country} (${area}) ${prefix} - ${lineNumber}`;
};
