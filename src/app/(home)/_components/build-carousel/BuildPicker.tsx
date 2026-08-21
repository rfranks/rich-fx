"use client";

import { type MouseEvent, useState } from "react";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { ChevronLeft, ChevronRight, MoreVert } from "@mui/icons-material";
import { AssetImage } from "@/components/shared/media";
import { BUILD_CAROUSEL_PREVIEW_SIZES } from "@/app/(home)/_consts/buildCarousel";
import type { BuildPickerProps } from "@/app/(home)/_types/buildCarousel";
import {
  cycleBuildSectionIndex,
  formatBuildPickerLabel,
} from "@/app/(home)/_utils/buildCarousel";
import styles from "./BuildCarousel.module.css";

export default function BuildPicker({
  sections,
  selectedIndex,
  onSelectSection,
}: BuildPickerProps) {
  const [selectorAnchorEl, setSelectorAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const selectedSection = sections[selectedIndex] ?? sections[0];
  const selectorOpen = Boolean(selectorAnchorEl);

  if (!selectedSection) {
    return null;
  }

  const cycleTo = (direction: 1 | -1) => {
    onSelectSection(
      cycleBuildSectionIndex(selectedIndex, direction, sections.length),
    );
  };

  const handleSelectorOpen = (event: MouseEvent<HTMLElement>) => {
    setSelectorAnchorEl(event.currentTarget);
  };

  const handleSelectorClose = () => {
    setSelectorAnchorEl(null);
  };

  const handleSelectSection = (index: number) => {
    onSelectSection(index);
    setSelectorAnchorEl(null);
  };

  const selectedLabel = formatBuildPickerLabel(selectedSection.label);

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
      <div className={styles.controls} aria-label="Choose a build type">
        <IconButton
          aria-label="Previous build type"
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
                color: "var(--richfx-orange)",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {selectedLabel}
            </Typography>
          }
          aria-haspopup="menu"
          aria-expanded={selectorOpen ? "true" : undefined}
          aria-controls={
            selectorOpen ? "build-section-selector-menu" : undefined
          }
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
          aria-label="Next build type"
          size="small"
          onClick={() => cycleTo(1)}
        >
          <ChevronRight />
        </IconButton>
        <IconButton
          aria-label="Open build type selector"
          size="small"
          onClick={handleSelectorOpen}
          aria-haspopup="menu"
          aria-expanded={selectorOpen ? "true" : undefined}
          aria-controls={
            selectorOpen ? "build-section-selector-menu" : undefined
          }
          sx={{ display: { xs: "none", sm: "inline-flex" } }}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </div>

      <Menu
        id="build-section-selector-menu"
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
        {sections.map((section, index) => (
          <MenuItem
            key={section.key}
            selected={index === selectedIndex}
            onClick={() => handleSelectSection(index)}
          >
            <div className={styles.menuItem}>
              {section.previewImage ? (
                <AssetImage
                  asset={section.previewImage}
                  sizes={BUILD_CAROUSEL_PREVIEW_SIZES}
                  className={styles.menuImage}
                />
              ) : (
                <span className={styles.menuBadge} aria-hidden="true" />
              )}
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
                  {formatBuildPickerLabel(section.label)}
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
                  {section.shortText}
                </Typography>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
