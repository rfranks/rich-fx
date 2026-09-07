"use client";

import "@fontsource/gloria-hallelujah/index.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

const coolKidsColorTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0957b8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e12b58",
    },
    background: {
      default: "#fff9ed",
      paper: "#fffefa",
    },
    text: {
      primary: "#14213d",
      secondary: "#4a5568",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 900,
      letterSpacing: 0,
    },
    h3: {
      fontWeight: 900,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 900,
      letterSpacing: "0.02em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#fff9ed",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 900,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        },
      },
    },
  },
});

type CoolKidsColorThemeProviderProps = {
  children: ReactNode;
};

export default function CoolKidsColorThemeProvider({
  children,
}: CoolKidsColorThemeProviderProps) {
  return (
    <ThemeProvider theme={coolKidsColorTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
