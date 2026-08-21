import { richFxVfxFeature } from "@/app/what-we-do/_utils/richFxData";
import type { RichFxPipelineStage } from "@/app/what-we-do/_types/richFx";

export const VIDEO_AUDIO_ENABLED = true;

export const PHILOSOPHY_LINES = [
  "Filmmaking instincts.",
  "Software engineering discipline.",
  "Generative AI as a production material.",
  "Visual effects, story systems, and experiments that can actually ship.",
] as const;

export const VFX_STAGES: RichFxPipelineStage[] = [
  {
    key: "source",
    eyebrow: "01 / Source",
    title: "Start with a source image, grounded in reality.",
    body: "We start with a source frame, usually a real-world image, like a headshot or a portrait, which gives the visual effect transformation an anchor.",
    image: richFxVfxFeature.beforeImage,
  },
  {
    key: "look",
    eyebrow: "02 / Transformation",
    title: "Push the frame into a stylized visual direction.",
    body: "Composition, lighting, costume, and atmosphere become the design brief for the next pass. Styles can vary from cinematic to artistic, and the AI can be guided to explore multiple directions.",
    image: richFxVfxFeature.stylizedImage,
  },
  {
    key: "motion",
    eyebrow: "03 / Motion",
    title: "Bring the frame to life with motion and continuity.",
    body: richFxVfxFeature.blurb,
    video: richFxVfxFeature.video,
  },
];

export const STAGE_MEDIA_SIZES = "(max-width: 900px) 92vw, 50vw";

export const EXPERIMENT_IMAGE_SIZES = "(max-width: 760px) 88vw, 28vw";

export const WORLD_IMAGE_SIZES = "(max-width: 760px) 82vw, 30vw";

export const SERVICE_PLATE_SIZES = "(max-width: 900px) 92vw, 66vw";

export const AUDIO_IMAGE_SIZES = "(max-width: 760px) 76vw, 32vw";
