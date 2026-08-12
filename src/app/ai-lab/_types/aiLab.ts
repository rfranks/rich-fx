export type AILabMovieOrientation = "landscape" | "portrait" | undefined;

export type AILabType =
  | "default"
  | "book-to-limited-series"
  | "work-to-series-adaptation"
  | "palmylyzer-pro"
  | "song-recording";

export type AILabEpisodeMedia = {
  title: string;
  episodeNumber?: number;
  seasonNumber?: number;
  src: string;
  source?: string;
  sourceHref?: string;
  caption?: string;
};

export type AILabWorkOrSeriesPart = {
  src: string;
  title?: string;
  source?: string;
  sourceHref?: string;
  caption?: string;
};

type AILabCoreProps = {
  rank: number;
  title: string;
  blurb: string;
  intentToCopyright?: boolean;
  rightsNotice?: string;
};

type AILabRealisticMediaProps = {
  realisticImage: string;
  realisticSource?: string;
  realisticSourceHref?: string;
  realisticCaption?: string;
};

type AILabDefaultMediaProps = {
  orientation?: AILabMovieOrientation;
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

type AILabAdaptationMediaProps = {
  bookCoverImage: string;
  bookSource?: string;
  bookSourceHref?: string;
  bookCaption?: string;
  manuscriptPdf: string;
  manuscriptSource?: string;
  manuscriptSourceHref?: string;
  manuscriptCaption?: string;
  trailerMovie?: string;
  trailerOrientation?: AILabMovieOrientation;
  trailerSource?: string;
  trailerSourceHref?: string;
  trailerCaption?: string;
  episodesPdf: string;
  episodesSource?: string;
  episodesSourceHref?: string;
  episodesCaption?: string;
  episodeMedia?: AILabEpisodeMedia[];
};

type AILabWorkSeriesMediaProps = {
  orientation?: AILabMovieOrientation;
  workPdf?: string;
  workSource?: string;
  workSourceHref?: string;
  workCaption?: string;
  workParts: AILabWorkOrSeriesPart[];
  seriesMovie?: string;
  seriesSource?: string;
  seriesSourceHref?: string;
  seriesCaption?: string;
  seriesParts: AILabWorkOrSeriesPart[];
};

type AILabPalmReadingMediaProps = {
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

type AILabSongRecordingMediaProps = {
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

type AILabAllMediaKeys =
  | keyof AILabRealisticMediaProps
  | keyof AILabDefaultMediaProps
  | keyof AILabAdaptationMediaProps
  | keyof AILabWorkSeriesMediaProps
  | keyof AILabPalmReadingMediaProps
  | keyof AILabSongRecordingMediaProps;

type AILabNeverProps<Keys extends PropertyKey> = {
  [K in Keys]?: never;
};

type AILabDefaultAllowedMediaKeys =
  | keyof AILabRealisticMediaProps
  | keyof AILabDefaultMediaProps;
type AILabBookAllowedMediaKeys = keyof AILabAdaptationMediaProps;
type AILabWorkSeriesAllowedMediaKeys = keyof AILabWorkSeriesMediaProps;
type AILabPalmAllowedMediaKeys = keyof AILabPalmReadingMediaProps;
type AILabSongAllowedMediaKeys = keyof AILabSongRecordingMediaProps;

export type AILabDefaultProps = AILabCoreProps &
  AILabRealisticMediaProps &
  AILabDefaultMediaProps &
  AILabNeverProps<Exclude<AILabAllMediaKeys, AILabDefaultAllowedMediaKeys>> & {
    type: "default";
  };

export type AILabBookToLimitedSeriesProps = AILabCoreProps &
  AILabAdaptationMediaProps &
  AILabNeverProps<Exclude<AILabAllMediaKeys, AILabBookAllowedMediaKeys>> & {
    type: "book-to-limited-series";
  };

export type AILabWorkToSeriesAdaptationProps = AILabCoreProps &
  AILabWorkSeriesMediaProps &
  AILabNeverProps<
    Exclude<AILabAllMediaKeys, AILabWorkSeriesAllowedMediaKeys>
  > & {
    type: "work-to-series-adaptation";
  };

export type AILabPalmylyzerProProps = AILabCoreProps &
  AILabPalmReadingMediaProps &
  AILabNeverProps<Exclude<AILabAllMediaKeys, AILabPalmAllowedMediaKeys>> & {
    type: "palmylyzer-pro";
  };

export type AILabSongRecordingProps = AILabCoreProps &
  AILabSongRecordingMediaProps &
  AILabNeverProps<Exclude<AILabAllMediaKeys, AILabSongAllowedMediaKeys>> & {
    type: "song-recording";
  };

export type AILabProps =
  | AILabDefaultProps
  | AILabBookToLimitedSeriesProps
  | AILabWorkToSeriesAdaptationProps
  | AILabPalmylyzerProProps
  | AILabSongRecordingProps;
