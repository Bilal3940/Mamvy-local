import React, { useEffect, useState } from 'react';

import { useMediaQuery, Theme, Box } from '@mui/material';
import { Profile } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { settingsView, showActualSection } from '@/store/actions';

import Image from 'next/image';

import { intermitenceSelector, authSelector } from '@/store/selectors';
import { UseFirstRender } from '@/hooks';

export const Settings = () => {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { separation } = useSelector(intermitenceSelector);

  const showScreen = () => {
    switch (step) {
      default:
        return <Profile />;
    }
  };

  const setActualSection = (num: number, section: string) => {
    setStep(num);
    dispatch(showActualSection(section));
  };

  useEffect(() => {
    dispatch(showActualSection('my_profile'));
  }, []);

  UseFirstRender(() => {
    if (user) {
      dispatch(settingsView(user.id));
    }
  }, [dispatch]);

  // const tabs = [
  //   {
  //     label: 'general_information',
  //     action: () => setActualSection(1, 'my_profile'),
  //   },
  // ];

  return (
    <Box
      display={'flex'}
      paddingBottom={'1rem'}
      width={'98%'}
      margin={'0 auto'}
      height={'100%'}
      paddingTop={separation}
      justifyContent={'flex-start'}
      flexDirection={!isMobile ? 'row' : 'column'}
      alignItems={'flex-start'}
      overflow={!isMobile ? 'auto' : 'hidden'}>
      <Image
        src={isMobile ? '/images/thread_mobile.svg' : '/images/thread.svg'}
        style={{
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          margin: 'auto',
          zIndex: 0,
        }}
        alt='thread'
        fill
        priority
        sizes='100%'
        quality={80}
      />

      {showScreen()}
    </Box>
  );
};
