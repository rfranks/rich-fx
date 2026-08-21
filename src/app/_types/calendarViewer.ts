import type { RichFxCalendar } from "@/consts/richFx";

export type CalendarViewerProps = {
  selectedCalendar: RichFxCalendar;
  selectedMonth: RichFxCalendar["months"][number];
  selectedMonthIndex: number;
  onSelectCalendar: (slug: string) => void;
  onSelectMonth: (index: number) => void;
};
