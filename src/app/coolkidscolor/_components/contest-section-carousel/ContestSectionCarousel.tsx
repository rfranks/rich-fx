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
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { usePrefersReducedMotion } from "@/app/coolkidscolor/_hooks/usePrefersReducedMotion";
import {
  COOL_KIDS_COLOR_CAROUSEL_INTERVAL_MS,
  COOL_KIDS_COLOR_SWIPE_AXIS_LOCK_PX,
  COOL_KIDS_COLOR_SWIPE_DISTANCE_RATIO,
  COOL_KIDS_COLOR_SWIPE_MIN_DISTANCE_PX,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import type { ContestSectionCarouselProps } from "@/app/coolkidscolor/_types/coolKidsColor";
import styles from "./ContestSectionCarousel.module.css";

const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [role="combobox"]';

export default function ContestSectionCarousel({
  slides,
  autoAdvanceMs = COOL_KIDS_COLOR_CAROUSEL_INTERVAL_MS,
}: ContestSectionCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasCarouselFocus, setHasCarouselFocus] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const gestureRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    deltaX: number;
    axis: "horizontal" | "vertical" | null;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    deltaX: 0,
    axis: null,
  });
  const suppressClickRef = useRef(false);
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
    const showHashedSlide = () => {
      const hash = window.location.hash.slice(1);
      const hashedIndex = slides.findIndex(
        (slide) => `coolkidscolor-${slide.id}` === hash,
      );

      if (hashedIndex >= 0) {
        setActiveIndex(hashedIndex);
      }
    };

    showHashedSlide();
    window.addEventListener("hashchange", showHashedSlide);
    return () => window.removeEventListener("hashchange", showHashedSlide);
  }, [slides]);

  const shouldAutoAdvance =
    slideCount > 1 &&
    autoAdvanceMs > 0 &&
    !isPaused &&
    !hasCarouselFocus &&
    !isDragging &&
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

  const resetGesture = () => {
    gestureRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      deltaX: 0,
      axis: null,
    };
    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const isUnsupportedMouseButton =
      event.pointerType === "mouse" && event.button !== 0;

    if (
      event.isPrimary === false ||
      isUnsupportedMouseButton ||
      target.closest(INTERACTIVE_SELECTOR)
    ) {
      return;
    }

    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      deltaX: 0,
      axis: null,
    };
    suppressClickRef.current = false;
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (
      gesture.axis === null &&
      Math.max(Math.abs(deltaX), Math.abs(deltaY)) >=
        COOL_KIDS_COLOR_SWIPE_AXIS_LOCK_PX
    ) {
      gesture.axis =
        Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
    }

    if (gesture.axis !== "horizontal") return;

    event.preventDefault();
    gesture.deltaX = deltaX;
    suppressClickRef.current = true;

    const isPullingPastStart = activeIndex === 0 && deltaX > 0;
    const isPullingPastEnd = activeIndex === slideCount - 1 && deltaX < 0;
    setDragOffset(
      isPullingPastStart || isPullingPastEnd ? deltaX * 0.22 : deltaX,
    );
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (gesture.pointerId !== event.pointerId) return;

    const viewportWidth = viewportRef.current?.clientWidth ?? 0;
    const swipeDistance = Math.max(
      COOL_KIDS_COLOR_SWIPE_MIN_DISTANCE_PX,
      viewportWidth * COOL_KIDS_COLOR_SWIPE_DISTANCE_RATIO,
    );

    if (gesture.axis === "horizontal") {
      if (gesture.deltaX <= -swipeDistance && activeIndex < slideCount - 1) {
        goToNextSlide();
      } else if (gesture.deltaX >= swipeDistance && activeIndex > 0) {
        goToPreviousSlide();
      }
    }

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetGesture();
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (gestureRef.current.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetGesture();
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
      <Box
        className={styles.viewport}
        data-testid="contest-carousel-viewport"
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClickRef.current = false;
        }}
        onDragStart={(event) => event.preventDefault()}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        ref={viewportRef}
      >
        <Box
          className={`${styles.track} ${isDragging ? styles.trackDragging : ""}`}
          style={{
            transform: `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              aria-label={`${index + 1} of ${slideCount}: ${slide.label}`}
              aria-roledescription="slide"
              className={styles.slide}
              data-slide-id={slide.id}
              id={`coolkidscolor-${slide.id}`}
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
