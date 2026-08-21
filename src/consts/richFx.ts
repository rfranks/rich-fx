import richFxData from "../../public/data/richFx.json";
import { withBasePath } from "@/utils/basePath";

export type RichFxPortfolioSiteContract = {
  route: string;
  description: string;
};

export type RichFxPortfolioAppContract = {
  route: string;
  documentTitle: string;
  metadataTitle?: string;
  metadataDescription?: string;
  appBarSubtitle?: string;
  heroEyebrow?: string;
  commandGroup?: string;
  coreComponent?: string;
  coreComponentTarget?: string;
};

export type RichFxPortfolioApps = {
  site: RichFxPortfolioSiteContract;
  aiStudio: RichFxPortfolioAppContract;
};

export type RichFxStudioMediaPart = {
  src: string;
  title?: string;
  source?: string;
  sourceHref?: string;
  caption?: string;
  episodeNumber?: number;
  seasonNumber?: number;
};

export type RichFxStudioEpisodeMedia = RichFxStudioMediaPart & {
  title: string;
};

export type RichFxStudioItem = Record<string, unknown> & {
  slug: string;
  title: string;
  blurb?: string;
  shortText?: string;
  type?: string;
  orientation?: string;
  realisticImage?: string;
  realisticSource?: string;
  realisticSourceHref?: string;
  realisticCaption?: string;
  stylizedRendering?: string;
  stylizedSource?: string;
  stylizedSourceHref?: string;
  stylizedCaption?: string;
  storyboardImage?: string;
  storyboardSource?: string;
  storyboardSourceHref?: string;
  storyboardCaption?: string;
  movieRendering?: string | null;
  movieSource?: string;
  movieSourceHref?: string;
  movieCaption?: string;
  movieRendering2?: string | null;
  movieSource2?: string;
  movieSourceHref2?: string;
  movieCaption2?: string;
  bookCoverImage?: string;
  bookSource?: string;
  bookSourceHref?: string;
  bookCaption?: string;
  manuscriptPdf?: string;
  manuscriptSource?: string;
  manuscriptSourceHref?: string;
  manuscriptCaption?: string;
  trailerMovie?: string;
  trailerOrientation?: string;
  trailerSource?: string;
  trailerSourceHref?: string;
  trailerCaption?: string;
  episodesPdf?: string;
  episodesSource?: string;
  episodesSourceHref?: string;
  episodesCaption?: string;
  episodeMedia?: RichFxStudioEpisodeMedia[];
  workPdf?: string;
  workSource?: string;
  workSourceHref?: string;
  workCaption?: string;
  workParts?: RichFxStudioMediaPart[];
  seriesMovie?: string;
  seriesSource?: string;
  seriesSourceHref?: string;
  seriesCaption?: string;
  seriesParts?: RichFxStudioMediaPart[];
  rawImage?: string;
  rawSource?: string;
  rawSourceHref?: string;
  rawCaption?: string;
  analyzedImage?: string;
  analyzedSource?: string;
  analyzedSourceHref?: string;
  analyzedCaption?: string;
  palmLineAnalysisImage?: string;
  palmLineAnalysisSource?: string;
  palmLineAnalysisSourceHref?: string;
  palmLineAnalysisCaption?: string;
  palmReadingTitle?: string;
  palmReadingText?: string;
  palmReadingMarkdownPath?: string;
  palmReadingSource?: string;
  palmReadingSourceHref?: string;
  songAlbumImage?: string;
  songAlbumSource?: string;
  songAlbumSourceHref?: string;
  songAlbumCaption?: string;
  songAudio?: string;
  songAudioSource?: string;
  songAudioSourceHref?: string;
  songAudioCaption?: string;
  songWrittenBy?: string;
  songPerformedBy?: string;
  songLyricsMarkdownPath?: string;
  songLyricsSource?: string;
  songLyricsSourceHref?: string;
  pagerOptionImage?: string;
  intentToCopyright?: boolean;
  rightsNotice?: string;
};

export type RichFxImageAssetContract = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type RichFxCard = {
  slug: string;
  holiday: string;
  name: string;
  original: RichFxImageAssetContract;
  card: RichFxImageAssetContract;
};

export type RichFxCalendarMonth = {
  month: string;
  year: number;
  label: string;
  image: RichFxImageAssetContract;
};

export type RichFxCalendar = {
  slug: string;
  name: string;
  description: string;
  months: RichFxCalendarMonth[];
};

export type RichFx = {
  summary?: Record<string, unknown>;
  contactCTA?: Record<string, unknown>;
  portfolioApps: RichFxPortfolioApps;
  images: RichFxStudioItem[];
  videos: RichFxStudioItem[];
  games: RichFxStudioItem[];
  cartoons: RichFxStudioItem[];
  analyses: RichFxStudioItem[];
  songs: RichFxStudioItem[];
  cards: RichFxCard[];
  calendars: RichFxCalendar[];
  projects?: unknown[];
  schemaVersion: number;
};

