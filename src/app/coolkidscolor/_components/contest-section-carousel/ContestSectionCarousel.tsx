"use client";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type FocusEvent,
} from "react";
import { COOL_KIDS_COLOR_CAROUSEL_INTERVAL_MS } from "@/app/coolkidscolor/_consts/coolKidsColor";
import type { ContestSectionCarouselProps } from "@/app/coolkidscolor/_types/coolKidsColor";
import styles from "./ContestSectionCarousel.module.css";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function ContestSectionCarousel({
  slides,
  autoAdvanceMs = COOL_KIDS_COLOR_CAROUSEL_INTERVAL_MS,
}: ContestSectionCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasCarouselFocus, setHasCarouselFocus] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const slideCount = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goToPreviousSlide = useCallback(() => {
    setActiveIndex((index) => (index - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToNextSlide = useCallback(() => {
    setActiveIndex((index) => (index + 1) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  const shouldAutoAdvance =
    slideCount > 1 &&
    autoAdvanceMs > 0 &&
    !isPaused &&
    !hasCarouselFocus &&
    !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAutoAdvance) return;

    const intervalId = window.setInterval(goToNextSlide, autoAdvanceMs);
    return () => window.clearInterval(intervalId);
  }, [activeIndex, autoAdvanceMs, goToNextSlide, shouldAutoAdvance]);

  if (slideCount === 0) return null;

  const activeSlide = slides[activeIndex] ?? slides[0];
  const progressStyle = {
    animationDuration: `${autoAdvanceMs}ms`,
  } satisfies CSSProperties;

  const handleSectionChange = (event: SelectChangeEvent<number>) => {
    goToSlide(Number(event.target.value));
  };

  const handleCarouselBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setHasCarouselFocus(false);
    }
  };

  return (
    <Box
      aria-label="Cool Kids Color contest sections"
      aria-roledescription="carousel"
      className={styles.carousel}
      component="section"
      onBlur={handleCarouselBlur}
      onFocus={() => setHasCarouselFocus(true)}
    >
      <Box className={styles.viewport}>
        <Box
          className={styles.track}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              aria-label={`${index + 1} of ${slideCount}: ${slide.label}`}
              aria-roledescription="slide"
              className={styles.slide}
              data-slide-id={slide.id}
              inert={index !== activeIndex ? true : undefined}
              key={slide.id}
              role="group"
            >
              {slide.content}
            </div>
          ))}
        </Box>
      </Box>

      <Box className={styles.toolbar}>
        <Box className={styles.progressTrack} aria-hidden="true">
          {shouldAutoAdvance ? (
            <Box
              className={styles.progressValue}
              key={activeIndex}
              style={progressStyle}
            />
          ) : null}
        </Box>

        <Box className={styles.controls}>
          <Tooltip title="Previous section">
            <IconButton
              aria-label="Show previous contest section"
              className={styles.iconButton}
              onClick={goToPreviousSlide}
            >
              <ArrowBackRoundedIcon aria-hidden="true" />
            </IconButton>
          </Tooltip>

          <Select
            className={styles.sectionSelect}
            inputProps={{ "aria-label": "Choose contest section" }}
            onChange={handleSectionChange}
            size="small"
            value={activeIndex}
          >
            {slides.map((slide, index) => (
              <MenuItem key={slide.id} value={index}>
                {slide.label}
              </MenuItem>
            ))}
          </Select>

          <Box className={styles.counter} aria-hidden="true">
            {activeIndex + 1} / {slideCount}
          </Box>

          <Tooltip
            title={
              isPaused
                ? "Resume automatic rotation"
                : "Pause automatic rotation"
            }
          >
            <IconButton
              aria-label={
                isPaused
                  ? "Resume automatic section rotation"
                  : "Pause automatic section rotation"
              }
              aria-pressed={isPaused}
              className={styles.iconButton}
              onClick={() => setIsPaused((paused) => !paused)}
            >
              {isPaused ? (
                <PlayArrowRoundedIcon aria-hidden="true" />
              ) : (
                <PauseRoundedIcon aria-hidden="true" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Next section">
            <IconButton
              aria-label="Show next contest section"
              className={styles.iconButton}
              onClick={goToNextSlide}
            >
              <ArrowForwardRoundedIcon aria-hidden="true" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        aria-live={shouldAutoAdvance ? "off" : "polite"}
        className={styles.liveStatus}
      >
        Showing section {activeIndex + 1} of {slideCount}: {activeSlide.label}
      </Box>
    </Box>
  );
}
