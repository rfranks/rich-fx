"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import { Picker } from "@/components/shared/controls";
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
  mediaOverlay,
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
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const selectedItem = items[selectedItemIndex] ?? items[0];
  const pickerItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        key: item.slug,
        label: item.title,
        secondaryLabel: item.shortText || item.blurb,
      })),
    [items],
  );

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

  const handleSelectItem = (index: number) => {
    setSelectedItemIndex(index);
    setActivePanelKey("original");
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
        <Picker
          ariaLabel="Choose a video example"
          className={styles.itemPicker}
          id="video-rendering-selector-menu"
          items={pickerItems}
          labelClassName={styles.pickerLabel}
          nextAriaLabel="Next video example"
          onSelectIndex={handleSelectItem}
          previousAriaLabel="Previous video example"
          renderItemVisual={(item, className) => (
            <AssetImage
              asset={item.stylizedImage}
              sizes={`${VIDEO_MOVIE_RENDERING_MENU_THUMBNAIL_SIZE}px`}
              className={className}
            />
          )}
          selectedIndex={selectedItemIndex}
          selectorAriaLabel="Open video example selector"
        />
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
        {mediaOverlay ? (
          <div className={styles.mediaOverlay}>{mediaOverlay}</div>
        ) : null}
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
    </div>
  );
}
