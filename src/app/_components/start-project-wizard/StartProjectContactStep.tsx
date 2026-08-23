import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { StartProjectStepComponentProps } from "@/app/_types/startProjectWizard";
import { formatStartProjectPhone } from "@/app/_utils/startProjectWizard";
import styles from "./StartProjectWizard.module.css";

export default function StartProjectContactStep({
  form,
  onChange,
}: StartProjectStepComponentProps) {
  const phoneEntered = form.phone.trim().length > 0;

  const handlePhoneChange = (value: string) => {
    const formattedPhone = formatStartProjectPhone(value);

    onChange("phone", formattedPhone);

    if (!formattedPhone && form.allowSms) {
      onChange("allowSms", false);
    }
  };

  return (
    <div className={styles.stepBody}>
      <div>
        <Typography variant="h5" component="h2">
          How should we reach you?
        </Typography>
        <Typography color="text.secondary">
          Add your name and the best email address for a reply.
        </Typography>
      </div>
      <div className={[styles.fieldGrid, styles.contactFieldGrid].join(" ")}>
        <TextField
          label="Name"
          required
          value={form.name}
          onChange={(event) => onChange("name", event.target.value)}
        />
        <TextField
          label="Reply email"
          required
          type="email"
          value={form.replyEmail}
          onChange={(event) => onChange("replyEmail", event.target.value)}
        />
        <TextField
          label="Phone"
          type="tel"
          placeholder="+1 (555) 123 - 4567"
          value={form.phone}
          onChange={(event) => handlePhoneChange(event.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={form.allowSms}
              disabled={!phoneEntered}
              onChange={(event) => onChange("allowSms", event.target.checked)}
            />
          }
          disabled={!phoneEntered}
          label="Allow RichFX to send SMS messages about this project."
        />
      </div>
    </div>
  );
}
