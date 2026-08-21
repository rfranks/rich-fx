"use client";

import { useMemo, useState } from "react";
import SongRecording from "@/app/_components/song-recording/SongRecording";
import { CARD_THUMBNAIL_SIZES } from "@/app/(home)/_consts/homePage";
import { AssetImage } from "@/components/shared/media";
import { songs } from "@/consts/richFx";
import {
  getSongAlbumAsset,
  hasHomeSongAssets,
} from "@/app/(home)/_utils/aiSongDemo";
import styles from "./AiSongDemo.module.css";

const homeSongs = songs.filter(hasHomeSongAssets);

export default function AiSongDemo() {
  const [selectedSongSlug, setSelectedSongSlug] = useState(
    homeSongs[0]?.slug ?? "",
  );
  const selectedSong = useMemo(
    () =>
      homeSongs.find((song) => song.slug === selectedSongSlug) ?? homeSongs[0],
    [selectedSongSlug],
  );
  const selectedSongIndex = selectedSong
    ? homeSongs.findIndex((song) => song.slug === selectedSong.slug)
    : -1;

  if (!selectedSong) {
    return null;
  }

  return (
    <div className={styles.demo}>
      {homeSongs.length > 1 ? (
        <div className={styles.picker} aria-label="Choose a song">
          {homeSongs.map((song) => (
            <button
              className={[
                styles.pickerButton,
                song.slug === selectedSong.slug ? styles.active : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={song.slug}
              onClick={() => setSelectedSongSlug(song.slug)}
              type="button"
            >
              <AssetImage
                asset={getSongAlbumAsset(song)}
                sizes={CARD_THUMBNAIL_SIZES}
                className={styles.thumbnail}
              />
              <span>{song.title}</span>
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.recordingBody}>
        <SongRecording
          blurb={selectedSong.blurb ?? selectedSong.shortText ?? ""}
          framedPanels={false}
          intentToCopyright={selectedSong.intentToCopyright}
          key={selectedSong.slug}
          lyricsMarkdownPath={selectedSong.songLyricsMarkdownPath}
          lyricsSource={selectedSong.songLyricsSource}
          lyricsSourceHref={selectedSong.songLyricsSourceHref}
          rank={selectedSongIndex + 1}
          rightsNotice={selectedSong.rightsNotice}
          songAlbumCaption={
            selectedSong.songAlbumCaption ?? selectedSong.songAlbumSource
          }
          songAlbumImage={selectedSong.songAlbumImage}
          songAudio={selectedSong.songAudio}
          songPerformedBy={selectedSong.songPerformedBy}
          songWrittenBy={selectedSong.songWrittenBy}
          title={selectedSong.title}
        />
      </div>
    </div>
  );
}
