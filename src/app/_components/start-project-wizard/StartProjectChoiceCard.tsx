import ButtonBase from "@mui/material/ButtonBase";
import type {
  StartProjectChoiceCardProps,
  StartProjectIconMap,
} from "@/app/_types/startProjectWizard";
import styles from "./StartProjectWizard.module.css";

export default function StartProjectChoiceCard<TId extends string>({
  option,
  selected,
  onSelect,
  iconMap,
}: StartProjectChoiceCardProps<TId> & { iconMap: StartProjectIconMap }) {
  const classNames = [
    styles.choiceCard,
    selected ? styles.choiceCardSelected : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ButtonBase
      className={classNames}
      focusRipple
      aria-pressed={selected}
      onClick={() => onSelect(option.id)}
    >
      <span className={styles.choiceIcon} aria-hidden="true">
        {iconMap[option.iconKey] ?? iconMap.spark}
      </span>
      <span className={styles.choiceText}>
        <strong>{option.label}</strong>
        <span>{option.description}</span>
      </span>
    </ButtonBase>
  );
}
