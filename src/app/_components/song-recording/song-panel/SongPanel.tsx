import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SongPanelProps } from "../../../_types/songRecording";
import RightsStamp from "@/app/_components/rights-stamp/RightsStamp";
import AudioPlayer from "../audio-player/AudioPlayer";
import Credits from "../credits/Credits";

export default function SongPanel({
  audioSrc,
  blurb,
  intentToCopyright,
  onAudioRef,
  performedBy,
  rightsLabel,
  rightsStampAngle,
  writtenBy,
}: SongPanelProps) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 1,
        p: { xs: 1.25, md: 1.5 },
        overflow: "hidden",
      }}
    >
      <RightsStamp
        angle={rightsStampAngle}
        label={rightsLabel}
        visible={intentToCopyright}
      />
      <Box
        sx={{
          flex: "1 1 auto",
          minWidth: 0,
          minHeight: 0,
          maxWidth: 720,
          overflowY: "auto",
          pr: 0.5,
        }}
      >
        <Credits performedBy={performedBy} writtenBy={writtenBy} />
        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            fontSize: "0.95rem",
            lineHeight: 1.35,
          }}
        >
          {blurb}
        </Typography>
      </Box>
      <AudioPlayer src={audioSrc} onAudioRef={onAudioRef} />
    </Box>
  );
}
