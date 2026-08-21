import { STAGE_MEDIA_SIZES } from "@/app/what-we-do/_consts/whatWeDoPage";
import type { RichFxStageProps } from "@/app/what-we-do/_types/richFx";
import { withBasePath } from "@/utils/basePath";
import { AssetImage } from "@/components/shared/media";
import styles from "@/app/what-we-do/_components/what-we-do-page/WhatWeDoPage.module.css";

export default function ScoreReveal({ stage }: RichFxStageProps) {
  if (!stage.audio) {
    return null;
  }

  return (
    <div className={styles.scoreReveal}>
      {stage.image ? (
        <AssetImage
          asset={stage.image}
          className={styles.scorePlate}
          sizes={STAGE_MEDIA_SIZES}
        />
      ) : null}
      <div className={styles.scoreControls}>
        <span>{stage.audio.note ?? "Audio score"}</span>
        <strong>{stage.audio.label}</strong>
        <audio controls preload="none" src={withBasePath(stage.audio.src)}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
