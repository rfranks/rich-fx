import type { ReactElement } from "react";
import Chip from "@mui/material/Chip";
import type {
  StartProjectChipFieldProps,
  StartProjectIconMap,
} from "@/app/_types/startProjectWizard";
import styles from "./StartProjectWizard.module.css";

export default function StartProjectChipField<TId extends string>({
  legend,
  options,
  selectedIds,
  onToggle,
  iconMap,
}: StartProjectChipFieldProps<TId> & { iconMap: StartProjectIconMap }) {
  return (
    <fieldset className={styles.chipField}>
      <legend className={styles.chipLegend}>{legend}</legend>
      <div className={styles.chipGrid}>
        {options.map((option) => {
          const selected = selectedIds.includes(option.id);

          return (
            <Chip
              color={selected ? "primary" : "default"}
              icon={iconMap[option.iconKey] as ReactElement}
              key={option.id}
              label={option.label}
              onClick={() => onToggle(option.id)}
              title={option.description}
              variant={selected ? "filled" : "outlined"}
              sx={{
                minHeight: 44,
                borderRadius: 2,
                px: 0.75,
                fontWeight: 800,
              }}
            />
          );
        })}
      </div>
    </fieldset>
  );
}
