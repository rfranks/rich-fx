import { useEffect, useMemo, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { START_PROJECT_OCCASION_OPTIONS } from "@/app/_consts/startProjectWizard";
import type {
  StartProjectOccasionId,
  StartProjectStepComponentProps,
} from "@/app/_types/startProjectWizard";
import { getStartProjectMinimumDeliveryDate } from "@/app/_utils/startProjectWizard";
import StartProjectImageStyleSelector from "./StartProjectImageStyleSelector";
import styles from "./StartProjectWizard.module.css";

export default function StartProjectDetailsStep({
  form,
  onChange,
}: StartProjectStepComponentProps) {
  const otherOccasionInputRef = useRef<HTMLInputElement | null>(null);
  const minimumDeliveryDate = useMemo(
    () => getStartProjectMinimumDeliveryDate(),
    [],
  );

  useEffect(() => {
    if (form.occasionType === "other") {
      otherOccasionInputRef.current?.focus();
    }
  }, [form.occasionType]);

  const handleOccasionChange = (value: string) => {
    const occasionType = value as StartProjectOccasionId | "";
    const selectedOccasion = START_PROJECT_OCCASION_OPTIONS.find(
      (option) => option.id === occasionType,
    );

    onChange("occasionType", occasionType);
    onChange(
      "occasion",
      occasionType === "other" ? "" : (selectedOccasion?.label ?? ""),
    );
  };

  const handleDeadlineChange = (value: string) => {
    if (value && value < minimumDeliveryDate) {
      onChange("deadline", minimumDeliveryDate);
      return;
    }

    onChange("deadline", value);
  };

  return (
    <div className={styles.stepBody}>
      <div>
        <Typography variant="h5" component="h2">
          What should we create?
        </Typography>
      </div>
      <div className={styles.imageStyleDividerSection}>
        <StartProjectImageStyleSelector
          selectedSlug={form.imageStyleSlug}
          onChange={(value) => onChange("imageStyleSlug", value)}
        />
      </div>
      <div className={styles.fieldGrid}>
        <TextField
          className={styles.fullField}
          label="Occasion or purpose"
          select
          value={form.occasionType}
          onChange={(event) => handleOccasionChange(event.target.value)}
        >
          <MenuItem disabled value="">
            Select occasion or purpose
          </MenuItem>
          {START_PROJECT_OCCASION_OPTIONS.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {form.occasionType === "other" ? (
          <TextField
            className={styles.fullField}
            inputRef={otherOccasionInputRef}
            label="Other occasion or purpose"
            value={form.occasion}
            onChange={(event) => onChange("occasion", event.target.value)}
          />
        ) : null}
        <TextField
          className={styles.fullField}
          label="Target Delivery Date"
          type="date"
          slotProps={{
            htmlInput: {
              min: minimumDeliveryDate,
            },
            inputLabel: {
              shrink: true,
            },
          }}
          value={form.deadline}
          onChange={(event) => handleDeadlineChange(event.target.value)}
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
