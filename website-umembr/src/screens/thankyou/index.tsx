import { createOrder, createStories } from '@/store/actions';
import { authSelector } from '@/store/selectors';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, useMediaQuery, Theme } from '@mui/material';
import Image from 'next/image';


const ThankYou: React.FC = () => {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [path, setPath] = useState<string | null>(null);
  const { user } = useSelector(authSelector);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.isReady) {
      const { session_id } = router.query;
      if (typeof session_id === 'string') {
        setSessionId(session_id);
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    
    if (sessionId) {
      dispatch(createOrder({ sessionId, userId: user?.id }));
    }
    const storedPath = localStorage.getItem('router_history');
    if (storedPath) {
      setPath(storedPath);
    }
  }, [sessionId]);

  const handleBackHome = () => {
    let pendStory = null;

    if (typeof window !== 'undefined') {
      const pstory = localStorage.getItem('pendingStory');
      pendStory = pstory ? JSON.parse(pstory) : null;
    }
  if (path == '/app/home' && pendStory !== null && pendStory?.user_id === user?.id) {
      dispatch(createStories(pendStory));
      localStorage.removeItem('pendingStory');
      router.push('/app/home');
    } else if (path) {
      router.push(path);
    } else {
      router.push('/app/home');
    }
  };



  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'>
      <Box
        width={isMobile ? '90%' : '38.1875rem'}
        padding={isMobile ? '1rem' : '1.5rem'}
        borderRadius='1.25rem'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='space-between'>
        <Image src={`/images/logo1.svg`} alt={'logo'} width={180} height={87.5} quality={100} />
        <Typography variant='h2' fontWeight='400'>
          Thank You!
        </Typography>
        <Button variant='contained' color='primary' onClick={handleBackHome} sx={{ marginTop: 3 }}>
          <Typography variant='button'>Continue</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ThankYou;
