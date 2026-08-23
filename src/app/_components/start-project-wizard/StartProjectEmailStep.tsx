import { useEffect, useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { StartProjectStepComponentProps } from "@/app/_types/startProjectWizard";
import styles from "./StartProjectWizard.module.css";

const COPY_SUCCESS_DURATION_MS = 1800;

const copyTextWithFallback = async (text: string): Promise<void> => {
  if (!text || typeof document === "undefined") {
    throw new Error("No copyable text is available.");
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    // Fall through to the selection-based copy path for mobile browsers.
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "true");
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "-9999px";
  textArea.style.opacity = "0";

  document.body.append(textArea);

  try {
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, text.length);
    document.execCommand("copy");
  } finally {
    textArea.remove();
  }
};

export default function StartProjectEmailStep({
  emailBody = "",
}: StartProjectStepComponentProps) {
  const [copySucceeded, setCopySucceeded] = useState(false);
  const copySuccessTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(
    () => () => {
      if (copySuccessTimerRef.current) {
        clearTimeout(copySuccessTimerRef.current);
      }
    },
    [],
  );

  const showCopySuccess = () => {
    setCopySucceeded(true);

    if (copySuccessTimerRef.current) {
      clearTimeout(copySuccessTimerRef.current);
    }

    copySuccessTimerRef.current = setTimeout(() => {
      setCopySucceeded(false);
      copySuccessTimerRef.current = null;
    }, COPY_SUCCESS_DURATION_MS);
  };

  const handleCopyEmailBody = async () => {
    if (!emailBody) {
      return;
    }

    showCopySuccess();

    try {
      await copyTextWithFallback(emailBody);
    } catch {
      return;
    }
  };

  return (
    <div className={[styles.stepBody, styles.emailStepBody].join(" ")}>
      <div className={styles.emailStepIntro}>
        <Typography variant="h5" component="h2">
          Ready to open the email?
        </Typography>
        <Typography color="text.secondary">
          Review the message, then send it from your email app. You can copy the
          message to paste into your favorite email client, or click Open email
          to open your default mailto: client.
        </Typography>
        <Alert severity="warning" sx={{ mt: 2 }}>
          Remember to attach any useful photos or reference files before sending
          your email!
        </Alert>
      </div>
      <div className={[styles.fieldGrid, styles.emailPreviewGrid].join(" ")}>
        <div className={[styles.fullField, styles.emailPreviewField].join(" ")}>
          <TextField
            fullWidth
            label="Email preview"
            minRows={12}
            multiline
            slotProps={{
              htmlInput: {
                className: styles.preview,
                readOnly: true,
              },
            }}
            value={emailBody}
          />
          <span className={styles.copyEmailButtonFrame}>
            <IconButton
              aria-label="Copy email body"
              className={styles.copyEmailButton}
              disabled={!emailBody}
              onClick={handleCopyEmailBody}
              size="small"
            >
              {copySucceeded ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </IconButton>
          </span>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        autoHideDuration={COPY_SUCCESS_DURATION_MS}
        open={copySucceeded}
      >
        <Alert icon={<CheckCircleIcon fontSize="inherit" />} severity="success">
          Copied!
        </Alert>
      </Snackbar>
    </div>
  );
}
