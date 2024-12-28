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
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}>
        <Box
          padding={isMobile ? '1rem' : '1.5rem'}
          borderRadius={'1.25rem'}
          border={`0.063rem solid ${palette.cardBorder}`}
          sx={{
            backgroundColor: 'rgba(34, 42, 103, 0.5)',
            backdropFilter: 'blur(1.5625rem)',
            width: isMobile ? '100%' : '82%',
            minWidth: '60%',
            height: isMobile ? '100%' : 'auto',
            overflow: 'auto',
            position: 'relative',
          }}>
          {/* Close Button */}
          <Button
            onClick={handleClosePopup}
            sx={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 10,
              backgroundColor: palette?.cardBackground,
              border: `0.063rem solid ${palette?.cardBorder}`,
              color: palette?.dirtyWhite,
            }}>
            ✕
          </Button>

          {/* Modal Content */}
          {step === 1 && (
            <>
              <Typography variant='h6' fontSize={'1rem'} align='center' mt={4} component='h2' gutterBottom>
                Welcome to Memvy!
              </Typography>
              <SubscriptionContainer handleNext={goToNextStep} />
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
