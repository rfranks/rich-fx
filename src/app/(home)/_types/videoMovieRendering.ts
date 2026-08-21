import type { AssetImageAsset } from "@/types/components/shared/media";

export type VideoMovieRenderingPanelKey = "original" | "stylized" | "video";

export type VideoMovieRenderingAsset = {
  src: string;
  label: string;
  caption?: string;
  poster?: string;
  source?: string;
  sourceHref?: string;
};

export type VideoMovieRenderingItem = {
  slug: string;
  title: string;
  blurb: string;
  shortText?: string;
  originalImage: AssetImageAsset;
  stylizedImage: AssetImageAsset;
  video: VideoMovieRenderingAsset;
};

export type VideoMovieRenderingProps = {
  className?: string;
  defaultItemSlug?: string;
  items?: VideoMovieRenderingItem[];
};
