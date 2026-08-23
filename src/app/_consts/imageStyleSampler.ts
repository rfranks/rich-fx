import type { ImageStyleSample } from "@/app/_types/imageStyleSampler";
import { formatImageStyleLabel } from "@/app/_utils/imageStyleSampler";

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

const IMAGE_STYLE_SAMPLE_DESCRIPTIONS: Record<
  (typeof IMAGE_STYLE_SAMPLE_SLUGS)[number],
  string
> = {
  photorealistic:
    "Natural lighting, realistic detail, and true-to-life texture.",
  "norman-rockwell-inspired":
    "Warm Americana staging with expressive, storybook realism.",
  "oil-painting": "Brushy canvas texture with rich color and painterly depth.",
  watercolor: "Soft washes, paper grain, and gentle translucent color.",
  "graphite-pencil-drawing":
    "Monochrome pencil shading with fine sketch detail.",
  "charcoal-drawing": "Bold black-and-white marks with smoky tonal contrast.",
  caricature: "Playfully exaggerated features with portrait likeness intact.",
  "comic-book-illustration":
    "Ink outlines, dramatic color, and panel-ready graphic energy.",
  "pop-art": "Bright flat color, punchy contrast, and poster-like repetition.",
  "vector-illustration":
    "Clean shapes, crisp edges, and simplified modern color.",
  "low-poly-3d": "Faceted 3D geometry with angular sculptural surfaces.",
  "clay-animation":
    "Rounded handmade clay forms with tactile stop-motion charm.",
  "british-clay-stop-motion":
    "Cozy handmade clay character styling with offbeat expression.",
  "stylized-3d-animation":
    "Polished animated-film proportions with soft 3D character appeal.",
  "hand-drawn-family-animation":
    "Friendly hand-drawn cartoon styling for family animation.",
  "japanese-animation":
    "Anime-inspired linework, expressive eyes, and cinematic color.",
  "prime-time-sitcom-cartoon":
    "Flat adult-animated sitcom shapes with clean comic attitude.",
  "cutout-animation":
    "Layered paper-cut shapes with playful flat movement style.",
  "toy-minifigure":
    "Tiny collectible figure proportions with plastic toy finish.",
  "vinyl-figure":
    "Smooth designer-toy proportions with glossy simplified forms.",
  "amigurumi-crochet":
    "Soft crocheted yarn texture with handmade plush character detail.",
  "pixel-art": "Blocky retro pixels with compact sprite-style detail.",
  "8-bit-game-art": "Low-resolution arcade color with classic game-era charm.",
  cyberpunk: "Neon lighting, futuristic grit, and high-tech atmosphere.",
  steampunk: "Victorian machinery, brass details, and retro-futurist style.",
  "vintage-photograph":
    "Aged film tones, period portrait texture, and archival warmth.",
  "instant-film-photograph":
    "Casual instant-camera color with flash-lit nostalgic softness.",
  "impressionist-painting":
    "Loose light-filled brushwork with shimmering color impressions.",
};

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
      description: IMAGE_STYLE_SAMPLE_DESCRIPTIONS[slug],
      image: {
        src: `${IMAGE_STYLE_SAMPLER_BASE_PATH}/${slug}.png`,
        alt: `${label} image style sample`,
        width: 1024,
        height: 1024,
      },
    };
  });
