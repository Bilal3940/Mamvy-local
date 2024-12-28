// PaymentForm.tsx
import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { Box, FormControl, InputLabel, TextField } from '@mui/material';
import { authSelector, subscriptionSelector } from '@/store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '@/store/actions';

interface PaymentFormProps {
  onPaymentSuccess: () => void;
  onPaymentError: (errorMessage: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector(authSelector);
  const [cardname, setCardname] = useState('');
  const dispatch = useDispatch();
  const { selectedTier } = useSelector(subscriptionSelector);

  const [isProcessing, setIsProcessing] = useState(false);

  const [cardNumberFocused, setCardNumberFocused] = useState(false);
  const [expiryFocused, setExpiryFocused] = useState(false);
  const [cvcFocused, setCvcFocused] = useState(false);

  const [hasCardNumber, setHasCardNumber] = useState(false);
  const [hasExpiry, setHasExpiry] = useState(false);
  const [hasCvc, setHasCvc] = useState(false);

  const handleCardNumberChange = (event: any) => {
    setHasCardNumber(event.complete);
  };

  const handleExpiryChange = (event: any) => {
    setHasExpiry(event.complete);
  };

  const handleCvcChange = (event: any) => {
    setHasCvc(event.complete);
  };
  const optionss = {
    style: {
      base: {
        fontSize: '16px',
        color: '#fff', 
        '::placeholder': {
          color: 'transparent', 
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  const handleSubmit = async (e?: any): Promise<any> => {
    if (e) {
      e.preventDefault();
    }

    if (!stripe || !elements) {
      console.error('Stripe has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      console.error('CardNumberElement not found.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        address: {
          country: 'US',
        },
        name: cardname,
        email: user.email,
      },
    });

    if (error) {
      console.error('Error creating payment method:', error.message);
      onPaymentError(error.message || 'Payment error occurred');
      return;
    }

    if (paymentMethod) {
      const payload = {
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        productId: selectedTier.productId, 
        priceId: selectedTier.Tier.stripePriceId,
        paymentMethodId: paymentMethod.id,
        amount: '100',
        currency: 'USD',
        canceledAt: null,
        metadata: {
          address: 'Sample address',
        },
      };

      try {
        dispatch(createOrder(payload));
        onPaymentSuccess();
      } catch (error) {
        console.error('Subscription failed:', error);
        onPaymentError('Failed to create subscription order');
      }
    }
  };

  if (!stripe || !elements) {
    return <div>Loading Stripe...</div>;
  }
  return (
    <Box width={'100%'} height={'100%'} justifyItems={'center'}>
      <form>
        <div className='form-row'>
          <div className='form-column full-column'>
            <FormControl fullWidth>
              <InputLabel
                shrink={cardname.length > 0}
                sx={{
                  transition: '0.2s',
                  transform: cardname.length > 0 ? 'translate(0, -0.25rem) scale(0.75)' : 'translate(0, 1rem) scale(1)',
                  pointerEvents: 'none',
                  color: '#fff',
                }}>
                Name on Card
              </InputLabel>
              <TextField
                type='text'
                id='cc-name'
                className='input-field'
                name='cc-name'
                value={cardname}
                onChange={(e) => setCardname(e.target.value)}
                required
                fullWidth
                sx={{
                  marginTop: '8px',
                  '& .MuiInputBase-root': {
                    backgroundColor: 'transparent',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    color: '#fff', 
                  },
                  '& .MuiInputBase-input': {
                    color: '#fff', 
                  },
                }}
              />
            </FormControl>
          </div>
        </div>

        <div className='form-row'>
          <div className='form-column mobile-column'>
            <FormControl fullWidth>
              <InputLabel
                shrink={cardNumberFocused || hasCardNumber}
                sx={{
                  marginBottom: '10px',
                  transition: '0.2s',
                  transform:
                    cardNumberFocused || hasCardNumber
                      ? 'translate(0, -0.25rem) scale(0.75)'
                      : 'translate(0, 1rem) scale(1)',
                  pointerEvents: 'none',
                  color: '#fff', 
                }}>
                Card Number
              </InputLabel>
              <Box
                sx={{
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                  marginTop: '8px',
                }}>
                <CardNumberElement
                  options={optionss}
                  onFocus={() => setCardNumberFocused(true)}
                  onBlur={() => setCardNumberFocused(false)}
                  onChange={handleCardNumberChange}
                />
              </Box>
            </FormControl>
          </div>

          <div className='form-column third-column'>
            <FormControl fullWidth>
              <InputLabel
                shrink={expiryFocused || hasExpiry}
                sx={{
                  transition: '0.2s',
                  transform:
                    expiryFocused || hasExpiry ? 'translate(0, -0.25rem) scale(0.75)' : 'translate(0, 1rem) scale(1)',
                  pointerEvents: 'none',
                  color: '#fff', 
                }}>
                Expiration Date
              </InputLabel>
              <Box
                sx={{
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                  marginTop: '8px',
                }}>
                <CardExpiryElement
                  options={optionss}
                  onFocus={() => setExpiryFocused(true)}
                  onBlur={() => setExpiryFocused(false)}
                  onChange={handleExpiryChange}
                />
              </Box>
            </FormControl>
          </div>

          <div className='form-column third-column'>
            <FormControl fullWidth>
              <InputLabel
                shrink={cvcFocused || hasCvc}
                sx={{
                  transition: '0.2s',
                  transform:
                    cvcFocused || hasCvc ? 'translate(0, -0.25rem) scale(0.75)' : 'translate(0, 1rem) scale(1)',
                  pointerEvents: 'none',
                  color: '#fff', 
                }}>
                CVC
              </InputLabel>
              <Box
                sx={{
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                  marginTop: '8px',
                }}>
                <CardCvcElement
                  options={optionss}
                  onFocus={() => setCvcFocused(true)}
                  onBlur={() => setCvcFocused(false)}
                  onChange={handleCvcChange}
                />
              </Box>
            </FormControl>
          </div>
        </div>
      </form>
      <div className='payment-form-footer'>
        {isProcessing ? (
          <h3>Loading</h3>
        ) : (
          <button type='submit' className='order-btn primary-btn' onClick={handleSubmit}>
            Pay ${88}
          </button>
        )}
      </div>
    </Box>
  );
};
