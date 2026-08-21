import type { ReactNode } from "react";
import type { RichFxPipelineStage } from "@/app/what-we-do/_types/richFx";

export type SectionKickerProps = {
  children: ReactNode;
};

export type StickyNarrativeProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  stages: RichFxPipelineStage[];
};
