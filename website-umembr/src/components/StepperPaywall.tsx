'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmbeddedPaymentForm from '@/components/StripeFields/EmbeddedPaymentForm';

import Thankyou from './Thankyou';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/utils/stipe';

import CreateAccount from '@/components/CreateAccountPopup/CreateAccount';
import { useEffect, useState } from 'react';
import LoginForm from '@/components/LoginAccountPopup/LoginForm';
import { authSelector, purchaseSelector, storySelector } from '@/store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { clearDataPurchase, getUserPurchases } from '@/store/actions';

const steps = [
  { label: 'Create Account', icon: '1' },
  { label: 'One-time payment', icon: '2' },
  { label: 'Access the Story', icon: '3' },
];
interface CustomPropsForStepper{
  callbackthecurrentStep?:(stepp:any)=>void;
}
export default function IconBasedStepper({callbackthecurrentStep}:CustomPropsForStepper) {
  const { user, isAuth } = useSelector(authSelector);
  const [activeStep, setActiveStep] = React.useState(0);
  const [openLogin , setOpenLogin]= useState(true);
  const {userPurchases , purchase} = useSelector(purchaseSelector);
  const {story}= useSelector(storySelector);
  const dispatch = useDispatch()
  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };
  
useEffect (()=>{
  if(callbackthecurrentStep){
callbackthecurrentStep(activeStep);
  }
},[activeStep])

  useEffect(()=>{
     
      // console.log("USer purchases are", userPurchases)
  },[userPurchases])
  const paymentSuccessfull = () => {
  
    if (purchase && purchase) {
      if(purchase.userId===user.id && purchase.storyId === story.id && purchase.orderStatus==="successful"){
     setActiveStep(2);
      }
      dispatch(clearDataPurchase());

     
}
     
  }
  
  const handleOpenLogup = ( )=>{
    setOpenLogin(false);
  };
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  useEffect(() => {
    if (isAuth) setActiveStep(1);
  }, [isAuth]);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Custom Stepper */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {steps.map((step, index) => (
          <Box
            key={step.label}
            onClick={() => handleStepClick(index)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              mx: 2,
              opacity: activeStep === index ? 1 : 0.5,
            }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: activeStep === index ? '#BA0C2F' : 'black',
                color: 'white',
                fontWeight: 'bold',
              }}>
              {step.icon}
            </Box>
            <Typography variant='caption' sx={{ mt: 1 }}>
              {step.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Render the component based on the current step */}
      <Box sx={{ mt: 1, mb: 1 }}>
        {activeStep === 0 && (
          <>
            {openLogin ? (
              <LoginForm open={openLogin} onClose={handleOpenLogup} />
            ) : (
              <CreateAccount open={true} onClose={handleOpenLogin} />
            )}
          </>
        )}
        {activeStep === 1 && (
          <Elements stripe={stripePromise}>
            <Box>
              <h1>Stripe Payment Integration</h1>
              <EmbeddedPaymentForm onSuccessfullPayment={paymentSuccessfull} />
            </Box>
          </Elements>
        )}
        {activeStep === 2 && (
          <Thankyou
            open={false}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        )}
      </Box>

      {/* <CreateAccount open={true} onClose={function (): void {
        throw new Error("Function not implemented.");
      } }/> */}
    </Box>
  );
}
