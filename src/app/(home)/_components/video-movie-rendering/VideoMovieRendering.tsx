"use client";

import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { ChevronLeft, ChevronRight, MoreVert } from "@mui/icons-material";
import {
  AssetImage,
  ImageLightbox,
  VideoLightbox,
} from "@/components/shared/media";
import {
  DEFAULT_VIDEO_MOVIE_RENDERING_SLUG,
  VIDEO_MOVIE_RENDERING_IMAGE_SIZES,
  VIDEO_MOVIE_RENDERING_ITEMS,
  VIDEO_MOVIE_RENDERING_MENU_THUMBNAIL_SIZE,
} from "@/app/(home)/_consts/videoMovieRendering";
import type {
  VideoMovieRenderingPanelKey,
  VideoMovieRenderingProps,
} from "@/app/(home)/_types/videoMovieRendering";
import { withBasePath } from "@/utils/basePath";
import styles from "./VideoMovieRendering.module.css";

const PANEL_OPTIONS: {
  key: VideoMovieRenderingPanelKey;
  label: string;
  icon: typeof ImageIcon;
}[] = [
  {
    key: "original",
    label: "Original",
    icon: ImageIcon,
  },
  {
    key: "stylized",
    label: "Stylized",
    icon: AutoFixHighIcon,
  },
  {
    key: "video",
    label: "Video",
    icon: MovieIcon,
  },
];

export default function VideoMovieRendering({
  className,
  defaultItemSlug = DEFAULT_VIDEO_MOVIE_RENDERING_SLUG,
  items = VIDEO_MOVIE_RENDERING_ITEMS,
}: VideoMovieRenderingProps) {
  const initialIndex = useMemo(() => {
    const defaultIndex = items.findIndex(
      (item) => item.slug === defaultItemSlug,
    );

    return Math.max(defaultIndex, 0);
  }, [defaultItemSlug, items]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(initialIndex);
  const [activePanelKey, setActivePanelKey] =
    useState<VideoMovieRenderingPanelKey>("original");
  const [canAutoplayVideo, setCanAutoplayVideo] = useState(false);
  const [selectorAnchorEl, setSelectorAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const selectedItem = items[selectedItemIndex] ?? items[0];
  const selectorOpen = Boolean(selectorAnchorEl);

  useEffect(() => {
    if (activePanelKey !== "video") {
      return;
    }

    const previewVideo = previewVideoRef.current;

    if (!previewVideo) {
      return;
    }

    if (canAutoplayVideo) {
      void previewVideo.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          setCanAutoplayVideo(false);
        }
      });
    }

    return () => {
      previewVideo.pause();
    };
  }, [activePanelKey, canAutoplayVideo, selectedItem.slug]);

  if (!selectedItem) {
    return null;
  }

  const cycleTo = (direction: 1 | -1) => {
    setSelectedItemIndex((currentIndex) => {
      const nextIndex = currentIndex + direction;

      if (nextIndex < 0) {
        return items.length - 1;
      }

      if (nextIndex >= items.length) {
        return 0;
      }

      return nextIndex;
    });
    setActivePanelKey("original");
  };

  const handleSelectorOpen = (event: MouseEvent<HTMLElement>) => {
    setSelectorAnchorEl(event.currentTarget);
  };

  const handleSelectorClose = () => {
    setSelectorAnchorEl(null);
  };

  const handleSelectItem = (index: number) => {
    setSelectedItemIndex(index);
    setActivePanelKey("original");
    setSelectorAnchorEl(null);
  };

  const renderImagePanel = (
    panelKey: Extract<VideoMovieRenderingPanelKey, "original" | "stylized">,
    image: typeof selectedItem.originalImage,
    caption: string,
  ) => {
    const active = activePanelKey === panelKey;
    return (
      <div
        className={`${styles.stagePanel} ${active ? styles.activePanel : ""}`}
        hidden={!active}
        aria-hidden={!active}
        inert={!active ? true : undefined}
      >
        <ImageLightbox
          src={withBasePath(image.src)}
          alt={image.alt}
          title={selectedItem.title}
          caption={caption}
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
            asset={image}
            sizes={VIDEO_MOVIE_RENDERING_IMAGE_SIZES}
            className={styles.image}
          />
        </ImageLightbox>
      </div>
    );
  };

  return (
    <div className={[styles.rendering, className].filter(Boolean).join(" ")}>
      {items.length > 1 ? (
        <div className={styles.itemPicker}>
          <IconButton
            aria-label="Previous video example"
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
              <Typography component="span" className={styles.pickerLabel}>
                {selectedItem.title}
              </Typography>
            }
            aria-haspopup="menu"
            aria-expanded={selectorOpen ? "true" : undefined}
            aria-controls={
              selectorOpen ? "video-rendering-selector-menu" : undefined
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
            aria-label="Next video example"
            size="small"
            onClick={() => cycleTo(1)}
          >
            <ChevronRight />
          </IconButton>
          <IconButton
            aria-label="Open video example selector"
            size="small"
            onClick={handleSelectorOpen}
            aria-haspopup="menu"
            aria-expanded={selectorOpen ? "true" : undefined}
            aria-controls={
              selectorOpen ? "video-rendering-selector-menu" : undefined
            }
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </div>
      ) : null}

      <div className={styles.stage}>
        {renderImagePanel(
          "original",
          selectedItem.originalImage,
          "Original source image.",
        )}
        {renderImagePanel(
          "stylized",
          selectedItem.stylizedImage,
          "Stylized image rendering used as the motion direction.",
        )}
        <div
          className={`${styles.stagePanel} ${
            activePanelKey === "video" ? styles.activePanel : ""
          }`}
          hidden={activePanelKey !== "video"}
          aria-hidden={activePanelKey !== "video"}
          inert={activePanelKey !== "video" ? true : undefined}
        >
          <VideoLightbox
            ref={previewVideoRef}
            src={withBasePath(selectedItem.video.src)}
            title={selectedItem.title}
            caption={selectedItem.video.caption}
            controls
            playsInline
            preload="metadata"
            onPlay={() => setCanAutoplayVideo(true)}
            poster={
              selectedItem.video.poster
                ? withBasePath(selectedItem.video.poster)
                : undefined
            }
            previewVideoSx={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            triggerSx={{
              width: "100%",
              height: "100%",
              minHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
      </div>

      <div className={styles.panelBar} aria-label="Choose rendering stage">
        {PANEL_OPTIONS.map((option) => {
          const Icon = option.icon;
          const active = option.key === activePanelKey;

          return (
            <button
              aria-pressed={active}
              className={active ? styles.active : ""}
              key={option.key}
              onClick={() => setActivePanelKey(option.key)}
              type="button"
            >
              <Icon fontSize="small" aria-hidden="true" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      <Menu
        id="video-rendering-selector-menu"
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
        {items.map((item, index) => (
          <MenuItem
            key={item.slug}
            selected={index === selectedItemIndex}
            onClick={() => handleSelectItem(index)}
          >
            <div className={styles.menuItem}>
              <AssetImage
                asset={item.stylizedImage}
                sizes={`${VIDEO_MOVIE_RENDERING_MENU_THUMBNAIL_SIZE}px`}
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
                  {item.title}
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
                  {item.shortText || item.blurb}
                </Typography>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
