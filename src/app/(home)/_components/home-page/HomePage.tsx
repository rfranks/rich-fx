"use client";

import { useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import CalendarViewer from "@/app/_components/calendar-viewer/CalendarViewer";
import SiteHeader from "@/app/_components/site-header/SiteHeader";
import HeroIntro from "@/app/_components/hero-intro/HeroIntro";
import HolidayCardViewer from "@/app/_components/holiday-card-viewer/HolidayCardViewer";
import AiSongDemo from "@/app/(home)/_components/ai-song-demo/AiSongDemo";
import BuildCarousel from "@/app/(home)/_components/build-carousel/BuildCarousel";
import BuildPicker from "@/app/(home)/_components/build-carousel/BuildPicker";
import ImageStyleSampler from "@/app/(home)/_components/image-style-sampler/ImageStyleSampler";
import VideoMovieRendering from "@/app/(home)/_components/video-movie-rendering/VideoMovieRendering";
import { BUILD_SECTION_OPTIONS_BY_KEY } from "@/app/(home)/_consts/buildCarousel";
import { DEFAULT_CARD_PANEL } from "@/app/(home)/_consts/homePage";
import { IMAGE_STYLE_SAMPLES } from "@/app/(home)/_consts/imageStyleSampler";
import {
  CARTOON_RENDERING_ITEMS,
  GAME_RENDERING_ITEMS,
  VIDEO_MOVIE_RENDERING_ITEMS,
} from "@/app/(home)/_consts/videoMovieRendering";
import type { BuildCarouselSection } from "@/app/(home)/_types/buildCarousel";
import { sortBuildCarouselSections } from "@/app/(home)/_utils/buildCarousel";
import type {
  ActiveCardPanel,
  CardTransitionDirection,
} from "@/app/_types/holidayCardViewer";
import { calendars, cards, songs } from "@/consts/richFx";
import getRichFxTheme, { richFxThemeCssVariables } from "@/themes/richFxTheme";
import styles from "@/app/(home)/_components/home-page/HomePage.module.css";

export default function HomePage() {
  const theme = useMemo(() => getRichFxTheme("dark"), []);
  const [selectedSlug, setSelectedSlug] = useState(cards[0]?.slug ?? "");
  const [cardTransitionDirection, setCardTransitionDirection] =
    useState<CardTransitionDirection>("left");
  const [activeCardPanel, setActiveCardPanel] =
    useState<ActiveCardPanel>(DEFAULT_CARD_PANEL);
  const [selectedCalendarSlug, setSelectedCalendarSlug] = useState(
    calendars[0]?.slug ?? "",
  );
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedBuildIndex, setSelectedBuildIndex] = useState(0);
  const selectedCard = useMemo(
    () => cards.find((card) => card.slug === selectedSlug) ?? cards[0],
    [selectedSlug],
  );
  const selectedCalendar = useMemo(
    () =>
      calendars.find((calendar) => calendar.slug === selectedCalendarSlug) ??
      calendars[0],
    [selectedCalendarSlug],
  );
  const selectedMonth =
    selectedCalendar?.months[selectedMonthIndex] ?? selectedCalendar?.months[0];

  if (!selectedCard || !selectedCalendar || !selectedMonth) {
    return null;
  }

  const firstSong = songs[0];
  const buildSections: BuildCarouselSection[] = sortBuildCarouselSections([
    {
      ...BUILD_SECTION_OPTIONS_BY_KEY["holiday-card"],
      previewImage: selectedCard.card,
      children: (
        <section
          className={styles.holidayCardSection}
          aria-labelledby="ai-holiday-cards"
        >
          <div className={styles.sectionCopy}>
            <h2 id="ai-holiday-cards">
              Your original photo can be transformed into a custom holiday card.
            </h2>
            <p>
              Provide an original image and a brief description. RichFX can
              rebuild it as a polished holiday card with custom character,
              styling, seasonal art direction, typography, and a print-ready
              composition.
            </p>
          </div>

          <HolidayCardViewer
            activeCardPanel={activeCardPanel}
            cardTransitionDirection={cardTransitionDirection}
            selectedCard={selectedCard}
            onSelectCard={(slug) => {
              if (slug === selectedSlug) {
                return;
              }
              const currentIndex = cards.findIndex(
                (card) => card.slug === selectedSlug,
              );
              const nextIndex = cards.findIndex((card) => card.slug === slug);
              setCardTransitionDirection(
                nextIndex > currentIndex ? "left" : "right",
              );
              setSelectedSlug(slug);
              setActiveCardPanel("original");
            }}
            onSelectCardPanel={setActiveCardPanel}
          />
        </section>
      ),
    },
    {
      ...BUILD_SECTION_OPTIONS_BY_KEY["cartoon-rendering"],
      previewImage: CARTOON_RENDERING_ITEMS[0]?.stylizedImage,
      children: (
        <section
          className={styles.videoMovieSection}
          aria-labelledby="cartoon-rendering"
        >
          <div className={styles.sectionCopy}>
            <h2 id="cartoon-rendering">
              A headshot can become a custom cartoon character.
            </h2>
            <p>
              Start with a clean portrait and turn it into a playful cartoon
              alter ego with character styling, scene direction, and a short
              animated motion beat.
            </p>
          </div>

          <VideoMovieRendering
            className={styles.heroVideoMovieRendering}
            items={CARTOON_RENDERING_ITEMS}
          />
        </section>
      ),
    },
    {
      ...BUILD_SECTION_OPTIONS_BY_KEY["game-rendering"],
      previewImage: GAME_RENDERING_ITEMS[0]?.stylizedImage,
      children: (
        <section
          className={styles.videoMovieSection}
          aria-labelledby="game-rendering"
        >
          <div className={styles.sectionCopy}>
            <h2 id="game-rendering">
              Your photo can become a game-inspired character scene.
            </h2>
            <p>
              RichFX can reinterpret a portrait as a game-world hero, complete
              with wardrobe, environment, cinematic lighting, and a compact
              motion render.
            </p>
          </div>

          <VideoMovieRendering
            className={styles.heroVideoMovieRendering}
            items={GAME_RENDERING_ITEMS}
          />
        </section>
      ),
    },
    {
      ...BUILD_SECTION_OPTIONS_BY_KEY["image-style-sampler"],
      previewImage: IMAGE_STYLE_SAMPLES[0]?.image,
      children: (
        <section
          className={styles.styleSamplerSection}
          aria-labelledby="image-style-sampler"
        >
          <div className={styles.sectionCopy}>
            <h2 id="image-style-sampler">
              Your image can be transformed into many different styles.
            </h2>
            <p>
              RichFX starts with a photorealistic source image, then you can
              choose from a variety of styles including painting, animation,
              illustration, toy, cinematic, and retro treatments to find the
              style direction that fits the story. Sample the different styles
              below to see how your image can be transformed into a variety of
              different looks.
            </p>
          </div>

          <ImageStyleSampler className={styles.heroStyleSampler} />
        </section>
      ),
    },
    {
      ...BUILD_SECTION_OPTIONS_BY_KEY["video-movie-rendering"],
      previewImage: VIDEO_MOVIE_RENDERING_ITEMS[0]?.stylizedImage,
      children: (
        <section
          className={styles.videoMovieSection}
          aria-labelledby="video-movie-rendering"
        >
          <div className={styles.sectionCopy}>
            <h2 id="video-movie-rendering">
              A still image can become a short cinematic scene.
            </h2>
            <p>
              Start with the original frame, push it into a stylized production
              keyframe, then render that direction into a compact motion test
              with atmosphere, continuity, and camera language.
            </p>
          </div>

          <VideoMovieRendering className={styles.heroVideoMovieRendering} />
        </section>
      ),
    },
    {
      ...BUILD_SECTION_OPTIONS_BY_KEY.calendar,
      previewImage: selectedMonth.image,
      children: (
        <section className={styles.calendarSection} aria-labelledby="calendars">
          <div className={styles.sectionCopy}>
            <h2 id="calendars">
              A full year of custom art, one month at a time.
            </h2>
            <p>
              Calendars can start with December and continue through the next
              year. If only part of the run is ready, the viewer renders exactly
              what exists and leaves room for the next months to be added later.
            </p>
          </div>

          <CalendarViewer
            selectedCalendar={selectedCalendar}
            selectedMonth={selectedMonth}
            selectedMonthIndex={selectedMonthIndex}
            onSelectCalendar={(slug) => {
              setSelectedCalendarSlug(slug);
              setSelectedMonthIndex(0);
            }}
            onSelectMonth={setSelectedMonthIndex}
          />
        </section>
      ),
    },
    {
      ...BUILD_SECTION_OPTIONS_BY_KEY["ai-song"],
      previewImage: firstSong?.songAlbumImage
        ? {
            src: firstSong.songAlbumImage,
            alt: `${firstSong.title} album art`,
            width: 1024,
            height: 1024,
          }
        : undefined,
      children: (
        <section className={styles.songSection} aria-labelledby="custom-song">
          <div className={styles.songIntro}>
            <div className={styles.sectionCopy}>
              <h2 id="custom-song">
                Your photo or lyrical idea can become a complete original song.
              </h2>
              <p>
                Bring a favorite picture or your idea for lyrics and RichFX can
                shape it into a finished audio track, and AI-generated album art
                that feels personal enough to wrap as a gift.
              </p>
            </div>
          </div>

          <AiSongDemo />
        </section>
      ),
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className={styles.page} style={richFxThemeCssVariables}>
        <SiteHeader showStartProject />

        <section
          className={styles.heroIntroSection}
          aria-labelledby="hero-title"
        >
          <HeroIntro
            buildPicker={
              <div className={styles.heroBuildExperience}>
                <BuildPicker
                  sections={buildSections}
                  selectedIndex={selectedBuildIndex}
                  onSelectSection={setSelectedBuildIndex}
                />
                <BuildCarousel
                  sections={buildSections}
                  selectedIndex={selectedBuildIndex}
                />
              </div>
            }
          />
        </section>
      </main>
    </ThemeProvider>
  );
}
