"use client";

import SiteHeader from "@/app/_components/site-header/SiteHeader";
import ContestFaq from "@/app/coolkidscolor/_components/contest-faq/ContestFaq";
import ContestHero from "@/app/coolkidscolor/_components/contest-hero/ContestHero";
import ContestSectionCarousel from "@/app/coolkidscolor/_components/contest-section-carousel/ContestSectionCarousel";
import DatesSection from "@/app/coolkidscolor/_components/dates-section/DatesSection";
import DownloadCenter from "@/app/coolkidscolor/_components/download-center/DownloadCenter";
import FinalContestCta from "@/app/coolkidscolor/_components/final-contest-cta/FinalContestCta";
import GoodThingsToKnowSection from "@/app/coolkidscolor/_components/good-to-know-section/GoodThingsToKnowSection";
import HowToEnterSection from "@/app/coolkidscolor/_components/how-to-enter-section/HowToEnterSection";
import JudgingSection from "@/app/coolkidscolor/_components/judging-section/JudgingSection";
import PersonalizedColoringBookCta from "@/app/coolkidscolor/_components/personalized-coloring-book-cta/PersonalizedColoringBookCta";
import PrizeSection from "@/app/coolkidscolor/_components/prize-section/PrizeSection";
import CoolKidsColorThemeProvider from "@/app/coolkidscolor/_theme/CoolKidsColorThemeProvider";
import type { ContestCarouselSlide } from "@/app/coolkidscolor/_types/coolKidsColor";
import styles from "./CoolKidsColorPage.module.css";

export default function CoolKidsColorPage() {
  const slides: ContestCarouselSlide[] = [
    {
      id: "contest",
      label: "2026 Contest",
      content: <ContestHero />,
    },
    {
      id: "flow",
      label: "Contest Flow",
      content: <HowToEnterSection />,
    },
    {
      id: "dates",
      label: "Important Dates",
      content: <DatesSection />,
    },
    {
      id: "prizes",
      label: "Prizes",
      content: <PrizeSection />,
    },
    {
      id: "judging",
      label: "How to Win",
      content: <JudgingSection />,
    },
    {
      id: "rules",
      label: "Good to Know",
      content: <GoodThingsToKnowSection />,
    },
    {
      id: "downloads",
      label: "Download / Print Center",
      content: <DownloadCenter />,
    },
    {
      id: "faq",
      label: "Questions & Answers",
      content: <ContestFaq />,
    },
    {
      id: "finish",
      label: "Start Creating",
      content: <FinalContestCta />,
    },
  ];

  return (
    <CoolKidsColorThemeProvider>
      <main className={styles.page}>
        <SiteHeader showWhatWeDo />
        <div className={styles.pageContent}>
          <PersonalizedColoringBookCta />
          <ContestSectionCarousel slides={slides} />
        </div>
      </main>
    </CoolKidsColorThemeProvider>
  );
}
