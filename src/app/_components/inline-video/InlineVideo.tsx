import { VIDEO_AUDIO_ENABLED } from "@/app/what-we-do/_consts/whatWeDoPage";
import type { RichFxInlineVideoProps } from "@/app/what-we-do/_types/richFx";
import { withBasePath } from "@/utils/basePath";

export default function InlineVideo({
  video,
  className,
}: RichFxInlineVideoProps) {
  return (
    <video
      className={className}
      data-richfx-video
      data-richfx-video-audio={VIDEO_AUDIO_ENABLED ? "enabled" : "muted"}
      controls={VIDEO_AUDIO_ENABLED}
      muted={!VIDEO_AUDIO_ENABLED}
      loop
      playsInline
      preload="none"
      poster={video.poster ? withBasePath(video.poster) : undefined}
      aria-label={video.label}
    >
      <source src={withBasePath(video.src)} />
    </video>
  );
}
