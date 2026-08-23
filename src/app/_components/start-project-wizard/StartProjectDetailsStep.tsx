import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { START_PROJECT_OUTPUT_OPTIONS } from "@/app/_consts/startProjectWizard";
import type {
  StartProjectIconMap,
  StartProjectStepComponentProps,
} from "@/app/_types/startProjectWizard";
import StartProjectChipField from "./StartProjectChipField";
import styles from "./StartProjectWizard.module.css";

export default function StartProjectDetailsStep({
  form,
  iconMap,
  onChange,
  onToggleOutput,
}: StartProjectStepComponentProps & { iconMap: StartProjectIconMap }) {
  return (
    <div className={styles.stepBody}>
      <div>
        <Typography variant="h5" component="h2">
          What does it need to become?
        </Typography>
        <Typography color="text.secondary">
          Occasion, output, must-have copy, and timing.
        </Typography>
      </div>
      <div className={styles.dividerSection}>
        <StartProjectChipField
          iconMap={iconMap}
          legend="Desired output"
          options={START_PROJECT_OUTPUT_OPTIONS}
          selectedIds={form.outputs}
          onToggle={onToggleOutput}
        />
      </div>
      <div className={styles.fieldGrid}>
        <TextField
          label="Occasion or purpose"
          value={form.occasion}
          onChange={(event) => onChange("occasion", event.target.value)}
        />
        <TextField
          label="Timeline"
          value={form.deadline}
          onChange={(event) => onChange("deadline", event.target.value)}
        />
        <TextField
          className={styles.fullField}
          label="Required text, names, dates, or lyrics"
          minRows={3}
          multiline
          value={form.requiredText}
          onChange={(event) => onChange("requiredText", event.target.value)}
        />
        <TextField
          className={styles.fullField}
          label="Notes"
          minRows={3}
          multiline
          value={form.notes}
          onChange={(event) => onChange("notes", event.target.value)}
        />
      </div>
    </div>
  );
}
