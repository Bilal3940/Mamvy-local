import React from 'react';
import { Box, Theme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, intermitenceSelector, memorySelector, storySelector } from '@/store/selectors';
import { MemoriesForm, TypeMemory } from './components';
import { UseFirstRender } from '@/hooks';
import { useRouter } from 'next/router';
import { actualStory, createMemoryViewG, getMemories, showActualSection } from '@/store/actions';
import Image from 'next/image';

export const CreateMemory = () => {
  const dispatch = useDispatch();
  const createData = useSelector(memorySelector);
  const { story } = useSelector(storySelector);
  const { separation } = useSelector(intermitenceSelector);
  const { user } = useSelector(authSelector);
  const { createMemoryStep } = createData;
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const showScreen = () => {
    switch (createMemoryStep) {
      case 0:
        return <TypeMemory />;
      case 1:
        return <MemoriesForm />;
      default:
        return <TypeMemory />;
    }
  };

  UseFirstRender(() => {
    if (!story?.id) dispatch(actualStory(router.query?.id as string));
  }, [router?.query?.id]);

  UseFirstRender(() => {
    if (user) dispatch(createMemoryViewG(user?.id));
  }, [dispatch]);

  UseFirstRender(() => {
    if (story?.id) {
      dispatch(showActualSection(story?.title));
      dispatch(getMemories(story?.id));
    }
  }, [story]);

  return (
    <Box
      display={'flex'}
      paddingBottom={'1rem'}
      width={'100%'}
      paddingLeft={'1rem'}
      paddingRight={'1rem'}
      justifyContent={'space-between'}
      flexDirection={'column'}
      height={isMobile ? '100vh' : '100%'}
      paddingTop={separation}
      alignItems={'center'}
      sx={{ overflowY: 'auto' }}>
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
