import type { Metadata } from "next";
import HomePage from "./_components/home-page/HomePage";

export const metadata: Metadata = {
  title: "RichFX Holiday Cards, Calendars & AI Songs",
  description:
    "Turn any photo into polished holiday cards, custom calendars, and original AI-generated songs with lyrics and album art.",
};

export default function Home() {
  return <HomePage />;
}
