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
  ARTWORK_RENDERING_IMAGE_SIZES,
  ARTWORK_RENDERING_ITEMS,
  ARTWORK_RENDERING_MENU_THUMBNAIL_SIZE,
  DEFAULT_ARTWORK_RENDERING_SLUG,
} from "@/app/(home)/_consts/artworkRendering";
import type {
  ArtworkRenderingPanelKey,
  ArtworkRenderingProps,
} from "@/app/(home)/_types/artworkRendering";
import { withBasePath } from "@/utils/basePath";
import styles from "@/app/(home)/_components/video-movie-rendering/VideoMovieRendering.module.css";

const PANEL_OPTIONS: {
  key: ArtworkRenderingPanelKey;
  label: string;
  icon: typeof ImageIcon;
}[] = [
  {
    key: "original",
    label: "Artwork",
    icon: ImageIcon,
  },
  {
    key: "ai",
    label: "AI Render",
    icon: AutoFixHighIcon,
  },
  {
    key: "motion",
    label: "Motion",
    icon: MovieIcon,
  },
];

export default function ArtworkRendering({
  className,
  defaultItemSlug = DEFAULT_ARTWORK_RENDERING_SLUG,
  items = ARTWORK_RENDERING_ITEMS,
}: ArtworkRenderingProps) {
  const initialIndex = useMemo(() => {
    const defaultIndex = items.findIndex(
      (item) => item.slug === defaultItemSlug,
    );

    return Math.max(defaultIndex, 0);
  }, [defaultItemSlug, items]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(initialIndex);
  const [activePanelKey, setActivePanelKey] =
    useState<ArtworkRenderingPanelKey>("original");
  const [canAutoplayVideo, setCanAutoplayVideo] = useState(false);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const selectedItem = items[selectedItemIndex] ?? items[0];
  const panelOptions = useMemo(
    () =>
      PANEL_OPTIONS.filter(
        (option) => option.key !== "motion" || Boolean(selectedItem?.motion),
      ),
    [selectedItem?.motion],
  );
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
    if (
      !panelOptions.some((option) => option.key === activePanelKey) &&
      panelOptions[0]
    ) {
      setActivePanelKey(panelOptions[0].key);
    }
  }, [activePanelKey, panelOptions]);

  useEffect(() => {
    if (activePanelKey !== "motion") {
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
  }, [activePanelKey, canAutoplayVideo, selectedItem?.slug]);

  if (!selectedItem) {
    return null;
  }

  const handleSelectItem = (index: number) => {
    setSelectedItemIndex(index);
    setActivePanelKey("original");
  };

  const renderImagePanel = (
    panelKey: Extract<ArtworkRenderingPanelKey, "original" | "ai">,
    image: typeof selectedItem.originalArt,
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
            sizes={ARTWORK_RENDERING_IMAGE_SIZES}
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
          ariaLabel="Choose an artwork example"
          className={styles.itemPicker}
          id="artwork-rendering-selector-menu"
          items={pickerItems}
          labelClassName={styles.pickerLabel}
          nextAriaLabel="Next artwork example"
          onSelectIndex={handleSelectItem}
          previousAriaLabel="Previous artwork example"
          renderItemVisual={(item, visualClassName) => (
            <AssetImage
              asset={item.aiArt}
              sizes={`${ARTWORK_RENDERING_MENU_THUMBNAIL_SIZE}px`}
              className={visualClassName}
            />
          )}
          selectedIndex={selectedItemIndex}
          selectorAriaLabel="Open artwork example selector"
        />
      ) : null}

      <div className={styles.stage}>
        {renderImagePanel(
          "original",
          selectedItem.originalArt,
          "Original artwork.",
        )}
        {renderImagePanel("ai", selectedItem.aiArt, "AI artwork rendering.")}
        {selectedItem.motion ? (
          <div
            className={`${styles.stagePanel} ${
              activePanelKey === "motion" ? styles.activePanel : ""
            }`}
            hidden={activePanelKey !== "motion"}
            aria-hidden={activePanelKey !== "motion"}
            inert={activePanelKey !== "motion" ? true : undefined}
          >
            <VideoLightbox
              ref={previewVideoRef}
              src={withBasePath(selectedItem.motion.src)}
              title={selectedItem.title}
              caption={selectedItem.motion.caption}
              controls
              playsInline
              preload="metadata"
              onPlay={() => setCanAutoplayVideo(true)}
              poster={
                selectedItem.motion.poster
                  ? withBasePath(selectedItem.motion.poster)
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
        ) : null}
      </div>

      <div
        className={styles.panelBar}
        aria-label="Choose artwork rendering stage"
        style={{
          gridTemplateColumns: `repeat(${panelOptions.length}, minmax(0, 1fr))`,
        }}
      >
        {panelOptions.map((option) => {
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
