import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AssetImage } from "@/components/shared/media";
import DownloadAction from "@/app/coolkidscolor/_components/download-action/DownloadAction";
import {
  BONUS_DOWNLOAD_ASSETS,
  DOWNLOAD_ASSETS,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function DownloadCenter() {
  const allAssets = [...DOWNLOAD_ASSETS, ...BONUS_DOWNLOAD_ASSETS];

  return (
    <Box
      component="section"
      className={styles.downloadBand}
      aria-labelledby="downloads"
    >
      <Container maxWidth="xl">
        <Box className={styles.sectionHeader}>
          <Typography className={styles.kicker}>
            Download / Print Center
          </Typography>
          <Typography id="downloads" component="h2" variant="h2">
            Everything a grown-up needs, right where it should be.
          </Typography>
        </Box>
        <Box className={styles.downloadGrid}>
          {allAssets.map((asset) => (
            <Card
              component="article"
              className={styles.downloadCard}
              key={asset.id}
            >
              {asset.preview ? (
                <Box component="figure" className={styles.resourcePreview}>
                  <AssetImage
                    asset={asset.preview}
                    sizes="(max-width: 760px) 86vw, 22vw"
                  />
                </Box>
              ) : null}
              <Typography className={styles.cardEyebrow}>
                {asset.eyebrow}
              </Typography>
              <Typography component="h3" variant="h3">
                {asset.title}
              </Typography>
              <Typography>{asset.purpose}</Typography>
              {asset.id === "contest-pack" ? (
                <ul>
                  <li>coolkidscolor-2026-entry-sheet.pdf</li>
                  <li>coolkidscolor-2026-quick-start.pdf</li>
                  <li>coolkidscolor-2026-official-rules.pdf</li>
                </ul>
              ) : null}
              <Stack
                className={styles.cardActions}
                direction="row"
                useFlexGap
                flexWrap="wrap"
              >
                {asset.actions.map((action) => (
                  <DownloadAction
                    action={action}
                    asset={asset}
                    isPrimary={
                      asset.id === "entry-sheet" && action.id === "print"
                    }
                    key={action.id}
                  />
                ))}
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
