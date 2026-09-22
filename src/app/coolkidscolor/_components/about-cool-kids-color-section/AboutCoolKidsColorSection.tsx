import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { START_PROJECT_EMAIL } from "@/app/_consts/startProject";
import {
  CLIPART_ASSETS,
  ETSY_SHOP_URL,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import { AssetImage } from "@/components/shared/media";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

const emailHref = `mailto:${START_PROJECT_EMAIL.to}`;

export default function AboutCoolKidsColorSection() {
  return (
    <Box
      aria-labelledby="about-cool-kids-color"
      className={`${styles.section} ${styles.aboutSection}`}
      component="section"
    >
      <Container className={styles.aboutLayout} maxWidth="xl">
        <Box className={styles.aboutCopy}>
          <Box className={styles.sectionHeader}>
            <Typography
              className={styles.aboutTitle}
              component="h2"
              id="about-cool-kids-color"
              variant="h2"
            >
              <AutoStoriesOutlinedIcon aria-hidden="true" />
              <span>About Us</span>
            </Typography>
          </Box>

          <Typography className={styles.aboutWelcome} component="p">
            Welcome to <span>Cool Kids Color!</span>
          </Typography>

          <Box
            aria-label="Cool Kids Color contact links"
            className={styles.aboutActions}
          >
            <Button
              className={`${styles.actionButton} ${styles.primaryCta}`}
              component="a"
              href={ETSY_SHOP_URL}
              rel="noopener noreferrer"
              startIcon={<StorefrontOutlinedIcon aria-hidden="true" />}
              target="_blank"
              variant="contained"
            >
              Visit Our Etsy Store
            </Button>
            <Button
              className={`${styles.actionButton} ${styles.secondaryCta}`}
              component="a"
              href={emailHref}
              startIcon={<EmailOutlinedIcon aria-hidden="true" />}
              variant="outlined"
            >
              Email RichFX
            </Button>
          </Box>

          <Stack className={styles.aboutBody} spacing={2}>
            <Typography>
              RichFX creates custom coloring books starring the people, pets,
              places, and adventures you love. Imagine your family fishing
              together on a lake, your dog skiing in the Alps, or anything else
              you can dream up.
            </Typography>
            <Typography>
              Send us a few clear photos of everyone you want included, along
              with any ideas you have. We will turn them into a one-of-a-kind
              coloring adventure made just for you.
            </Typography>
            <Typography>
              Explore our{" "}
              <a
                className={styles.aboutInlineLink}
                href={ETSY_SHOP_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Etsy storefront
              </a>{" "}
              to see what is possible and start your own book. Have a question?
              We are happy to help at{" "}
              <a className={styles.aboutInlineLink} href={emailHref}>
                {START_PROJECT_EMAIL.to}
              </a>
              .
            </Typography>
          </Stack>
        </Box>

        <Box aria-hidden="true" className={styles.aboutArt}>
          <AssetImage
            asset={CLIPART_ASSETS.headerSmilingStar}
            className={styles.aboutStar}
            sizes="72px"
          />
          <AssetImage
            asset={CLIPART_ASSETS.crayonCup}
            className={styles.aboutCrayons}
            sizes="120px"
          />
          <AssetImage
            asset={CLIPART_ASSETS.grownupChildTablet}
            className={styles.aboutFamily}
            sizes="(max-width: 760px) 190px, 270px"
          />
          <AssetImage
            asset={CLIPART_ASSETS.personalizedColoringBook}
            className={styles.aboutBook}
            sizes="(max-width: 760px) 150px, 210px"
          />
          <AssetImage
            asset={CLIPART_ASSETS.headerSmilingHeart}
            className={styles.aboutHeart}
            sizes="64px"
          />
        </Box>
      </Container>
    </Box>
  );
}
