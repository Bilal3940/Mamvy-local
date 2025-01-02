import { createOrder, createStories, setPendingStory } from '@/store/actions';
import { authSelector } from '@/store/selectors';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, useMediaQuery, Theme } from '@mui/material';
import { palette } from '@/theme/constants';
import Image from 'next/image';
import { finalPayload } from '@/utils';

const ThankYou: React.FC = () => {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
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
    // Uncomment when creating an order
    if (sessionId) {
      dispatch(createOrder({ sessionId: sessionId, userId: user?.id }));
    }
  }, [sessionId]);

  const handleBackHome = async()=>{
    let pendStory = null;
          if (typeof window !== 'undefined') {
            const pstory = localStorage.getItem('pendingStory');
            pendStory = pstory ? JSON.parse(pstory) : null;
          }
          if(pendStory !== null) {

          
          dispatch(createStories(pendStory));
          localStorage.removeItem("pendingStory")
          router.push('/app/home')
        }
        else{
          router.push('/app/home')
        }
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Optional: Set a background color for the full page
    >
      <Box
        width={isMobile ? '90%' : '38.1875rem'}
        padding={isMobile ? '1rem' : '1.5rem'}
        borderRadius="1.25rem"


        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
         <Image src={`/images/logo1.svg`} alt={'logo'} width={180} height={87.5} quality={100} />
        <Typography variant="h2"  fontWeight="400" >
          Thank You!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackHome}
          sx={{ marginTop: 3 }}
        >
          <Typography variant="button">Back to Home</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ThankYou;
