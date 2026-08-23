"use client";

import { Picker } from "@/components/shared/controls";
import { AssetImage } from "@/components/shared/media";
import { BUILD_CAROUSEL_PREVIEW_SIZES } from "@/app/(home)/_consts/buildCarousel";
import type { BuildPickerProps } from "@/app/(home)/_types/buildCarousel";
import { formatBuildPickerLabel } from "@/app/(home)/_utils/buildCarousel";
import styles from "./BuildCarousel.module.css";

export default function BuildPicker({
  sections,
  selectedIndex,
  onSelectSection,
}: BuildPickerProps) {
  const selectedSection = sections[selectedIndex] ?? sections[0];
  const pickerItems = sections.map((section) => ({
    ...section,
    label: formatBuildPickerLabel(section.label),
    shortLabel: section.shortLabel
      ? formatBuildPickerLabel(section.shortLabel)
      : undefined,
    secondaryLabel: section.shortText,
  }));

  if (!selectedSection) {
    return null;
  }

  return (
    <div className={styles.picker}>
      <div>
        <div className={styles.pickerCopy}>
          <p className={styles.eyebrow}>Build something wonderful</p>
          <h2 id="build-carousel-title">
            What would you like to know more about?
          </h2>
        </div>
      </div>
      <Picker
        ariaLabel="Choose a build type"
        className={styles.controls}
        id="build-section-selector-menu"
        items={pickerItems}
        labelClassName={styles.selectedBuildLabel}
        nextAriaLabel="Next build type"
        onSelectIndex={onSelectSection}
        previousAriaLabel="Previous build type"
        renderItemVisual={(section, className) =>
          section.previewImage ? (
            <AssetImage
              asset={section.previewImage}
              sizes={BUILD_CAROUSEL_PREVIEW_SIZES}
              className={className}
            />
          ) : null
        }
        selectedIndex={selectedIndex}
        selectorAriaLabel="Open build type selector"
      />
    </div>
  );
}
