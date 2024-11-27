import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { palette } from '@/theme/constants';
import ExpandMoreIcon from '/public/icons/down-arrow-dark.svg'
import Image from 'next/image';
import { faqs } from '@/utils';
export default function FAQ() {
  return (
    <Box>
      <Typography fontSize={'1.5rem'} mb={'1rem'} >Frequently Asked Questions</Typography>
      {faqs && faqs.map((item:any, index:any)=>(

    
      <Accordion key={index} sx={{
        backgroundColor:'rgba(43, 54, 114, 1)',
        color:palette.dirtyWhite,
        fontSize:'1rem',
        margin:'0.2rem',
        height:'4.688rem',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontWeight:'400'
      }} >
        <AccordionSummary
          expandIcon={   <Image src={`/icons/expand2.svg`} alt={'expand'} width={20} height={20} quality={80} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {item?.question}
        </AccordionSummary>
        <AccordionDetails>
          {item?.answer}
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
