import { useMemo } from "react";
import Typography from "@mui/material/Typography";
import { Picker } from "@/components/shared/controls";
import { AssetImage } from "@/components/shared/media";
import {
  IMAGE_STYLE_MENU_THUMBNAIL_SIZE,
  IMAGE_STYLE_SAMPLES,
} from "@/app/_consts/imageStyleSampler";
import type { StartProjectFormState } from "@/app/_types/startProjectWizard";
import { formatImageStylePickerLabel } from "@/app/_utils/imageStyleSampler";
import styles from "./StartProjectWizard.module.css";

type StartProjectImageStyleSelectorProps = {
  selectedSlug: string;
  onChange: (value: StartProjectFormState["imageStyleSlug"]) => void;
};

export default function StartProjectImageStyleSelector({
  selectedSlug,
  onChange,
}: StartProjectImageStyleSelectorProps) {
  const selectedIndex = Math.max(
    IMAGE_STYLE_SAMPLES.findIndex((sample) => sample.slug === selectedSlug),
    0,
  );
  const pickerItems = useMemo(
    () =>
      IMAGE_STYLE_SAMPLES.map((sample) => ({
        ...sample,
        key: sample.slug,
        label: formatImageStylePickerLabel(sample.label),
        secondaryLabel: sample.description,
      })),
    [],
  );

  return (
    <div className={styles.imageStyleSelector}>
      <div>
        <h3 className={styles.chipLegend}>Pick a visual style</h3>
        <Typography color="text.secondary" variant="body2">
          Choose a visual style for your project.
        </Typography>
      </div>
      <Picker
        ariaLabel="Choose an image style"
        className={styles.imageStylePicker}
        id="start-project-image-style-selector-menu"
        items={pickerItems}
        nextAriaLabel="Next image style"
        onSelectIndex={(index) =>
          onChange(IMAGE_STYLE_SAMPLES[index]?.slug ?? selectedSlug)
        }
        previousAriaLabel="Previous image style"
        renderItemVisual={(sample, className) => (
          <AssetImage
            asset={sample.image}
            sizes={`${IMAGE_STYLE_MENU_THUMBNAIL_SIZE}px`}
            className={className}
          />
        )}
        renderSelectedVisual={(sample, className) => (
          <AssetImage asset={sample.image} sizes="52px" className={className} />
        )}
        selectedVisualClassName={styles.imageStyleSelectedImage}
        selectedIndex={selectedIndex}
        selectorAriaLabel="Open image style selector"
      />
    </div>
  );
}
