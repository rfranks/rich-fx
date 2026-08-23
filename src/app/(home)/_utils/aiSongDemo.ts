import type { RichFxStudioItem } from "@/consts/richFx";
import type { HomeSong } from "@/app/(home)/_types/aiSongDemo";

const DEFAULT_ALBUM_DIMENSIONS = {
  width: 1024,
  height: 1024,
};

const ALBUM_DIMENSIONS_BY_PATH: Record<
  string,
  { width: number; height: number }
> = {
  "/assets/portfolio/Songs/here-we-stand/album.png": {
    width: 1254,
    height: 1254,
  },
};

export const hasHomeSongAssets = (song: RichFxStudioItem): song is HomeSong =>
  Boolean(song.songAlbumImage && song.songAudio);

export const getSongAlbumAsset = (song: HomeSong) => ({
  src: song.songAlbumImage,
  alt: `${song.title} album art`,
  ...(ALBUM_DIMENSIONS_BY_PATH[song.songAlbumImage] ??
    DEFAULT_ALBUM_DIMENSIONS),
});
