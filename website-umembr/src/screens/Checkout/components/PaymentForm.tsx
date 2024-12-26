// import React, { useEffect, useState } from 'react';
// import { Box, Button, CircularProgress, Typography } from '@mui/material';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
// import { useDispatch, useSelector } from 'react-redux';
// import { authSelector, orderSelector, subscriptionSelector } from '@/store/selectors';
// import { createOrder } from '@/store/actions';
// import { CardInputField } from './elements/CardInputField';

// export const PaymentForm = ({ onPaymentSuccess, onPaymentError }: any) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useDispatch();
//   const { user } = useSelector(authSelector);
//   const { selectedTier } = useSelector(subscriptionSelector);
//   const [cardname, setCardname] = useState('');
//   const [isSubmitting, setSubmitting] = useState(false);
//   const { order, actionSuccess } = useSelector(orderSelector);
//   const [cardNumberFocused, setCardNumberFocused] = useState(false);
//   const [expiryFocused, setExpiryFocused] = useState(false);
//   const [cvcFocused, setCvcFocused] = useState(false);



//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     setSubmitting(true);

//     const cardNumberElement = elements.getElement(CardNumberElement);
//     const expiryElement = elements.getElement(CardExpiryElement);
//     const cvcElement = elements.getElement(CardCvcElement);

//     if (!cardNumberElement || !expiryElement || !cvcElement) {
//       onPaymentError('Card elements not found');
//       setSubmitting(false);
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardNumberElement,
//       billing_details: { name: cardname, email: user.email },
//     });

//     if (error) {
//       onPaymentError(error.message || 'Payment error occurred');
//       setSubmitting(false);
//       return;
//     }
//     if (paymentMethod) {
//       const payload = {
//         userId: user.id,
//         productId: selectedTier.productId,
//         priceId: selectedTier.Tier.stripePriceId,
//         amount: selectedTier.Tier.amount,
//         paymentMethodId: paymentMethod.id,
//       };
//       try {
//         const res = dispatch(createOrder(payload));
//         if (actionSuccess) {
//           onPaymentSuccess();
//         }
//       } catch {
//         setSubmitting(false);
//         onPaymentError('Failed to create order');
//       } finally {
//         if (actionSuccess) {
//           setSubmitting(false);
//         }
//         setSubmitting(false)
//       }
//     }
//   };

//   return (
//     <Box component='form' onSubmit={handleSubmit}>
//       <CardInputField
//         label='Name on Card'
//         focused={cardname.length > 0}
//         hasValue={!!cardname}
//         onFocus={() => {}}
//         onBlur={() => {}}
//         onChange={(e: any) => setCardname(e.target.value)}
//       />
//       <CardInputField
//         label='Card Number'
//         focused={cardNumberFocused}
//         hasValue={false}
//         onFocus={() => setCardNumberFocused(true)}
//         onBlur={() => setCardNumberFocused(false)}
//         onChange={() => {}}
//         isCardElement
//         elementType='cardNumber'
//       />
//       <CardInputField
//         label='Expiration Date'
//         focused={expiryFocused}
//         hasValue={false}
//         onFocus={() => setExpiryFocused(true)}
//         onBlur={() => setExpiryFocused(false)}
//         onChange={() => {}}
//         isCardElement
//         elementType='expiry'
//       />
//       <CardInputField
//         label='CVC'
//         focused={cvcFocused}
//         hasValue={false}
//         onFocus={() => setCvcFocused(true)}
//         onBlur={() => setCvcFocused(false)}
//         onChange={() => {}}
//         isCardElement
//         elementType='cvc'
//       />
//       <Box marginTop={'10px'}>
//         {/* <MuiButton loading={isSubmitting} disabled={isSubmitting}  padding={'10px'} method={()=>{handleSubmit}} >
//           <Typography variant='button'> Pay </Typography>
//         </MuiButton> */}
//         <Button fullWidth onClick={handleSubmit} disabled={isSubmitting} type={'button'} variant={'contained'}>
//           {!isSubmitting ? (
//             <Typography variant={'button'}>Pay</Typography>
//           ) : (
//             <CircularProgress size={32} sx={{ color: '#fff' }} />
//           )}
//         </Button>
//       </Box>
//     </Box>
//   );
// };


// import React, { useState, useEffect } from 'react';
// import { Elements, PaymentElement } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useSelector } from 'react-redux';
// import { authSelector, subscriptionSelector } from '@/store/selectors';
// import { stripe_public_key } from '@/utils';

