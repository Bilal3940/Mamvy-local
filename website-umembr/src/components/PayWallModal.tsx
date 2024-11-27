import React from 'react';
import { Modal, Box, Paper, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { theme } from '@/theme';
import { ThemeProvider} from '@mui/material/styles';
import IconBasedStepper from "@/components/StepperPaywall";


interface PopupModalProps {
  open: boolean;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ open, onClose }) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose} // Close the modal when clicking outside
        disableAutoFocus // Prevents auto-focus on the first element
        disableEnforceFocus // Optional: Allows focus to move outside the modal if needed
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        closeAfterTransition // Smooth transition
        keepMounted // Improves performance by keeping the modal in the DOM
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
          onClick={onClose}>
          <Paper
            sx={{
              width: '80%',
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
                width: '95%', // Set width to 90% on small screens
                padding: '5px',
                paddingTop:"45px",
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
                display: { xs: 'block', sm: 'none' },
              }}
            >
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
                    // gap:"16px",
                    borderRadius: '10px',
                    [theme.breakpoints.down('sm')]: {
                      padding: '10px',
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
                      marginTop: { xs: '10px', sm: '35px' }, // 10px for mobile, 35px for larger screens
                    }}>
                    <hr style={{ border: '1px solid grey' }} />
                    <Typography
                      variant='h4'
                      sx={{
                        marginTop: { xs: '10px', sm: '35px' }, // Adjust margin for the inner Typography as well
                      }}>
                      $5.00
                    </Typography>
                  </Typography>
                </Box>
              </Grid>

              {/* Right Card (Payment Form) */}
              <Grid 
              item xs={12} md={6}>
              <IconBasedStepper />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default PopupModal;
