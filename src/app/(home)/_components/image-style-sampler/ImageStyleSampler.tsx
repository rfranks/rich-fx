"use client";

import { type MouseEvent, useMemo, useState } from "react";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { ChevronLeft, ChevronRight, MoreVert } from "@mui/icons-material";
import { AssetImage, ImageLightbox } from "@/components/shared/media";
import {
  DEFAULT_IMAGE_STYLE_SAMPLE_SLUG,
  IMAGE_STYLE_MENU_THUMBNAIL_SIZE,
  IMAGE_STYLE_SAMPLES,
  IMAGE_STYLE_SAMPLE_SIZES,
} from "@/app/(home)/_consts/imageStyleSampler";
import type { ImageStyleSamplerProps } from "@/app/(home)/_types/imageStyleSampler";
import { formatImageStylePickerLabel } from "@/app/(home)/_utils/imageStyleSampler";
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
  const [selectorAnchorEl, setSelectorAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const selectedSample = samples[selectedIndex] ?? samples[0];
  const selectorOpen = Boolean(selectorAnchorEl);

  if (!selectedSample) {
    return null;
  }

  const cycleTo = (direction: 1 | -1) => {
    setSelectedIndex((currentIndex) => {
      const nextIndex = currentIndex + direction;

      if (nextIndex < 0) {
        return samples.length - 1;
      }

      if (nextIndex >= samples.length) {
        return 0;
      }

      return nextIndex;
    });
  };

  const handleSelectorOpen = (event: MouseEvent<HTMLElement>) => {
    setSelectorAnchorEl(event.currentTarget);
  };

  const handleSelectorClose = () => {
    setSelectorAnchorEl(null);
  };

  const handleSelectSample = (index: number) => {
    setSelectedIndex(index);
    setSelectorAnchorEl(null);
  };

  const selectedLabel = formatImageStylePickerLabel(selectedSample.label);

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

      <div className={styles.toolbar}>
        <IconButton
          aria-label="Previous image style"
          size="small"
          onClick={() => cycleTo(-1)}
        >
          <ChevronLeft />
        </IconButton>
        <Chip
          clickable
          color="primary"
          variant="outlined"
          onClick={handleSelectorOpen}
          label={
            <Typography
              component="span"
              sx={{
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {selectedLabel}
            </Typography>
          }
          aria-haspopup="menu"
          aria-expanded={selectorOpen ? "true" : undefined}
          aria-controls={selectorOpen ? "image-style-selector-menu" : undefined}
          sx={{
            minWidth: 0,
            maxWidth: "100%",
            justifySelf: "stretch",
            "& .MuiChip-label": {
              width: "100%",
              overflow: "hidden",
              display: "block",
            },
          }}
        />
        <IconButton
          aria-label="Next image style"
          size="small"
          onClick={() => cycleTo(1)}
        >
          <ChevronRight />
        </IconButton>
        <IconButton
          aria-label="Open image style selector"
          size="small"
          onClick={handleSelectorOpen}
          aria-haspopup="menu"
          aria-expanded={selectorOpen ? "true" : undefined}
          aria-controls={selectorOpen ? "image-style-selector-menu" : undefined}
          sx={{ display: { xs: "none", sm: "inline-flex" } }}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </div>

      <Menu
        id="image-style-selector-menu"
        anchorEl={selectorAnchorEl}
        open={selectorOpen}
        onClose={handleSelectorClose}
        slotProps={{
          paper: {
            sx: {
              maxHeight: 560,
              minWidth: { xs: 340, sm: 480 },
            },
          },
        }}
      >
        {samples.map((sample, index) => (
          <MenuItem
            key={sample.slug}
            selected={index === selectedIndex}
            onClick={() => handleSelectSample(index)}
          >
            <div className={styles.menuItem}>
              <AssetImage
                asset={sample.image}
                sizes={`${IMAGE_STYLE_MENU_THUMBNAIL_SIZE}px`}
                className={styles.menuImage}
              />
              <div className={styles.menuText}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.16rem",
                    lineHeight: 1.25,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatImageStylePickerLabel(sample.label)}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    mt: 0.25,
                    fontSize: "1rem",
                    lineHeight: 1.3,
                    display: "block",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >
                  Same portrait, different generated visual language.
                </Typography>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
