import { START_PROJECT_CTA } from "@/app/_consts/startProject";
import type { StartProjectButtonProps } from "@/app/_types/startProject";
import styles from "./StartProjectButton.module.css";

export default function StartProjectButton({
  className,
  compactLabel,
  variant = "solid",
}: StartProjectButtonProps) {
  const classNames = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      aria-label={START_PROJECT_CTA.label}
      className={classNames}
      href={START_PROJECT_CTA.href}
    >
      <span className={compactLabel ? styles.fullLabel : undefined}>
        {START_PROJECT_CTA.label}
      </span>
      {compactLabel ? (
        <span className={styles.compactLabel} aria-hidden="true">
          {compactLabel}
        </span>
      ) : null}
    </a>
  );
}
