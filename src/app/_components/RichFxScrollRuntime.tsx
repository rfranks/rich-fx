"use client";

import { useEffect } from "react";

const ACTIVE_CLASS = "richfx-active";
const MOBILE_MEDIA_OPEN_CLASS = "richfx-mobile-media-open";
const VISIBLE_CLASS = "richfx-visible";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getMediaTrackTopOffset = () => {
  if (window.innerWidth <= 640) {
    return 0;
  }
  if (window.innerWidth <= 1020) {
    return 72;
  }
  return clamp(window.innerHeight * 0.1, 72, 112);
};

const getStepObserverOptions = (): IntersectionObserverInit => {
  if (window.innerWidth <= 640) {
    return {
      rootMargin: "-58% 0px -6% 0px",
      threshold: [0.08, 0.18, 0.34, 0.52],
    };
  }

  return {
    rootMargin: "-28% 0px -42% 0px",
    threshold: [0.18, 0.34, 0.52, 0.7],
  };
};

export default function RichFxScrollRuntime() {
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-richfx-reveal]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-richfx-nav]"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-richfx-section]"));
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("[data-richfx-video]"));
    const narratives = Array.from(
      document.querySelectorAll<HTMLElement>("[data-richfx-narrative]"),
    );
    const mediaTracks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-richfx-media-track]"),
    )
      .map((track) => ({
        track,
        media: track.querySelector<HTMLElement>("[data-richfx-moving-media]"),
      }))
      .filter((item): item is { media: HTMLElement; track: HTMLElement } => Boolean(item.media));
    const reduceMotion = prefersReducedMotion();
    let mediaPositionFrame = 0;

    const isVideoVisible = (video: HTMLVideoElement) => {
      const stepMedia = video.closest<HTMLElement>("[data-richfx-step-media]");
      const narrative = video.closest<HTMLElement>("[data-richfx-narrative]");
      const stepKey = stepMedia?.dataset.richfxStepMedia;
      const matchingStep = stepKey
        ? narrative?.querySelector<HTMLElement>(`[data-richfx-step="${stepKey}"]`)
        : undefined;
      const rect = video.getBoundingClientRect();
      const stepRect = matchingStep?.getBoundingClientRect();
      const activeMediaPlate = !stepMedia || stepMedia.classList.contains(ACTIVE_CLASS);
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      const stepHasNotScrolledPast = !stepRect || stepRect.bottom > 0;
      return activeMediaPlate && inViewport && stepHasNotScrolledPast;
    };

    const syncVideoPlayback = (video: HTMLVideoElement) => {
      if (!isVideoVisible(video)) {
        video.pause();
        return;
      }

      if (!reduceMotion) {
        void video.play().catch(() => undefined);
        return;
      }

      video.pause();
    };

    revealNodes.forEach((node) => {
      if (reduceMotion) {
        node.classList.add(VISIBLE_CLASS);
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(VISIBLE_CLASS);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        const activeId = visibleEntry?.target.getAttribute("id");
        if (!activeId) {
          return;
        }
        navLinks.forEach((link) => {
          link.classList.toggle(ACTIVE_CLASS, link.dataset.richfxNav === activeId);
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.05, 0.2, 0.4, 0.65] },
    );

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          syncVideoPlayback(video);
        });
      },
      { rootMargin: "120px 0px", threshold: 0.34 },
    );

    const stepObservers = narratives.map((narrative) => {
      const steps = Array.from(narrative.querySelectorAll<HTMLElement>("[data-richfx-step]"));
      const mediaNodes = Array.from(
        narrative.querySelectorAll<HTMLElement>("[data-richfx-step-media]"),
      );
      const setActiveStep = (key: string | undefined) => {
        if (!key) {
          return;
        }
        steps.forEach((step) => {
          step.classList.toggle(ACTIVE_CLASS, step.dataset.richfxStep === key);
        });
        mediaNodes.forEach((media) => {
          media.classList.toggle(ACTIVE_CLASS, media.dataset.richfxStepMedia === key);
        });
        mediaNodes.forEach((media) => {
          const stepVideos = Array.from(
            media.querySelectorAll<HTMLVideoElement>("[data-richfx-video]"),
          );
          stepVideos.forEach(syncVideoPlayback);
        });
      };

      setActiveStep(steps[0]?.dataset.richfxStep);

      const observer = new IntersectionObserver((entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        setActiveStep((activeEntry?.target as HTMLElement | undefined)?.dataset.richfxStep);
      }, getStepObserverOptions());

      steps.forEach((step) => observer.observe(step));
      return observer;
    });

    const updateMobileNarrativeMediaStates = () => {
      const isMobileLayout = window.innerWidth <= 640;

      if (!isMobileLayout) {
        narratives.forEach((narrative) => {
          narrative.classList.remove(MOBILE_MEDIA_OPEN_CLASS);
        });
        return;
      }

      const activeBandTop = window.innerHeight * 0.18;
      const activeBandBottom = window.innerHeight * 0.82;
      const activeNarrative = narratives
        .map((narrative) => {
          const mediaTrack =
            narrative.querySelector<HTMLElement>("[data-richfx-media-track]") ?? narrative;
          const rect = mediaTrack.getBoundingClientRect();
          const overlap = Math.max(
            0,
            Math.min(rect.bottom, activeBandBottom) - Math.max(rect.top, activeBandTop),
          );

          return { narrative, overlap };
        })
        .sort((left, right) => right.overlap - left.overlap)[0];

      narratives.forEach((narrative) => {
        narrative.classList.toggle(
          MOBILE_MEDIA_OPEN_CLASS,
          narrative === activeNarrative?.narrative && activeNarrative.overlap > 0,
        );
      });
    };

    const updateMediaPositions = () => {
      mediaPositionFrame = 0;
      updateMobileNarrativeMediaStates();

      if (window.innerWidth <= 640) {
        mediaTracks.forEach(({ media }) => {
          media.style.top = "0px";
        });
        return;
      }

      const scrollY = window.scrollY;
      const topOffset = getMediaTrackTopOffset();
      mediaTracks.forEach(({ track, media }) => {
        const trackTop = track.getBoundingClientRect().top + scrollY;
        const maxTop = Math.max(0, track.offsetHeight - media.offsetHeight);
        const nextTop = clamp(scrollY + topOffset - trackTop, 0, maxTop);
        media.style.top = `${nextTop}px`;
      });
    };

    const requestMediaPositionUpdate = () => {
      if (mediaPositionFrame) {
        return;
      }
      mediaPositionFrame = window.requestAnimationFrame(() => {
        updateMediaPositions();
        videos.forEach(syncVideoPlayback);
      });
    };

    if (!reduceMotion) {
      revealNodes.forEach((node) => revealObserver.observe(node));
    }
    sections.forEach((section) => sectionObserver.observe(section));
    videos.forEach((video) => videoObserver.observe(video));
    updateMediaPositions();
    window.addEventListener("scroll", requestMediaPositionUpdate, { passive: true });
    window.addEventListener("resize", requestMediaPositionUpdate);

    return () => {
      if (mediaPositionFrame) {
        window.cancelAnimationFrame(mediaPositionFrame);
      }
      window.removeEventListener("scroll", requestMediaPositionUpdate);
      window.removeEventListener("resize", requestMediaPositionUpdate);
      revealObserver.disconnect();
      sectionObserver.disconnect();
      videoObserver.disconnect();
      stepObservers.forEach((observer) => observer.disconnect());
      videos.forEach((video) => video.pause());
      narratives.forEach((narrative) => {
        narrative.classList.remove(MOBILE_MEDIA_OPEN_CLASS);
      });
      mediaTracks.forEach(({ media }) => {
        media.style.top = "";
      });
    };
  }, []);

  return null;
}
