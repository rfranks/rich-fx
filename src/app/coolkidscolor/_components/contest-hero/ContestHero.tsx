import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AssetImage } from "@/components/shared/media";
import DownloadAction from "@/app/coolkidscolor/_components/download-action/DownloadAction";
import {
  COOL_KIDS_COLOR_STATUS,
  HERO_ARTWORK,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import { getDownloadAsset } from "@/app/coolkidscolor/_utils/downloads";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function ContestHero() {
  const entrySheet = getDownloadAsset("entry-sheet");
  const rules = getDownloadAsset("rules");
  const [printAction, downloadAction] = entrySheet.actions;
  const [rulesAction] = rules.actions;

  return (
    <Box
      component="section"
      className={styles.hero}
      aria-labelledby="coolkidscolor-title"
    >
      <Container maxWidth="xl" className={styles.heroInner}>
        <Box className={styles.heroCopy}>
          <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
            <Chip
              label={
                COOL_KIDS_COLOR_STATUS === "open" ? "OPEN NOW" : "2026 Contest"
              }
              className={styles.statusChip}
            />
            <Chip label="FREE TO ENTER" className={styles.yellowChip} />
            <Chip label="KIDS + ADULTS" className={styles.greenChip} />
          </Stack>
          <Typography className={styles.kicker} component="p">
            The Inaugural
          </Typography>
          <Typography id="coolkidscolor-title" component="h1" variant="h1">
            <span>#coolkidscolor</span>
            2026 Coloring Contest
          </Typography>
          <Typography className={styles.heroLine}>
            Print the official page, color it your way, post it publicly, tag
            RichFX, and include #coolkidscolor.
          </Typography>
          <Stack
            className={styles.badgeRow}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <span>5 Winners</span>
            <span>Nearly $500 in RichFX prizes</span>
            <span>#adultswelcome</span>
          </Stack>
          <Stack
            className={styles.heroActions}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            aria-label="Contest downloads"
          >
            <DownloadAction action={printAction} asset={entrySheet} isPrimary />
            <DownloadAction action={downloadAction} asset={entrySheet} />
            <DownloadAction action={rulesAction} asset={rules} />
          </Stack>
          <Typography className={styles.adultsWelcome}>
            #coolkidscolor #adultswelcome
          </Typography>
          <Typography className={styles.studioLine}>
            #adultswelcome is a community hashtag. To enter: make the post
            public, Tag RichFX, and include #coolkidscolor.
          </Typography>
        </Box>
        <Box component="figure" className={styles.heroArtwork}>
          <AssetImage
            asset={HERO_ARTWORK}
            priority
            sizes="(max-width: 900px) 82vw, 34vw"
          />
          <Box component="figcaption">Official printable contest page</Box>
        </Box>
      </Container>
    </Box>
  );
}
