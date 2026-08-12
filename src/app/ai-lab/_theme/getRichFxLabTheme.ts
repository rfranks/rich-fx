import type { PaletteMode } from "@mui/material";
import { alpha, createTheme } from "@mui/material/styles";
import getFabricTheme from "@/themes/fabricTheme";
import type { FabricTokens } from "@/themes/fabricTheme";

const richFxOrange = "#ff6a00";
const richFxOrangeLight = "#ff8a2b";
const richFxOrangeDark = "#b84700";
const richFxBlack = "#030303";
const richFxInk = "#080706";
const richFxCream = "#fff3df";
const richFxStone = "#c8bba2";
const richFxStoneDark = "#7e735f";

const getRichFxFabricTokens = (mode: PaletteMode): FabricTokens => {
  const isDark = mode === "dark";

  return {
    background: {
      base: isDark ? richFxBlack : "#f4ead7",
      layer: isDark ? richFxInk : richFxCream,
      radialPrimary: alpha(richFxOrange, isDark ? 0.24 : 0.18),
      radialSecondary: alpha(richFxStone, isDark ? 0.14 : 0.22),
      texture: alpha(isDark ? richFxCream : richFxBlack, isDark ? 0.05 : 0.06),
    },
    surface: {
      level1: isDark ? "rgba(16, 14, 12, 0.86)" : "rgba(255, 243, 223, 0.74)",
      level2: isDark ? "rgba(22, 18, 14, 0.9)" : "rgba(255, 248, 236, 0.84)",
      level3: isDark ? "rgba(31, 25, 18, 0.94)" : "rgba(255, 252, 244, 0.92)",
      border: alpha(
        isDark ? richFxCream : richFxStoneDark,
        isDark ? 0.16 : 0.22,
      ),
      borderStrong: alpha(
        isDark ? richFxOrange : richFxOrangeDark,
        isDark ? 0.34 : 0.34,
      ),
      shadowSoft: isDark
        ? "0 14px 48px rgba(0, 0, 0, 0.54)"
        : "0 14px 40px rgba(68, 45, 20, 0.16)",
      shadowTight: isDark
        ? "0 8px 24px rgba(0, 0, 0, 0.44)"
        : "0 8px 22px rgba(68, 45, 20, 0.12)",
      innerGlow: alpha(isDark ? richFxCream : "#ffffff", isDark ? 0.12 : 0.76),
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

export default function getRichFxLabTheme(mode: PaletteMode) {
  const baseTheme = getFabricTheme(mode);
  const fabric = getRichFxFabricTokens(mode);
  const isDark = mode === "dark";

  return createTheme(baseTheme, {
    palette: {
      mode,
      primary: {
        light: richFxOrangeLight,
        main: richFxOrange,
        dark: richFxOrangeDark,
        contrastText: richFxBlack,
      },
      secondary: {
        light: isDark ? richFxCream : "#6f624f",
        main: isDark ? richFxStone : richFxStoneDark,
        dark: isDark ? richFxStoneDark : "#4e4437",
        contrastText: isDark ? richFxBlack : richFxCream,
      },
      background: {
        default: fabric.background.base,
        paper: fabric.background.layer,
      },
      divider: fabric.surface.border,
      text: {
        primary: isDark ? richFxCream : "#17120d",
        secondary: isDark ? alpha(richFxCream, 0.68) : "#5d503f",
      },
      action: {
        selected: alpha(richFxOrange, isDark ? 0.2 : 0.14),
        hover: alpha(richFxOrange, isDark ? 0.12 : 0.1),
      },
    },
    fabric,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "--fabric-bg-base": fabric.background.base,
            "--fabric-bg-layer": fabric.background.layer,
            "--fabric-bg-radial-primary": fabric.background.radialPrimary,
            "--fabric-bg-radial-secondary": fabric.background.radialSecondary,
            "--fabric-surface-1": fabric.surface.level1,
            "--fabric-surface-2": fabric.surface.level2,
            "--fabric-surface-3": fabric.surface.level3,
            "--fabric-surface-border": fabric.surface.border,
            "--fabric-surface-border-strong": fabric.surface.borderStrong,
            "--fabric-shadow-soft": fabric.surface.shadowSoft,
            "--fabric-shadow-tight": fabric.surface.shadowTight,
            "--fabric-inner-glow": fabric.surface.innerGlow,
            backgroundColor: "var(--fabric-bg-base)",
            backgroundImage: [
              "radial-gradient(50rem 30rem at 8% -10%, var(--fabric-bg-radial-primary), transparent 68%)",
              "radial-gradient(42rem 26rem at 96% -12%, var(--fabric-bg-radial-secondary), transparent 72%)",
              `linear-gradient(120deg, transparent 0, transparent 34%, ${fabric.background.texture} 35%, transparent 36%, transparent 64%, ${fabric.background.texture} 65%, transparent 66%, transparent 100%)`,
              "linear-gradient(180deg, var(--fabric-bg-layer), var(--fabric-bg-base))",
            ].join(","),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            color: isDark ? richFxCream : richFxBlack,
            borderColor: "var(--fabric-surface-border-strong)",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "inherit",
            "&:hover": {
              backgroundColor: alpha(richFxOrange, isDark ? 0.16 : 0.12),
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: isDark ? alpha(richFxCream, 0.72) : richFxStoneDark,
          },
        },
      },
    },
  });
}
