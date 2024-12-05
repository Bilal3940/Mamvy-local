import React, { useState } from 'react';
import { Modal, Box, Paper, Grid, Typography} from '@mui/material';

import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import IconBasedStepper from '@/components/StepperPaywall';
import { extrasSelector } from '@/store/selectors';
import { useSelector } from 'react-redux';
import { MuiIconButton } from './IconButton';
import Image from 'next/image';

interface PopupModalProps {
  open: boolean;
  onClose: (step : any) => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ open, onClose }) => {
  const {extraContent} = useSelector(extrasSelector);
  const [step, setStep]= useState(0);

  const callbackStepper=(stepp:any)=>{
setStep(stepp);
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
     
        disableAutoFocus 
        disableEnforceFocus 
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        closeAfterTransition 
        keepMounted 
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            overflow: 'auto',
          }}
       >
          <Paper
            sx={{
              width: '80%',
              height: 'auto',
              position: 'relative',
              maxWidth: '900px',
              padding: 3,
              borderRadius: 2,
              display: 'flex',

              backgroundColor: 'rgba(102, 102, 102, 1)',
              color: '#fff',
              maxHeight: '90vh',
              flexDirection: 'column',
              overflowY: 'auto',
              [theme.breakpoints.down('sm')]: {
                width: '95%', 
                padding: '5px',
                paddingTop: '45px',
              },
            }}
            onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <MuiIconButton  sx={{
            position: 'absolute',
            top: 0,
            right: 15,
            padding: '0.5px',
          }} icon='/icons/close' altIcon='close' background={'transparent'} method={()=>onClose(step)} />

            <Grid container spacing={2}  >
              {/* Left Card (Description & Pricing) */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: 'auto',
                    height: 'auto',
                    backgroundColor: '#222',
                    border: '1px',
                    color: '#fff',
                    padding: '42px',
                    
                    borderRadius: '10px',
                    [theme.breakpoints.down('sm')]: {
                      padding: '10px',
                      height: 'auto',
                    },
                  }}>
                  <Image width={64} height={31.59} alt='memvy' src='/icons/Union.svg' />
       
                  {/* {
  extraContent?.teaserContent && extraContent.teaserContent.map((item: any, index: any) => {
    // Check if the item contains an <h1> tag
    if (item.includes('<h1>')) {
      return <h4 key={index} dangerouslySetInnerHTML={{ __html: item }} />;
    }

    // Check if the item contains <ul> (unordered list) or <li> (list item)
    if (item.includes('<ul>') || item.includes('<li>')) {
      // Modify each <li> item to include an image and text in a flex container
      const modifiedItem = item.replace(/<li>(.*?)<\/li>/g, (match:any, p1:any) => {
        return `
          
            <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
              <img src='/icons/RedTick.svg' style='margin-right: 8px;' />
              ${p1}
            </Typography>
          
        `;
      });

      return <div key={index} dangerouslySetInnerHTML={{ __html: modifiedItem }} />;
    }

    // Default rendering for other content like <p> and text nodes
    return <div key={index} dangerouslySetInnerHTML={{ __html: item }} />;
  })
} */}

               {extraContent?.teaserContent &&  <> <Typography>
                    <Typography fontSize={'1.55rem'}>{extraContent.teaserContent[0] }</Typography>
                    <Typography fontSize={'1.2rem'} color={'#CCCCCC'} lineHeight={'20px'}>
                    {extraContent.teaserContent[1]}
                    </Typography>
                  </Typography>

                  <Typography fontSize={'0.95rem'} lineHeight={'21.6px'} marginTop={'10px'}>
                    {extraContent.teaserContent[2]}
                  </Typography>

                  <Typography  marginTop={'10px'}>
                    <Typography variant='body2'fontSize={'0.95rem'} display={'flex'} alignItems={'flex-start'}>
                      <img src='/icons/RedTick.svg'  style={{ marginRight: '8px' }} />
                      {extraContent.teaserContent[3]}
                    </Typography>

                    <Typography variant='body2'fontSize={'0.95rem'} display={'flex'} alignItems={'flex-start'}>
                      <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
                      {extraContent.teaserContent[4]}
                    </Typography>

                    <Typography variant='body2' fontSize={'0.95rem'} display={'flex'} alignItems={'flex-start'}>
                      <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
                      {extraContent.teaserContent[5]}
                    </Typography>
                  </Typography>

                  <Typography
                    sx={{
                      marginTop: { xs: '10px', sm: '35px' }, 
                    }}>
                    <hr style={{ border: '1px solid grey' }} />
                    <Typography
                      variant='h4'
                      sx={{
                        marginTop: { xs: '10px', sm: '35px' }, 
                      }}>
                      ${extraContent?.price}.00
                    </Typography>
                  </Typography></>}
                </Box>
              </Grid>

              {/* Right Card (Payment Form) */}
              <Grid item xs={12} md={6}>
                <IconBasedStepper callbackthecurrentStep={(stepp:any)=> callbackStepper(stepp)}/>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default PopupModal;
