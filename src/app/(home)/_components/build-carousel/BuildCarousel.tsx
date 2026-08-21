"use client";

import type { BuildCarouselProps } from "@/app/(home)/_types/buildCarousel";
import styles from "./BuildCarousel.module.css";

export default function BuildCarousel({
  sections,
  selectedIndex,
}: BuildCarouselProps) {
  const selectedSection = sections[selectedIndex] ?? sections[0];

  if (!selectedSection) {
    return null;
  }

  return (
    <section className={styles.carousel} aria-labelledby="build-carousel-title">
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
        >
          {sections.map((section, index) => (
            <div
              className={styles.panel}
              key={section.key}
              aria-hidden={index !== selectedIndex}
              inert={index !== selectedIndex ? true : undefined}
            >
              {section.children}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
