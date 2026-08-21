import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MarkdownContent from "@/components/shared/content/markdown-content/MarkdownContent";
import type { LyricsPanelProps } from "../../../_types/songRecording";
import AudioPlayer from "../audio-player/AudioPlayer";
import SourceCredit from "@/app/_components/source-credit/SourceCredit";

export default function LyricsPanel({
  audioSrc,
  content,
  hasError,
  isLoading,
  onAudioRef,
  showAudio = true,
  source,
  sourceHref,
}: LyricsPanelProps) {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
          px: { xs: 2, md: 3 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            mb: 1,
            py: 0.5,
            bgcolor: "var(--surface-1)",
            borderBottom: "1px solid",
            borderColor: "var(--surface-border)",
          }}
        >
          Lyrics
        </Typography>
        {isLoading ? (
          <Typography variant="body2" color="text.secondary">
            Loading lyrics...
          </Typography>
        ) : null}
        {hasError ? (
          <Typography variant="body2" color="error.main">
            Could not load lyrics.
          </Typography>
        ) : null}
        {!isLoading && !hasError && content ? (
          <MarkdownContent
            content={content}
            preserveLineBreaks
            variant="body2"
          />
        ) : null}
        <SourceCredit label={source} href={sourceHref} />
      </Box>
      {showAudio ? (
        <AudioPlayer src={audioSrc} onAudioRef={onAudioRef} />
      ) : null}
    </Box>
  );
}
