import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AssetImage } from "@/components/shared/media";
import {
  ETSY_SHOP_URL,
  SHOWCASE_IMAGES,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function ColoringBookShowcase() {
  return (
    <Box
      component="section"
      className={styles.section}
      aria-labelledby="coloring-books"
    >
      <Container maxWidth="xl">
        <Box className={styles.showcaseIntro}>
          <Box>
            <Typography className={styles.kicker}>Contest Materials</Typography>
            <Typography id="coloring-books" component="h2" variant="h2">
              Real print pieces, ready for artists.
            </Typography>
          </Box>
          <Box>
            <Typography>
              The official entry sheet is the coloring page for the contest. The
              flyer and takeaway card make it easy to share the contest with a
              class, club, event, or friend.
            </Typography>
            <Typography>
              Grand Prize winners receive a personalized RichFX coloring-book
              experience: you become the star of your own coloring book.
            </Typography>
            <a className={styles.textCta} href={ETSY_SHOP_URL}>
              See personalized coloring books on Etsy
            </a>
          </Box>
        </Box>
        <Box className={styles.showcaseGrid}>
          {SHOWCASE_IMAGES.slice(0, 3).map((image) => (
            <Box
              component="figure"
              className={styles.showcaseCard}
              key={image.src}
            >
              <AssetImage asset={image} sizes="(max-width: 760px) 88vw, 28vw" />
              <Box component="figcaption">{image.title}</Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
