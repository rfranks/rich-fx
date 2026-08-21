import type { BuildCarouselSection } from "@/app/(home)/_types/buildCarousel";

export const cycleBuildSectionIndex = (
  currentIndex: number,
  direction: 1 | -1,
  totalCount: number,
) => {
  if (totalCount <= 0) {
    return 0;
  }

  const nextIndex = currentIndex + direction;

  if (nextIndex < 0) {
    return totalCount - 1;
  }

  if (nextIndex >= totalCount) {
    return 0;
  }

  return nextIndex;
};

export const formatBuildPickerLabel = (label: string) => label;

export const sortBuildCarouselSections = (
  sections: BuildCarouselSection[],
): BuildCarouselSection[] =>
  [...sections].sort((sectionA, sectionB) =>
    sectionA.label.localeCompare(sectionB.label),
  );
