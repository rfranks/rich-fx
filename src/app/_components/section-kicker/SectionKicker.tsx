import type { SectionKickerProps } from "@/app/what-we-do/_types/whatWeDoPage";
import styles from "@/app/what-we-do/_components/what-we-do-page/WhatWeDoPage.module.css";

export default function SectionKicker({ children }: SectionKickerProps) {
  return (
    <p className={styles.kicker} data-richfx-reveal>
      {children}
    </p>
  );
}
