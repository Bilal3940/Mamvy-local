import React, { useState } from 'react';
import { Box, Container, Modal, Button, Typography, useMediaQuery, Theme } from '@mui/material';
import { Checkout } from '../Checkout';
import SubscriptionContainer from '../Subscription';
import { MuiIconButton } from '@/components';
import { palette } from '@/theme/constants';

interface SubscriptionPopupProps {
  open: boolean;
  onClose: () => void;
}

export const SubscriptionPopup: React.FC<SubscriptionPopupProps> = ({ open, onClose }) => {
  const [step, setStep] = useState(1);

  const goToNextStep = () => setStep(2);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border:'none',
          height: '100%',
          width:'995px',
          overflow: 'hidden',
        }}>
        <Box
                padding={isMobile ? '1rem' : '1.5rem'}
                borderRadius={'1.25rem'}
                    // bgcolor={}
                    border={`0.063rem solid ${palette.cardBorder}`}
          sx={{
            backgroundColor:'rgba(34, 42, 103, 0.5)',
            backdropFilter: 'blur(1.5625rem)',
            width: '100%',
            padding:'20px',
            overflow: 'hidden',
          }}>
          {step === 1 && (
            <>
              <Typography variant='h6' fontSize={'1rem'} align='center'  mt={4} component='h2' gutterBottom>
                Welcome to Memvy!
              </Typography>
              <SubscriptionContainer handleNext={goToNextStep} />
              {/* <Box mt={2} display='flex' justifyContent='space-between'>
                <Button onClick={handleClose} color='error' variant='outlined'>
                  <Typography variant='button'> Cancel </Typography>
                </Button>
                <Button onClick={goToNextStep} variant='contained'>
                  <Typography variant='button'> Proceed to Payment </Typography>
                </Button>
              </Box> */}
            </>
          )}
          {step === 2 && (
            <>
              <Box mt={2} display='flex' justifyContent='flex-start'>
                <Button
                  onClick={() => {
                    setStep(1);
                  }}
                  color='error'>
                  <MuiIconButton
                    icon='/icons/left-arrow'
                    background={palette?.cardBackground}
                    borderColor={palette?.cardBorder}
                    iconHeight={16}
                    iconWidth={16}
                    width={32}
                    height={32}
                    altIcon='left-arrow'
                  />
                </Button>
              </Box>
              <Checkout handleClose={handleClose} />
            </>
          )}
        </Box>
      </Container>
    </Modal>
  );
};
