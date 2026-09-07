"use client";

import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { AssetImage } from "@/components/shared/media";
import {
  CONTEST_STEPS,
  QUICK_FLOW,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function HowToEnterSection() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <Box
      component="section"
      className={styles.section}
      aria-labelledby="how-to-enter"
    >
      <Container maxWidth="xl">
        <Box className={styles.sectionHeader}>
          <Typography
            id="how-to-enter"
            component="h2"
            variant="h2"
            className={styles.flowTitle}
          >
            <RouteOutlinedIcon aria-hidden="true" />
            <span>Contest Flow</span>
          </Typography>
        </Box>
        <Stack
          component="ol"
          className={styles.flowStrip}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          aria-label="Compact entry flow"
        >
          {CONTEST_STEPS.map((item, index) => {
            const isExpanded = expandedStep === item.step;
            const panelId = `contest-step-${item.step}-details`;

            return (
              <li
                className={`${styles.flowStep} ${styles[item.accent]} ${
                  isExpanded ? styles.flowStepActive : ""
                }`}
                key={item.step}
              >
                <button
                  type="button"
                  className={styles.flowChip}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => setExpandedStep(isExpanded ? null : item.step)}
                >
                  <span className={styles.flowNumber}>{item.step}</span>
                  <span className={styles.flowLabel}>{QUICK_FLOW[index]}</span>
                </button>
                <Box
                  id={panelId}
                  className={`${styles.flowDetails} ${
                    isExpanded ? styles.flowDetailsActive : ""
                  }`}
                  aria-hidden={!isExpanded}
                >
                  <Box className={styles.flowDetailsInner}>
                    <Box>
                      <Typography component="h3" variant="h3">
                        {item.title}
                      </Typography>
                      <Typography>{item.body}</Typography>
                    </Box>
                    {item.clipart ? (
                      <AssetImage
                        asset={item.clipart}
                        className={styles.flowStepArt}
                        sizes="96px"
                      />
                    ) : null}
                  </Box>
                </Box>
              </li>
            );
          })}
        </Stack>
        <Alert
          severity="info"
          icon={<EmojiObjectsOutlinedIcon fontSize="inherit" />}
          className={styles.requiredCallout}
        >
          <strong>Tag RichFX + include #coolkidscolor</strong>
          <span>Both are required for entry</span>
        </Alert>
      </Container>
    </Box>
  );
}
