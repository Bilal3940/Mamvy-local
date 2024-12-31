import { palette } from '@/theme/constants'
import { Box, Button, Typography, Grid, useMediaQuery, Divider, Card, CardMedia, Theme, CardContent } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import ChevronLeftIconComponent from '../../../public/icons/components/chevron-left'


import Modal from '@mui/material/Modal';
import MuiTextField2 from '../TextField2'
import { fallbackRestUrl } from '@/utils'
import { useRouter } from 'next/router'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color:'black',
  bgcolor:'rgba(255, 255, 255, 0.9)',
width:'400px',
  borderRadius: '12px',  
  boxShadow: 24,
  p: 4,
};
interface PaymentMethodResponse {
    result: {
      success: boolean;
      subscriptionDetails: SubscriptionDetails;
      paymentMethod: PaymentMethod;
      
      message: string;
    };
  }
 interface SubscriptionDetails {
			status: string;
			startDate: string;
			endDate: string;
			nextInvoiceAmount: string;
		}
  interface PaymentMethod {
    id: string;
    object: string;
    allow_redisplay: string;
    billing_details: BillingDetails;
    card: Card;
    created: number;
    customer: string;
    livemode: boolean;
    metadata: Record<string, unknown>;
    type: string;
  }
  
  interface BillingDetails {
    address: Address;
    email: string;
    name: string;
    phone: string | null;
  }
  
  interface Address {
    city: string | null;
    country: string;
    line1: string | null;
    line2: string | null;
    postal_code: string;
    state: string | null;
  }
  
  interface Card {
    brand: string;
    checks: CardChecks;
    country: string;
    display_brand: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: string | null;
    last4: string;
    networks: CardNetworks;
    regulated_status: string;
    three_d_secure_usage: ThreeDSecureUsage;
    wallet: string | null;
  }
  
  interface CardChecks {
    address_line1_check: string | null;
    address_postal_code_check: string;
    cvc_check: string;
  }
  
  interface CardNetworks {
    available: string[];
    preferred: string | null;
  }
  
  interface ThreeDSecureUsage {
    supported: boolean;
  }
  interface ManageSubscriptionProps {
    paymentMethodResponse: PaymentMethodResponse| undefined;
  }
  export const ManageSubscription: React.FC<ManageSubscriptionProps> = ({ paymentMethodResponse }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const route = useRouter();
    const [expiryMonth, setExpiryMonth] = useState(String(paymentMethodResponse?.result.paymentMethod.card.exp_month)||'');
const [expiryYear, setExpiryYear] = useState(String(paymentMethodResponse?.result.paymentMethod.card.exp_year)||'');

const isValidExpiryMonth = /^\d{2}$/.test(expiryMonth) && parseInt(expiryMonth) >= 1 && parseInt(expiryMonth) <= 12;
const isValidExpiryYear = /^\d{4}$/.test(expiryYear) && parseInt(expiryYear) >= 2024; // Assuming expiry year should be >= 23 (for the year 2023)

const isButtonDisabled = !(isValidExpiryMonth && isValidExpiryYear);

const updatePaymentMethod = async () => {
    const url = `${fallbackRestUrl}/stripe/update-payment-method`;
  
    const data = {
      paymentMethodId: paymentMethodResponse?.result.paymentMethod.id,
      updates: {
        billing_details: {
         
        },
        card: {
          exp_month: expiryMonth,
          exp_year: expiryYear,
        },
      },
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'insomnia/10.3.0',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        route.reload();
        console.log('Payment method updated successfully', result);
      } else {
        console.error('Error updating payment method:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch call:', error);
    }
  };
    const endDate = new Date(paymentMethodResponse?.result.subscriptionDetails.endDate||'');
    const renewDate = endDate.toLocaleDateString("en-GB");
    return (


        <>
            <Box display={'flex'} mt={1} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'flex-start'}>
                <Grid>
                    <Typography fontSize={isMobile ? '1.5rem' : '2.30rem'} variant="body1" color={palette?.black}>
                        Manage your
                    </Typography>
                    <Typography fontSize={isMobile ? '1.5rem' : '2.30rem'} variant="body1" color={palette?.black}>
                        subscriptions
                    </Typography>
                </Grid>
            </Box>

            <Divider sx={{ border: `0.063rem solid ${palette.divider}`, margin: '0.4rem 0' }} />

            {/* Section 1: Storage */}
            <Box mb={0.6}>
                <Box my={2} mb={4}>
                    <Typography fontSize={'1.4rem'} variant="body2" color={'#131544'}>
                        Payment Method
                    </Typography>
                    <Typography fontSize={'0.87rem'} variant="body2" color={'#131544'}>
                        Your next bill is for ${paymentMethodResponse?.result.subscriptionDetails.nextInvoiceAmount} USD on {renewDate}
                        </Typography>
                    <Card sx={{
                        display: 'flex', flexDirection: 'row',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent', // Ensures background stays white on hover
                            boxShadow: 'none', // Removes shadow on hover
                        },
                    }}>
              <CardMedia
  component="img"
  sx={{ 
    width: 67,
    height: 'auto', // Ensures the height adjusts according to the aspect ratio
    objectFit: 'contain' // Ensures the image fits within the width while maintaining its aspect ratio
  }}
  image={`/images/${paymentMethodResponse?.result.paymentMethod.card.brand.toLowerCase()}.svg`}
  alt={`${paymentMethodResponse?.result.paymentMethod.card.brand} logo`}
