import type { Metadata } from "next";
import CoolKidsColorPage from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage";
import { withBasePath } from "@/utils/basePath";

export const metadata: Metadata = {
  metadataBase: new URL("https://rich-fx.ai"),
  title: "#coolkidscolor 2026 Coloring Contest | RichFX",
  description:
    "Free creative coloring contest for kids and adults. Print the official #coolkidscolor page, share your artwork, and compete for nearly $500 in RichFX prizes.",
  openGraph: {
    title: "#coolkidscolor 2026 Coloring Contest | RichFX",
    description:
      "Print the official #coolkidscolor page, color it your way, tag RichFX, include #coolkidscolor, and compete for nearly $500 in RichFX prizes.",
    images: [
      {
        url: withBasePath(
          "/assets/coolkidscolor/coolkidscolor-2026-entry-sheet-preview.png",
        ),
        width: 612,
        height: 792,
        alt: "Official #coolkidscolor contest entry sheet preview.",
      },
    ],
    type: "website",
  },
};

export default function Page() {
  return <CoolKidsColorPage />;
}
