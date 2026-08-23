import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { START_PROJECT_MATERIAL_OPTIONS } from "@/app/_consts/startProjectWizard";
import type {
  StartProjectIconMap,
  StartProjectStepComponentProps,
} from "@/app/_types/startProjectWizard";
import StartProjectChipField from "./StartProjectChipField";
import StartProjectImageStyleSelector from "./StartProjectImageStyleSelector";
import styles from "./StartProjectWizard.module.css";

export default function StartProjectSourceStep({
  form,
  iconMap,
  onChange,
  onToggleMaterial,
}: StartProjectStepComponentProps & { iconMap: StartProjectIconMap }) {
  return (
    <div className={styles.stepBody}>
      <div>
        <Typography variant="h5" component="h2">
          What should it start from?
        </Typography>
        <Typography color="text.secondary">
          Photos, people, places, references, or the first spark of an idea.
        </Typography>
      </div>
      <div className={styles.fieldGrid}>
        <TextField
          label="Who or what is featured?"
          value={form.featuredSubject}
          onChange={(event) => onChange("featuredSubject", event.target.value)}
        />
        <TextField
          label="Style, world, or theme"
          value={form.styleDirection}
          onChange={(event) => onChange("styleDirection", event.target.value)}
        />
        <TextField
          className={styles.fullField}
          label="Source material"
          minRows={3}
          multiline
          value={form.sourceNotes}
          onChange={(event) => onChange("sourceNotes", event.target.value)}
        />
      </div>
      <div className={styles.dividerSection}>
        <StartProjectChipField
          iconMap={iconMap}
          legend="Available materials"
          options={START_PROJECT_MATERIAL_OPTIONS}
          selectedIds={form.materials}
          onToggle={onToggleMaterial}
        />
      </div>
      <StartProjectImageStyleSelector
        selectedSlug={form.imageStyleSlug}
        onChange={(value) => onChange("imageStyleSlug", value)}
      />
    </div>
  );
}
