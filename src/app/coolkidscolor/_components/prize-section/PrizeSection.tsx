import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import EmojiEventsIcon from "@mui/icons-material/EmojiEventsOutlined";
import MovieIcon from "@mui/icons-material/MovieCreationOutlined";
import { PRIZE_TIERS } from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function PrizeSection() {
  return (
    <Box
      component="section"
      className={styles.section}
      aria-labelledby="prizes"
    >
      <Container maxWidth="xl">
        <Box className={styles.sectionHeader}>
          <Typography className={styles.kicker}>What You Can Win</Typography>
          <Typography id="prizes" component="h2" variant="h2">
            5 winners total. Nearly $500 in prizes.
          </Typography>
        </Box>
        <Box className={styles.prizeGrid}>
          {PRIZE_TIERS.map((tier, index) => (
            <Card
              component="article"
              className={styles.prizeCard}
              key={tier.label}
            >
              {index === 0 ? (
                <EmojiEventsIcon aria-hidden="true" />
              ) : (
                <MovieIcon aria-hidden="true" />
              )}
              <Typography>{tier.label}</Typography>
              <strong>{tier.winners}</strong>
              <Typography component="h3" variant="h3">
                {tier.title}
              </Typography>
              <span>Current retail value: {tier.retailValue}</span>
              <Typography>{tier.body}</Typography>
              {tier.callout ? <em>{tier.callout}</em> : null}
            </Card>
          ))}
        </Box>
        <Typography className={styles.totalValue}>
          Total prize retail value <strong>$497.91</strong>
        </Typography>
      </Container>
    </Box>
  );
}
