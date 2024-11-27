// components/SubscriptionInfo.tsx
import React from 'react';
import { Typography, List, ListItem } from '@mui/material';

interface SubscriptionInfoProps {
  title: string;
  description: string;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({ title, description }) => {
  return (
    <> 
      <Typography variant="h1" lineHeight={'5.125rem'}  fontSize={'5rem'}  align='center' gutterBottom>
        Select your Subscription Plan
      </Typography>
    </>
  );
};

export default SubscriptionInfo;
