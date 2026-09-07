"use client";

import SiteHeader from "@/app/_components/site-header/SiteHeader";
import ColoringBookShowcase from "@/app/coolkidscolor/_components/coloring-book-showcase/ColoringBookShowcase";
import ContestFaq from "@/app/coolkidscolor/_components/contest-faq/ContestFaq";
import ContestHero from "@/app/coolkidscolor/_components/contest-hero/ContestHero";
import DatesSection from "@/app/coolkidscolor/_components/dates-section/DatesSection";
import DownloadCenter from "@/app/coolkidscolor/_components/download-center/DownloadCenter";
import FinalContestCta from "@/app/coolkidscolor/_components/final-contest-cta/FinalContestCta";
import GoodThingsToKnowSection from "@/app/coolkidscolor/_components/good-to-know-section/GoodThingsToKnowSection";
import HowToEnterSection from "@/app/coolkidscolor/_components/how-to-enter-section/HowToEnterSection";
import JudgingSection from "@/app/coolkidscolor/_components/judging-section/JudgingSection";
import PrizeSection from "@/app/coolkidscolor/_components/prize-section/PrizeSection";
import CoolKidsColorThemeProvider from "@/app/coolkidscolor/_theme/CoolKidsColorThemeProvider";
import styles from "./CoolKidsColorPage.module.css";

export default function CoolKidsColorPage() {
  return (
    <CoolKidsColorThemeProvider>
      <main className={styles.page}>
        <SiteHeader showWhatWeDo />
        <ContestHero />
        <HowToEnterSection />
        <DatesSection />
        <PrizeSection />
        <JudgingSection />
        <GoodThingsToKnowSection />
        <DownloadCenter />
        <ColoringBookShowcase />
        <ContestFaq />
        <FinalContestCta />
      </main>
    </CoolKidsColorThemeProvider>
  );
}
