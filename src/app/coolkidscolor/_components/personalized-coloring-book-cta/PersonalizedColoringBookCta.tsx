import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { AssetImage } from "@/components/shared/media";
import {
  PERSONALIZED_COLORING_BOOK_CTA,
  PERSONALIZED_COLORING_BOOK_URL,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function PersonalizedColoringBookCta() {
  return (
    <Box component="section" className={styles.personalizedBookBanner}>
      <Container maxWidth="xl">
        <Box
          aria-label="Get your personalized coloring book now on Etsy"
          className={styles.personalizedBookBannerLink}
          component="a"
          href={PERSONALIZED_COLORING_BOOK_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          <AssetImage
            asset={PERSONALIZED_COLORING_BOOK_CTA}
            className={styles.personalizedBookBannerImage}
            priority
            sizes="(max-width: 1536px) 100vw, 1536px"
          />
        </Box>
      </Container>
    </Box>
  );
}
