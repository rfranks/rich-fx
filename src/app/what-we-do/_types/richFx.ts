import type {
  RichFxStudioItem,
  RichFxImageAssetContract,
} from "@/consts/richFx";

export type RichFxStudioRecord = RichFxStudioItem & Record<string, unknown>;

export type RichFxImageAsset = RichFxImageAssetContract;

export type RichFxImageDimensions = Pick<RichFxImageAsset, "width" | "height">;

export type RichFxVideoAsset = {
  src: string;
  poster?: string;
  label: string;
};

export type RichFxInlineVideoProps = {
  video: RichFxVideoAsset;
  className?: string;
};

export type RichFxStageAudioAsset = {
  src: string;
  label: string;
  note?: string;
};

export type RichFxExperimentFeature = {
  slug: string;
  title: string;
  shortText: string;
  blurb: string;
  previewImage: RichFxImageAsset;
  beforeImage?: RichFxImageAsset;
  stylizedImage?: RichFxImageAsset;
  video?: RichFxVideoAsset;
};

export type RichFxPipelineStage = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  image?: RichFxImageAsset;
  video?: RichFxVideoAsset;
  audio?: RichFxStageAudioAsset;
};

export type RichFxStageProps = {
  stage: RichFxPipelineStage;
};

export type RichFxExperimentFeatureProps = {
  item: RichFxExperimentFeature;
};

export type RichFxAudioFeature = {
  title: string;
  body: string;
  albumImage: RichFxImageAsset;
  audioSrc: string;
  credit?: string;
};
