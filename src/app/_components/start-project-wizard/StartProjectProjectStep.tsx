import Typography from "@mui/material/Typography";
import { START_PROJECT_PROJECT_OPTIONS } from "@/app/_consts/startProjectWizard";
import type {
  StartProjectIconMap,
  StartProjectProjectType,
  StartProjectStepComponentProps,
} from "@/app/_types/startProjectWizard";
import StartProjectChoiceCard from "./StartProjectChoiceCard";
import styles from "./StartProjectWizard.module.css";

export default function StartProjectProjectStep({
  form,
  iconMap,
  onChange,
}: StartProjectStepComponentProps & { iconMap: StartProjectIconMap }) {
  return (
    <div className={styles.stepBody}>
      <div>
        <Typography variant="h5" component="h2">
          What are we making?
        </Typography>
        <Typography color="text.secondary">
          Pick the closest starting point.
        </Typography>
      </div>
      <div className={styles.choiceGrid}>
        {START_PROJECT_PROJECT_OPTIONS.map((option) => (
          <StartProjectChoiceCard
            iconMap={iconMap}
            key={option.id}
            option={option}
            selected={form.projectType === option.id}
            onSelect={(id: StartProjectProjectType) =>
              onChange("projectType", id)
            }
          />
        ))}
      </div>
    </div>
  );
}
