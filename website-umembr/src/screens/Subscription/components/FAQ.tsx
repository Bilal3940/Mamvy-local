import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Box, Typography } from '@mui/material';
import { palette } from '@/theme/constants';
import Image from 'next/image';
import { faqs } from '@/utils';

export default function FAQ() {
    const ExpandIcon = () => (
      <Image src={`/icons/expand2.svg`} alt={'chevron-down'}  width={24} height={24}  quality={100} />
    );
  return (
    <Box sx={{borderRadius:'0.6rem'}} >
      <Typography fontSize={'1.5rem'} mb={'1rem'} >Frequently Asked Questions</Typography>
      {faqs && faqs.map((item:any, index:any)=>(

    
<Accordion sx={{ backgroundColor: '#2B3672', color: 'white', padding:'0.5rem', margin:'0.4rem 0', borderRadius:'0.4rem'}} key={item.question}>
<AccordionSummary expandIcon={<ExpandIcon />} aria-controls='panel1-content' id='panel1-header'>
  <Typography color='#A9B4CC'>{item.question}</Typography>
</AccordionSummary>
<AccordionDetails>
  <Typography color='#A9B4CC' sx={{ fontSize: '0.875rem' }}>
    {item.answer}
  </Typography>
</AccordionDetails>
</Accordion>
))}
      {/* <Accordion>
        <AccordionSummary
        //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
        //   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
}
