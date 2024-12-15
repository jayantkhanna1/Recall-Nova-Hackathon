import React from 'react'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  

const Faq = () => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    const faqs = [
        {
          id: 1,
          question: "What is the purpose of the Recall Website and Recall App?",
          answer:
            "The Recall website and app is designed to make recycling easier and more convenient by providing users with information on recycling guidelines, access to nearby recycling bins and tracking their recycling efforts. ",
        },
        {
          id: 2,
          question: "How do I download and install the app?",
          answer: `You can download and install the app from your device's app store. Search for "Recall UAE," and follow the prompts to download and install it on your smartphone or tablet.`,
        },
        {
          id: 3,
          question:
            "Is the Recall app available for both iOS and Android devices? ",
          answer:
            "Yes, the recycling app is available for both iOS and Android devices. You can find it on the Apple App Store and Google Play Store. ",
        },
        {
          id: 4,
          question: "Is the Recall app free to use? ",
          answer:
            "Yes, the app is free to download and use. There are no subscription fees or hidden charges.      ",
        },
        {
          id: 5,
          question: "What features does the Recall app offer?",
          answer:
            "The app offers features such as recycling guidelines for different materials, a search function to find nearby smart bins,  tracking your recycling activities, educational resources about recycling and access to redeemable rewards points.       ",
        },
      ];
  return (
    <div className="faqs">
       {faqs.map((faq) => (
        <Accordion
          key={faq.id}
          expanded={expanded === `panel${faq.id}`}
          onChange={handleChange(`panel${faq.id}`)}
        >
          <AccordionSummary
            aria-controls={`panel${faq.id}d-content`}
            id={`panel${faq.id}d-header`}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default Faq