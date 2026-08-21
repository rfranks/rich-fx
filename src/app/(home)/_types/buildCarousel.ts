import type { ReactNode } from "react";
import type { AssetImageAsset } from "@/types/components/shared/media";

export type BuildSectionKey =
  | "holiday-card"
  | "image-style-sampler"
  | "cartoon-rendering"
  | "game-rendering"
  | "video-movie-rendering"
  | "calendar"
  | "ai-song";

export type BuildSectionOption = {
  key: BuildSectionKey;
  label: string;
  shortText: string;
  previewImage?: AssetImageAsset;
};

export type BuildCarouselSection = BuildSectionOption & {
  children: ReactNode;
};

export type BuildCarouselProps = {
  sections: BuildCarouselSection[];
  selectedIndex: number;
};

export type BuildPickerProps = {
  sections: BuildCarouselSection[];
  selectedIndex: number;
  onSelectSection: (index: number) => void;
};
