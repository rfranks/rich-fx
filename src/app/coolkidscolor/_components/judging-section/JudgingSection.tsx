import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import { AssetImage } from "@/components/shared/media";
import {
  JUDGING_CRITERIA,
  SHOWCASE_IMAGES,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function JudgingSection() {
  return (
    <Box
      component="section"
      className={styles.section}
      aria-labelledby="judging"
    >
      <Container maxWidth="xl">
        <Box className={styles.judgingLayout}>
          <Box className={styles.sectionHeader}>
            <Typography className={styles.kicker}>How To Win</Typography>
            <Typography id="judging" component="h2" variant="h2">
              You do NOT have to be perfect to win.
            </Typography>
            <Typography className={styles.sectionLead}>
              This is a creative judged contest. RichFX looks for imagination,
              personality, effort, and the spark that makes your page yours.
              Likes and popularity do not decide the winners.
            </Typography>
          </Box>
          <Box component="figure" className={styles.glanceImage}>
            <AssetImage
              asset={SHOWCASE_IMAGES[3]}
              sizes="(max-width: 900px) 88vw, 34vw"
            />
          </Box>
        </Box>
        <Box className={styles.criteriaGrid}>
          {JUDGING_CRITERIA.map((item) => (
            <Card className={styles.criteriaCard} key={item}>
              <CheckCircleIcon aria-hidden="true" />
              <span>{item}</span>
            </Card>
          ))}
        </Box>
        <Stack className={styles.parentNote} spacing={1.5}>
          <Typography component="h3">Parent-friendly version</Typography>
          <Typography>
            RichFX may consider age so kids can be judged fairly. This page does
            not create hard age divisions; the Official Rules remain the
            authoritative contest document.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
