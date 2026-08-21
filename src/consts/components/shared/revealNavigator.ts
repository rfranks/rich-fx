import { alpha } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

export const UNREACHED_REVEAL_ITEM_SX: SxProps<Theme> = {
  borderStyle: "dashed",
  borderColor: "rgba(148,163,184,0.55)",
  color: "rgba(148,163,184,0.88)",
  backgroundColor: (theme) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], 0.08)
      : "rgba(148,163,184,0.06)",
  "& .MuiChip-label": {
    fontStyle: "italic",
  },
};
