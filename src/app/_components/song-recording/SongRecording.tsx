"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ImageIcon from "@mui/icons-material/Image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { MediaCycler } from "@/components/shared/media";
import type { MediaCyclerItem } from "@/components/shared/media";
import Panel from "@/app/_components/panel/Panel";
import InlineRightsStamp from "@/app/_components/rights-stamp/InlineRightsStamp";
import AlbumPanel from "./album-panel/AlbumPanel";
import AudioPlayer from "./audio-player/AudioPlayer";
import LyricsPanel from "./lyrics-panel/LyricsPanel";
import SongPanel from "./song-panel/SongPanel";
import type {
  SongPanelKey,
  SongRecordingProps,
} from "../../_types/songRecording";
import { withBasePath } from "@/utils/basePath";

export default function SongRecording({
  title,
  blurb,
  intentToCopyright = false,
  rightsNotice,
  songAlbumImage,
  songAlbumCaption,
  songAudio,
  songWrittenBy,
  songPerformedBy,
  lyricsMarkdownPath,
  lyricsSource,
  lyricsSourceHref,
  framedPanels = true,
  showTitle = true,
}: SongRecordingProps) {
  const [lyricsMarkdown, setLyricsMarkdown] = useState<string | null>(null);
  const [isLyricsLoading, setIsLyricsLoading] = useState(false);
  const [hasLyricsError, setHasLyricsError] = useState(false);
  const [activeSongPanelKey, setActiveSongPanelKey] =
    useState<SongPanelKey>("song");
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const pendingAudioSyncRef = useRef(false);
  const audioSnapshotRef = useRef({
    currentTime: 0,
    wasPlaying: false,
  });
  const hasLyricsPanel = Boolean(lyricsMarkdownPath);
  const rightsLabel = rightsNotice || "Intent to Copyright";

  useEffect(() => {
    setActiveSongPanelKey("song");
    activeAudioRef.current = null;
    pendingAudioSyncRef.current = false;
    audioSnapshotRef.current = {
      currentTime: 0,
      wasPlaying: false,
    };
  }, [songAudio, title]);

  useEffect(() => {
    if (!lyricsMarkdownPath) {
      setLyricsMarkdown(null);
      setIsLyricsLoading(false);
      setHasLyricsError(false);
      return;
    }
    if (activeSongPanelKey !== "lyrics" || lyricsMarkdown) {
      return;
    }

    const controller = new AbortController();
    setIsLyricsLoading(true);
    setHasLyricsError(false);

    const loadLyrics = async () => {
      try {
        const response = await fetch(withBasePath(lyricsMarkdownPath), {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(
            `Failed to load lyrics markdown: ${response.status} ${response.statusText}`,
          );
        }
        const content = await response.text();
        setLyricsMarkdown(content);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        console.error(error);
        setHasLyricsError(true);
        setLyricsMarkdown(null);
      } finally {
        if (!controller.signal.aborted) {
          setIsLyricsLoading(false);
        }
      }
    };

    void loadLyrics();

    return () => {
      controller.abort();
    };
  }, [lyricsMarkdownPath, activeSongPanelKey, lyricsMarkdown]);

  const captureAudioSnapshot = useCallback(() => {
    const audioNode = activeAudioRef.current;
    if (!audioNode) {
      return;
    }

    audioSnapshotRef.current = {
      currentTime: audioNode.currentTime || 0,
      wasPlaying: !audioNode.paused,
    };
    pendingAudioSyncRef.current = true;
  }, []);

  const attachAudioRef = useCallback((node: HTMLAudioElement | null) => {
    activeAudioRef.current = node;

    if (!node || !pendingAudioSyncRef.current) {
      return;
    }

    const { currentTime, wasPlaying } = audioSnapshotRef.current;
    if (currentTime > 0) {
      try {
        node.currentTime = currentTime;
      } catch {
        // Ignore out-of-range timing writes while metadata loads.
      }
    }

    if (wasPlaying) {
      void node.play().catch(() => {
        // Controls remain available if autoplay is blocked.
      });
    }

    pendingAudioSyncRef.current = false;
  }, []);

  const switchSongPanel = useCallback(
    (nextPanel: SongPanelKey) => {
      if (nextPanel === activeSongPanelKey) {
        return;
      }

      captureAudioSnapshot();
      setActiveSongPanelKey(nextPanel);
    },
    [activeSongPanelKey, captureAudioSnapshot],
  );

  const mediaControlSx = (currentTheme: Theme) => ({
    color: currentTheme.palette.common.black,
    borderColor: currentTheme.palette.common.black,
    bgcolor: currentTheme.palette.common.white,
    "&:hover": {
      bgcolor: currentTheme.palette.common.white,
    },
    "&.Mui-disabled": {
      color: alpha(currentTheme.palette.common.black, 0.36),
      borderColor: alpha(currentTheme.palette.common.black, 0.36),
      bgcolor: alpha(currentTheme.palette.common.white, 0.8),
    },
  });

  const songPanelItems: MediaCyclerItem[] = (() => {
    const items: MediaCyclerItem[] = [
      {
        key: "song",
        title: "",
        mediaType: "custom",
        mediaUrl: "",
        panelSx: {
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        },
        assetFrameSx: {
          width: "100%",
          flex: "1 1 auto",
          minHeight: 0,
          display: "flex",
        },
        customContentSx: {
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        },
        customContent: (
          <SongPanel
            blurb={blurb}
            performedBy={songPerformedBy}
            writtenBy={songWrittenBy}
          />
        ),
        onSelect: () => {
          switchSongPanel("song");
        },
      },
      {
        key: "album",
        title: "",
        mediaType: "custom",
        mediaUrl: "",
        panelSx: {
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        },
        assetFrameSx: {
          width: "100%",
          flex: "1 1 auto",
          minHeight: 0,
          display: "flex",
        },
        customContentSx: {
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        },
        customContent: (
          <AlbumPanel
            albumImage={songAlbumImage}
            caption={songAlbumCaption}
            performedBy={songPerformedBy}
            showAudio={false}
            title={title}
            writtenBy={songWrittenBy}
          />
        ),
        onSelect: () => {
          switchSongPanel("album");
        },
      },
    ];

    if (hasLyricsPanel) {
      items.push({
        key: "lyrics",
        title: "",
        mediaType: "custom",
        mediaUrl: "",
        panelSx: {
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        },
        assetFrameSx: {
          width: "100%",
          flex: "1 1 auto",
          minHeight: 0,
          display: "flex",
        },
        customContentSx: {
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        },
        customContent: (
          <LyricsPanel
            audioSrc={songAudio}
            content={lyricsMarkdown}
            hasError={hasLyricsError}
            isLoading={isLyricsLoading}
            onAudioRef={attachAudioRef}
            showAudio={false}
            source={lyricsSource}
            sourceHref={lyricsSourceHref}
          />
        ),
        onSelect: () => {
          switchSongPanel("lyrics");
        },
      });
    }

    return items;
  })();

  return (
    <Panel className="overflow-hidden" sx={{ p: { xs: 1, sm: 2 } }}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          minWidth: 0,
          maxWidth: "100%",
          minHeight: 0,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: "0 0 auto",
            minWidth: 0,
            display: "grid",
            justifyItems: "start",
            gap: { xs: 0.5, sm: 0.75 },
          }}
        >
          {showTitle ? (
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.32rem", sm: "1.55rem", md: "1.9rem" },
                lineHeight: 1.05,
              }}
            >
              {title}
            </Typography>
          ) : null}
          <InlineRightsStamp label={rightsLabel} visible={intentToCopyright} />
          <AudioPlayer src={songAudio} onAudioRef={attachAudioRef} />
        </Box>

        <Box
          sx={{
            borderRadius: "20px",
            border: framedPanels ? "1px solid" : 0,
            borderColor: framedPanels ? "var(--surface-border)" : "transparent",
            backgroundColor: framedPanels ? "var(--surface-1)" : "transparent",
            p: { xs: 0.5, md: 1.25 },
            minHeight: 0,
            flex: "1 1 0%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <MediaCycler
            items={songPanelItems}
            singlePanel
            singlePanelActiveKey={activeSongPanelKey}
            transitionMs={260}
            showChevronNavigation={false}
            navigationControlSx={mediaControlSx}
            expandControlSx={mediaControlSx}
            stackSx={{
              flexGrow: 1,
              minHeight: 0,
              height: "100%",
              overflow: "hidden",
            }}
          />
        </Box>

        <Box
          role="group"
          aria-label="Choose song preview"
          sx={{
            display: "grid",
            gridTemplateColumns: hasLyricsPanel
              ? "repeat(3, minmax(0, 1fr))"
              : "repeat(2, minmax(0, 1fr))",
            gap: { xs: 0.5, sm: 1 },
            flex: "0 0 auto",
            p: { xs: 0.375, sm: 0.5 },
            border: "1px solid",
            borderColor: "var(--surface-border)",
            borderRadius: "8px",
            backgroundColor: "rgba(3, 3, 3, 0.52)",
          }}
        >
          <Box
            component="button"
            type="button"
            aria-pressed={activeSongPanelKey === "song"}
            onClick={() => switchSongPanel("song")}
            sx={(theme) => ({
              minHeight: { xs: 36, sm: 42 },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 0.5, sm: 1 },
              border: 0,
              borderRadius: "6px",
              backgroundColor:
                activeSongPanelKey === "song"
                  ? theme.palette.primary.main
                  : "transparent",
              color:
                activeSongPanelKey === "song"
                  ? theme.palette.primary.contrastText
                  : "text.secondary",
              cursor: "pointer",
              font: "inherit",
              fontSize: { xs: "0.66rem", sm: "0.72rem" },
              fontWeight: 900,
              letterSpacing: { xs: "0.04em", sm: "0.08em" },
              textTransform: "uppercase",
              transition:
                "background 180ms ease, color 180ms ease, transform 180ms ease",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transform: "translateY(-1px)",
              },
            })}
          >
            <AudiotrackIcon fontSize="small" aria-hidden="true" />
            <span>Song</span>
          </Box>
          <Box
            component="button"
            type="button"
            aria-pressed={activeSongPanelKey === "album"}
            onClick={() => switchSongPanel("album")}
            sx={(theme) => ({
              minHeight: { xs: 36, sm: 42 },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 0.5, sm: 1 },
              border: 0,
              borderRadius: "6px",
              backgroundColor:
                activeSongPanelKey === "album"
                  ? theme.palette.primary.main
                  : "transparent",
              color:
                activeSongPanelKey === "album"
                  ? theme.palette.primary.contrastText
                  : "text.secondary",
              cursor: "pointer",
              font: "inherit",
              fontSize: { xs: "0.66rem", sm: "0.72rem" },
              fontWeight: 900,
              letterSpacing: { xs: "0.04em", sm: "0.08em" },
              textTransform: "uppercase",
              transition:
                "background 180ms ease, color 180ms ease, transform 180ms ease",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transform: "translateY(-1px)",
              },
            })}
          >
            <ImageIcon fontSize="small" aria-hidden="true" />
            <Box
              component="span"
              sx={{ display: { xs: "inline", sm: "none" } }}
            >
              Art
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Album Art
            </Box>
          </Box>
          {hasLyricsPanel ? (
            <Box
              component="button"
              type="button"
              aria-pressed={activeSongPanelKey === "lyrics"}
              onClick={() => switchSongPanel("lyrics")}
              sx={(theme) => ({
                minHeight: { xs: 36, sm: 42 },
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0.5, sm: 1 },
                border: 0,
                borderRadius: "6px",
                backgroundColor:
                  activeSongPanelKey === "lyrics"
                    ? theme.palette.primary.main
                    : "transparent",
                color:
                  activeSongPanelKey === "lyrics"
                    ? theme.palette.primary.contrastText
                    : "text.secondary",
                cursor: "pointer",
                font: "inherit",
                fontSize: { xs: "0.66rem", sm: "0.72rem" },
                fontWeight: 900,
                letterSpacing: { xs: "0.04em", sm: "0.08em" },
                textTransform: "uppercase",
                transition:
                  "background 180ms ease, color 180ms ease, transform 180ms ease",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  transform: "translateY(-1px)",
                },
              })}
            >
              <ArticleIcon fontSize="small" aria-hidden="true" />
              <span>Lyrics</span>
            </Box>
          ) : null}
        </Box>
      </Stack>
    </Panel>
  );
}
