import type { RichFxStudioItem } from "@/consts/richFx";
import type {
  VideoMovieRenderingAsset,
  VideoMovieRenderingItem,
} from "@/app/(home)/_types/videoMovieRendering";
import type { AssetImageAsset } from "@/types/components/shared/media";

const DEFAULT_RENDERING_IMAGE_DIMENSIONS = {
  width: 1024,
  height: 1024,
};
const IMAGE_DIMENSIONS_BY_PATH: Record<
  string,
  { width: number; height: number }
> = {
  "/personal/images/personal/me-headshot.jpeg": {
    width: 1024,
    height: 1536,
  },
  "/assets/portfolio/RichardFranksIn/RichardFranksIn_Alien/stylized.png": {
    width: 1536,
    height: 1024,
  },
  "/personal/images/ai-lab/gollum/realistic.jpeg": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/gollum/stylistic.png": {
    width: 1086,
    height: 1448,
  },
  "/personal/images/ai-lab/gladiator/realistic.jpeg": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/gladiator/stylistic.png": {
    width: 1122,
    height: 1402,
  },
  "/personal/images/ai-lab/stay-puffy/stylistic.png": {
    width: 1448,
    height: 1086,
  },
  "/personal/images/ai-lab/he-man/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/white-rabbit/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/cheshire-cat/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/caterpillar/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/dee-and-dum/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/walrus/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/mad-hatter/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/king-of-hearts/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/dragonballz/stylistic.png": {
    width: 1536,
    height: 1024,
  },
  "/personal/images/ai-lab/kratos/realistic.jpeg": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/kratos/stylistic.png": {
    width: 1122,
    height: 1402,
  },
  "/personal/images/ai-lab/the-creed/realistic.jpeg": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/the-creed/stylistic.png": {
    width: 1122,
    height: 1402,
  },
  "/assets/portfolio/RichardFranksAs/RichardFranksAs_SamusAran/stylistic.png": {
    width: 1536,
    height: 1024,
  },
  "/assets/portfolio/RichardFranksAs/RichardFranksAs_RyuFromStreetFighter/stylistic.png":
    {
      width: 1402,
      height: 1122,
    },
  "/assets/portfolio/RichardFranksIn/RichardFranksIn_BioShock/stylistic.png": {
    width: 1402,
    height: 1122,
  },
};

const readString = (record: RichFxStudioItem, key: keyof RichFxStudioItem) => {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
};

const imageAsset = (
  src: string | undefined,
  alt: string,
): AssetImageAsset | undefined =>
  src
    ? {
        src,
        alt,
        ...(IMAGE_DIMENSIONS_BY_PATH[src] ??
          DEFAULT_RENDERING_IMAGE_DIMENSIONS),
      }
    : undefined;

const videoAsset = (
  item: RichFxStudioItem,
  poster?: string,
): VideoMovieRenderingAsset | undefined => {
  const src = readString(item, "movieRendering");

  if (!src) {
    return undefined;
  }

  return {
    src,
    poster,
    label: `${item.title} video rendering`,
    caption: readString(item, "movieCaption"),
    source: readString(item, "movieSource"),
    sourceHref: readString(item, "movieSourceHref"),
  };
};

export const getVideoMovieRenderingItem = (
  item: RichFxStudioItem,
): VideoMovieRenderingItem | undefined => {
  const originalImage = imageAsset(
    readString(item, "realisticImage"),
    `${item.title} original source image`,
  );
  const stylizedImage = imageAsset(
    readString(item, "stylizedRendering"),
    `${item.title} stylized image rendering`,
  );
  const video = videoAsset(item, readString(item, "stylizedRendering"));

  if (!originalImage || !stylizedImage || !video) {
    return undefined;
  }

  return {
    slug: item.slug,
    title: item.title,
    blurb: readString(item, "blurb") ?? "",
    shortText: readString(item, "shortText"),
    originalImage,
    stylizedImage,
    video,
  };
};

export const getVideoMovieRenderingItems = (
  items: RichFxStudioItem[],
  slugs?: readonly string[],
) => {
  const selectedItems = slugs
    ? slugs
        .map((slug) => items.find((item) => item.slug === slug))
        .filter((item): item is RichFxStudioItem => Boolean(item))
    : items;

  return selectedItems
    .map(getVideoMovieRenderingItem)
    .filter((item): item is VideoMovieRenderingItem => Boolean(item));
};
