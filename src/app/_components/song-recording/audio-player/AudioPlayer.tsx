import Box from "@mui/material/Box";
import type { AudioPlayerProps } from "../../../_types/songRecording";
import { withBasePath } from "@/utils/basePath";

export default function AudioPlayer({ src, onAudioRef }: AudioPlayerProps) {
  return (
    <Box
      component="audio"
      controls
      preload="metadata"
      src={withBasePath(src)}
      ref={onAudioRef}
      sx={{
        mt: 1,
        width: "100%",
      }}
    >
      Your browser does not support the audio element.
    </Box>
  );
}
