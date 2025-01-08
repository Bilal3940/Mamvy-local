import { palette } from '@/theme/constants';
import {
  Box,
  Button,
  Typography,
  Grid,
  useMediaQuery,
  Divider,
  Card,
  CardMedia,
  Theme,
  CardContent,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

import Modal from '@mui/material/Modal';
import { fallbackRestUrl } from '@/utils';
import { useRouter } from 'next/router';
import { ManageSubscriptionProps } from './types';
import { MuiTextField2 } from '@/components';
import { fetchLatestInvoice, openSubscriptionModal, updatePaymentMethod } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, subscriptionSelector } from '@/store/selectors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  p: 4,
};
export const ManageSubscription: React.FC<ManageSubscriptionProps> = ({ paymentMethodResponse }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const route = useRouter();
  const { user } = useSelector(authSelector);
  const { latestInvoice } = useSelector(subscriptionSelector);
  const dispatch = useDispatch();
  const [expiryMonth, setExpiryMonth] = useState(String(paymentMethodResponse?.paymentMethod?.card?.exp_month) || '');
  const [expiryYear, setExpiryYear] = useState(String(paymentMethodResponse?.paymentMethod?.card?.exp_year) || '');

  const isValidExpiryMonth = /^\d{2}$/.test(expiryMonth) && parseInt(expiryMonth) >= 1 && parseInt(expiryMonth) <= 12;
  const isValidExpiryYear = /^\d{4}$/.test(expiryYear) && parseInt(expiryYear) >= 2024;

  const isButtonDisabled = !(isValidExpiryMonth && isValidExpiryYear);

  const updatePaymentMethodFunc = async () => {
    const data = {
      paymentMethodId: paymentMethodResponse?.paymentMethod.id,
      updates: {
        billing_details: {},
        card: {
          exp_month: expiryMonth,
          exp_year: expiryYear,
        },
      },
    };
    dispatch(updatePaymentMethod(data));
    setOpen(false);
  };
  const handleSubscriptionCancel = () => {
    dispatch(openSubscriptionModal());
  };

  const handleDownloadInvoice = (userId: number) => {
    const onClick = async () => {
      
      dispatch(fetchLatestInvoice({ userId: userId }));
      if (latestInvoice?.invoicePdfUrl) {
        
        const link = document.createElement('a');
        link.href = latestInvoice?.invoicePdfUrl;
        link.target = '_blank'; 
        link.download = 'LatestInvoice.pdf'; 
        link.click();
      } else {
        console.error('Failed to fetch the latest invoice.');
      }
    };

    return onClick;
  };
  const endDate = new Date(paymentMethodResponse?.subscriptionDetails?.endDate || '');
  const renewDate = endDate.toLocaleDateString('en-GB');
  return (
    <>
      <Box display={'flex'} mt={1} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'flex-start'}>
        <Grid>
          <Typography fontSize={isMobile ? '1.5rem' : '2.30rem'} variant='body1' color={palette?.black}>
            Manage your
          </Typography>
          <Typography fontSize={isMobile ? '1.5rem' : '2.30rem'} variant='body1' color={palette?.black}>
            subscriptions
          </Typography>
        </Grid>
      </Box>

      <Divider sx={{ border: `0.063rem solid ${palette.divider}`, margin: '0.4rem 0' }} />

      {/* Section 1: Storage */}
      <Box mb={0.6}>
        {paymentMethodResponse?.success===true? <Box my={2} mb={4}>
          <Typography fontSize={'1.4rem'} variant='body2' color={'#131544'}>
            Payment Method
          </Typography>
          <Typography fontSize={'0.87rem'} variant='body2' color={'#131544'}>
            Your next bill is for ${paymentMethodResponse?.subscriptionDetails.nextInvoiceAmount} USD on {renewDate}
          </Typography>
       {paymentMethodResponse.paymentMethod.type ==='card' && <> 
       
         <Card
            sx={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            }}>
            <CardMedia
              component='img'
              sx={{
                width: 67,
                height: 'auto',
                objectFit: 'contain',
              }}
              image={`/images/${paymentMethodResponse?.paymentMethod.card.brand.toLowerCase()}.svg`}
              alt={`${paymentMethodResponse?.paymentMethod.card.brand} logo`}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant='subtitle1' component='div' sx={{ color: '#131544' }}>
                  {`${paymentMethodResponse?.paymentMethod.card.brand.charAt(0).toUpperCase()}` +
                    `${paymentMethodResponse?.paymentMethod.card.brand.slice(1)}`}
                  card ending in {paymentMethodResponse?.paymentMethod.card.last4}
                </Typography>
                <Typography variant='subtitle1' component='div' sx={{ color: '#131544' }}>
                  Expires {paymentMethodResponse?.paymentMethod.card.exp_month}/
                  {paymentMethodResponse?.paymentMethod.card.exp_year}
                </Typography>
              </CardContent>
            </Box>
          </Card>

          <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: 'white',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
              },
            }}
            variant='contained'
            style={{ borderRadius: '19px', border: `1px solid ${palette.cardBorder}` }}>
            <Typography variant={'button'} color={`#7A859B`} mx={1}>
              Update Payment Method
            </Typography>
          </Button></>
        } 
        {paymentMethodResponse.paymentMethod.type==='link' && <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}>
          <CardMedia
            component='img'
            sx={{
              width: 67,
              height: 'auto',
              objectFit: 'contain',
            }}
            image={`/images/${paymentMethodResponse?.paymentMethod.type.toLowerCase()}.svg`}
            alt={`${paymentMethodResponse?.paymentMethod.type} logo`}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant='subtitle1' component='div' sx={{ color: '#131544' }}>
                {`${paymentMethodResponse?.paymentMethod.type.charAt(0).toUpperCase()}` +
                  `${paymentMethodResponse?.paymentMethod.type.slice(1)} `}
                account: {paymentMethodResponse?.paymentMethod.link.email}
              </Typography>

            </CardContent>
          </Box>
        </Card>}
        {paymentMethodResponse.paymentMethod.type ==='google_pay'  && <> 
       
       <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}>
          <CardMedia
            component='img'
            sx={{
              width: 67,
              height: 'auto',
              objectFit: 'contain',
            }}
            image={`/images/${paymentMethodResponse?.paymentMethod?.type.toLowerCase()}.svg`}
            alt={`${paymentMethodResponse?.paymentMethod?.type} logo`}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant='subtitle1' component='div' sx={{ color: '#131544' }}>
                {`${paymentMethodResponse?.paymentMethod?.google_pay?.brand.charAt(0).toUpperCase()}` +
                  `${paymentMethodResponse?.paymentMethod?.google_pay?.brand.slice(1)}`}
                card ending in {paymentMethodResponse?.paymentMethod?.apple_pay?.last4}
              </Typography>
              
            </CardContent>
          </Box>
        </Card>

        </>
      } 
        {paymentMethodResponse.paymentMethod.type ==='apple_pay'  && <> 
       
       <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}>
          <CardMedia
            component='img'
            sx={{
              width: 67,
              height: 'auto',
              objectFit: 'contain',
            }}
            image={`/images/${paymentMethodResponse?.paymentMethod?.type.toLowerCase()}.svg`}
            alt={`${paymentMethodResponse?.paymentMethod?.type} logo`}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant='subtitle1' component='div' sx={{ color: '#131544' }}>
                {`${paymentMethodResponse?.paymentMethod.apple_pay.brand.charAt(0).toUpperCase()}` +
                  `${paymentMethodResponse?.paymentMethod.apple_pay.brand.slice(1)}`}
                card ending in {paymentMethodResponse?.paymentMethod.apple_pay.last4}
              </Typography>
              
            </CardContent>
          </Box>
        </Card>

        </>
      } 
        </Box>
        :
        <Box my={2} mb={4}>
        <Typography fontSize={'1.4rem'} variant='body2' color={'#131544'}>
          Free Subscription
        </Typography>

      </Box>
        }
        <Divider sx={{ border: `0.063rem solid ${palette.divider}`, margin: '0.4rem 0' }} />
      </Box>

      {/* Section 2: Storage */}
      <Box mb={0.6}>
        <Box my={2} mb={4}>
          <Typography mb={1} fontSize={'1.4rem'} variant='body2' color={'#131544'}>
            Payment History
          </Typography>

          <Button
            component={Button}
            
            onClick={handleDownloadInvoice(user?.id)} 
            sx={{
              backgroundColor: 'white',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
              },
            }}
            variant='contained'
            style={{ borderRadius: '19px', border: `1px solid ${palette.cardBorder}` }}>
            <Typography variant={'button'} color={`#7A859B`} mx={1}>
              Download Latest Invoice
            </Typography>
          </Button>
        </Box>
        <Divider sx={{ border: `0.063rem solid ${palette.divider}`, margin: '0.4rem 0' }} />
      </Box>

      {/* Section 3: Storage */}
      <Box mb={0.6}>
        <Box my={2} mb={4}>
          <Typography fontSize={'0.87rem'} variant='body2' color={'#131544'}>
            By canceling your Memvy membership, your subscription will remain active until the end of your current
            billing cycle. After that, you will no longer be charged, and your account will be downgraded to a free
            plan. Your memories will remain securely stored, but access to premium features will be removed. You can
            always reactivate your membership at any time. If you’re ready to proceed, click the button below to cancel
            your membership.
          </Typography>

          <Button
            sx={{
              marginTop: '0.6rem',
              backgroundColor: 'white',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
              },
            }}
            variant='contained'
            onClick={handleSubscriptionCancel}
            style={{ borderRadius: '19px', border: `1px solid ${palette.cardBorder}` }}>
            <Typography variant={'button'} color={`#7A859B`} mx={1}>
              Cancel Membership
            </Typography>
          </Button>
        </Box>
        <Divider sx={{ border: `0.063rem solid ${palette.divider}`, margin: '0.4rem 0' }} />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          bgcolor={'rgba(255, 255, 255, 0.9)'}
          borderRadius={'0.6rem'}
          sx={{ ...style, backdropFilter: 'blur(1.5625rem)', outline: 'none' }}
          border={isMobile ? 'none' : `0.063rem solid ${palette.cardBorder}`}>
          <form onSubmit={updatePaymentMethod}>
            <Grid container spacing={isMobile ? 0 : 0} width={'100%'} marginBottom={'0.5rem'} rowSpacing={2}>
              {/* Card Number (Disabled) */}
              <Grid item xs={isMobile ? 12 : 12}>
                <MuiTextField2
                  id='cardNumber'
                  variant='standard'
                  name='cardNumber'
                  fullWidth
                  disabled={true}
                  autoComplete='off'
                  placeholder={`*************** ${paymentMethodResponse?.paymentMethod?.card?.last4|| '****'}`}
                  label='Card Number'
                  isDarkTheme={false}
                  value={`*************** ${paymentMethodResponse?.paymentMethod?.card?.last4||'****'}`}
                  helperText='Card number is hidden for security'
                  error={false}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                      color: palette.inputLabelLight,
                      top: '-7px',
                      '&.Mui-error': { color: palette.error },
                      '&.Mui-focused': { color: palette.inputLabelLight },
                      '&.Mui-error.Mui-focused': { color: palette.error },
                      '&.MuiInputLabel-shrink': { top: '0px' },
                    },
                    '& .MuiInputBase-root:after': {
                      borderBottom: `1px solid ${palette?.inputLabelLight}`,
                    },
                  }}
                />
              </Grid>

              {/* Expiry Month */}
              <Grid item xs={isMobile ? 12 : 12}>
                <MuiTextField2
                  id='expiryMonth'
                  variant='standard'
                  name='expiryMonth'
                  fullWidth
                  disabled={false}
                  autoComplete='off'
                  placeholder={`${paymentMethodResponse?.paymentMethod?.card?.exp_month}`}
                  label='Expiry Month'
                  isDarkTheme={false}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                      color: palette.inputLabelLight,
                      top: '-7px',
                      '&.Mui-error': { color: palette.error },
                      '&.Mui-focused': { color: palette.inputLabelLight },
                      '&.Mui-error.Mui-focused': { color: palette.error },
                      '&.MuiInputLabel-shrink': { top: '0px' },
                    },
                    '& .MuiInputBase-root:after': {
                      borderBottom: `1px solid ${palette?.inputLabelLight}`,
                    },
                  }}
                  value={expiryMonth}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    setExpiryMonth(target.value);
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/\D/g, '').slice(0, 2);
                  }}
                  helperText='Enter a valid month (01-12)'
                  error={!isValidExpiryMonth}
                />
              </Grid>

              {/* Expiry Year */}
              <Grid item xs={isMobile ? 12 : 12}>
                <MuiTextField2
                  id='expiryYear'
                  variant='standard'
                  name='expiryYear'
                  fullWidth
                  disabled={false}
                  autoComplete='off'
                  placeholder='YY'
                  label='Expiry Year'
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                      color: palette.inputLabelLight,
                      top: '-7px',
                      '&.Mui-error': { color: palette.error },
                      '&.Mui-focused': { color: palette.inputLabelLight },
                      '&.Mui-error.Mui-focused': { color: palette.error },
                      '&.MuiInputLabel-shrink': { top: '0px' },
                    },
                    '& .MuiInputBase-root:after': {
                      borderBottom: `1px solid ${palette?.inputLabelLight}`,
                    },
                  }}
                  isDarkTheme={false}
                  value={expiryYear}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    setExpiryYear(target.value);
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/\D/g, '').slice(0, 4);
                  }}
                  helperText='Enter a valid year (eg. 2024)'
                  error={!isValidExpiryYear}
                />
              </Grid>

              {/* Update Payment Button */}
              <Grid item xs={isMobile ? 12 : 12}>
                <Button
                  onSubmit={updatePaymentMethodFunc}
                  onClick={updatePaymentMethodFunc}
                  sx={{
                    backgroundColor: palette?.primary,
                    boxShadow: 'none',
                    color: palette?.dirtyWhite,
                    '&:hover': {
                      boxShadow: 'none',
                    },
                  }}
                  variant='contained'
                  disabled={isButtonDisabled}>
                  <Typography variant='button' color={palette?.white} mx={1}>
                    Update Payment Method
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};
