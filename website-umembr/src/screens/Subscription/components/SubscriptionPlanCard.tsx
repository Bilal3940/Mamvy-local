import React from 'react';
import { Card, CardContent, Typography, Button, Box, useMediaQuery, Theme } from '@mui/material';
import { palette } from '@/theme/constants';

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
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
    <Card
      onClick={() => onSelect(price.priceId)}
      variant='outlined'
      sx={{
        marginBottom: '1rem',
        borderRadius: '0.625rem',
        width: '17.375rem',
        borderColor: palette.dirtyWhite,
        borderWidth: '1px',
        cursor: 'pointer',
        background:  palette.dirtyWhite,
        backdropFilter: 'blur(50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <CardContent
        sx={{
          flexGrow: 1,
        }}>
        <Box
          sx={{
            padding: '1rem 0rem',
            borderColor: '#CCCCCC',
          }}>
          <Typography
            variant='h6'
            fontSize='1rem'
            gutterBottom
            sx={{
              color:'inherit',
            }}>
            {price.name}
          </Typography>
          <Typography
            sx={{
              color: 'inherit',
            }}>
            <Typography
              sx={{
                display: 'inline',
                color: 'inherit',
                fontSize: '2.25rem',
              }}>
              {price.interval === '1 month'
                ? `$${(price.amount / 100).toFixed(2)}`
                : `$${(price.amount / 100 / (price.interval === '12 months' ? 12 : 36)).toFixed(2)}`}
            </Typography>
            <Typography
              sx={{
                display: 'inline',
                justifyContent: 'center',
                color:  'inherit',
                fontSize: '1rem',
              }}>
              / month
            </Typography>
            {price.interval !== '1 month' && (
              <Typography
                variant='subtitle1'
                sx={{
                  display: 'block',
                  color: 'inherit',
                  marginTop: '0.5rem',
                }}>
                (${(price.amount / 100).toFixed(2)} / {price.interval === '12 months' ? 'year' : '3 years'})
              </Typography>
            )}
          </Typography>
        </Box>

        <Typography
          variant='body2'
          paragraph
          sx={{
            color: 'inherit',
          }}>
          {price.description}
        </Typography>
      </CardContent>

      <Box display='flex' alignItems='center' justifyContent='center' sx={{ paddingBottom: '1rem' }}>
        <Button
          sx={{
            bgcolor: '#0072CE',
            height: '3.18rem',
            width: '13.75rem',
            borderRadius: '12.5rem',
            '&:hover': {
              bgcolor:'#0072CE',
            },
          }}>
          <Typography color='#fff' variant='button'>
            Choose plan
          </Typography>
        </Button>
      </Box>
    </Card>
  );
};

export default SubscriptionPlanCard;
