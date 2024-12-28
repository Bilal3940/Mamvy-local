import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, orderSelector, subscriptionSelector } from '@/store/selectors';
import { createOrder } from '@/store/actions';
import { CardInputField } from './elements/CardInputField';

export const PaymentForm = ({ onPaymentSuccess, onPaymentError }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { selectedTier } = useSelector(subscriptionSelector);
  const [cardname, setCardname] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { order, actionSuccess } = useSelector(orderSelector);
  const [cardNumberFocused, setCardNumberFocused] = useState(false);
  const [expiryFocused, setExpiryFocused] = useState(false);
  const [cvcFocused, setCvcFocused] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setSubmitting(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    const expiryElement = elements.getElement(CardExpiryElement);
    const cvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !expiryElement || !cvcElement) {
      onPaymentError('Card elements not found');
      setSubmitting(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      billing_details: { name: cardname, email: user.email },
    });

    if (error) {
      onPaymentError(error.message || 'Payment error occurred');
      setSubmitting(false);
      return;
    }
    if (paymentMethod) {
      const payload = {
        userId: user.id,
        productId: selectedTier.productId,
        priceId: selectedTier.Tier.stripePriceId,
        amount: selectedTier.Tier.amount,
        paymentMethodId: paymentMethod.id,
      };
      try {
        const res = dispatch(createOrder(payload));
        if (actionSuccess) {
          onPaymentSuccess();
        }
      } catch {
        setSubmitting(false);
        onPaymentError('Failed to create order');
      } finally {
        if (actionSuccess) {
          setSubmitting(false);
        }
        setSubmitting(false)
      }
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <CardInputField
        label='Name on Card'
        focused={cardname.length > 0}
        hasValue={!!cardname}
        onFocus={() => {}}
        onBlur={() => {}}
        onChange={(e: any) => setCardname(e.target.value)}
      />
      <CardInputField
        label='Card Number'
        focused={cardNumberFocused}
        hasValue={false}
        onFocus={() => setCardNumberFocused(true)}
        onBlur={() => setCardNumberFocused(false)}
        onChange={() => {}}
        isCardElement
        elementType='cardNumber'
      />
      <CardInputField
        label='Expiration Date'
        focused={expiryFocused}
        hasValue={false}
        onFocus={() => setExpiryFocused(true)}
        onBlur={() => setExpiryFocused(false)}
        onChange={() => {}}
        isCardElement
        elementType='expiry'
      />
      <CardInputField
        label='CVC'
        focused={cvcFocused}
        hasValue={false}
        onFocus={() => setCvcFocused(true)}
        onBlur={() => setCvcFocused(false)}
        onChange={() => {}}
        isCardElement
        elementType='cvc'
      />
      <Box marginTop={'10px'}>
        {/* <MuiButton loading={isSubmitting} disabled={isSubmitting}  padding={'10px'} method={()=>{handleSubmit}} >
          <Typography variant='button'> Pay </Typography>
        </MuiButton> */}
        <Button fullWidth onClick={handleSubmit} disabled={isSubmitting} type={'button'} variant={'contained'}>
          {!isSubmitting ? (
            <Typography variant={'button'}>Pay</Typography>
          ) : (
            <CircularProgress size={32} sx={{ color: '#fff' }} />
          )}
        </Button>
      </Box>
    </Box>
  );
};
