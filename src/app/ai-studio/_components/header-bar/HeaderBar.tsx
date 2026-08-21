import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ArrowBack, Close, DarkMode, LightMode } from "@mui/icons-material";
import type { HeaderBarProps } from "../../_types/headerBar";
import { withBasePath } from "@/utils/basePath";

export default function HeaderBar({
  description,
  isSmallScreen,
  mode,
  onToggleColorMode,
  title,
}: HeaderBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <IconButton
        color="inherit"
        aria-label="Back to portfolio"
        href={withBasePath("/")}
        size="small"
      >
        <ArrowBack fontSize="small" />
      </IconButton>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="h6">{title}</Typography>
        {!isSmallScreen && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      <IconButton
        color="inherit"
        aria-label={
          mode === "light" ? "Switch to dark mode" : "Switch to light mode"
        }
        onClick={onToggleColorMode}
        size="small"
      >
        {mode === "light" ? (
          <DarkMode fontSize="small" />
        ) : (
          <LightMode fontSize="small" />
        )}
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="Close lab panel"
        href={withBasePath("/")}
        size="small"
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
}
