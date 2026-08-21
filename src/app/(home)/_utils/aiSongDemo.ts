import type { RichFxStudioItem } from "@/consts/richFx";
import type { HomeSong } from "@/app/(home)/_types/aiSongDemo";

export const hasHomeSongAssets = (song: RichFxStudioItem): song is HomeSong =>
  Boolean(song.songAlbumImage && song.songAudio);

export const getSongAlbumAsset = (song: HomeSong) => ({
  src: song.songAlbumImage,
  alt: `${song.title} album art`,
  width: 1024,
  height: 1024,
});
