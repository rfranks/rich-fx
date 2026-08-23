import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SongPanelProps } from "../../../_types/songRecording";
import Credits from "../credits/Credits";

export default function SongPanel({
  blurb,
  performedBy,
  writtenBy,
}: SongPanelProps) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: { xs: 0.5, sm: 1 },
        p: { xs: 1, md: 1.5 },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: "1 1 auto",
          minWidth: 0,
          minHeight: 0,
          maxWidth: 720,
          overflowY: "auto",
          pr: 0.5,
        }}
      >
        <Credits performedBy={performedBy} writtenBy={writtenBy} />
        <Typography
          color="text.secondary"
          sx={{
            mt: { xs: 0.75, sm: 1 },
            fontSize: { xs: "0.9rem", sm: "0.95rem" },
            lineHeight: { xs: 1.3, sm: 1.35 },
          }}
        >
          {blurb}
        </Typography>
      </Box>
    </Box>
  );
}
