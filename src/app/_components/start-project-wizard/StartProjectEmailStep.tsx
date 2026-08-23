import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { StartProjectStepComponentProps } from "@/app/_types/startProjectWizard";
import styles from "./StartProjectWizard.module.css";

export default function StartProjectEmailStep({
  emailBody = "",
}: StartProjectStepComponentProps) {
  const handleCopyEmailBody = () => {
    navigator.clipboard?.writeText(emailBody).catch(() => {
      // Clipboard access can be unavailable in older or restricted browsers.
    });
  };

  return (
    <div className={styles.stepBody}>
      <div>
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
      <div className={styles.fieldGrid}>
        <div className={[styles.fullField, styles.emailPreviewField].join(" ")}>
          <TextField
            fullWidth
            label="Email preview"
            minRows={12}
            multiline
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    className={styles.copyEmailAdornment}
                    position="end"
                  >
                    <Tooltip title="Copy email body">
                      <span>
                        <IconButton
                          aria-label="Copy email body"
                          disabled={!emailBody}
                          onClick={handleCopyEmailBody}
                          size="small"
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                className: styles.preview,
                readOnly: true,
              },
            }}
            value={emailBody}
          />
        </div>
      </div>
    </div>
  );
}
