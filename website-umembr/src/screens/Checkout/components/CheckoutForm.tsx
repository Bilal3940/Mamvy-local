
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box,  Typography } from '@mui/material';
import { useDispatch} from 'react-redux';
import { useRouter } from 'next/router';
import { stripe_public_key } from '../../../utils/path';
import { refreshUserData } from '@/store/actions';
import PaymentForm from './PaymentForm';
interface CheckoutFormProps {
  handleClose: () => void;
}


const stripePromise = loadStripe(stripe_public_key);
export const CheckoutForm: React.FC<CheckoutFormProps> = ({ handleClose }) => {
  const dispatch = useDispatch()
  const handlePaymentSuccess = async() => {
    dispatch(refreshUserData())
    // handleClose();
  };

  const handlePaymentError = (errorMessage: string) => {
    alert(`Payment Failed: ${errorMessage}`);
  };

  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Elements stripe={stripePromise}>
        <Box
          width={'100%'}
          margin={'0 auto'}
          padding={'20px'}
          borderRadius={'0.6rem'}
          // boxShadow={
          //   '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
          // }
          >
          {/* <Typography variant={'h4'}>Complete your payment</Typography> */}
          <PaymentForm  />
        </Box>
      </Elements>
    </Box>
  );
};
