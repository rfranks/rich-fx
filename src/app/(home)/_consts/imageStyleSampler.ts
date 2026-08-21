import type { ImageStyleSample } from "@/app/(home)/_types/imageStyleSampler";
import { formatImageStyleLabel } from "@/app/(home)/_utils/imageStyleSampler";

const IMAGE_STYLE_SAMPLER_BASE_PATH = "/assets/image-style-sampler";
const IMAGE_STYLE_SAMPLE_SLUGS = [
  "photorealistic",
  "norman-rockwell-inspired",
  "oil-painting",
  "watercolor",
  "graphite-pencil-drawing",
  "charcoal-drawing",
  "caricature",
  "comic-book-illustration",
  "pop-art",
  "vector-illustration",
  "low-poly-3d",
  "clay-animation",
  "british-clay-stop-motion",
  "stylized-3d-animation",
  "hand-drawn-family-animation",
  "japanese-animation",
  "prime-time-sitcom-cartoon",
  "cutout-animation",
  "toy-minifigure",
  "vinyl-figure",
  "amigurumi-crochet",
  "pixel-art",
  "8-bit-game-art",
  "cyberpunk",
  "steampunk",
  "vintage-photograph",
  "instant-film-photograph",
  "impressionist-painting",
] as const;

export const DEFAULT_IMAGE_STYLE_SAMPLE_SLUG = "photorealistic";
export const IMAGE_STYLE_SAMPLE_SIZES =
  "(max-width: 900px) 88vw, min(48vw, 620px)";
export const IMAGE_STYLE_MENU_THUMBNAIL_SIZE = 69;

export const IMAGE_STYLE_SAMPLES: ImageStyleSample[] =
  IMAGE_STYLE_SAMPLE_SLUGS.map((slug) => {
    const label = formatImageStyleLabel(slug);

    return {
      slug,
      label,
      image: {
        src: `${IMAGE_STYLE_SAMPLER_BASE_PATH}/${slug}.png`,
        alt: `${label} image style sample`,
        width: 1024,
        height: 1024,
      },
    };
  });
