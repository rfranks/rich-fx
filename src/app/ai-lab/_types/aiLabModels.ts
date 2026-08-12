import type { RichFx } from "@/consts/richFx";
import type { AILabProps, AILabType } from "./aiLab";

export type AILabDataItem = RichFx["aiLab"]["items"][number] & {
  type?: AILabType | string;
} & Record<string, unknown>;

export type AILabFilterCategory = "medium" | "style" | "series";

export type AILabFilterOption = {
  value: string;
  label: string;
  count: number;
};

export type AILabFilterOptionByCategory = Record<AILabFilterCategory, AILabFilterOption[]>;

export type AILabFilterSelection = {
  medium?: string;
  style?: string;
  series?: string;
};

export type AILabPageItem = {
  slug: string;
  title: string;
  blurb: string;
  shortText?: string;
  previewImage: string;
  mediumTags: string[];
  styleTags: string[];
  seriesTag: string;
  props: AILabProps;
};

export type AILabPagerItem = Pick<
  AILabPageItem,
  "slug" | "title" | "blurb" | "shortText" | "previewImage"
>;
