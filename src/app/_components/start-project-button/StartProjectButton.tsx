"use client";

import { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { START_PROJECT_CTA } from "@/app/_consts/startProject";
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

  return (
    <>
      <ButtonBase
        aria-haspopup="dialog"
        aria-label={START_PROJECT_CTA.label}
        className={classNames}
        focusRipple
        onClick={() => setWizardOpen(true)}
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
      <StartProjectWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </>
  );
}
