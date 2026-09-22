import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AssetImage } from "@/components/shared/media";
import DownloadAction from "@/app/coolkidscolor/_components/download-action/DownloadAction";
import {
  ETSY_SHOP_URL,
  RICHFX_STUDIOS_WORDMARK,
  RICHFX_HOME_URL,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import { getDownloadAsset } from "@/app/coolkidscolor/_utils/downloads";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function FinalContestCta() {
  const entrySheet = getDownloadAsset("entry-sheet");
  const printAction = entrySheet.actions[0];

  return (
    <Box
      component="section"
      className={styles.finalCta}
      aria-labelledby="ready-to-color"
    >
      <Container maxWidth="xl">
        <Box className={styles.finalStudioLayout}>
          <Box className={styles.finalStudioBrand}>
            <AssetImage
              asset={RICHFX_STUDIOS_WORDMARK}
              className={styles.finalStudioWordmark}
              sizes="(max-width: 760px) 240px, 420px"
            />
            <Typography className={styles.finalStudioLabel}>
              RichFX Studios
            </Typography>
            <Typography className={styles.finalStudioPromise}>
              Your idea. Our power. Unlimited possibilities.
            </Typography>
          </Box>

          <Box className={styles.finalStudioContent}>
            <Typography className={styles.kicker}>Good Luck, Artist</Typography>
            <Typography id="ready-to-color" component="h2" variant="h2">
              Color it. Make it yours. Share it.
            </Typography>
            <Typography className={styles.finalSteps}>
              Public post. Tag RichFX. Include #coolkidscolor. Winners announced
              December 25, 2026.
            </Typography>
            <Stack
              className={styles.heroActions}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              <DownloadAction
                action={printAction}
                asset={entrySheet}
                isPrimary
              />
            </Stack>
            <Stack
              className={styles.finalLinks}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              <a href={ETSY_SHOP_URL}>RichFX Etsy Shop</a>
              <a href={RICHFX_HOME_URL}>Explore RichFX Studios</a>
            </Stack>
          </Box>
        </Box>

        <Box className={styles.finalStudioFooter}>
          <Typography className={styles.disclaimer}>
            No purchase necessary. Skill-based creative contest. Void where
            prohibited. Full eligibility, privacy, judging, prize, and platform
            terms are contained in the Official Contest Rules.
          </Typography>
          <Typography className={styles.brandClose}>
            Building Better Worlds Since 2026.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
