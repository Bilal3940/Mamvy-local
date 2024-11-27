import React, {useState} from "react";
import CreateAccount from "@/components/CreateAccountPopup/CreateAccount";
// import Stepper from "./Stepper";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Link,
  } from '@mui/material';
import { theme } from "@/theme";




  interface PopupModalProps {
    open: boolean;
    onClose: () => void;
  }

  const LoginForm: React.FC<PopupModalProps> = ({ open, onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const [showSignup , setShowSignup]=useState(false);

    function OpenSignup (){
  setShowSignup(true);
    }



    return(

<Card
  sx={{
    padding: '2px',
    paddingTop:"4px",
    bgcolor: 'rgba(102, 102, 102, 1)',
    boxShadow: 'none',
    height:"auto",
    [theme.breakpoints.down('sm')]:{
     padding:'0px'
    }
  }}>
  <CardContent 
    sx={{
      padding: { xs: 0, sm: '16px' },  '&:last-child': {
        paddingBottom: 0, 
      },
    }}
  >
   <h2 style={{fontFamily:"inter", color:"white", marginBottom:"3px"}}>Log In</h2>
    {/* Email Input */}
    <TextField
  label="Email" // Show label only if email is empty
  variant='outlined'
  margin='normal'
  value={email} // Controlled value
  onChange={(e) => setEmail(e.target.value)} // Update email state
  fullWidth
  InputLabelProps={{
    shrink: false, // Disable the default shrink behavior
  }}
  sx={{
    paddingTop: '2px',
    marginTop: '5px',
    height:"50px",
    border:"1px solid white",
    backgroundColor: 'black',
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none', // Remove border
      },
    },
    '& .MuiInputLabel-root': {
        color: '#EEEEEE', // Default label color
      position: 'absolute',
      left: '14px',
      transition: 'all 0.2s ease-in-out',
      top: email ? '1px' : '50%', // Position based on whether there's input
      transform: email ? 'translateY(0)' : 'translateY(-50%)', // Adjust vertical alignment
      fontSize: email ? '12px' : '16px', // Adjust size for shrunken state
    },

    '& .MuiOutlinedInput-root.Mui-focused': {
      '& fieldset': {
        border: 'none', // Ensure no border on focus
      },
    },
  }}
/>

    {/* Password Input */}
    <TextField
  label="Password"
  variant="outlined"
  margin="normal"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  fullWidth
  InputLabelProps={{
    shrink: false, // Disable the default shrink behavior
  }}
  sx={{
    paddingTop: '2px',
    height: "50px",
    marginTop: '5px',
    backgroundColor: 'black',
    border: "1px solid white",
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none', // Remove border
      },
      '& input': {
        color: 'white', // Change the text and password dots color to white
      },
    },
    '& .MuiInputLabel-root': {
      color: '#EEEEEE', // Default label color
      position: 'absolute',
      left: '14px',
      transition: 'all 0.2s ease-in-out',
      top: password ? '1px' : '50%', // Position based on whether there's input
      transform: password ? 'translateY(0)' : 'translateY(-50%)', // Adjust vertical alignment
      fontSize: password ? '12px' : '16px', // Adjust size for shrunken state
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& fieldset': {
        border: 'none', // Ensure no border on focus
      },
    },
  }}
/>


<Box sx={{ display: 'flex', justifyContent: 'center', color: 'black' }}>
    {/* <button>Sign Up</button> */}
    <Button
      
      fullWidth
      sx={{
        marginTop: '5px',
        mb: 1,
        color:"black",
        border:"1px solid black",
        height: '50px', 
        background: '#FFFF',
        '&:hover': {
          backgroundColor: 'rgba(34, 34, 34, 1)', 
        },
        borderRadius: '8px', 
        padding: '25px', 
        textTransform:"none",
      }}> Continue
    </Button>
    </Box>
    <Typography style={{ display: 'flex', justifyContent: 'center', color: 'rgba(238, 238, 238, 1)', marginTop:"5px"}}>
    <Link style={{color:"#BA0C2F", cursor:"pointer" , fontWeight:"bold", textDecoration:"none"}}> {""}Forgot Password?</Link>
    </Typography>
    <Typography style={{ display: 'flex', justifyContent: 'center', color: 'rgba(238, 238, 238, 1)', marginTop:"5px",fontWeight:"bold"}}>
     or
    </Typography>


    <div
  style={{
    display: 'flex',
    gap: '10px', // Adds spacing between the buttons
    marginTop: '10px', // Adjust spacing above the buttons
  }}
>
  <Button
    fullWidth
    endIcon={<img src='/icons/devicon_google.svg' />}
    sx={{
      color: 'white',
      height: '48px',
      border:"1px solid black",
      backgroundColor: 'rgba(34, 34, 34, 0.8)',
      '&:hover': {
        backgroundColor: 'rgba(34, 34, 34, 1)',
      },
      borderRadius: '8px',
      padding: '0 15px',
      lineHeight:"1.15"
    }}
  >
    Continue with
  </Button>

  <Button
    fullWidth
    endIcon={<img src='/images/apple.svg' />}
    sx={{
      color: 'white',
      height: '48px',
    
      border:"1px solid black",
      backgroundColor: 'rgba(34, 34, 34, 0.8)',
      '&:hover': {
        backgroundColor: 'rgba(34, 34, 34, 1)',
      },
      borderRadius: '8px',
     padding: '0 15px',
      lineHeight:"1.15"
    }}
  >
    Continue with
  </Button>
  <Button
    fullWidth
    endIcon={<img src='/icons/Vector.svg' />}
    sx={{
      color: 'white',
      height: '48px',
      border:"1px solid black",
      backgroundColor: 'rgba(34, 34, 34, 0.8)',
      '&:hover': {
        backgroundColor: 'rgba(34, 34, 34, 1)',
      },
      borderRadius: '10px',
      padding: '0 15px',
      lineHeight:"1.15"
    }}
  >
    Continue with
  </Button>
</div>


    <Box mt={1.2} sx={{ display: 'flex', color: 'rgba(238, 238, 238, 1)', marginTop: {xs: '6px', sm:"35px"}, fontWeight:"bold"}}>
    <Typography style={{fontWeight:"bold"}}>
        New to Memvy?
    </Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
    {/* <button>Sign Up</button> */}
    <Button
      onClick={onClose}
      fullWidth
      sx={{
        marginTop: '15px',
        mb: 1,
        color:"white",
      
        height: '60px', 
        background: '#BA0C2F',
        
        '&:hover': {
          backgroundColor: 'rgba(34, 34, 34, 1)', 
        },
        borderRadius: '8px', 
        padding: '25px', 
        textTransform:"none",
      }}> Create Your Account
    </Button>
    </Box>
  </CardContent>
</Card>

    )
};
export default LoginForm;