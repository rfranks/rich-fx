import type { ReactNode } from "react";

export type StartProjectStepId =
  | "project"
  | "source"
  | "details"
  | "contact"
  | "email";

export type StartProjectProjectType =
  | "holiday-card"
  | "calendar"
  | "cartoon"
  | "fantasy"
  | "game"
  | "movie"
  | "song"
  | "not-sure";

export type StartProjectMaterialId =
  | "photos"
  | "reference"
  | "names-dates"
  | "story"
  | "lyrics";

export type StartProjectOutputId =
  | "print-card"
  | "calendar"
  | "image-set"
  | "short-video"
  | "song"
  | "album-art";

export type StartProjectIconKey =
  | "holiday"
  | "calendar"
  | "cartoon"
  | "fantasy"
  | "game"
  | "movie"
  | "song"
  | "spark";

export type StartProjectOption<TId extends string> = {
  id: TId;
  label: string;
  description: string;
  iconKey: StartProjectIconKey;
};

export type StartProjectStep = {
  id: StartProjectStepId;
  label: string;
};

export type StartProjectFormState = {
  projectType: StartProjectProjectType | "";
  materials: StartProjectMaterialId[];
  outputs: StartProjectOutputId[];
  featuredSubject: string;
  sourceNotes: string;
  styleDirection: string;
  imageStyleSlug: string;
  occasion: string;
  requiredText: string;
  deadline: string;
  notes: string;
  name: string;
  replyEmail: string;
  phone: string;
  allowSms: boolean;
};

export type StartProjectWizardProps = {
  open: boolean;
  onClose: () => void;
};

export type StartProjectChoiceCardProps<TId extends string> = {
  option: StartProjectOption<TId>;
  selected: boolean;
  onSelect: (id: TId) => void;
};

export type StartProjectChipFieldProps<TId extends string> = {
  legend: string;
  options: StartProjectOption<TId>[];
  selectedIds: TId[];
  onToggle: (id: TId) => void;
};

export type StartProjectStepComponentProps = {
  form: StartProjectFormState;
  emailBody?: string;
  onChange: <TKey extends keyof StartProjectFormState>(
    key: TKey,
    value: StartProjectFormState[TKey],
  ) => void;
  onToggleMaterial: (id: StartProjectMaterialId) => void;
  onToggleOutput: (id: StartProjectOutputId) => void;
};

export type StartProjectIconMap = Record<StartProjectIconKey, ReactNode>;
