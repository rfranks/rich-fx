import type { RichFxStudioItem } from "@/consts/richFx";
import type { LabProps, LabType } from "./lab";

export type DataItem = RichFxStudioItem & {
  type?: LabType | string;
} & Record<string, unknown>;

export type FilterCategory = "medium" | "style" | "series";

export type FilterOption = {
  value: string;
  label: string;
  count: number;
};

export type FilterOptionByCategory = Record<FilterCategory, FilterOption[]>;

export type FilterSelection = {
  medium?: string;
  style?: string;
  series?: string;
};

export type PageItem = {
  slug: string;
  title: string;
  blurb: string;
  shortText?: string;
  previewImage: string;
  mediumTags: string[];
  styleTags: string[];
  seriesTag: string;
  props: LabProps;
};

export type PagerItem = Pick<
  PageItem,
  "slug" | "title" | "blurb" | "shortText" | "previewImage"
>;
