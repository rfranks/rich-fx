"use client";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState, type FocusEvent } from "react";
import { AssetImage } from "@/components/shared/media";
import {
  COOL_KIDS_COLOR_PROMO_INTERVAL_MS,
  COOL_KIDS_COLOR_PROMOTIONS,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import { usePrefersReducedMotion } from "@/app/coolkidscolor/_hooks/usePrefersReducedMotion";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function PersonalizedColoringBookCta() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activePromotion =
    COOL_KIDS_COLOR_PROMOTIONS[activeIndex] ?? COOL_KIDS_COLOR_PROMOTIONS[0];
  const shouldAutoRotate = !isPaused && !isInteracting && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAutoRotate) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex(
        (index) => (index + 1) % COOL_KIDS_COLOR_PROMOTIONS.length,
      );
    }, COOL_KIDS_COLOR_PROMO_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [shouldAutoRotate]);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsInteracting(false);
    }
  };

  return (
    <Box
      aria-label="Featured Cool Kids Color links"
      component="aside"
      className={styles.personalizedBookBanner}
    >
      <Container maxWidth="xl">
        <Box
          className={styles.personalizedBookBannerFrame}
          onBlur={handleBlur}
          onFocus={() => setIsInteracting(true)}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          <Box
            aria-label={activePromotion.ariaLabel}
            className={styles.personalizedBookBannerLink}
            component="a"
            href={activePromotion.href}
            rel={
              activePromotion.openInNewTab ? "noopener noreferrer" : undefined
            }
            target={activePromotion.openInNewTab ? "_blank" : undefined}
          >
            <AssetImage
              asset={activePromotion.image}
              className={styles.personalizedBookBannerImage}
              key={activePromotion.id}
              priority={activeIndex === 0}
              sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1536px) 50vw, 768px"
            />
          </Box>

          <Box
            aria-label="Choose featured link"
            className={styles.personalizedBookBannerControls}
            role="group"
          >
            {COOL_KIDS_COLOR_PROMOTIONS.map((promotion, index) => (
              <button
                aria-current={index === activeIndex ? "true" : undefined}
                aria-label={`Show ${promotion.label}`}
                className={`${styles.personalizedBookBannerDot} ${
                  index === activeIndex
                    ? styles.personalizedBookBannerDotActive
                    : ""
                }`}
                key={promotion.id}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
            <Tooltip
              title={
                isPaused ? "Resume featured links" : "Pause featured links"
              }
            >
              <IconButton
                aria-label={
                  isPaused
                    ? "Resume featured link rotation"
                    : "Pause featured link rotation"
                }
                aria-pressed={isPaused}
                className={styles.personalizedBookBannerPause}
                onClick={() => setIsPaused((paused) => !paused)}
                size="small"
              >
                {isPaused ? (
                  <PlayArrowRoundedIcon aria-hidden="true" />
                ) : (
                  <PauseRoundedIcon aria-hidden="true" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
