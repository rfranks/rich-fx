import type { PagerItem } from "./models";

export type PagerProps = {
  currentIndex: number;
  items: PagerItem[];
  onNext: () => void;
  onPrevious: () => void;
  onSelectLab: (index: number) => void;
};
