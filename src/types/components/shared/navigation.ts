import type {
  RevealTimelineItem,
  RevealViewMode,
} from "@/types/navigation/revealStateEngine";

export type RevealNavigatorProps<TKey extends string> = {
  items: RevealTimelineItem<TKey>[];
  onSelect: (key: TKey) => void;
  mode: RevealViewMode;
  onModeChange: (mode: RevealViewMode) => void;
  scope: string;
};
