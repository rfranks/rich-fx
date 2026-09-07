import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FAQ_ITEMS } from "@/app/coolkidscolor/_consts/coolKidsColor";
import styles from "@/app/coolkidscolor/_components/cool-kids-color-page/CoolKidsColorPage.module.css";

export default function ContestFaq() {
  return (
    <Box
      component="section"
      className={styles.section}
      aria-labelledby="contest-faq"
    >
      <Container maxWidth="lg">
        <Box className={styles.sectionHeader}>
          <Typography
            id="contest-faq"
            component="h2"
            variant="h2"
            className={styles.faqTitle}
          >
            <ContactSupportOutlinedIcon aria-hidden="true" />
            <span>Questions parents and artists ask first.</span>
          </Typography>
        </Box>
        <Box className={styles.faqList}>
          {FAQ_ITEMS.map((item, index) => {
            const contentId = `coolkidscolor-faq-${index + 1}`;

            return (
              <Accordion className={styles.faqItem} key={item.question}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={contentId}
                >
                  <Typography component="h3">{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails id={contentId}>
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
