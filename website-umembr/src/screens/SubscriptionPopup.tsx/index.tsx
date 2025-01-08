import React, { useState } from 'react';
import { Box, Container, Modal, Button, Typography, useMediaQuery, Theme } from '@mui/material';
import { Checkout } from '../Checkout';
import SubscriptionContainer from '../Subscription';
import { MuiIconButton } from '@/components';
import { palette } from '@/theme/constants';
import { useDispatch, useSelector } from 'react-redux';
import { closeSubscriptionPopup } from '@/store/actions';

export const SubscriptionPopup: React.FC = () => {
  const dispatch = useDispatch();

  const { open } = useSelector((state: any) => state.intermitence.subscriptionPopup);

  const [step, setStep] = useState(1);

  const goToNextStep = () => setStep(2);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const handleClose = () => {
    setStep(1);
  };
  const handleClosePopup = () => {
    dispatch(closeSubscriptionPopup());
  };

  return (
    <Modal open={open} onClose={handleClosePopup}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          maxHeight:'100%',
          width: '100%',
          overflow: 'hidden',
        }}>

        {/* Modal Content */}
        {step === 1 && (
          <>
            <Box
              padding={isMobile ? '1rem' : '1.5rem'}
              borderRadius={'1.25rem'}
              border={`0.063rem solid ${palette.cardBorder}`}
              sx={{
                backgroundColor: 'rgba(34, 42, 103, 0.5)',
                backdropFilter: 'blur(1.5625rem)',
                width: isMobile ? '100%' : '82%',
                margin: '1rem',
                minWidth: '60%',
                height: '98vh',
                overflow: 'auto',
                position: 'relative',
              }}>
              <Typography variant='h6' fontSize={'1rem'} align='center' mt={4} component='h2' gutterBottom>
                Welcome to Memvy!
              </Typography>
              <SubscriptionContainer handleNext={goToNextStep} />
            </Box>
          </>
        )}
{step === 2 && (
  <Box
    height={'100%'}
    sx={{
      backdropFilter: 'blur(1.5625rem)',
      height: isMobile ? '100%' : '100%',
      borderRadius: '1rem',
      overflow: 'auto',
      position: 'relative',
    }}
    maxHeight={'60%'}
    display={'flex'}
    flexDirection={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    width={'100%'}
  >

    <Box 
      display={'flex'} 
      justifyContent={'space-between'} 
      alignItems={'center'} 
      width={'100%'} 

    >

      {step === 2 && (
        <Button
          onClick={() => {
            setStep(1);
          }}
          color="error"
        >
          <MuiIconButton
            icon="/icons/left-arrow"
            background={palette?.cardBackground}
            borderColor={palette?.cardBorder}
            iconHeight={16}
            iconWidth={16}
            width={32}
            height={32}
            altIcon="left-arrow"
          />
        </Button>
      )}

      {/* Close Button */}
      <Button
        onClick={handleClosePopup}
          color="error"
        >
          <MuiIconButton
            icon="/icons/close"
            background={palette?.cardBackground}
            borderColor={palette?.cardBorder}
            iconHeight={14}
            iconWidth={14}
            width={32}
            height={32}
            altIcon="close"
          />
        </Button>
    </Box>


    <Checkout handleClose={handleClose} />
  </Box>
)}

      </Container>
    </Modal>
  );
};
