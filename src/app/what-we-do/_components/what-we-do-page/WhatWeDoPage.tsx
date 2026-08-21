import Link from "next/link";
import {
  AUDIO_IMAGE_SIZES,
  PHILOSOPHY_LINES,
  SERVICE_PLATE_SIZES,
  VFX_STAGES,
  WORLD_IMAGE_SIZES,
} from "@/app/what-we-do/_consts/whatWeDoPage";
import { AssetImage } from "@/components/shared/media";
import ExperimentCard from "@/app/_components/experiment-card/ExperimentCard";
import SectionKicker from "@/app/_components/section-kicker/SectionKicker";
import StickyNarrative from "@/app/_components/sticky-narrative/StickyNarrative";
import SiteHeader from "@/app/_components/site-header/SiteHeader";
import ScrollRuntime from "@/app/_components/scroll-runtime/ScrollRuntime";
import styles from "@/app/what-we-do/_components/what-we-do-page/WhatWeDoPage.module.css";
import {
  richFxAudioFeature,
  richFxBrandPlate,
  richFxDndStages,
  richFxGatewayExperiments,
  richFxPipelineStages,
  richFxServicePlate,
  richFxWorldImages,
} from "@/app/what-we-do/_utils/richFxData";
import { withBasePath } from "@/utils/basePath";

export default function WhatWeDoPage() {
  return (
    <main className={styles.page}>
      <ScrollRuntime />
      <SiteHeader />

      <section className={styles.hero} id="hero" data-richfx-section>
        <div className={styles.heroPlate} aria-hidden="true">
          <AssetImage
            asset={richFxBrandPlate}
            className={styles.brandPlateImage}
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroCopy}>
          <SectionKicker>AI VFX Studio / Creative Technology</SectionKicker>
          <h1 data-richfx-reveal>RichFX</h1>
          <p className={styles.tagline} data-richfx-reveal>
            Building Better Worlds Since 2026.
          </p>
          <p className={styles.heroStatement} data-richfx-reveal>
            A cinematic playground for story, software, generated imagery,
            motion experiments, and production-ready imagination.
          </p>
        </div>
      </section>

      <section className={styles.showreel} id="showreel" data-richfx-section>
        <div className={styles.showreelFrame}>
          <AssetImage asset={richFxServicePlate} sizes={SERVICE_PLATE_SIZES} />
        </div>
        <div className={styles.editorialCopy}>
          <SectionKicker>Showreel / Introduction</SectionKicker>
          <h2 data-richfx-reveal>The page is the reel.</h2>
          <p data-richfx-reveal>
            RichFX treats scroll as a production timeline: source material,
            style exploration, motion, continuity, sound, and story all revealed
            with deliberate pacing.
          </p>
        </div>
      </section>

      <StickyNarrative
        id="ai-vfx"
        eyebrow="AI VFX"
        title="Image, style, and motion are one continuous shot process."
        description="The homepage borrows real experiment media from AI Studio and reframes it as a production pipeline."
        stages={VFX_STAGES}
      />

      <StickyNarrative
        id="dnd-vfx"
        eyebrow="DnD VFX Stage"
        title="A tabletop hero becomes a cinematic production stage."
        description="Krangor turns a personal reference into character art, beat boards, score, key art, and motion while the scroll acts as the production timeline."
        stages={richFxDndStages}
      />

      <StickyNarrative
        id="film"
        eyebrow="Generative Film / Storyboarding"
        title="A concept unfolds into generated film language."
        description="The Rock is used here as an existing long-form experiment: book concept, world, characters, trailer, and episodic motion."
        stages={richFxPipelineStages}
      />

      <section className={styles.worlds} id="worlds" data-richfx-section>
        <div className={styles.sectionHeader}>
          <SectionKicker>Character Design / World Building</SectionKicker>
          <h2 data-richfx-reveal>
            Continuity is the difference between a prompt and a world.
          </h2>
          <p data-richfx-reveal>
            Character sheets, environments, props, and recurring visual rules
            give future generated sequences something solid to return to.
          </p>
        </div>
        <div className={styles.worldGrid}>
          {richFxWorldImages.map((image) => (
            <figure
              className={styles.worldTile}
              data-richfx-reveal
              key={image.src}
            >
              <AssetImage asset={image} sizes={WORLD_IMAGE_SIZES} />
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.audio} id="audio" data-richfx-section>
        <div className={styles.audioImage} data-richfx-reveal>
          <AssetImage
            asset={richFxAudioFeature.albumImage}
            sizes={AUDIO_IMAGE_SIZES}
          />
        </div>
        <div className={styles.audioCopy}>
          <SectionKicker>Music / Audio</SectionKicker>
          <h2 data-richfx-reveal>{richFxAudioFeature.title}</h2>
          <p data-richfx-reveal>{richFxAudioFeature.body}</p>
          <audio
            controls
            preload="none"
            src={withBasePath(richFxAudioFeature.audioSrc)}
          >
            Your browser does not support the audio element.
          </audio>
          {richFxAudioFeature.credit ? (
            <span>{richFxAudioFeature.credit}</span>
          ) : null}
        </div>
      </section>

      <section
        className={styles.experiments}
        id="experiments"
        data-richfx-section
      >
        <div className={styles.sectionHeader}>
          <SectionKicker>Experiments / AI Studio</SectionKicker>
          <h2 data-richfx-reveal>Selected fragments from the lab.</h2>
          <p data-richfx-reveal>
            A small gateway into the existing AI Studio experience, kept curated
            here so the full route can remain a proper browseable lab.
          </p>
        </div>
        <div className={styles.experimentGrid}>
          {richFxGatewayExperiments.map((item) => (
            <ExperimentCard item={item} key={item.slug} />
          ))}
        </div>
        <Link className={styles.textLink} href="/ai-studio">
          Enter AI Studio
        </Link>
      </section>

      <section className={styles.about} id="about" data-richfx-section>
        <SectionKicker>About / Philosophy</SectionKicker>
        <h2 data-richfx-reveal>
          RichFX sits where story systems meet production craft.
        </h2>
        <div className={styles.philosophyList}>
          {PHILOSOPHY_LINES.map((line) => (
            <p data-richfx-reveal key={line}>
              {line}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.finalCta} id="contact" data-richfx-section>
        <p data-richfx-reveal>RichFX</p>
        <h2 data-richfx-reveal>Build the world before the world exists.</h2>
        <Link className={styles.ctaLink} href="/ai-studio">
          Explore the lab
        </Link>
      </section>
    </main>
  );
}
