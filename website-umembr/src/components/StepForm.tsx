import { useState } from 'react';
import {Box, Avatar, Typography, TextField, Button } from '@mui/material';
import { openModal } from '@/store/actions';
import { useDispatch } from 'react-redux';

const StepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch()

  const steps = ['Create Account', 'One Time Payment', 'Access The Story'];

  
  const handleNext = () => {
    if (activeStep === 0 && password !== confirmPassword) {
      dispatch(openModal({content:'Passwords do not match'}));
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };  
  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label='Email'
              variant='outlined'
              margin='normal'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                background: '#fff',
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />

            <TextField
              fullWidth
              label='Password'
              variant='outlined'
              margin='normal'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                background: '#fff',
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />

            <TextField
              fullWidth
              label='Confirm Password'
              variant='outlined'
              margin='normal'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                background: '#fff',
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />

            <Button variant='contained' onClick={handleNext}>
              Next
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label='Card Number' variant='outlined' fullWidth />
            <TextField label='Expiry Date' variant='outlined' fullWidth />
            <Button variant='contained' onClick={handleNext}>
              Next
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='body1'>Thank you for completing the payment!</Typography>
            <Button variant='contained' onClick={handleNext}>
              Finish
            </Button>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box marginTop={'1px'} sx={{ width: '100%' }}>
      {/* Custom Stepper with All Steps Visible */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map((label, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              cursor: 'pointer', 
            }}
            onClick={() => handleStepClick(index)} 
          >
            <Avatar
              sx={{
                backgroundColor: activeStep === index ? 'blue' : 'black', 
                color: 'white',
                width: 35,
                height: 35,
              }}>
              {index + 1}
            </Avatar>
            <Typography
              variant='body2'
              sx={{
                mx: 1,
                color: 'black', 
                fontWeight: activeStep === index ? 'bold' : 'normal', 
              }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 2 }}>{renderStepContent(activeStep)}</Box>

      {/* <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          disabled={activeStep === steps.length - 1}
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box> */}
    </Box>
  );
};

export default StepForm;