/>


                        <Box sx={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1,

                        }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="subtitle1" component="div" sx={{ color: '#131544' }}>
                                {`${paymentMethodResponse?.result.paymentMethod.card.brand.charAt(0).toUpperCase()}`+`${paymentMethodResponse?.result.paymentMethod.card.brand.slice(1)}`}card ending in {paymentMethodResponse?.result.paymentMethod.card.last4}
                                </Typography>
                                <Typography variant="subtitle1" component="div" sx={{ color: '#131544' }}>
                                    Expires {paymentMethodResponse?.result.paymentMethod.card.exp_month}/{paymentMethodResponse?.result.paymentMethod.card.exp_year}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>


                    <Button
                       onClick={handleOpen}
                        sx={{
                            backgroundColor: 'white',
                            boxShadow: 'none', // Ensures no shadow initially
                            '&:hover': {
                                backgroundColor: 'white', // Ensures background stays white on hover
                                boxShadow: 'none', // Removes shadow on hover
                            },
                        }}
                        variant='contained'
                        style={{ borderRadius: '19px', border: `1px solid ${palette.cardBorder}` }}>
                        <Typography variant={'button'} color={`#7A859B`} mx={1}>
                            Update Payment Method
                        </Typography>
                    </Button>


                </Box>
                <Divider sx={{ border: `0.063rem solid ${palette.divider}`, margin: '0.4rem 0' }} />
            </Box>

            {/* Section 2: Storage */}
            <Box mb={0.6}>
                <Box my={2} mb={4}>
                    <Typography mb={1} fontSize={'1.4rem'} variant="body2" color={'#131544'}>
                        Payment History
                    </Typography>

                    <Button
                        component={Link}
                        href={'/app/login'}
                        sx={{
                            backgroundColor: 'white',
                            boxShadow: 'none', // Ensures no shadow initially
                            '&:hover': {
                                backgroundColor: 'white', // Ensures background stays white on hover
                                boxShadow: 'none', // Removes shadow on hover
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
                    <Typography fontSize={'0.87rem'} variant="body2" color={'#131544'}>
                        By canceling your Memvy membership, your subscription will remain active until the end of your current billing cycle. After that, you will no longer be charged, and your account will be downgraded to a free plan. Your memories will remain securely stored, but access to premium features will be removed. You can always reactivate your membership at any time. If you’re ready to proceed, click the button below to cancel your membership.
                    </Typography>

                    <Button


                        sx={{
                            backgroundColor: 'white',
                            boxShadow: 'none', // Ensures no shadow initially
                            '&:hover': {
                                backgroundColor: 'white', // Ensures background stays white on hover
                                boxShadow: 'none', // Removes shadow on hover
                            },
                        }}
                        variant='contained'
                        style={{ borderRadius: '19px', border: `1px solid ${palette.cardBorder}` }}>
                        <Typography variant={'button'} color={`#7A859B`} mx={1}>
                            Cancel Membership
                        </Typography>
                    </Button>


                </Box>
                <Divider sx={{ border: `0.063rem solid ${palette.divider}`, margin: '0.4rem 0' }} />
            </Box>







            <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={updatePaymentMethod}>
          <Grid container spacing={isMobile ? 0 : 0} width={'100%'} marginBottom={'0.5rem'} rowSpacing={2}>
            
            {/* Card Number (Disabled) */}
            <Grid item xs={isMobile ? 12 : 12}>
              <MuiTextField2
                id="cardNumber"
                variant="standard"
                name="cardNumber"
                fullWidth
                disabled={true} // Card number is always disabled
                autoComplete="off"
                placeholder={`*************** ${paymentMethodResponse?.result.paymentMethod.card.last4}`}
                label="Card Number"
                isDarkTheme={false}
                value={`*************** ${paymentMethodResponse?.result.paymentMethod.card.last4}`} // Pre-filled value (masked)
                helperText="Card number is hidden for security"
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
                   }}// No need for validation since it's disabled
              />
            </Grid>

            {/* Expiry Month */}
            <Grid item xs={isMobile ? 12 : 12}>
              <MuiTextField2
                id="expiryMonth"
                variant="standard"
                name="expiryMonth"
                fullWidth
                disabled={false} // This field is editable
                autoComplete="off"
                placeholder={`${paymentMethodResponse?.result.paymentMethod.card.exp_month}`}
                label="Expiry Month"
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
                  const target = e.target as HTMLInputElement; // Type assertion here
                  setExpiryMonth(target.value); // Update state with input value
                }}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement; // Type assertion here
                  target.value = target.value.replace(/\D/g, '').slice(0, 2); // Allow only 2 digits
                }}
                helperText="Enter a valid month (01-12)"
                error={!isValidExpiryMonth} // Error handling for month validation
              />
            </Grid>

            {/* Expiry Year */}
            <Grid item xs={isMobile ? 12 : 12}>
              <MuiTextField2
                id="expiryYear"
                variant="standard"
                name="expiryYear"
                fullWidth
                disabled={false} // This field is editable
                autoComplete="off"
                placeholder="YY"
                label="Expiry Year"
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
                  const target = e.target as HTMLInputElement; // Type assertion here
                  setExpiryYear(target.value); // Update state with input value
                }}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement; // Type assertion here
                  target.value = target.value.replace(/\D/g, '').slice(0, 4); // Allow only 2 digits
                }}
                helperText="Enter a valid year (eg. 2024)"
                error={!isValidExpiryYear} // Error handling for year validation
              />
            </Grid>

            {/* Update Payment Button */}
            <Grid item xs={isMobile ? 12 : 12}>
              <Button
                onSubmit={updatePaymentMethod}
                onClick={updatePaymentMethod}
                sx={{
                  backgroundColor: 'black',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                  },
                }}
                variant="contained"
                style={{ borderRadius: '19px', border: `1px solid ${palette.cardBorder}` }}
                disabled={isButtonDisabled} // Disable button if any field is invalid
              >
                <Typography variant="button" color={`#7A859B`} mx={1}>
                  Update Payment Method
                </Typography>
              </Button>
            </Grid>

          </Grid>
        </form>
      </Box>
    </Modal>

        </>

    )
}
