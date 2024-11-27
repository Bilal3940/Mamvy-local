// components/SubscriptionPlanCard.tsx
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Button, Divider, Box } from '@mui/material';
import { palette } from '@/theme/constants';
import { color } from 'framer-motion';

interface Price {
  priceId: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: string;
}

interface SubscriptionPlanCardProps {
  price: Price;
  selectedPlan: string | null;
  onSelect: (priceId: string) => void;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({ price, selectedPlan, onSelect }) => {
  return (
<Card
  onClick={() => onSelect(price.priceId)}
  variant="outlined"
  sx={{
    marginBottom: '1rem',
    borderRadius: "0.625rem",
    width: '17.375rem',
    borderColor: selectedPlan === price.priceId 
    ? 'rgba(228, 222, 255, 0.2)' 
    : palette.dirtyWhite, // Fallback or default
    borderWidth: selectedPlan === price.priceId ? '2px' : '1px',
    cursor: 'pointer',
    background: selectedPlan === price.priceId
      ? ' rgba(19, 21, 68, 0.5)'
      : palette.dirtyWhite, // Use 'background' instead of 'backgroundColor'
      backdropFilter: 'blur(50%)', 
  }}
>

      <CardContent sx={{
         
      }} >
        <Box sx={
        {
          padding:'1rem  0rem',
          borderBottom:'1px solid',
          borderColor:'#CCCCCC',
        }
        } >
        <Typography variant="h6" fontSize={'1rem'} gutterBottom sx={{
          color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit'
        }} >
          {price.name}
        </Typography>
        <Typography sx={{
          color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit'
        }} >
  <Typography
    sx={{
      display: 'inline',
      color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit',
      fontSize: '2.25rem',
    }}
  >
    ${(price.amount / 100).toFixed(2)}
  </Typography>
  <Typography
    sx={{
      display: 'inline',
      justifyContent:'center',
      color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit',
      fontSize: '1rem',
    }}
  >
    / {price.interval}
  </Typography>
</Typography>
</Box>


        <Typography variant="body2" paragraph sx={{
          color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit'
        }} >
          {price.description}
        </Typography>
       
<Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Button
  sx={{

    bgcolor: '#0072CE',
    height: '3.18rem',
    width: '13.75rem',
    borderRadius: '12.5rem',
    '&:hover': {
      bgcolor: '#0072CE', // Ensure the background color stays the same
    },
  }}
>
 <Typography variant='button' >
  Choose {price.interval} Plan
  </Typography>
</Button>
</Box>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlanCard;
