import React from 'react';
import { Theme, Typography, useMediaQuery,  } from '@mui/material';

const SubscriptionInfo: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
    <> 
      <Typography variant="h1" lineHeight={!isMobile ? '5.125rem' : '2.125rem'}  fontSize={!isMobile ?'5rem' : '2rem'}  align='center' gutterBottom >
        Select your Subscription Plan
      </Typography>
    </>
  );
};

export default SubscriptionInfo;
