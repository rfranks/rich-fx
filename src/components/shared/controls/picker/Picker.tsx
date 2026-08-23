"use client";

import { type MouseEvent, type ReactNode, useState } from "react";
import { ChevronLeft, ChevronRight, MoreVert } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import styles from "./Picker.module.css";

export type PickerItem = {
  key: string;
  label: string;
  shortLabel?: string;
  secondaryLabel?: ReactNode;
};

export type PickerProps<TItem extends PickerItem> = {
  ariaLabel: string;
  className?: string;
  id: string;
  items: readonly TItem[];
  labelClassName?: string;
  menuMaxHeight?: number;
  menuMinWidth?: { xs: number; sm: number };
  nextAriaLabel: string;
  onSelectIndex: (index: number) => void;
  previousAriaLabel: string;
  renderItemVisual?: (item: TItem, className: string) => ReactNode;
  renderSelectedVisual?: (item: TItem, className: string) => ReactNode;
  selectedVisualClassName?: string;
  selectedIndex: number;
  selectorAriaLabel: string;
};

const cycleIndex = (
  selectedIndex: number,
  direction: 1 | -1,
  totalCount: number,
) => {
  if (totalCount <= 0) {
    return 0;
  }

  const nextIndex = selectedIndex + direction;

  if (nextIndex < 0) {
    return totalCount - 1;
  }

  if (nextIndex >= totalCount) {
    return 0;
  }

  return nextIndex;
};

export default function Picker<TItem extends PickerItem>({
  ariaLabel,
  className,
  id,
  items,
  labelClassName,
  menuMaxHeight = 560,
  menuMinWidth = { xs: 340, sm: 480 },
  nextAriaLabel,
  onSelectIndex,
  previousAriaLabel,
  renderItemVisual,
  renderSelectedVisual,
  selectedVisualClassName,
  selectedIndex,
  selectorAriaLabel,
}: PickerProps<TItem>) {
  const [selectorAnchorEl, setSelectorAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const normalizedSelectedIndex =
    selectedIndex >= 0 && selectedIndex < items.length ? selectedIndex : 0;
  const selectedItem = items[normalizedSelectedIndex] ?? items[0];
  const selectorOpen = Boolean(selectorAnchorEl);
  const labelClassNames = [styles.label, labelClassName]
    .filter(Boolean)
    .join(" ");
  const selectedLabelClassNames = [
    labelClassNames,
    selectedItem?.shortLabel ? styles.hasShortLabel : "",
  ]
    .filter(Boolean)
    .join(" ");
  const toolbarClassNames = [styles.toolbar, className]
    .filter(Boolean)
    .join(" ");

  if (!selectedItem) {
    return null;
  }

  const handleCycle = (direction: 1 | -1) => {
    onSelectIndex(cycleIndex(normalizedSelectedIndex, direction, items.length));
  };

  const handleSelectorOpen = (event: MouseEvent<HTMLElement>) => {
    setSelectorAnchorEl(event.currentTarget);
  };

  const handleSelectorClose = () => {
    setSelectorAnchorEl(null);
  };

  const handleSelectIndex = (index: number) => {
    onSelectIndex(index);
    setSelectorAnchorEl(null);
  };

  const renderVisual = (item: TItem) =>
    renderItemVisual?.(item, styles.image) ?? (
      <span className={styles.badge} aria-hidden="true" />
    );

  return (
    <>
      <div className={toolbarClassNames} aria-label={ariaLabel}>
        <IconButton
          aria-label={previousAriaLabel}
          size="small"
          onClick={() => handleCycle(-1)}
        >
          <ChevronLeft />
        </IconButton>
        <Chip
          clickable
          color="primary"
          variant="outlined"
          onClick={handleSelectorOpen}
          label={
            <span className={styles.selectedContent}>
              {renderSelectedVisual ? (
                <span className={styles.selectedVisual} aria-hidden="true">
                  {renderSelectedVisual(
                    selectedItem,
                    selectedVisualClassName ?? styles.selectedImage,
                  )}
                </span>
              ) : null}
              <Typography component="span" className={selectedLabelClassNames}>
                <span className={styles.fullLabel}>{selectedItem.label}</span>
                {selectedItem.shortLabel ? (
                  <span className={styles.shortLabel}>
                    {selectedItem.shortLabel}
                  </span>
                ) : null}
              </Typography>
            </span>
          }
          aria-label={`${selectorAriaLabel}: ${selectedItem.label}`}
          aria-haspopup="menu"
          aria-expanded={selectorOpen ? "true" : undefined}
          aria-controls={selectorOpen ? id : undefined}
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
          aria-label={nextAriaLabel}
          size="small"
          onClick={() => handleCycle(1)}
        >
          <ChevronRight />
        </IconButton>
        <IconButton
          aria-label={selectorAriaLabel}
          size="small"
          onClick={handleSelectorOpen}
          aria-haspopup="menu"
          aria-expanded={selectorOpen ? "true" : undefined}
          aria-controls={selectorOpen ? id : undefined}
          sx={{ display: { xs: "none", sm: "inline-flex" } }}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </div>

      <Menu
        id={id}
        anchorEl={selectorAnchorEl}
        open={selectorOpen}
        onClose={handleSelectorClose}
        slotProps={{
          paper: {
            sx: {
              maxHeight: menuMaxHeight,
              minWidth: menuMinWidth,
            },
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={item.key}
            selected={index === normalizedSelectedIndex}
            onClick={() => handleSelectIndex(index)}
          >
            <div className={styles.menuItem}>
              <div className={styles.visual}>{renderVisual(item)}</div>
              <div className={styles.text}>
                <Typography
                  className={item.shortLabel ? styles.hasShortLabel : undefined}
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
                  <span className={styles.fullLabel}>{item.label}</span>
                  {item.shortLabel ? (
                    <span className={styles.shortLabel}>{item.shortLabel}</span>
                  ) : null}
                </Typography>
                {item.secondaryLabel ? (
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
                    {item.secondaryLabel}
                  </Typography>
                ) : null}
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
