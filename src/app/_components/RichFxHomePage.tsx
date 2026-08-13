import Image from "next/image";
import Link from "next/link";
import RichFxScrollRuntime from "./RichFxScrollRuntime";
import styles from "./RichFxHomePage.module.css";
import {
  richFxAudioFeature,
  richFxBrandPlate,
  richFxDndStages,
  richFxGatewayExperiments,
  richFxPipelineStages,
  richFxServicePlate,
  richFxVfxFeature,
  richFxWorldImages,
} from "@/app/_utils/richFxHomeData";
import { withBasePath } from "@/utils/basePath";
import type {
  RichFxExperimentFeature,
  RichFxImageAsset,
  RichFxPipelineStage,
  RichFxVideoAsset,
} from "@/app/_types/richFxHome";

const navItems = [
  { id: "showreel", label: "Showreel" },
  { id: "ai-vfx", label: "AI VFX" },
  { id: "dnd-vfx", label: "DnD" },
  { id: "film", label: "Film" },
  { id: "worlds", label: "Worlds" },
  { id: "audio", label: "Audio" },
  { id: "experiments", label: "Experiments" },
];

const richFxHomeVideoAudioEnabled = true;

const philosophyLines = [
  "Filmmaking instincts.",
  "Software engineering discipline.",
  "Generative AI as a production material.",
  "Visual effects, story systems, and experiments that can actually ship.",
];

function AssetImage({
  asset,
  className,
  priority = false,
  sizes,
}: {
  asset: RichFxImageAsset;
  className?: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <Image
      src={withBasePath(asset.src)}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

function InlineVideo({
  video,
  className,
}: {
  video: RichFxVideoAsset;
  className?: string;
}) {
  return (
    <video
      className={className}
      data-richfx-video
      data-richfx-video-audio={
        richFxHomeVideoAudioEnabled ? "enabled" : "muted"
      }
      controls={richFxHomeVideoAudioEnabled}
      muted={!richFxHomeVideoAudioEnabled}
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

function ScoreReveal({ stage }: { stage: RichFxPipelineStage }) {
  if (!stage.audio) {
    return null;
  }

  return (
    <div className={styles.scoreReveal}>
      {stage.image ? (
        <AssetImage
          asset={stage.image}
          className={styles.scorePlate}
          sizes="(max-width: 900px) 92vw, 50vw"
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

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className={styles.kicker} data-richfx-reveal>
      {children}
    </p>
  );
}

function StickyNarrative({
  id,
  eyebrow,
  title,
  description,
  stages,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  stages: RichFxPipelineStage[];
}) {
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
                    sizes="(max-width: 900px) 92vw, 50vw"
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

function ExperimentCard({ item }: { item: RichFxExperimentFeature }) {
  return (
    <Link className={styles.experimentCard} href={`/ai-lab#${item.slug}`}>
      <AssetImage
        asset={item.previewImage}
        className={styles.experimentImage}
        sizes="(max-width: 760px) 88vw, 28vw"
      />
      <span>{item.shortText}</span>
      <strong>{item.title}</strong>
    </Link>
  );
}

export default function RichFxHomePage() {
  const vfxStages: RichFxPipelineStage[] = [
    {
      key: "source",
      eyebrow: "01 / Plate",
      title: "Start with a grounded image.",
      body:
        richFxVfxFeature.beforeImage?.alt ??
        "A source frame gives the transformation an anchor.",
      image: richFxVfxFeature.beforeImage,
    },
    {
      key: "look",
      eyebrow: "02 / Look",
      title: "Push the frame into a stylized visual direction.",
      body: "Composition, lighting, costume, and atmosphere become the design brief for the next pass.",
      image: richFxVfxFeature.stylizedImage,
    },
    {
      key: "motion",
      eyebrow: "03 / Motion",
      title: "Let the shot move, then judge it like footage.",
      body: richFxVfxFeature.blurb,
      video: richFxVfxFeature.video,
    },
  ];

  return (
    <main className={styles.page}>
      <RichFxScrollRuntime />
      <nav className={styles.topNav} aria-label="RichFX homepage sections">
        <Link href="/" className={styles.navBrand}>
          <Image
            src={withBasePath("/assets/wordmark.png")}
            alt="RichFX"
            width={1802}
            height={872}
            priority
            sizes="(max-width: 640px) 92px, 118px"
            className={styles.navWordmark}
          />
        </Link>
        <div>
          {navItems.map((item) => (
            <a href={`#${item.id}`} data-richfx-nav={item.id} key={item.id}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

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
          <AssetImage
            asset={richFxServicePlate}
            sizes="(max-width: 900px) 92vw, 66vw"
          />
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
        description="The homepage borrows real experiment media from AI Lab and reframes it as a production pipeline."
        stages={vfxStages}
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
              <AssetImage asset={image} sizes="(max-width: 760px) 82vw, 30vw" />
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.audio} id="audio" data-richfx-section>
        <div className={styles.audioImage} data-richfx-reveal>
          <AssetImage
            asset={richFxAudioFeature.albumImage}
            sizes="(max-width: 760px) 76vw, 32vw"
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
          <SectionKicker>Experiments / AI Lab</SectionKicker>
          <h2 data-richfx-reveal>Selected fragments from the lab.</h2>
          <p data-richfx-reveal>
            A small gateway into the existing AI Lab experience, kept curated
            here so the full route can remain a proper browseable lab.
          </p>
        </div>
        <div className={styles.experimentGrid}>
          {richFxGatewayExperiments.map((item) => (
            <ExperimentCard item={item} key={item.slug} />
          ))}
        </div>
        <Link className={styles.textLink} href="/ai-lab">
          Enter AI Lab
        </Link>
      </section>

      <section className={styles.about} id="about" data-richfx-section>
        <SectionKicker>About / Philosophy</SectionKicker>
        <h2 data-richfx-reveal>
          RichFX sits where story systems meet production craft.
        </h2>
        <div className={styles.philosophyList}>
          {philosophyLines.map((line) => (
            <p data-richfx-reveal key={line}>
              {line}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.finalCta} id="contact" data-richfx-section>
        <p data-richfx-reveal>RichFX</p>
        <h2 data-richfx-reveal>Build the world before the world exists.</h2>
        <Link className={styles.ctaLink} href="/ai-lab">
          Explore the lab
        </Link>
      </section>
    </main>
  );
}
