import Box from "@mui/material/Box";
import type { RightsStampProps } from "../../_types/rightsStamp";

export default function RightsStamp({
  angle,
  label,
  visible,
}: RightsStampProps) {
  if (!visible) {
    return null;
  }

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        top: { xs: 52, md: 60 },
        right: { xs: 14, md: 22 },
        zIndex: 2,
        pointerEvents: "none",
        px: 1.4,
        py: 0.7,
        borderRadius: "10px",
        border: "3px solid rgba(185,28,28,0.85)",
        color: "rgba(127,29,29,0.96)",
        bgcolor: "rgba(255,244,244,0.82)",
        fontSize: { xs: "0.7rem", md: "0.82rem" },
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        transform: `rotate(${angle}deg)`,
        boxShadow:
          "0 0 0 2px rgba(255,255,255,0.22) inset, 0 10px 24px rgba(127,29,29,0.18)",
        textShadow: "0 1px 0 rgba(255,255,255,0.3)",
        opacity: 0.92,
      }}
    >
      {label}
    </Box>
  );
}
