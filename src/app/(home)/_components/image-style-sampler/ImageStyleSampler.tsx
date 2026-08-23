"use client";

import { useMemo, useState } from "react";
import { Picker } from "@/components/shared/controls";
import { AssetImage, ImageLightbox } from "@/components/shared/media";
import {
  DEFAULT_IMAGE_STYLE_SAMPLE_SLUG,
  IMAGE_STYLE_MENU_THUMBNAIL_SIZE,
  IMAGE_STYLE_SAMPLES,
  IMAGE_STYLE_SAMPLE_SIZES,
} from "@/app/_consts/imageStyleSampler";
import type { ImageStyleSamplerProps } from "@/app/_types/imageStyleSampler";
import { formatImageStylePickerLabel } from "@/app/_utils/imageStyleSampler";
import { withBasePath } from "@/utils/basePath";
import styles from "./ImageStyleSampler.module.css";

export default function ImageStyleSampler({
  className,
  samples = IMAGE_STYLE_SAMPLES,
}: ImageStyleSamplerProps) {
  const initialIndex = useMemo(() => {
    const defaultIndex = samples.findIndex(
      (sample) => sample.slug === DEFAULT_IMAGE_STYLE_SAMPLE_SLUG,
    );

    return Math.max(defaultIndex, 0);
  }, [samples]);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const selectedSample = samples[selectedIndex] ?? samples[0];
  const pickerItems = useMemo(
    () =>
      samples.map((sample) => ({
        ...sample,
        key: sample.slug,
        label: formatImageStylePickerLabel(sample.label),
        secondaryLabel: "Same portrait, different generated visual language.",
      })),
    [samples],
  );

  if (!selectedSample) {
    return null;
  }

  return (
    <div className={[styles.sampler, className].filter(Boolean).join(" ")}>
      <figure className={styles.stage}>
        <ImageLightbox
          src={withBasePath(selectedSample.image.src)}
          alt={selectedSample.image.alt}
          title={selectedSample.label}
          caption="Generated style variation from the same source portrait."
          triggerSx={{
            width: "100%",
            height: "100%",
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AssetImage
            asset={selectedSample.image}
            sizes={IMAGE_STYLE_SAMPLE_SIZES}
            className={styles.image}
          />
        </ImageLightbox>
      </figure>

      <Picker
        ariaLabel="Choose an image style"
        className={styles.toolbar}
        id="image-style-selector-menu"
        items={pickerItems}
        nextAriaLabel="Next image style"
        onSelectIndex={setSelectedIndex}
        previousAriaLabel="Previous image style"
        renderItemVisual={(sample, className) => (
          <AssetImage
            asset={sample.image}
            sizes={`${IMAGE_STYLE_MENU_THUMBNAIL_SIZE}px`}
            className={className}
          />
        )}
        selectedIndex={selectedIndex}
        selectorAriaLabel="Open image style selector"
      />
    </div>
  );
}
