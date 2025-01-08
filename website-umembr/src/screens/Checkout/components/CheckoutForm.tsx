
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
      <Elements stripe={stripePromise}>
        <Box
          width={'100%'}
          margin={'0 auto'}
          height={'95vh'}
          overflow={'auto'}
          borderRadius={'0.6rem'}
>
          <PaymentForm  />
        </Box>
      </Elements>
  );
};
