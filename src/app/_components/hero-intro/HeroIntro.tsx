import CtaBar from "@/app/_components/cta-bar/CtaBar";
import type { HeroIntroProps } from "@/app/_types/heroIntro";
import styles from "@/app/(home)/_components/home-page/HomePage.module.css";

export default function HeroIntro({ buildPicker }: HeroIntroProps) {
  return (
    <div className={styles.heroIntroContent}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>RichFX Studios</p>
        <h1 id="hero-title">Turn your photos into custom keepsakes.</h1>
        <p>
          Start with a photo you already love. RichFX can shape it into a
          polished holiday card, invitation, seasonal image, or custom calendar
          page with character, setting, typography, and print-ready composition.
          We can even insert you into a short movie of your favorite game or
          movie scene, or create a custom song with lyrics and album art from
          your photo or lyrical idea.
        </p>
        <CtaBar />
      </div>
      {buildPicker ? (
        <div className={styles.heroBuildPicker}>{buildPicker}</div>
      ) : null}
    </div>
  );
}
