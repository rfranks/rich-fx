import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { SourceCreditProps } from "../../_types/sourceCredit";

export default function SourceCredit({
  label,
  href,
  marginTop = 1,
}: SourceCreditProps) {
  if (!label) {
    return null;
  }

  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: "block", mt: marginTop }}
    >
      Source:{" "}
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="primary.main"
        >
          {label}
        </Link>
      ) : (
        label
      )}
    </Typography>
  );
}
