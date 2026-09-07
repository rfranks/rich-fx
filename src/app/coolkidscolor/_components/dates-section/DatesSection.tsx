import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AssetImage } from "@/components/shared/media";
import { DATE_MILESTONES } from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function DatesSection() {
  return (
    <Box
      component="section"
      className={styles.section}
      aria-labelledby="contest-dates"
    >
      <Container maxWidth="xl">
        <Box className={styles.sectionHeader}>
          <Typography
            id="contest-dates"
            component="h2"
            variant="h2"
            className={styles.datesTitle}
          >
            <EventAvailableOutlinedIcon aria-hidden="true" />
            <span>Remember The Dates</span>
          </Typography>
        </Box>
        <Box className={styles.dateGrid}>
          {DATE_MILESTONES.map((milestone) => (
            <Card
              component="article"
              className={styles.dateCard}
              key={milestone.holiday}
            >
              <Typography component="h3">{milestone.label}</Typography>
              <time dateTime={milestone.machineDate}>{milestone.date}</time>
              <Box className={styles.dateIconFlow} aria-hidden="true">
                <CalendarIcon />
                <ArrowForwardOutlinedIcon />
                {milestone.clipart ? (
                  <AssetImage
                    asset={milestone.clipart}
                    className={styles.dateClipart}
                    sizes="86px"
                  />
                ) : null}
              </Box>
              <Typography className={styles.dateHoliday}>
                {milestone.holiday}
              </Typography>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
