
// "use client";

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';



// import { Elements } from '@stripe/react-stripe-js';
// import stripePromise from '../../../../utils/stipe';
// import EmbeddedPaymentForm from '../../../../components/StripeFields/EmbeddedPaymentForm'
// // Import your existing components
// import CreateAccount from './CreateAccount';
// import OneTime from './OneTimePayment';
// import Thankyou from './OneTimePayment';
// import OneTimePayment from './OneTimePayment';

// const steps = ['Create Account', 'One-Time Setup', 'Thank You'];

// export default function HorizontalLinearAlternativeLabelStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       {/* Stepper Component */}
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {/* Render the component based on the current step */}
//       <Box sx={{ mt: 2, mb: 2 }}>
//         {activeStep === 0 && <CreateAccount open={false} onClose={function (): void {
//                   throw new Error('Function not implemented.');
//               } } />}
//         {activeStep === 1 &&     <Elements stripe={stripePromise}>
//      <div style={{backgroundColor:'transparent'}}>
//         <h1>Stripe Payment Integration</h1>
//         <EmbeddedPaymentForm />
//         </div>
//     </Elements>}
//         {activeStep === 2 && <OneTimePayment open={false} onClose={function (): void {
//                   throw new Error('Function not implemented.');
//               } } />}
//       </Box>

//       {/* Navigation Buttons */}
//       <Box>
//         {activeStep === steps.length ? (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 2 }}>All steps completed</Typography>
//             <Button onClick={handleReset}>Reset</Button>
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
//             <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleNext}
//               sx={{ ml: 1 }}
//             >
//               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//             </Button>
//           </React.Fragment>
//         )}
//       </Box>
//     </Box>
//   );
// }

"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmbeddedPaymentForm from "./StripeFields/EmbeddedPaymentForm";

// Import your existing components
import CreateAccount from "../pages/app/story/[id]/CreateAccount";
import Thankyou from "./Thankyou";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "@/utils/stipe";

const steps = [
  { label: "Create Account", icon: "1" },
  { label: "One-time payment", icon: "2" },
  { label: "Access the Story", icon: "3" },
];

export default function IconBasedStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Custom Stepper */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {steps.map((step, index) => (
          <Box
            key={step.label}
            onClick={() => handleStepClick(index)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              mx: 2,
              opacity: activeStep === index ? 1 : 0.5,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: activeStep === index ? "#BA0C2F" : "black",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {step.icon}
            </Box>
            <Typography variant="caption" sx={{ mt: 1 }}>
              {step.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Render the component based on the current step */}
      <Box sx={{ mt: 1, mb: 1 }}>
        {activeStep === 0 && (
          <CreateAccount open={false} onClose={function (): void {
                      throw new Error("Function not implemented.");
                  } } />
        )}
        {activeStep === 1 && (
          <Elements stripe={stripePromise}>
            <Box>
              <h1>Stripe Payment Integration</h1>
              <EmbeddedPaymentForm />
            </Box>
          </Elements>
        )}
        {activeStep === 2 && (
          <Thankyou open={false} onClose={function (): void {
                      throw new Error("Function not implemented.");
                  } } />
        )}
      </Box>
    </Box>
  );
}
