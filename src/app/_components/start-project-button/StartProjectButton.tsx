"use client";

import { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import {
  START_PROJECT_CTA,
  START_PROJECT_ETSY_URL,
  USE_ETSY,
} from "@/app/_consts/startProject";
import StartProjectWizard from "@/app/_components/start-project-wizard/StartProjectWizard";
import type { StartProjectButtonProps } from "@/app/_types/startProject";
import styles from "./StartProjectButton.module.css";

export default function StartProjectButton({
  className,
  compactLabel,
  variant = "solid",
}: StartProjectButtonProps) {
  const [wizardOpen, setWizardOpen] = useState(false);
  const classNames = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (USE_ETSY) {
      window.open(START_PROJECT_ETSY_URL, "_blank", "noopener,noreferrer");
      return;
    }

    setWizardOpen(true);
  };

  return (
    <>
      <ButtonBase
        aria-haspopup={USE_ETSY ? undefined : "dialog"}
        aria-label={START_PROJECT_CTA.label}
        className={classNames}
        focusRipple
        onClick={handleClick}
        sx={{
          bgcolor: "var(--richfx-orange)",
          borderColor: "var(--richfx-orange)",
          borderRadius: "8px",
          color: "var(--richfx-black)",
          px: variant === "header" ? "13px" : "18px",
          "&:hover": {
            bgcolor: "#ff8f33",
            borderColor: "#ff8f33",
            color: "var(--richfx-black)",
          },
        }}
        type="button"
      >
        <span className={compactLabel ? styles.fullLabel : undefined}>
          {START_PROJECT_CTA.label}
        </span>
        {compactLabel ? (
          <span className={styles.compactLabel} aria-hidden="true">
            {compactLabel}
          </span>
        ) : null}
      </ButtonBase>
      {USE_ETSY ? null : (
        <StartProjectWizard
          open={wizardOpen}
          onClose={() => setWizardOpen(false)}
        />
      )}
    </>
  );
}
