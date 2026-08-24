import type { RichFxStudioItem } from "@/consts/richFx";
import type {
  ArtworkRenderingItem,
  ArtworkRenderingMotionAsset,
} from "@/app/(home)/_types/artworkRendering";
import type { AssetImageAsset } from "@/types/components/shared/media";

const DEFAULT_ARTWORK_IMAGE_DIMENSIONS = {
  width: 1024,
  height: 1024,
};

const readString = (record: RichFxStudioItem, key: keyof RichFxStudioItem) => {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
};

const readNumber = (record: RichFxStudioItem, key: keyof RichFxStudioItem) => {
  const value = record[key];
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
};

const artworkImageAsset = (
  item: RichFxStudioItem,
  srcKey: keyof RichFxStudioItem,
  widthKey: keyof RichFxStudioItem,
  heightKey: keyof RichFxStudioItem,
  alt: string,
): AssetImageAsset | undefined => {
  const src = readString(item, srcKey);

  if (!src) {
    return undefined;
  }

  return {
    src,
    alt,
    width: readNumber(item, widthKey) ?? DEFAULT_ARTWORK_IMAGE_DIMENSIONS.width,
    height:
      readNumber(item, heightKey) ?? DEFAULT_ARTWORK_IMAGE_DIMENSIONS.height,
  };
};

const motionAsset = (
  item: RichFxStudioItem,
  poster?: string,
): ArtworkRenderingMotionAsset | undefined => {
  const src = readString(item, "movieRendering");

  if (!src) {
    return undefined;
  }

  return {
    src,
    poster,
    label: `${item.title} motion rendering`,
    caption: readString(item, "movieCaption"),
    source: readString(item, "movieSource"),
    sourceHref: readString(item, "movieSourceHref"),
  };
};

export const getArtworkRenderingItem = (
  item: RichFxStudioItem,
): ArtworkRenderingItem | undefined => {
  const originalArt = artworkImageAsset(
    item,
    "originalArt",
    "originalArtWidth",
    "originalArtHeight",
    `${item.title} original artwork`,
  );
  const aiArt = artworkImageAsset(
    item,
    "aiArt",
    "aiArtWidth",
    "aiArtHeight",
    `${item.title} AI artwork rendering`,
  );

  if (!originalArt || !aiArt) {
    return undefined;
  }

  return {
    slug: item.slug,
    title: item.title,
    blurb: readString(item, "blurb") ?? "",
    shortText: readString(item, "shortText"),
    originalArt,
    aiArt,
    motion: motionAsset(item, readString(item, "aiArt")),
  };
};

export const getArtworkRenderingItems = (
  items: RichFxStudioItem[],
  slugs?: readonly string[],
) => {
  const selectedItems = slugs
    ? slugs
        .map((slug) => items.find((item) => item.slug === slug))
        .filter((item): item is RichFxStudioItem => Boolean(item))
    : items;

  return selectedItems
    .map(getArtworkRenderingItem)
    .filter((item): item is ArtworkRenderingItem => Boolean(item));
};
