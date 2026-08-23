import type { AssetImageAsset } from "@/types/components/shared/media";

export type ImageStyleSample = {
  slug: string;
  label: string;
  image: AssetImageAsset;
};

export type ImageStyleSamplerProps = {
  className?: string;
  samples?: ImageStyleSample[];
};
