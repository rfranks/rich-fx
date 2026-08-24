import { artwork as richFxArtwork } from "@/consts/richFx";
import { getArtworkRenderingItems } from "@/app/(home)/_utils/artworkRendering";

export const ARTWORK_RENDERING_SLUGS = ["stained-glass-heart"] as const;

export const ARTWORK_RENDERING_ITEMS = getArtworkRenderingItems(
  richFxArtwork,
  ARTWORK_RENDERING_SLUGS,
);

export const DEFAULT_ARTWORK_RENDERING_SLUG = ARTWORK_RENDERING_SLUGS[0];

export const ARTWORK_RENDERING_IMAGE_SIZES =
  "(max-width: 900px) 88vw, min(48vw, 620px)";

export const ARTWORK_RENDERING_MENU_THUMBNAIL_SIZE = 69;
