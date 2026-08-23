"use client";

import { useMemo, useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CastleIcon from "@mui/icons-material/Castle";
import CloseIcon from "@mui/icons-material/Close";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PaletteIcon from "@mui/icons-material/Palette";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  START_PROJECT_INITIAL_FORM,
  START_PROJECT_PROJECT_OPTIONS,
  START_PROJECT_STEPS,
} from "@/app/_consts/startProjectWizard";
import type {
  StartProjectFormState,
  StartProjectIconMap,
  StartProjectWizardProps,
} from "@/app/_types/startProjectWizard";
import {
  buildStartProjectEmailBody,
  buildStartProjectMailto,
} from "@/app/_utils/startProjectWizard";
import StartProjectContactStep from "./StartProjectContactStep";
import StartProjectDetailsStep from "./StartProjectDetailsStep";
import StartProjectEmailStep from "./StartProjectEmailStep";
import StartProjectProjectStep from "./StartProjectProjectStep";
import { useStartProjectBodyScrollLock } from "./useStartProjectBodyScrollLock";
import styles from "./StartProjectWizard.module.css";

const iconSx = { fontSize: 34 };

export default function StartProjectWizard({
  open,
  onClose,
}: StartProjectWizardProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  useStartProjectBodyScrollLock(open);

  const [activeStep, setActiveStep] = useState(0);
  const [stepDirection, setStepDirection] = useState<"forward" | "back">(
    "forward",
  );
  const [form, setForm] = useState<StartProjectFormState>(
    START_PROJECT_INITIAL_FORM,
  );
  const emailBody = useMemo(() => buildStartProjectEmailBody(form), [form]);
  const mailto = useMemo(() => buildStartProjectMailto(form), [form]);
  const selectedProjectLabel =
    START_PROJECT_PROJECT_OPTIONS.find(
      (option) => option.id === form.projectType,
    )?.label ?? "";
  const iconMap: StartProjectIconMap = useMemo(
    () => ({
      holiday: <CardGiftcardIcon sx={iconSx} />,
      calendar: <CalendarMonthIcon sx={iconSx} />,
      cartoon: <PaletteIcon sx={iconSx} />,
      fantasy: <CastleIcon sx={iconSx} />,
      game: <SportsEsportsIcon sx={iconSx} />,
      movie: <MovieCreationIcon sx={iconSx} />,
      song: <MusicNoteIcon sx={iconSx} />,
      spark: <AutoAwesomeIcon sx={iconSx} />,
    }),
    [],
  );
  const isLastStep = activeStep === START_PROJECT_STEPS.length - 1;
  const activeStepId = START_PROJECT_STEPS[activeStep]?.id;
  const contactStepIndex = START_PROJECT_STEPS.findIndex(
    (step) => step.id === "contact",
  );
  const nextDisabled =
    (activeStep === 0 && !form.projectType) ||
    (activeStep === contactStepIndex &&
      (!form.name.trim() || !form.replyEmail.trim()));
  const dialogTitle =
    activeStep === 1 && selectedProjectLabel
      ? `Start a RichFX Project - ${selectedProjectLabel}`
      : "Start a RichFX Project";

  const goToStep = (nextStep: number) => {
    const normalizedNextStep = Math.min(
      Math.max(nextStep, 0),
      START_PROJECT_STEPS.length - 1,
    );

    setStepDirection(normalizedNextStep >= activeStep ? "forward" : "back");
    setActiveStep(normalizedNextStep);
  };

  const handleChange = <TKey extends keyof StartProjectFormState>(
    key: TKey,
    value: StartProjectFormState[TKey],
  ) => {
    setForm((currentForm) => ({ ...currentForm, [key]: value }));

    if (key === "projectType" && activeStep === 0 && value) {
      goToStep(1);
    }
  };

  const handleNext = () => {
    goToStep(activeStep + 1);
  };

  const handleBack = () => {
    goToStep(activeStep - 1);
  };

  const handleReset = () => {
    goToStep(0);
    setForm(START_PROJECT_INITIAL_FORM);
  };

  const handleOpenEmail = () => {
    window.location.href = mailto;
  };

  const stepProps = {
    form,
    iconMap,
    onChange: handleChange,
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: fullScreen ? 0 : 2,
          backgroundImage: "none",
          height: fullScreen ? "100%" : "min(840px, calc(100vh - 64px))",
          overscrollBehavior: "contain",
          width: fullScreen ? "100%" : "min(900px, calc(100vw - 64px))",
        },
      }}
    >
      <DialogTitle className={styles.dialogTitle}>
        <span>{dialogTitle}</span>
        <span className={styles.titleActions}>
          <Tooltip title="Reset wizard">
            <IconButton
              aria-label="Reset project wizard"
              className={styles.titleButton}
              onClick={handleReset}
              size="small"
            >
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton
              aria-label="Close project wizard"
              className={styles.titleButton}
              onClick={onClose}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </span>
      </DialogTitle>
      <DialogContent className={styles.content}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={styles.stepper}
        >
          {START_PROJECT_STEPS.map((step, index) => (
            <Step key={step.id}>
              {index < activeStep ? (
                <StepButton onClick={() => goToStep(index)}>
                  {step.label}
                </StepButton>
              ) : (
                <StepLabel>{step.label}</StepLabel>
              )}
            </Step>
          ))}
        </Stepper>
        <Box
          className={[
            styles.stepFrame,
            activeStepId === "email" ? styles.emailStepFrame : undefined,
            stepDirection === "forward"
              ? styles.stepFrameForward
              : styles.stepFrameBack,
          ].join(" ")}
          key={activeStep}
        >
          {activeStepId === "project" ? (
            <StartProjectProjectStep {...stepProps} />
          ) : null}
          {activeStepId === "details" ? (
            <StartProjectDetailsStep {...stepProps} />
          ) : null}
          {activeStepId === "contact" ? (
            <StartProjectContactStep {...stepProps} />
          ) : null}
          {activeStepId === "email" ? (
            <StartProjectEmailStep {...stepProps} emailBody={emailBody} />
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button onClick={activeStep === 0 ? onClose : handleBack}>
          {activeStep === 0 ? "Close" : "Back"}
        </Button>
        <Button
          disabled={nextDisabled}
          onClick={isLastStep ? handleOpenEmail : handleNext}
          variant="contained"
        >
          {isLastStep ? "Open email" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
