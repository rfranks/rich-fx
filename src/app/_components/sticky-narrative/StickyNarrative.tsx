import { STAGE_MEDIA_SIZES } from "@/app/what-we-do/_consts/whatWeDoPage";
import type { StickyNarrativeProps } from "@/app/what-we-do/_types/whatWeDoPage";
import { AssetImage } from "@/components/shared/media";
import InlineVideo from "../inline-video/InlineVideo";
import ScoreReveal from "../score-reveal/ScoreReveal";
import SectionKicker from "@/app/_components/section-kicker/SectionKicker";
import styles from "@/app/what-we-do/_components/what-we-do-page/WhatWeDoPage.module.css";

export default function StickyNarrative({
  id,
  eyebrow,
  title,
  description,
  stages,
}: StickyNarrativeProps) {
  const hasInteractiveMedia = stages.some((stage) => stage.audio);

  return (
    <section
      className={styles.stickyNarrative}
      id={id}
      data-richfx-section
      data-richfx-narrative
    >
      <div className={styles.stickyIntro}>
        <SectionKicker>{eyebrow}</SectionKicker>
        <h2 data-richfx-reveal>{title}</h2>
        <p data-richfx-reveal>{description}</p>
      </div>
      <div className={styles.stickyNarrativeBody} data-richfx-media-track>
        <div className={styles.stickyMedia} data-richfx-moving-media>
          <div
            className={styles.stepMediaStack}
            aria-hidden={hasInteractiveMedia ? undefined : true}
          >
            {stages.map((stage) => (
              <div
                className={styles.stepMedia}
                data-richfx-step-media={stage.key}
                key={stage.key}
              >
                {stage.audio ? (
                  <ScoreReveal stage={stage} />
                ) : stage.video ? (
                  <InlineVideo
                    video={stage.video}
                    className={styles.motionAsset}
                  />
                ) : stage.image ? (
                  <AssetImage
                    asset={stage.image}
                    className={styles.coverAsset}
                    sizes={STAGE_MEDIA_SIZES}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.stepCopyList}>
          {stages.map((stage) => (
            <article
              className={styles.stepCopy}
              data-richfx-step={stage.key}
              key={stage.key}
            >
              <span>{stage.eyebrow}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