type RichFxLegacyAiLab = {
  title?: string;
  description?: string;
  items?: RichFxStudioItem[];
};

type RichFxRawData = Partial<RichFx> & {
  aiLab?: RichFxLegacyAiLab;
  aiLabs?: RichFxLegacyAiLab;
  portfolioApps?: Partial<RichFxPortfolioApps> & {
    aiLab?: RichFxPortfolioAppContract;
  };
};

const RICH_FX_DATA_PATH = "/data/richFx.json";
const LEGACY_AI_ASSET_PATH = "/personal/images/ai-shenanigans/";
const AI_LAB_ASSET_PATH = "/personal/images/ai-lab/";

let cachedRichFxData: Promise<RichFx> | null = null;

const normalizeAssetPath = (value: string) =>
  value.includes(LEGACY_AI_ASSET_PATH)
    ? value.replaceAll(LEGACY_AI_ASSET_PATH, AI_LAB_ASSET_PATH)
    : value;

const normalizeAssetPaths = <T>(value: T): T => {
  if (typeof value === "string") {
    return normalizeAssetPath(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeAssetPaths(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        normalizeAssetPaths(nestedValue),
      ]),
    ) as T;
  }

  return value;
};

const isSongStudioItem = (item: RichFxStudioItem) =>
  item.type === "song-recording";

const isAnalysisStudioItem = (item: RichFxStudioItem) =>
  item.type === "palmylyzer-pro";

const hasVideoStudioMedia = (item: RichFxStudioItem) =>
  Boolean(
    item.movieRendering ||
    item.movieRendering2 ||
    item.trailerMovie ||
    item.seriesMovie ||
    (Array.isArray(item.episodeMedia) && item.episodeMedia.length > 0) ||
    (Array.isArray(item.seriesParts) && item.seriesParts.length > 0),
  );

const isVideoStudioItem = (item: RichFxStudioItem) =>
  !isSongStudioItem(item) &&
  !isAnalysisStudioItem(item) &&
  hasVideoStudioMedia(item);

const isImageStudioItem = (item: RichFxStudioItem) =>
  !isSongStudioItem(item) &&
  !isAnalysisStudioItem(item) &&
  !isVideoStudioItem(item);

export const normalizeRichFxData = (data: RichFxRawData): RichFx => {
  const normalizedData = normalizeAssetPaths(data);
  const {
    aiLab: legacyAiLab,
    aiLabs: olderLegacyAiLab,
    ...rest
  } = normalizedData;
  const portfolioApps = rest.portfolioApps
    ? {
        ...rest.portfolioApps,
        aiStudio:
          rest.portfolioApps.aiStudio ?? rest.portfolioApps.aiLab ?? undefined,
      }
    : undefined;
  const legacyItems = legacyAiLab?.items ?? olderLegacyAiLab?.items ?? [];
  const images = rest.images ?? legacyItems.filter(isImageStudioItem);
  const videos = rest.videos ?? legacyItems.filter(isVideoStudioItem);
  const games = rest.games ?? [];
  const cartoons = rest.cartoons ?? [];
  const analyses = rest.analyses ?? legacyItems.filter(isAnalysisStudioItem);
  const songs = rest.songs ?? legacyItems.filter(isSongStudioItem);

  if (
    !portfolioApps?.site ||
    !portfolioApps.aiStudio ||
    !Array.isArray(images) ||
    !Array.isArray(videos) ||
    !Array.isArray(games) ||
    !Array.isArray(cartoons) ||
    !Array.isArray(analyses) ||
    !Array.isArray(songs) ||
    !Array.isArray(rest.cards) ||
    !Array.isArray(rest.calendars) ||
    typeof rest.schemaVersion !== "number"
  ) {
    throw new Error("[rich-fx-data] Invalid RichFX data contract.");
  }

  return {
    ...rest,
    portfolioApps: {
      site: portfolioApps.site,
      aiStudio: portfolioApps.aiStudio,
    },
    images,
    videos,
    games,
    cartoons,
    analyses,
    songs,
  } as RichFx;
};

const richFx = normalizeRichFxData(richFxData as RichFxRawData);

export async function fetchRichFxDataCached(): Promise<RichFx> {
  cachedRichFxData ??= fetch(withBasePath(RICH_FX_DATA_PATH))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      return response.json() as Promise<RichFxRawData>;
    })
    .then(normalizeRichFxData)
    .catch((error) => {
      cachedRichFxData = null;
      throw error;
    });

  return cachedRichFxData;
}

export const getAiStudioItems = (data: RichFx): RichFxStudioItem[] => [
  ...data.images,
  ...data.videos,
  ...data.games,
  ...data.cartoons,
  ...data.analyses,
  ...data.songs,
];

export const portfolioApps = richFx.portfolioApps;
export const aiStudioItems = getAiStudioItems(richFx);
export const cards = richFx.cards;
export const calendars = richFx.calendars;
export const cartoons = richFx.cartoons;
export const games = richFx.games;
export const songs = richFx.songs;

export default richFx;
