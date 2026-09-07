import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AssetImage } from "@/components/shared/media";
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
          <Typography
            id="good-to-know"
            component="h2"
            variant="h2"
            className={styles.goodToKnowTitle}
          >
            <FactCheckOutlinedIcon aria-hidden="true" />
            <span>Simple rules, clear entries, fair judging.</span>
          </Typography>
        </Box>
        <Box className={styles.infoGrid}>
          {GOOD_TO_KNOW_ITEMS.map((item) => (
            <Card
              component="article"
              className={`${styles.infoCard} ${styles[item.accent]}`}
              key={item.title}
            >
              {item.clipart ? (
                <AssetImage
                  asset={item.clipart}
                  className={styles.infoClipart}
                  sizes="68px"
                />
              ) : null}
              <Typography component="h3">{item.title}</Typography>
              <Typography>{item.body}</Typography>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
