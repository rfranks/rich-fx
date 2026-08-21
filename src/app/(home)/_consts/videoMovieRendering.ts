import {
  aiStudioItems,
  cartoons as richFxCartoons,
  games as richFxGames,
} from "@/consts/richFx";
import { getVideoMovieRenderingItems } from "@/app/(home)/_utils/videoMovieRendering";

export const VIDEO_MOVIE_RENDERING_SLUGS = [
  "alien",
  "gollum",
  "gladiator",
  "stay-puffy",
] as const;

export const VIDEO_MOVIE_RENDERING_ITEMS = getVideoMovieRenderingItems(
  aiStudioItems,
  VIDEO_MOVIE_RENDERING_SLUGS,
);

export const CARTOON_RENDERING_ITEMS =
  getVideoMovieRenderingItems(richFxCartoons);

export const GAME_RENDERING_ITEMS = getVideoMovieRenderingItems(richFxGames);

export const DEFAULT_VIDEO_MOVIE_RENDERING_SLUG =
  VIDEO_MOVIE_RENDERING_SLUGS[0];

export const VIDEO_MOVIE_RENDERING_IMAGE_SIZES =
  "(max-width: 900px) 88vw, min(48vw, 620px)";

export const VIDEO_MOVIE_RENDERING_MENU_THUMBNAIL_SIZE = 69;
