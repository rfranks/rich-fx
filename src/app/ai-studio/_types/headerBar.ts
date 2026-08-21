import type { PaletteMode } from "@mui/material";

export type HeaderBarProps = {
  description: string;
  isSmallScreen: boolean;
  mode: PaletteMode;
  onToggleColorMode: () => void;
  title: string;
};
