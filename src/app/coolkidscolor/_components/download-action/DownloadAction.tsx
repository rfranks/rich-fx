import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import OpenIcon from "@mui/icons-material/LaunchOutlined";
import PrintIcon from "@mui/icons-material/PrintOutlined";
import RulesIcon from "@mui/icons-material/RuleOutlined";
import ZipIcon from "@mui/icons-material/Inventory2Outlined";
import type {
  DownloadActionConfig,
  DownloadAsset,
  DownloadActionIcon,
} from "@/app/coolkidscolor/_types/coolKidsColor";
import { getDownloadActionHref } from "@/app/coolkidscolor/_utils/downloads";
import { withBasePath } from "@/utils/basePath";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

type DownloadActionProps = {
  action: DownloadActionConfig;
  asset: DownloadAsset;
  className?: string;
  isPrimary?: boolean;
};

const iconByName: Record<DownloadActionIcon, React.ReactElement> = {
  download: <DownloadIcon />,
  open: <OpenIcon />,
  print: <PrintIcon />,
  rules: <RulesIcon />,
  zip: <ZipIcon />,
};

export default function DownloadAction({
  action,
  asset,
  className,
  isPrimary = false,
}: DownloadActionProps) {
  const href = getDownloadActionHref(asset, action);
  const classNames = [
    styles.actionButton,
    isPrimary ? styles.primaryCta : styles.secondaryCta,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!href) {
    return (
      <Button
        aria-label={`${action.ariaLabel}. ${asset.unavailableLabel}.`}
        className={classNames}
        disabled
        startIcon={iconByName[action.icon]}
        variant={isPrimary ? "contained" : "outlined"}
      >
        {action.label}
      </Button>
    );
  }

  return (
    <Button
      aria-label={action.ariaLabel}
      className={classNames}
      component="a"
      download={action.kind === "download" ? asset.filename : undefined}
      href={withBasePath(href)}
      rel={action.kind === "open" ? "noopener noreferrer" : undefined}
      startIcon={iconByName[action.icon]}
      target={action.kind === "open" ? "_blank" : undefined}
      variant={isPrimary ? "contained" : "outlined"}
    >
      {action.label}
    </Button>
  );
}
