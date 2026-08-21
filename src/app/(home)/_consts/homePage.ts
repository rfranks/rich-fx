import { cards } from "@/consts/richFx";
import type { ActiveCardPanel } from "@/app/_types/holidayCardViewer";

export const DEFAULT_CARD_PANEL: ActiveCardPanel = "original";

export const CARD_COUNT_LABEL = `${cards.length} card styles`;

export const HOME_PAGE_CTAS = [
  { href: "/what-we-do", label: "What We Do" },
  { href: "/ai-studio", label: "Enter the AI Studio" },
] as const;

export const CARD_THUMBNAIL_SIZES = "96px";

export const CARD_PREVIEW_SIZES = "(max-width: 860px) 80vw, 520px";

export const CALENDAR_PREVIEW_SIZES = "(max-width: 900px) 88vw, 460px";
