import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";
import { AssetImage } from "@/components/shared/media";
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
          <Typography
            id="prizes"
            component="h2"
            variant="h2"
            className={styles.prizeTitle}
          >
            <RedeemOutlinedIcon aria-hidden="true" />
            <span>5 winners total. Nearly $500 in prizes.</span>
          </Typography>
        </Box>
        <Box className={styles.prizeGrid}>
          {PRIZE_TIERS.map((tier) => (
            <Card
              component="article"
              className={styles.prizeCard}
              key={tier.label}
            >
              {tier.clipart ? (
                <AssetImage
                  asset={tier.clipart}
                  className={styles.prizeClipart}
                  sizes="132px"
                />
              ) : null}
              <Typography>{tier.label}</Typography>
              <strong>{tier.winners}</strong>
              <Typography component="h3" variant="h3">
                {tier.title}
              </Typography>
              <span>Current retail value: {tier.retailValue}</span>
              <Typography>
                {tier.bodyLink ? (
                  <>
                    {tier.body.slice(0, tier.body.indexOf(tier.bodyLink.label))}
                    <Link
                      href={tier.bodyLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tier.bodyLink.label}
                    </Link>
                    {tier.body.slice(
                      tier.body.indexOf(tier.bodyLink.label) +
                        tier.bodyLink.label.length,
                    )}
                  </>
                ) : (
                  tier.body
                )}
              </Typography>
              {tier.callout ? <em>{tier.callout}</em> : null}
            </Card>
          ))}
        </Box>
        <Box className={styles.totalValueRow}>
          <Typography className={styles.totalValue}>
            Total prize retail value <strong>$497.91</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
