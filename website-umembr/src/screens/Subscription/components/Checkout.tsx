import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "./PaymentForm";
import { Box } from "@mui/material";
import { stripe_public_key } from "@/utils";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/actions";

const stripePromise = loadStripe(stripe_public_key);

export const Checkout: React.FC = () => {
  const dispatch = useDispatch()
  const handlePaymentSuccess = () => {
    dispatch(openModal({content:"Payment Successful!"}));
  };

  const handlePaymentError = (errorMessage: string) => {
    alert(`Payment Failed: ${errorMessage}`);
  };

  return (
    <Box style={{display:'flex', width:"40%", marginTop:'30px', margin:"0 auto"}}>
    <Elements stripe={stripePromise}>
      <div>
        <h2>Complete your payment</h2>
        <PaymentForm
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </div>
    </Elements>
    </Box>
  );
};
