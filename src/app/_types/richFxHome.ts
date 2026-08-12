export type RichFxImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type RichFxVideoAsset = {
  src: string;
  poster?: string;
  label: string;
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

export type RichFxAudioFeature = {
  title: string;
  body: string;
  albumImage: RichFxImageAsset;
  audioSrc: string;
  credit?: string;
};
