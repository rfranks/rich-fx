import Box from "@mui/material/Box";
import { ImageLightbox } from "@/components/shared/media";
import type { AlbumPanelProps } from "../../../_types/songRecording";
import { withBasePath } from "@/utils/basePath";
import AudioPlayer from "../audio-player/AudioPlayer";

export default function AlbumPanel({
  albumImage,
  audioSrc,
  caption,
  onAudioRef,
  performedBy,
  showAudio = true,
  title,
  writtenBy,
}: AlbumPanelProps) {
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
          flex: "1 1 0%",
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          overflow: "hidden",
        }}
      >
        <ImageLightbox
          src={withBasePath(albumImage)}
          alt={`${title} album cover`}
          title={title}
          caption={
            caption || `Written by ${writtenBy} • Performed by ${performedBy}`
          }
          triggerSx={{ width: "100%", display: "block", height: "100%" }}
          previewContainerSx={{
            width: "100%",
            height: "100%",
            maxWidth: 520,
            maxHeight: "100%",
            aspectRatio: "1 / 1",
            borderRadius: "inherit",
            overflow: "hidden",
            marginInline: "auto",
            backgroundColor: "#050505",
          }}
          previewImageSx={{
            objectFit: "contain",
          }}
        />
      </Box>
      {showAudio && audioSrc && onAudioRef ? (
        <AudioPlayer src={audioSrc} onAudioRef={onAudioRef} />
      ) : null}
    </Box>
  );
}
