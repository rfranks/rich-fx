import Link from "next/link";
import { EXPERIMENT_IMAGE_SIZES } from "@/app/what-we-do/_consts/whatWeDoPage";
import type { RichFxExperimentFeatureProps } from "@/app/what-we-do/_types/richFx";
import { AssetImage } from "@/components/shared/media";
import styles from "@/app/what-we-do/_components/what-we-do-page/WhatWeDoPage.module.css";

export default function ExperimentCard({ item }: RichFxExperimentFeatureProps) {
  return (
    <Link className={styles.experimentCard} href={`/ai-studio#${item.slug}`}>
      <AssetImage
        asset={item.previewImage}
        className={styles.experimentImage}
        sizes={EXPERIMENT_IMAGE_SIZES}
      />
      <span>{item.shortText}</span>
      <strong>{item.title}</strong>
    </Link>
  );
}
