"use client";

import { useMemo, useState } from "react";
import SongRecording from "@/app/_components/song-recording/SongRecording";
import { AI_SONG_MENU_THUMBNAIL_SIZE } from "@/app/(home)/_consts/aiSongDemo";
import { Picker } from "@/components/shared/controls";
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
  const pickerItems = useMemo(
    () =>
      homeSongs.map((song) => ({
        ...song,
        key: song.slug,
        label: song.title,
        secondaryLabel: song.shortText ?? song.blurb,
      })),
    [],
  );

  if (!selectedSong) {
    return null;
  }

  const handleSelectSong = (index: number) => {
    const nextSong = homeSongs[index];

    if (nextSong) {
      setSelectedSongSlug(nextSong.slug);
    }
  };

  return (
    <div className={styles.demo}>
      {homeSongs.length > 1 ? (
        <Picker
          ariaLabel="Choose a song"
          className={styles.toolbar}
          id="ai-song-selector-menu"
          items={pickerItems}
          menuMaxHeight={420}
          menuMinWidth={{ xs: 320, sm: 460 }}
          nextAriaLabel="Next song"
          onSelectIndex={handleSelectSong}
          previousAriaLabel="Previous song"
          renderItemVisual={(song, className) => (
            <AssetImage
              asset={getSongAlbumAsset(song)}
              sizes={`${AI_SONG_MENU_THUMBNAIL_SIZE}px`}
              className={className}
            />
          )}
          selectedIndex={selectedSongIndex}
          selectorAriaLabel="Open song selector"
        />
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
          showTitle={false}
          title={selectedSong.title}
        />
      </div>
    </div>
  );
}
