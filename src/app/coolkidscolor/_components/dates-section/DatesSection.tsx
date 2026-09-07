import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";
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
          <Typography className={styles.kicker}>Remember The Dates</Typography>
          <Typography id="contest-dates" component="h2" variant="h2">
            Labor Day to Christmas Day.
          </Typography>
        </Box>
        <Box className={styles.dateGrid}>
          {DATE_MILESTONES.map((milestone) => (
            <Card
              component="article"
              className={styles.dateCard}
              key={milestone.holiday}
            >
              <CalendarIcon aria-hidden="true" />
              <Typography>{milestone.holiday}</Typography>
              <strong>{milestone.label}</strong>
              <time dateTime={milestone.machineDate}>{milestone.date}</time>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
