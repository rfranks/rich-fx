import type { CSSProperties } from "react";
import type { PaletteMode } from "@mui/material";
import { alpha, createTheme } from "@mui/material/styles";
import getFabricTheme from "@/themes/fabricTheme";
import type { FabricTokens } from "@/themes/fabricTheme";

export const richFxTheme = {
  colors: {
    black: "#030303",
    ink: "#080706",
    panel: "rgba(16, 14, 12, 0.86)",
    border: "rgba(255, 244, 224, 0.16)",
    text: "#fff3df",
    muted: "rgba(255, 243, 223, 0.68)",
    dim: "rgba(255, 243, 223, 0.48)",
    orange: "#ff6a00",
    orangeSoft: "rgba(255, 106, 0, 0.2)",
  },
} as const;

const richFxOrangeLight = "#ff8a2b";
const richFxOrangeDark = "#b84700";
const richFxStone = "#c8bba2";
const richFxStoneDark = "#7e735f";

export const richFxThemeCssVariables = {
  "--richfx-black": richFxTheme.colors.black,
  "--richfx-ink": richFxTheme.colors.ink,
  "--richfx-panel": richFxTheme.colors.panel,
  "--richfx-border": richFxTheme.colors.border,
  "--richfx-text": richFxTheme.colors.text,
  "--richfx-muted": richFxTheme.colors.muted,
  "--richfx-dim": richFxTheme.colors.dim,
  "--richfx-orange": richFxTheme.colors.orange,
  "--richfx-orange-soft": richFxTheme.colors.orangeSoft,
} as CSSProperties;

export const getRichFxFabricTokens = (mode: PaletteMode): FabricTokens => {
  const isDark = mode === "dark";

  return {
    background: {
      base: isDark ? richFxTheme.colors.black : "#f4ead7",
      layer: isDark ? richFxTheme.colors.ink : richFxTheme.colors.text,
      radialPrimary: alpha(richFxTheme.colors.orange, isDark ? 0.24 : 0.18),
      radialSecondary: alpha(richFxStone, isDark ? 0.14 : 0.22),
      texture: alpha(
        isDark ? richFxTheme.colors.text : richFxTheme.colors.black,
        isDark ? 0.05 : 0.06,
      ),
    },
    surface: {
      level1: isDark ? richFxTheme.colors.panel : "rgba(255, 243, 223, 0.74)",
      level2: isDark ? "rgba(22, 18, 14, 0.9)" : "rgba(255, 248, 236, 0.84)",
      level3: isDark ? "rgba(31, 25, 18, 0.94)" : "rgba(255, 252, 244, 0.92)",
      border: alpha(
        isDark ? richFxTheme.colors.text : richFxStoneDark,
        isDark ? 0.16 : 0.22,
      ),
      borderStrong: alpha(
        isDark ? richFxTheme.colors.orange : richFxOrangeDark,
        isDark ? 0.34 : 0.34,
      ),
      shadowSoft: isDark
        ? "0 14px 48px rgba(0, 0, 0, 0.54)"
        : "0 14px 40px rgba(68, 45, 20, 0.16)",
      shadowTight: isDark
        ? "0 8px 24px rgba(0, 0, 0, 0.44)"
        : "0 8px 22px rgba(68, 45, 20, 0.12)",
      innerGlow: alpha(
        isDark ? richFxTheme.colors.text : "#ffffff",
        isDark ? 0.12 : 0.76,
      ),
    },
    blur: {
      sm: "6px",
      md: "12px",
      lg: "18px",
    },
    radius: {
      sm: 12,
      md: 18,
      lg: 24,
      xl: 30,
      hero: 40,
      capsule: 999,
    },
    spacing: {
      compact: 8,
      regular: 16,
      roomy: 24,
    },
  };
};

export default function getRichFxTheme(mode: PaletteMode) {
  const baseTheme = getFabricTheme(mode);
  const fabric = getRichFxFabricTokens(mode);
  const isDark = mode === "dark";

  return createTheme(baseTheme, {
    palette: {
      mode,
      primary: {
        light: richFxOrangeLight,
        main: richFxTheme.colors.orange,
        dark: richFxOrangeDark,
        contrastText: richFxTheme.colors.black,
      },
      secondary: {
        light: isDark ? richFxTheme.colors.text : "#6f624f",
        main: isDark ? richFxStone : richFxStoneDark,
        dark: isDark ? richFxStoneDark : "#4e4437",
        contrastText: isDark
          ? richFxTheme.colors.black
          : richFxTheme.colors.text,
      },
      background: {
        default: fabric.background.base,
        paper: fabric.background.layer,
      },
      divider: fabric.surface.border,
      text: {
        primary: isDark ? richFxTheme.colors.text : "#17120d",
        secondary: isDark ? alpha(richFxTheme.colors.text, 0.68) : "#5d503f",
      },
      action: {
        selected: alpha(richFxTheme.colors.orange, isDark ? 0.2 : 0.14),
        hover: alpha(richFxTheme.colors.orange, isDark ? 0.12 : 0.1),
      },
    },
    fabric,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "--bg-base": fabric.background.base,
            "--bg-layer": fabric.background.layer,
            "--bg-radial-primary": fabric.background.radialPrimary,
            "--bg-radial-secondary": fabric.background.radialSecondary,
            "--surface-1": fabric.surface.level1,
            "--surface-2": fabric.surface.level2,
            "--surface-3": fabric.surface.level3,
            "--surface-border": fabric.surface.border,
            "--surface-border-strong": fabric.surface.borderStrong,
            "--shadow-soft": fabric.surface.shadowSoft,
            "--shadow-tight": fabric.surface.shadowTight,
            "--inner-glow": fabric.surface.innerGlow,
            backgroundColor: "var(--bg-base)",
            backgroundImage: [
              "radial-gradient(50rem 30rem at 8% -10%, var(--bg-radial-primary), transparent 68%)",
              "radial-gradient(42rem 26rem at 96% -12%, var(--bg-radial-secondary), transparent 72%)",
              `linear-gradient(120deg, transparent 0, transparent 34%, ${fabric.background.texture} 35%, transparent 36%, transparent 64%, ${fabric.background.texture} 65%, transparent 66%, transparent 100%)`,
              "linear-gradient(180deg, var(--bg-layer), var(--bg-base))",
            ].join(","),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            color: isDark ? richFxTheme.colors.text : richFxTheme.colors.black,
            borderColor: "var(--surface-border-strong)",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "inherit",
            "&:hover": {
              backgroundColor: alpha(
                richFxTheme.colors.orange,
                isDark ? 0.16 : 0.12,
              ),
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: isDark
              ? alpha(richFxTheme.colors.text, 0.72)
              : richFxStoneDark,
          },
        },
      },
    },
  });
}
