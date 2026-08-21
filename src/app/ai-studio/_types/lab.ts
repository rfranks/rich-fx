export type MovieOrientation = "landscape" | "portrait" | undefined;

export type LabType =
  | "default"
  | "book-to-limited-series"
  | "work-to-series-adaptation"
  | "palmylyzer-pro"
  | "song-recording";

export type EpisodeMedia = {
  title: string;
  episodeNumber?: number;
  seasonNumber?: number;
  src: string;
  source?: string;
  sourceHref?: string;
  caption?: string;
};

export type WorkOrSeriesPart = {
  src: string;
  title?: string;
  source?: string;
  sourceHref?: string;
  caption?: string;
};

type CoreProps = {
  rank: number;
  title: string;
  blurb: string;
  intentToCopyright?: boolean;
  rightsNotice?: string;
};

type RealisticMediaProps = {
  realisticImage: string;
  realisticSource?: string;
  realisticSourceHref?: string;
  realisticCaption?: string;
};

type DefaultMediaProps = {
  orientation?: MovieOrientation;
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
};

type AdaptationMediaProps = {
  bookCoverImage: string;
  bookSource?: string;
  bookSourceHref?: string;
  bookCaption?: string;
  manuscriptPdf: string;
  manuscriptSource?: string;
  manuscriptSourceHref?: string;
  manuscriptCaption?: string;
  trailerMovie?: string;
  trailerOrientation?: MovieOrientation;
  trailerSource?: string;
  trailerSourceHref?: string;
  trailerCaption?: string;
  episodesPdf: string;
  episodesSource?: string;
  episodesSourceHref?: string;
  episodesCaption?: string;
  episodeMedia?: EpisodeMedia[];
};

type WorkSeriesMediaProps = {
  orientation?: MovieOrientation;
  workPdf?: string;
  workSource?: string;
  workSourceHref?: string;
  workCaption?: string;
  workParts: WorkOrSeriesPart[];
  seriesMovie?: string;
  seriesSource?: string;
  seriesSourceHref?: string;
  seriesCaption?: string;
  seriesParts: WorkOrSeriesPart[];
};

type PalmReadingMediaProps = {
  rawImage: string;
  rawSource?: string;
  rawSourceHref?: string;
  rawCaption?: string;
  analyzedImage: string;
  analyzedSource?: string;
  analyzedSourceHref?: string;
  analyzedCaption?: string;
  palmLineAnalysisImage: string;
  palmLineAnalysisSource?: string;
  palmLineAnalysisSourceHref?: string;
  palmLineAnalysisCaption?: string;
  palmReadingTitle?: string;
  palmReadingText?: string;
  palmReadingMarkdownPath?: string;
  palmReadingSource?: string;
  palmReadingSourceHref?: string;
};

type SongRecordingMediaProps = {
  songAlbumImage: string;
  songAlbumSource?: string;
  songAlbumSourceHref?: string;
  songAlbumCaption?: string;
  songAudio: string;
  songAudioSource?: string;
  songAudioSourceHref?: string;
  songAudioCaption?: string;
  songWrittenBy?: string;
  songPerformedBy?: string;
  songLyricsMarkdownPath?: string;
  songLyricsSource?: string;
  songLyricsSourceHref?: string;
};

type AllMediaKeys =
  | keyof RealisticMediaProps
  | keyof DefaultMediaProps
  | keyof AdaptationMediaProps
  | keyof WorkSeriesMediaProps
  | keyof PalmReadingMediaProps
  | keyof SongRecordingMediaProps;

type NeverProps<Keys extends PropertyKey> = {
  [K in Keys]?: never;
};

type DefaultAllowedMediaKeys =
  | keyof RealisticMediaProps
  | keyof DefaultMediaProps;
type BookAllowedMediaKeys = keyof AdaptationMediaProps;
type WorkSeriesAllowedMediaKeys = keyof WorkSeriesMediaProps;
type PalmAllowedMediaKeys = keyof PalmReadingMediaProps;
type SongAllowedMediaKeys = keyof SongRecordingMediaProps;

export type DefaultProps = CoreProps &
  RealisticMediaProps &
  DefaultMediaProps &
  NeverProps<Exclude<AllMediaKeys, DefaultAllowedMediaKeys>> & {
    type: "default";
  };

export type BookToLimitedSeriesProps = CoreProps &
  AdaptationMediaProps &
  NeverProps<Exclude<AllMediaKeys, BookAllowedMediaKeys>> & {
    type: "book-to-limited-series";
  };

export type WorkToSeriesAdaptationProps = CoreProps &
  WorkSeriesMediaProps &
  NeverProps<Exclude<AllMediaKeys, WorkSeriesAllowedMediaKeys>> & {
    type: "work-to-series-adaptation";
  };

export type PalmylyzerProProps = CoreProps &
  PalmReadingMediaProps &
  NeverProps<Exclude<AllMediaKeys, PalmAllowedMediaKeys>> & {
    type: "palmylyzer-pro";
  };

export type SongRecordingProps = CoreProps &
  SongRecordingMediaProps &
  NeverProps<Exclude<AllMediaKeys, SongAllowedMediaKeys>> & {
    type: "song-recording";
  };

export type LabProps =
  | DefaultProps
  | BookToLimitedSeriesProps
  | WorkToSeriesAdaptationProps
  | PalmylyzerProProps
  | SongRecordingProps;
