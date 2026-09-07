export type ContestStatus =
  | "prelaunch"
  | "open"
  | "closed"
  | "judging"
  | "winners";

export type DownloadActionKind = "download" | "open";

export type DownloadActionIcon =
  | "download"
  | "open"
  | "print"
  | "rules"
  | "zip";

export type DownloadActionConfig = {
  id: string;
  label: string;
  kind: DownloadActionKind;
  icon: DownloadActionIcon;
  ariaLabel: string;
};

export type DownloadAsset = {
  id: string;
  title: string;
  unavailableLabel: string;
  filename: string;
  format: "PDF" | "ZIP";
  purpose: string;
  eyebrow: string;
  available: boolean;
  includedInContestPack?: boolean;
  preview?: ShowcaseImage;
  actions: DownloadActionConfig[];
};

export type ContestStep = {
  step: string;
  title: string;
  body: string;
  accent: "blue" | "orange" | "pink" | "green" | "purple";
  clipart?: ShowcaseImage;
};

export type PrizeTier = {
  label: string;
  winners: string;
  title: string;
  retailValue: string;
  body: string;
  clipart?: ShowcaseImage;
  bodyLink?: {
    label: string;
    href: string;
  };
  callout?: string;
};

export type DateMilestone = {
  holiday: string;
  label: string;
  date: string;
  machineDate: string;
  icon: "labor" | "thanksgiving" | "christmas";
  clipart?: ShowcaseImage;
};

export type JudgingCriterionIcon =
  | "spark"
  | "fingerprint"
  | "palette"
  | "imagination"
  | "effort"
  | "detail"
  | "technique"
  | "impact"
  | "personality"
  | "age";

export type JudgingCriterion = {
  label: string;
  icon: JudgingCriterionIcon;
  clipart?: ShowcaseImage;
};

export type InfoCardIcon =
  | "free"
  | "people"
  | "original"
  | "duplicate"
  | "winner"
  | "keep"
  | "public"
  | "likes";

export type ShowcaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
};

export type InfoCard = {
  title: string;
  body: string;
  icon: InfoCardIcon;
  accent: "blue" | "orange" | "pink" | "green" | "purple";
  clipart?: ShowcaseImage;
};

export type FaqItem = {
  question: string;
  answer: string;
};