// const stripePromise = loadStripe(stripe_public_key);


// const PaymentForm = () => {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const {user} = useSelector(authSelector)
//     const { selectedTier } = useSelector(subscriptionSelector);
//   useEffect(() => {
//     const createSubscription = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/subscription/create-subscription', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             customerEmail: user?.email,
//             description:selectedTier?.Tier?.description,
//             priceId: selectedTier?.Tier?.priceId,
//           }),
//         });
//         const data = await response.json();
//         console.log("i am the data",data)
//         setClientSecret(data.result?.clientSecret);
//       } catch (error) {
//         console.error('Error creating subscription:', error);
//       }
//     };

//     createSubscription();
//   }, [user?.email,selectedTier?.Tier?.description, selectedTier?.Tier?.priceId]);  // Fetch the Payment Intent's client secret from the backend
 

//   if (!clientSecret) {
//     return <div>Loading payment form...</div>;
//   }

//   return (
//     <Elements stripe={stripePromise} options={{ clientSecret }}>
//       <div style={{ maxWidth: '400px', margin: '0 auto' }}>
//         {/* <h3>Complete your payment</h3> */}
//         <PaymentElement />
//       </div>
//     </Elements>
//   );
// };

// export default PaymentForm;

// import React, { useState, useEffect } from 'react';
// import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useSelector } from 'react-redux';
// import { authSelector, subscriptionSelector } from '@/store/selectors';
// import { stripe_public_key } from '@/utils';

// const stripePromise = loadStripe(stripe_public_key);

// const PaymentForm = () => {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const { user } = useSelector(authSelector);
//   const { selectedTier } = useSelector(subscriptionSelector);
//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     const createSubscription = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/subscription/create-subscription', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             customerEmail: user?.email,
//             description: selectedTier?.Tier?.description,
//             priceId: selectedTier?.Tier?.priceId,
//           }),
//         });
//         const data = await response.json();
//         setClientSecret(data.result?.clientSecret);
//       } catch (error) {
//         console.error('Error creating subscription:', error);
//       }
//     };

//     createSubscription();
//   }, [user?.email, selectedTier?.Tier?.description, selectedTier?.Tier?.priceId]);

//   // const handleSubmit = async (event: React.FormEvent) => {
//   //   event.preventDefault();

//   //   if (!stripe || !elements || !clientSecret) {
//   //     // Make sure Stripe is loaded and the clientSecret exists
//   //     return;
//   //   }

//   //   const { error, paymentIntent } = await stripe.confirmPayment({
//   //     elements,
//   //     confirmParams: {
//   //       // No return_url is needed here
//   //     },
//   //   });

//   //   if (error) {
//   //     console.error('Error confirming payment:', error);
//   //     // Handle error (e.g., show message to the user)
//   //   } else {
//   //     // Payment was successful
//   //     console.log('Payment successful:', paymentIntent);

//   //     // Create the order in your backend after successful payment
//   //     const response = await fetch('http://localhost:3001/api/order/create', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         paymentIntentId: paymentIntent.id,
//   //         customerEmail: user?.email,
//   //         description: selectedTier?.Tier?.description,
//   //         priceId: selectedTier?.Tier?.priceId,
//   //       }),
//   //     });

//   //     const orderData = await response.json();
//   //     console.log('Order created:', orderData);

//   //     // Optionally, show confirmation or redirect to a confirmation page
//   //     alert('Payment successful and order created!');
//   //   }
//   // };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
  
//     if (!stripe || !elements || !clientSecret) {
//       // Make sure Stripe is loaded and the clientSecret exists
//       return;
//     }
  
//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//       //   // Optional parameters, no return_url is needed here
//       return_url:'http://localhost:3000/app/home'
//       // },
//       redirect: 'never', // Important: tells Stripe to not expect a redirect
//     });
  
//     if (error) {
//       console.error('Error confirming payment:', error);
//       // Handle error (e.g., show message to the user)
//     } else {
//       // Payment was successful
//       console.log('Payment successful:', paymentIntent);
  
//       // Create the order in your backend after successful payment
//       const response = await fetch('http://localhost:3001/api/order/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           paymentIntentId: paymentIntent.id,
//           customerEmail: user?.email,
//           description: selectedTier?.Tier?.description,
//           priceId: selectedTier?.Tier?.priceId,
//         }),
//       });
  
