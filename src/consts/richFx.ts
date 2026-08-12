import richFxData from "../../public/personal/data/richFx.json";
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
  aiLab: RichFxPortfolioAppContract;
};

export type RichFxAiLabMediaPart = {
  src: string;
  title?: string;
  source?: string;
  sourceHref?: string;
  caption?: string;
  episodeNumber?: number;
  seasonNumber?: number;
};

export type RichFxAiLabEpisodeMedia = RichFxAiLabMediaPart & {
  title: string;
};

export type RichFxAiLabItem = Record<string, unknown> & {
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
  episodeMedia?: RichFxAiLabEpisodeMedia[];
  workPdf?: string;
  workSource?: string;
  workSourceHref?: string;
  workCaption?: string;
  workParts?: RichFxAiLabMediaPart[];
  seriesMovie?: string;
  seriesSource?: string;
  seriesSourceHref?: string;
  seriesCaption?: string;
  seriesParts?: RichFxAiLabMediaPart[];
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

export type RichFxAiLab = {
  title: string;
  description: string;
  items: RichFxAiLabItem[];
};

export type RichFx = {
  summary?: Record<string, unknown>;
  contactCTA?: Record<string, unknown>;
  portfolioApps: RichFxPortfolioApps;
  aiLab: RichFxAiLab;
  projects?: unknown[];
  schemaVersion: number;
};

type RichFxRawData = Partial<Omit<RichFx, "aiLab">> & {
  aiLab?: RichFxAiLab;
  aiLabs?: RichFxAiLab;
};

const RICH_FX_DATA_PATH = "/personal/data/richFx.json";
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

export const normalizeRichFxData = (data: RichFxRawData): RichFx => {
  const normalizedData = normalizeAssetPaths(data);
  const { aiLabs: legacyAiLab, ...rest } = normalizedData;
  const normalizedAiLab = normalizedData.aiLab ?? legacyAiLab;

  if (
    !rest.portfolioApps ||
    !normalizedAiLab ||
    typeof rest.schemaVersion !== "number"
  ) {
    throw new Error("[rich-fx-data] Invalid RichFX data contract.");
  }

  return {
    ...rest,
    aiLab: normalizedAiLab,
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

export const portfolioApps = richFx.portfolioApps;
export const aiLab = richFx.aiLab;

export default richFx;
