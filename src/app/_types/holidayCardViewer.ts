import type { RichFxCard } from "@/consts/richFx";

export type ActiveCardPanel = "original" | "card";

export type CardTransitionDirection = "left" | "right";

export type HolidayCardViewerProps = {
  activeCardPanel: ActiveCardPanel;
  cardTransitionDirection: CardTransitionDirection;
  selectedCard: RichFxCard;
  onSelectCard: (slug: string) => void;
  onSelectCardPanel: (panel: ActiveCardPanel) => void;
};