//       const orderData = await response.json();
//       console.log('Order created:', orderData);
  
//       // Optionally, show confirmation or redirect to a confirmation page
//       alert('Payment successful and order created!');
//     }
//   };
  

//   if (!clientSecret) {
//     return <div>Loading payment form...</div>;
//   }

//   return (
//     <Elements stripe={stripePromise} options={{ clientSecret }}>
//       <div style={{ maxWidth: '400px', margin: '0 auto' }}>
//         {/* Payment form */}
//         <PaymentElement />

//         {/* Submit button to confirm payment */}
//         <button onClick={handleSubmit} disabled={!stripe}>Submit Payment</button>
//       </div>
//     </Elements>
//   );
// };

// export default PaymentForm;

// import React, { useEffect, useState } from 'react';
// import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { authSelector, subscriptionSelector } from '@/store/selectors';
// import { useSelector } from 'react-redux';

// const stripePromise = loadStripe('your-publishable-key'); // Replace with your Stripe Publishable Key

// const SubscriptionPaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const { user } = useSelector(authSelector);
//   const { selectedTier } = useSelector(subscriptionSelector);
//   useEffect(() => {
//     const createSubscription = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api//subscription/create-session', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             customerEmail: user?.email,
//             description: selectedTier?.Tier?.description,
//             priceId: selectedTier?.Tier?.stripePriceId,
//           }),
//         });

//         const data = await response.json();
//         if (data?.clientSecret) {
//           setClientSecret(data.clientSecret);
//         } else {
//           console.error('Failed to retrieve clientSecret');
//         }
//       } catch (error) {
//         console.error('Error creating subscription:', error);
//       }
//     };

//     createSubscription();
//   }, []); // Run once on mount

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       console.error('Stripe or elements not initialized');
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {}, // No need for return_url
//       redirect: 'if_required',
//     });

//     if (error) {
//       console.error('Payment failed:', error);
//       alert('Payment failed. Please try again.');
//     } else if (paymentIntent) {
//       console.log('Subscription payment successful:', paymentIntent);

//       // Send subscription details to your backend
//       const response = await fetch('http://localhost:3001/api/order/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           paymentIntentId: paymentIntent.id,
//           customerEmail: 'customer@example.com', // Replace with dynamic email
//           subscriptionId: 'subscription_12345', // Replace with actual subscription ID if needed
//         }),
//       });

//       const data = await response.json();
//       console.log('Subscription order created:', data);
//       alert('Subscription successful and order recorded!');
//     }
//   };

//   if (!clientSecret) {
//     return <div>Loading payment form...</div>;
//   }

//   return (
//     <Elements stripe={stripePromise} options={{ clientSecret }}>
//       <form onSubmit={handleSubmit}>
//         <PaymentElement />
//         <button type="submit" disabled={!stripe || !elements}>
//           Subscribe
//         </button>
//       </form>
//     </Elements>
//   );
// };

// export default SubscriptionPaymentForm;



import React, { useEffect, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { authSelector, subscriptionSelector } from '@/store/selectors';
import { useSelector } from 'react-redux';
import { stripe_public_key } from '@/utils';

const stripePromise = loadStripe(stripe_public_key); // Replace with your Stripe Publishable Key

const SubscriptionPaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { user } = useSelector(authSelector);
  const { selectedTier } = useSelector(subscriptionSelector);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/subscription/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerEmail: user?.email,
            description: selectedTier?.Tier?.description,
            priceId: selectedTier?.Tier?.stripePriceId,
          }),
        });

        const data = await response.json();
        console.log(data)
        if (data?.result?.clientSecret) {
          setClientSecret(data.result?.clientSecret);
        } else {
          console.error('Failed to retrieve clientSecret');
        }
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    createPaymentIntent();
  }, []); // Run once on mount

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      alert('Stripe or elements not initialized');
      return;
    }
  
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/success', // Optional: Define a return URL
      },
      redirect: 'if_required',
    });
  
    if (error) {
      console.error('Payment failed:', error.message);
      alert('Payment failed. Please try again.');
    } else if (paymentIntent) {
      console.log('Payment succeeded:', paymentIntent);
      alert('Payment successful!');
    }
  };
  

  if (!clientSecret) {
    return <div>Loading payment form..</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements}>
          Subscribe
        </button>
      </form>
    </Elements>
  );
};

export default SubscriptionPaymentForm;
