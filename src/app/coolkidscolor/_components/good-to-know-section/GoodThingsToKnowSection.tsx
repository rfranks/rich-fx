import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { GOOD_TO_KNOW_ITEMS } from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function GoodThingsToKnowSection() {
  return (
    <Box
      component="section"
      className={styles.section}
      aria-labelledby="good-to-know"
    >
      <Container maxWidth="xl">
        <Box className={styles.sectionHeader}>
          <Typography className={styles.kicker}>Cool Things To Know</Typography>
          <Typography id="good-to-know" component="h2" variant="h2">
            Simple rules, clear entries, fair judging.
          </Typography>
        </Box>
        <Box className={styles.infoGrid}>
          {GOOD_TO_KNOW_ITEMS.map((item) => (
            <Card
              component="article"
              className={styles.infoCard}
              key={item.title}
            >
              <InfoIcon aria-hidden="true" />
              <Typography component="h3">{item.title}</Typography>
              <Typography>{item.body}</Typography>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
