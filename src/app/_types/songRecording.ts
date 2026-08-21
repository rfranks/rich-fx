export type SongPanelKey = "song" | "album" | "lyrics";

export type AudioRefCallback = (node: HTMLAudioElement | null) => void;

export type SongRecordingProps = {
  rank: number;
  title: string;
  blurb: string;
  intentToCopyright?: boolean;
  rightsNotice?: string;
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
  lyricsMarkdownPath?: string;
  lyricsSource?: string;
  lyricsSourceHref?: string;
  framedPanels?: boolean;
};

export type CreditsProps = {
  writtenBy?: string;
  performedBy?: string;
};

export type AudioPlayerProps = {
  src: string;
  onAudioRef: AudioRefCallback;
};

export type AlbumPanelProps = {
  albumImage: string;
  audioSrc?: string;
  caption?: string;
  onAudioRef?: AudioRefCallback;
  performedBy?: string;
  showAudio?: boolean;
  title: string;
  writtenBy?: string;
};

export type SongPanelProps = {
  audioSrc: string;
  blurb: string;
  intentToCopyright: boolean;
  onAudioRef: AudioRefCallback;
  performedBy?: string;
  rightsLabel: string;
  rightsStampAngle: number;
  writtenBy?: string;
};

export type LyricsPanelProps = {
  audioSrc: string;
  content: string | null;
  hasError: boolean;
  isLoading: boolean;
  onAudioRef: AudioRefCallback;
  showAudio?: boolean;
  source?: string;
  sourceHref?: string;
};
