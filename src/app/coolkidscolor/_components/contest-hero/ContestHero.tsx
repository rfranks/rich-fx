import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AssetImage } from "@/components/shared/media";
import DownloadAction from "@/app/coolkidscolor/_components/download-action/DownloadAction";
import {
  CLIPART_ASSETS,
  COOL_KIDS_COLOR_STATUS,
  HERO_ARTWORK,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import {
  getDownloadActionHref,
  getDownloadAsset,
} from "@/app/coolkidscolor/_utils/downloads";
import { withBasePath } from "@/utils/basePath";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function ContestHero() {
  const entrySheet = getDownloadAsset("entry-sheet");
  const rules = getDownloadAsset("rules");
  const [printAction, downloadAction] = entrySheet.actions;
  const [rulesAction] = rules.actions;
  const printHref = getDownloadActionHref(entrySheet, printAction);
  const rulesHref = getDownloadActionHref(rules, rulesAction);

  return (
    <Box
      component="section"
      className={styles.hero}
      aria-labelledby="coolkidscolor-title"
    >
      <Container maxWidth="xl" className={styles.heroInner}>
        <Box className={styles.heroCopy}>
          <Typography
            className={`${styles.kicker} ${styles.heroKicker}`}
            component="p"
          >
            The Inaugural
          </Typography>
          <Typography id="coolkidscolor-title" component="h1" variant="h1">
            <span>#coolkidscolor</span>
            2026 Coloring Contest
          </Typography>
          <Box className={styles.heroDoodles} aria-hidden="true">
            <AssetImage
              asset={CLIPART_ASSETS.headerSmilingStar}
              className={styles.heroDoodle}
              sizes="72px"
            />
            <AssetImage
              asset={CLIPART_ASSETS.headerRedPencil}
              className={styles.heroDoodle}
              sizes="56px"
            />
            <AssetImage
              asset={CLIPART_ASSETS.headerSmilingHeart}
              className={styles.heroDoodle}
              sizes="64px"
            />
          </Box>
          <Stack
            className={styles.heroInfoRow}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <span className={styles.statusChip}>
              <CelebrationOutlinedIcon aria-hidden="true" />
              {COOL_KIDS_COLOR_STATUS === "open"
                ? "Contest NOW Open!"
                : "2026 Contest"}
            </span>
            <span className={styles.yellowChip}>
              <CardGiftcardOutlinedIcon aria-hidden="true" />
              FREE TO ENTER
            </span>
            <span className={styles.greenChip}>
              <GroupsOutlinedIcon aria-hidden="true" />
              ALL AGES WELCOME
            </span>
          </Stack>
          <Typography className={styles.heroLine}>
            Start with the official contest page, color it in your own style,
            then take a clear photo or scan. When you are ready, post it
            publicly with help from a grown-up if needed, tag RichFX, and
            include <span>#coolkidscolor</span> so we can find your entry. There
            will be 5 winners and nearly $500 in prizes;{" "}
            <span>#adultswelcome</span> means adults can join the fun too.
          </Typography>
          <Stack
            className={styles.heroActions}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            aria-label="Contest downloads"
          >
            <DownloadAction action={printAction} asset={entrySheet} isPrimary />
            <DownloadAction action={downloadAction} asset={entrySheet} />
          </Stack>
          {rulesHref ? (
            <Box
              aria-label={rulesAction.ariaLabel}
              className={styles.heroRulesLink}
              component="a"
              href={withBasePath(rulesHref)}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read Official Contest Rules
            </Box>
          ) : null}
        </Box>
        <Box className={styles.heroVisualStack}>
          <Box className={styles.heroMascots} aria-hidden="true">
            <AssetImage
              asset={CLIPART_ASSETS.bottomDragon}
              className={styles.heroMascot}
              sizes="160px"
            />
            <AssetImage
              asset={CLIPART_ASSETS.bottomRobot}
              className={styles.heroMascot}
              sizes="160px"
            />
          </Box>
          <Box
            aria-label={`${printAction.ariaLabel} from the hero preview`}
            className={styles.heroArtwork}
            component="a"
            href={printHref ? withBasePath(printHref) : undefined}
            rel={printHref ? "noopener noreferrer" : undefined}
            target={printHref ? "_blank" : undefined}
          >
            <AssetImage
              asset={HERO_ARTWORK}
              priority
              sizes="(max-width: 900px) 82vw, 34vw"
            />
            <Box component="figcaption">Official printable contest page</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
