import React from 'react';
import { palette } from '@/theme/constants';
import Image from 'next/image';
import { useMediaQuery, Theme, Box, Button, Typography, Link } from '@mui/material';
import { Forgot, ChangePassword } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { forgotSelector } from '@/store/selectors';
import { UseFirstRender } from '@/hooks';
import { resetForgotPassword } from '@/store/actions';
import ChevronLeftIconComponent from '../../../public/icons/components/chevron-left';

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { step } = useSelector(forgotSelector);

  const showScreen = () => {
    switch (step) {
      case 1:
        return <Forgot />;

      case 2:
        return <ChangePassword />;

      default:
        return <Forgot />;
    }
  };

  UseFirstRender(() => {
    dispatch(resetForgotPassword());
  }, []);

  return (
    <Box
      display={'flex'}
      height={'100vh'}
      flexDirection={'column'}
      width={'100%'}
      zIndex={1}
      position={'relative'}
      padding={'0 1rem'}
      justifyContent={'center'}
      alignItems={'center'}>
      <Image
        src={isMobile ? '/images/thread_mobile.svg' : '/images/thread.svg'}
        style={{
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          margin: 'auto',
          zIndex: -1,
        }}
        alt='background'
        fill
        priority
        sizes='100%'
        quality={80}
      />
      <Box margin={'1rem 0'}>
        <Button
          component={Link}
          href={'/app/login'}
          startIcon={<ChevronLeftIconComponent color={'#B3BED4'} />}
          variant='outlined'
          style={{ borderRadius: '19px', border: `1px solid ${palette.cardBorder}` }}>
          <Typography variant={'button'} color={`#B3BED4`}>
            Back
          </Typography>
        </Button>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        width={'100%'}
        maxWidth={'29.5rem'}
        borderRadius={'0.5rem'}
        bgcolor={palette.cardBackground}
        border={`0.063rem solid ${palette.cardBorder}`}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}
        padding={isMobile ? '1rem' : '2rem'}
        boxShadow={
          '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
        }>
        <Box marginBottom={'1rem'} position={'relative'}>
          <Image
            src={`/images/stacked-white.svg`}
            alt={'logo'}
            width={isMobile ? 99 : 120}
            height={isMobile ? 94 : 114}
            quality={80}
          />
        </Box>
        <Box width={'100%'}>{showScreen()}</Box>
      </Box>
    </Box>
  );
};
