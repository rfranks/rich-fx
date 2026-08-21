import { START_PROJECT_CTA } from "@/app/_consts/startProject";
import type { StartProjectButtonProps } from "@/app/_types/startProject";
import styles from "./StartProjectButton.module.css";

export default function StartProjectButton({
  className,
  variant = "solid",
}: StartProjectButtonProps) {
  const classNames = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classNames} href={START_PROJECT_CTA.href}>
      {START_PROJECT_CTA.label}
    </a>
  );
}
