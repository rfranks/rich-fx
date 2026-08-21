import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { CreditsProps } from "../../../_types/songRecording";

export default function Credits({ writtenBy, performedBy }: CreditsProps) {
  if (!writtenBy && !performedBy) {
    return null;
  }

  return (
    <Stack spacing={0.65} sx={{ minWidth: 0 }}>
      {writtenBy ? (
        <Typography variant="body2" color="text.secondary">
          Written by {writtenBy}
        </Typography>
      ) : null}
      {performedBy ? (
        <Typography variant="body2" color="text.secondary">
          Performed by {performedBy}
        </Typography>
      ) : null}
    </Stack>
  );
}
