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
        borderColor: selectedPlan === price.priceId ? 'rgba(228, 222, 255, 0.2)' : palette.dirtyWhite,
        borderWidth: '1px',
        cursor: 'pointer',
        background: selectedPlan === price.priceId ? 'rgba(19, 21, 68, 0.5)' : palette.dirtyWhite,
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
              color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit',
            }}>
            {price.name}
          </Typography>
          <Typography
            sx={{
              color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit',
            }}>
            <Typography
              sx={{
                display: 'inline',
                color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit',
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
                color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit',
                fontSize: '1rem',
              }}>
              / month
            </Typography>
            {price.interval !== '1 month' && (
              <Typography
                variant='subtitle1'
                sx={{
                  display: 'block',
                  color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit',
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
            color: selectedPlan === price.priceId ? palette.dirtyWhite : 'inherit',
          }}>
          {price.description}
        </Typography>
      </CardContent>

      <Box display='flex' alignItems='center' justifyContent='center' sx={{ paddingBottom: '1rem' }}>
        <Button
          sx={{
            bgcolor: `${selectedPlan === price.priceId ? '#fff' : '#0072CE'}`,
            height: '3.18rem',
            width: '13.75rem',
            borderRadius: '12.5rem',
            '&:hover': {
              bgcolor: `${selectedPlan === price.priceId ? '#fff' : '#0072CE'}`,
            },
          }}>
          <Typography color={selectedPlan === price.priceId ? '#0072CE' : '#fff'} variant='button'>
            Choose plan
          </Typography>
        </Button>
      </Box>
    </Card>
  );
};

export default SubscriptionPlanCard;
