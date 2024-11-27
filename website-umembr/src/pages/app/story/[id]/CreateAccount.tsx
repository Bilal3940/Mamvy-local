import React, {useState} from "react";
import {
    Modal,
    Box,
    Paper,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    ListItemIcon,
  } from '@mui/material';



  interface PopupModalProps {
    open: boolean;
    onClose: () => void;
  }

  const CreateAccount: React.FC<PopupModalProps> = ({ open, onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    return(

<Card
  sx={{
    padding: '12px',
    bgcolor: 'rgba(102, 102, 102, 1)',
    boxShadow: 'none',
  }}>
  <CardContent>
    {/* <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom:"12px"}}>
      <Avatar
        sx={{
          background: "#BA0C2F",
          color: 'white',
          width: 35,
          height: 35,
        }}>
        1
      </Avatar>
      <Typography
        variant='body2'
        sx={{
          mx: 1,
          wordWrap: 'break-word',
          whiteSpace: 'normal',
        }}>
        Create Account
      </Typography>

      <Avatar
        sx={{
          backgroundColor: 'black',
          color: 'white',
          width: 35,
          height: 35,
        }}>
        2
      </Avatar>
      <Typography
        variant='body2'
        sx={{
          mx: 1,
          wordWrap: 'break-word',
          whiteSpace: 'normal',
        }}>
        One Time Payment
      </Typography>

      <Avatar
        sx={{
          backgroundColor: 'black',
          color: 'white',
          width: 35,
          height: 35,
        }}>
        3
      </Avatar>
      <Typography
        variant='body2'
        sx={{
          mx: 1,
          wordWrap: 'break-word',
          whiteSpace: 'normal',
        }}>
        Access The Story
      </Typography>
    </Box> */}

    {/* Email Input */}
    <TextField
      label='Email Address'
      variant='outlined'
        margin='normal'
      fullWidth
      sx={{
        padding: '6px',
        marginTop: '5px',
        backgroundColor: 'white',
        borderRadius: '10px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none', // Remove border
          },
        },
        '& .MuiInputLabel-root': {
          color: 'black', // Default label color
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'black', // Label color when focused
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
      label='Password'
      variant='outlined'
      margin='normal'
      type='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      sx={{
        padding: '6px',
        marginTop: '5px',
        backgroundColor: 'white',
        borderRadius: '10px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none', // Remove border
          },
        },
        '& .MuiInputLabel-root': {
          color: 'black', // Default label color
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'black', // Label color when focused
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& fieldset': {
            border: 'none', // Ensure no border on focus
          },
        },
      }}
    />
    {/* Confirm Password Input */}
    <TextField
      label='Confirm Password'
      variant='outlined'
      margin='normal'
      type='password'
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      fullWidth
      sx={{
        padding: '6px',
        marginTop: '5px',
        backgroundColor: 'white',
        borderRadius: '10px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none', // Remove border
          },
        },
        '& .MuiInputLabel-root': {
          color: 'black', // Default label color
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'black', // Label color when focused
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& fieldset': {
            border: 'none', // Ensure no border on focus
          },
        },
      }}
    />

    <Box mt={1.2} sx={{ display: 'flex', justifyContent: 'center', color: 'rgba(238, 238, 238, 1)' }}>
      <Typography>or</Typography>
    </Box>
    <Button
      
      fullWidth
      startIcon={ <img src='/icons/devicon_google.svg'/>}
      sx={{
        marginTop: '12px',
        mb: 1,
        color:"white",
        height: '75px', 
        backgroundColor: 'rgba(34, 34, 34, 0.8)', 
        '&:hover': {
          backgroundColor: 'rgba(34, 34, 34, 1)', 
        },
        borderRadius: '10px', 
        padding: '25px', 
      }}>
      Continue with Google
    </Button>
    <Button
      fullWidth
      startIcon={ <img src='/icons/Vector.svg'/>}
      sx={{
        marginTop: '5px',
        mb: 1,
        color:"white",
        height: '75px', 
        backgroundColor: 'rgba(34, 34, 34, 0.8)',
        '&:hover': {
          backgroundColor: 'rgba(34, 34, 34, 1)', 
        },
        borderRadius: '10px', 
        padding: '25px',
      }}>
      Continue with Facebook
    </Button>
  </CardContent>
</Card>

    )
};
export default CreateAccount;