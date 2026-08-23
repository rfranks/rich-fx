import type { ReactNode } from "react";

export type StartProjectStepId = "project" | "details" | "contact" | "email";

export type StartProjectProjectType =
  | "holiday-card"
  | "calendar"
  | "cartoon"
  | "fantasy"
  | "game"
  | "movie"
  | "song"
  | "not-sure";

export type StartProjectOccasionId =
  | "gift"
  | "holiday"
  | "birthday"
  | "vacation"
  | "retirement"
  | "wedding"
  | "birth"
  | "just-because"
  | "anniversary"
  | "graduation"
  | "memorial"
  | "business"
  | "other";

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

export type StartProjectOccasionOption = {
  id: StartProjectOccasionId;
  label: string;
};

export type StartProjectFormState = {
  projectType: StartProjectProjectType | "";
  imageStyleSlug: string;
  occasionType: StartProjectOccasionId | "";
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

export type StartProjectStepComponentProps = {
  form: StartProjectFormState;
  emailBody?: string;
  onChange: <TKey extends keyof StartProjectFormState>(
    key: TKey,
    value: StartProjectFormState[TKey],
  ) => void;
};

export type StartProjectIconMap = Record<StartProjectIconKey, ReactNode>;
