"use client";

import { useLayoutEffect, useRef, useState } from "react";
import AutoFixHigh from "@mui/icons-material/AutoFixHigh";
import PhotoIcon from "@mui/icons-material/Photo";
import { AssetImage, ImageLightbox } from "@/components/shared/media";
import {
  CARD_PREVIEW_SIZES,
  CARD_THUMBNAIL_SIZES,
} from "@/app/(home)/_consts/homePage";
import type { HolidayCardViewerProps } from "@/app/_types/holidayCardViewer";
import { cards, type RichFxCard } from "@/consts/richFx";
import { withBasePath } from "@/utils/basePath";
import styles from "@/app/(home)/_components/home-page/HomePage.module.css";

const CARD_SLIDE_DURATION_MS = 560;

export default function HolidayCardViewer({
  activeCardPanel,
  cardTransitionDirection,
  selectedCard,
  onSelectCard,
  onSelectCardPanel,
}: HolidayCardViewerProps) {
  const previousSelectedCardRef = useRef(selectedCard);
  const [outgoingCard, setOutgoingCard] = useState<RichFxCard | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const selectedPreview =
    activeCardPanel === "card" ? selectedCard.card : selectedCard.original;
  const selectedPreviewTitle =
    activeCardPanel === "card"
      ? selectedCard.name
      : `${selectedCard.name} original photo`;
  const selectedPreviewCaption =
    activeCardPanel === "card"
      ? `${selectedCard.holiday} card generated from the original photo.`
      : `Original image used for the ${selectedCard.holiday} card.`;

  useLayoutEffect(() => {
    const previousSelectedCard = previousSelectedCardRef.current;
    if (previousSelectedCard.slug === selectedCard.slug) {
      return;
    }

    setOutgoingCard(previousSelectedCard);
    setIsSliding(true);
    previousSelectedCardRef.current = selectedCard;

    const timer = window.setTimeout(() => {
      setIsSliding(false);
      setOutgoingCard(null);
    }, CARD_SLIDE_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [selectedCard]);

  const renderCardPreview = (card: RichFxCard) => (
    <div
      className={`${styles.flipStage} ${
        activeCardPanel === "card" ? styles.showCard : styles.showOriginal
      }`}
    >
      <figure className={`${styles.flipFace} ${styles.originalFace}`}>
        <span>Original</span>
        <AssetImage
          asset={card.original}
          sizes={CARD_PREVIEW_SIZES}
          className={styles.sourceImage}
        />
      </figure>

      <figure className={`${styles.flipFace} ${styles.cardFace}`}>
        <span>Holiday Card</span>
        <AssetImage
          asset={card.card}
          sizes={CARD_PREVIEW_SIZES}
          className={styles.finishedCard}
          priority={card.slug === selectedCard.slug}
        />
      </figure>
    </div>
  );

  return (
    <div className={styles.viewer} aria-label="Holiday card examples">
      <div className={styles.viewerHeader}></div>

      <div className={styles.cardPicker} aria-label="Choose a card example">
        {cards.map((card) => (
          <button
            type="button"
            className={card.slug === selectedCard.slug ? styles.active : ""}
            onClick={() => onSelectCard(card.slug)}
            key={card.slug}
          >
            <AssetImage
              asset={card.card}
              sizes={CARD_THUMBNAIL_SIZES}
              className={styles.thumbnail}
            />
            <span>{card.holiday}</span>
          </button>
        ))}
      </div>

      <ImageLightbox
        src={withBasePath(selectedPreview.src)}
        alt={selectedPreview.alt}
        title={selectedPreviewTitle}
        caption={selectedPreviewCaption}
        triggerSx={{ width: "100%" }}
      >
        <div
          className={[
            styles.flipViewer,
            isSliding ? styles.slideActive : "",
            cardTransitionDirection === "left"
              ? styles.slideLeft
              : styles.slideRight,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {outgoingCard ? (
            <div
              className={`${styles.cardSlideLayer} ${styles.outgoingSlide}`}
              key={`outgoing-${outgoingCard.slug}`}
            >
              {renderCardPreview(outgoingCard)}
            </div>
          ) : null}
          <div
            className={`${styles.cardSlideLayer} ${styles.currentSlide}`}
            key={`current-${selectedCard.slug}`}
          >
            {renderCardPreview(selectedCard)}
          </div>
          <p className={styles.imageHint}>Click image to view</p>
        </div>
      </ImageLightbox>

      <div
        className={styles.transformBar}
        role="group"
        aria-label="Choose card preview"
      >
        <button
          type="button"
          className={activeCardPanel === "original" ? styles.active : ""}
          onClick={() => onSelectCardPanel("original")}
        >
          <PhotoIcon fontSize="small" aria-hidden="true" />
          <span>Original</span>
        </button>
        <button
          type="button"
          className={activeCardPanel === "card" ? styles.active : ""}
          onClick={() => onSelectCardPanel("card")}
        >
          <AutoFixHigh fontSize="small" aria-hidden="true" />
          <span>Card</span>
        </button>
      </div>
    </div>
  );
}
