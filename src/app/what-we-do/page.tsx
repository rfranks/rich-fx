import type { Metadata } from "next";
import WhatWeDoPage from "./_components/what-we-do-page/WhatWeDoPage";

export const metadata: Metadata = {
  title: "RichFX — Building Better Worlds Since 2026",
  description:
    "RichFX is a cinematic AI VFX and creative technology studio for generative film, world-building, storytelling, audio, and interactive media.",
  openGraph: {
    title: "RichFX — Building Better Worlds Since 2026",
    description:
      "A premium scrolling home for RichFX: cinematic AI VFX, generative film, character worlds, music, and experimental media.",
    type: "website",
  },
};

export default function WhatWeDoRoutePage() {
  return <WhatWeDoPage />;
}
