import Box from "@mui/material/Box";
import type { InlineRightsStampProps } from "../../_types/rightsStamp";

export default function InlineRightsStamp({
  label,
  visible,
}: InlineRightsStampProps) {
  if (!visible) {
    return null;
  }

  return (
    <Box
      sx={{
        px: 0.9,
        py: 0.45,
        borderRadius: "8px",
        border: "2px solid rgba(185,28,28,0.82)",
        color: "rgba(127,29,29,0.96)",
        bgcolor: "rgba(255,244,244,0.9)",
        fontSize: "0.58rem",
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}
