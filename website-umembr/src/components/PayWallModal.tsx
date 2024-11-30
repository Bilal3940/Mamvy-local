import React from 'react';
import { Modal, Box, Paper, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import IconBasedStepper from '@/components/StepperPaywall';

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ open, onClose }) => {
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
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 1,
                right: 8,
                color: '#fff',
                
              }}>
              <CloseIcon />
            </IconButton>

            <Grid container spacing={2}>
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
                  <img src='/icons/Union.svg' />

                  <Typography>
                    <Typography fontSize={'1.5rem'}>Welcome to Memvy</Typography>
                    <Typography fontSize={'1.1rem'} color={'#CCCCCC'} lineHeight={'20px'}>
                      The Future of Enjoying the Past
                    </Typography>
                  </Typography>

                  <Typography fontSize={'1.125rem'} lineHeight={'21.6px'} marginTop={'10px'}>
                    We’ve partnered with the SEC to make the Championship Game truly unforgettable. Gain exclusive
                    access to a curated Memvy story for only $5.
                  </Typography>

                  <Typography gap={'16px'} marginTop={'10px'}>
                    <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
                      <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
                      Exclusive content from name, name, name and many more
                    </Typography>

                    <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
                      <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
                      Immerse yourself in stories, video, photo, and audio collections
                    </Typography>

                    <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
                      <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
                      Experience the excitement of gameday again and again
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
                      $5.00
                    </Typography>
                  </Typography>
                </Box>
              </Grid>

              {/* Right Card (Payment Form) */}
              <Grid item xs={12} md={6}>
                <IconBasedStepper />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default PopupModal;
