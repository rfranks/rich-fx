import type { AssetImageAsset } from "@/types/components/shared/media";

export type ArtworkRenderingPanelKey = "original" | "ai" | "motion";

export type ArtworkRenderingMotionAsset = {
  src: string;
  label: string;
  caption?: string;
  poster?: string;
  source?: string;
  sourceHref?: string;
};

export type ArtworkRenderingItem = {
  slug: string;
  title: string;
  blurb: string;
  shortText?: string;
  originalArt: AssetImageAsset;
  aiArt: AssetImageAsset;
  motion?: ArtworkRenderingMotionAsset;
};

export type ArtworkRenderingProps = {
  className?: string;
  defaultItemSlug?: string;
  items?: ArtworkRenderingItem[];
};
