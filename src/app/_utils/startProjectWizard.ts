import {
  START_PROJECT_MATERIAL_OPTIONS,
  START_PROJECT_OUTPUT_OPTIONS,
  START_PROJECT_PROJECT_OPTIONS,
} from "@/app/_consts/startProjectWizard";
import { START_PROJECT_EMAIL } from "@/app/_consts/startProject";
import { IMAGE_STYLE_SAMPLES } from "@/app/_consts/imageStyleSampler";
import type {
  StartProjectFormState,
  StartProjectMaterialId,
  StartProjectOutputId,
  StartProjectProjectType,
} from "@/app/_types/startProjectWizard";

const projectLabels = new Map(
  START_PROJECT_PROJECT_OPTIONS.map((option) => [option.id, option.label]),
);
const materialLabels = new Map(
  START_PROJECT_MATERIAL_OPTIONS.map((option) => [option.id, option.label]),
);
const outputLabels = new Map(
  START_PROJECT_OUTPUT_OPTIONS.map((option) => [option.id, option.label]),
);
const imageStyleLabels = new Map(
  IMAGE_STYLE_SAMPLES.map((sample) => [sample.slug, sample.label]),
);

const formatList = <TId extends string>(
  values: TId[],
  labels: Map<TId, string>,
) =>
  values
    .map((value) => labels.get(value))
    .filter(Boolean)
    .join(", ");

const line = (label: string, value: string) =>
  value.trim() ? `${label}: ${value.trim()}` : "";

export const buildStartProjectEmailBody = (form: StartProjectFormState) => {
  const projectType = form.projectType
    ? (projectLabels.get(form.projectType) ?? form.projectType)
    : "";
  const materials = formatList<StartProjectMaterialId>(
    form.materials,
    materialLabels,
  );
  const outputs = formatList<StartProjectOutputId>(form.outputs, outputLabels);
  const imageStyle = form.imageStyleSlug
    ? (imageStyleLabels.get(form.imageStyleSlug) ?? form.imageStyleSlug)
    : "";

  return [
    "Hi RichFX,",
    "",
    "I would like to start a project.",
    "",
    line("Project type", projectType),
    line("Featured subject", form.featuredSubject),
    line("Source material", form.sourceNotes),
    line("Available materials", materials),
    line("Image style", imageStyle),
    line("Style or theme", form.styleDirection),
    line("Occasion or purpose", form.occasion),
    line("Desired output", outputs),
    line("Required text", form.requiredText),
    line("Timeline", form.deadline),
    line("Notes", form.notes),
    "",
    line("Name", form.name),
    line("Reply email", form.replyEmail),
    line("Phone", form.phone),
    line("SMS permission", form.allowSms ? "Yes" : "No"),
    "",
    "I will attach any useful photos or reference files before sending.",
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

export const toggleStartProjectValue = <TValue>(
  values: TValue[],
  value: TValue,
) =>
  values.includes(value)
    ? values.filter((currentValue) => currentValue !== value)
    : [...values, value];

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
