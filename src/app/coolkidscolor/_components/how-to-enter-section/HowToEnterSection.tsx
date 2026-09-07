import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  CONTEST_STEPS,
  QUICK_FLOW,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function HowToEnterSection() {
  return (
    <Box
      component="section"
      className={styles.section}
      aria-labelledby="how-to-enter"
    >
      <Container maxWidth="xl">
        <Box className={styles.sectionHeader}>
          <Typography className={styles.kicker}>Quick Contest Flow</Typography>
          <Typography id="how-to-enter" component="h2" variant="h2">
            Print it, color it, snap it, post it, tag it.
          </Typography>
        </Box>
        <Stack
          component="ol"
          className={styles.flowStrip}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          aria-label="Compact entry flow"
        >
          {QUICK_FLOW.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Stack>
        <Box component="ol" className={styles.stepGrid}>
          {CONTEST_STEPS.map((item) => (
            <Card
              component="li"
              className={`${styles.stepCard} ${styles[item.accent]}`}
              key={item.step}
            >
              <span>{item.step}</span>
              <Typography component="h3" variant="h3">
                {item.title}
              </Typography>
              <Typography>{item.body}</Typography>
            </Card>
          ))}
        </Box>
        <Box className={styles.requiredCallout}>
          <strong>Tag RichFX + include #coolkidscolor</strong>
          <span>Both are required for entry</span>
        </Box>
      </Container>
    </Box>
  );
}
