
import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { fallbackRestUrl, stripe_public_key } from '@/utils';
import { useSelector } from 'react-redux';
import { authSelector, subscriptionSelector } from '@/store/selectors';
import { Box } from '@mui/material';

const stripePromise = loadStripe(stripe_public_key);

export default function PaymentForm() {
    const { user } = useSelector(authSelector);
  const { selectedTier } = useSelector(subscriptionSelector);
  const fetchClientSecret = useCallback(() => {
    return fetch(`${fallbackRestUrl}/subscription/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,

      },
      body: JSON.stringify({
        priceId: selectedTier?.Tier?.stripePriceId, // Replace with actual product ID
        userEmail: user?.email
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the client secret");
        }
        return res.json();
      })
      .then((data) => data?.result?.clientSecret);
  }, []);
  const options = {fetchClientSecret};

  return (
    <Box id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Box>
  )
}
