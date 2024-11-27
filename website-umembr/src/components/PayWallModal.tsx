// import React, { useState } from 'react';
// import {
//   Modal,
//   Box,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Avatar,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Button,
//   ListItemIcon,
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook'; // <-- Add this line
// import GoogleIcon from '@mui/icons-material/Google';
// import TickIcon from '../../../../../public/icons/RedTickIcon';

// interface PopupModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// const PopupModal: React.FC<PopupModalProps> = ({ open, onClose }) => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');

//   return (
//     <Modal
//       open={open}
//       onClose={onClose} // Close the modal when clicking outside
//       disableAutoFocus // Prevents auto-focus on the first element
//       disableEnforceFocus // Optional: Allows focus to move outside the modal if needed
//       aria-labelledby='modal-title'
//       aria-describedby='modal-description'
//       closeAfterTransition // Smooth transition
//       keepMounted // Improves performance by keeping the modal in the DOM
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//         }}
//         onClick={onClose}>
//         <Paper
//           sx={{
//             width: '80%',
//             maxWidth: '900px',
//             padding: 3,
//             borderRadius: 2,
//             display: 'flex',
//             backgroundColor: 'rgba(102, 102, 102, 1)',
//             color: '#fff',
//           }}
//           onClick={(e) => e.stopPropagation()}>
//           <Grid container spacing={2}>
//             {/* Left Card (Description & Pricing) */}
//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   width: 'auto',
//                   height: 'auto',
//                   backgroundColor: '#222',
//                   border: '1px',
//                   color: '#fff',
//                   padding: '42px',
//                   // gap:"16px",
//                   borderRadius: '10px',
//                 }}>
//                 <img src='/icons/Union.svg' />

//                 <Typography>
//                   <Typography fontSize={'1.5rem'}>Welcome to Memvy</Typography>
//                   <Typography fontSize={'1.1rem'} color={'#CCCCCC'} lineHeight={'20px'}>
//                     The Future of Enjoying the Past
//                   </Typography>
//                 </Typography>

//                 <Typography fontSize={'1.125rem'} lineHeight={'21.6px'} marginTop={'10px'}>
//                   We’ve partnered with the SEC to make the Championship Game truly unforgettable. Gain exclusive access
//                   to a curated Memvy story for only $5.
//                 </Typography>

//                 <Typography gap={'16px'} marginTop={'10px'}>
//                   <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
//                     <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
//                     Exclusive content from name, name, name and many more
//                   </Typography>

//                   <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
//                     <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
//                     Immerse yourself in stories, video, photo, and audio collections
//                   </Typography>

//                   <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
//                     <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
//                     Experience the excitement of gameday again and again
//                   </Typography>
//                 </Typography>

//                 <Typography>
//                   <hr style={{ border: '1px solid grey', marginTop: '35px' }} />
//                   <Typography variant='h4' style={{ marginTop: '35px' }}>
//                     $5.00
//                   </Typography>
//                 </Typography>
//               </Box>
//             </Grid>

//               {/* Right Card (Payment Form) */}
//               <Grid item xs={12} md={6}>
//                 <Card
//                   sx={{
//                     padding: '20px',
//                     bgcolor: 'rgba(102, 102, 102, 1)',
//                     boxShadow: 'none',
//                   }}
//                 >
//                   <CardContent>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar
//                         sx={{
//                           backgroundColor: 'red',
//                           color: 'white',
//                           width: 35,
//                           height: 35,
//                         }}
//                       >
//                         1
//                       </Avatar>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           mx: 1,
//                           wordWrap: 'break-word',
//                           whiteSpace: 'normal',
//                         }}
//                       >
//                         Create Account
//                       </Typography>

//                       <Avatar
//                         sx={{
//                           backgroundColor: 'black',
//                           color: 'white',
//                           width: 35,
//                           height: 35,
//                         }}
//                       >
//                         2
//                       </Avatar>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           mx: 1,
//                           wordWrap: 'break-word',
//                           whiteSpace: 'normal',
//                         }}
//                       >
//                         One Time Payment
//                       </Typography>

//                       <Avatar
//                         sx={{
//                           backgroundColor: 'black',
//                           color: 'white',
//                           width: 35,
//                           height: 35,
//                         }}
//                       >
//                         3
//                       </Avatar>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           mx: 1,
//                           wordWrap: 'break-word',
//                           whiteSpace: 'normal',
//                         }}
//                       >
//                         Access The Story
//                       </Typography>
//                     </Box>

//                     {/* Email Input */}
//                     <TextField
//                       fullWidth
//                       label="Email"
//                       variant="outlined"
//                       margin="normal"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       sx={{
//                         background: '#fff',
//                         borderRadius: '10px',
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: '10px',
//                         },
//                       }}
//                     />

//                     {/* Password Input */}
//                     <TextField
//                       fullWidth
//                       label="Password"
//                       variant="outlined"
//                       margin="normal"
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       sx={{
//                         background: '#fff',
//                         borderRadius: '10px',
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: '10px',
//                         },
//                       }}
//                     />

//                     {/* Confirm Password Input */}
//                     <TextField
//                       fullWidth
//                       label="Confirm Password"
//                       variant="outlined"
//                       margin="normal"
//                       type="password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       sx={{
//                         background: '#fff',
//                         borderRadius: '10px',
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: '10px',
//                         },
//                       }}
//                     />

//                     <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', color: 'rgba(238, 238, 238, 1)' }}>
//                       <Typography>or</Typography>
//                     </Box>
//                     <Button
//       variant="contained"
//       fullWidth
//       startIcon={<GoogleIcon />}
//        sx={{
//     marginTop: '10px',
//     mb: 1,
//   // Set the width to increase the button size
//     height: '80px',  // Set the height to make the button taller
//     backgroundColor: 'rgba(34, 34, 34, 0.8)', // Apply RGBA color here
//     '&:hover': {
//       backgroundColor: 'rgba(34, 34, 34, 1)', // Darker shade on hover
//     },
//     borderRadius: '10px', // Rounded corners for the button
//     padding: '25px', // Optional: Increase padding for more internal space
//   }}
//     >
//       Continue with Google
//     </Button>
//     <Button
//   variant="contained"
//   fullWidth
//   startIcon={<FacebookIcon />}
//   sx={{
//     marginTop: '10px',
//     mb: 1,
//   // Set the width to increase the button size
//     height: '80px',  // Set the height to make the button taller
//     backgroundColor: 'rgba(34, 34, 34, 0.8)', // Apply RGBA color here
//     '&:hover': {
//       backgroundColor: 'rgba(34, 34, 34, 1)', // Darker shade on hover
//     },
//     borderRadius: '10px', // Rounded corners for the button
//     padding: '25px', // Optional: Increase padding for more internal space
//   }}
// >
//   Continue with Facebook
// </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Box>
//     </Modal>
//   );
// };

// export default PopupModal;


import React, { useState } from 'react';
import {
  Modal,
  Box,
  Paper,
  Grid,

  Typography,

} from '@mui/material';
import Stepper from './StepperPaywall';


interface PopupModalProps {
  open: boolean;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <Modal
      open={open}
      onClose={onClose} // Close the modal when clicking outside
      disableAutoFocus // Prevents auto-focus on the first element
      disableEnforceFocus // Optional: Allows focus to move outside the modal if needed
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      closeAfterTransition // Smooth transition
      keepMounted // Improves performance by keeping the modal in the DOM
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
        onClick={onClose}>
        <Paper
          sx={{
            width: '80%',
            maxWidth: '900px',
            padding: 3,
            borderRadius: 2,
            display: 'flex',
            backgroundColor: 'rgba(102, 102, 102, 1)',
            color: '#fff',
          }}
          onClick={(e) => e.stopPropagation()}>
          <Grid container spacing={2}>
            {/* Left Card (Description & Pricing) */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: 'auto',
                  height: 'auto',
                  backgroundColor: '#222',
                  border: '1px',
                  color: '#fff',
                  padding: '42px',
                  // gap:"16px",
                  borderRadius: '10px',
                }}>
                <img src='/icons/Union.svg' />

                <Typography>
                  <Typography fontSize={'1.5rem'}>Welcome to Memvy</Typography>
                  <Typography fontSize={'1.1rem'} color={'#CCCCCC'} lineHeight={'20px'}>
                    The Future of Enjoying the Past
                  </Typography>
                </Typography>

                <Typography fontSize={'1.125rem'} lineHeight={'21.6px'} marginTop={'10px'}>
                  We’ve partnered with the SEC to make the Championship Game truly unforgettable. Gain exclusive access
                  to a curated Memvy story for only $5.
                </Typography>

                <Typography gap={'16px'} marginTop={'10px'}>
                  <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
                    <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
                    Exclusive content from name, name, name and many more
                  </Typography>

                  <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
                    <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
                    Immerse yourself in stories, video, photo, and audio collections
                  </Typography>

                  <Typography variant='body2' display={'flex'} alignItems={'flex-start'}>
                    <img src='/icons/RedTick.svg' style={{ marginRight: '8px' }} />
                    Experience the excitement of gameday again and again
                  </Typography>
                </Typography>

                <Typography>
                  <hr style={{ border: '1px solid grey', marginTop: '35px' }} />
                  <Typography variant='h4' style={{ marginTop: '35px' }}>
                    $5.00
                  </Typography>
                </Typography>
              </Box>
            </Grid>

            {/* Right Card (Payment Form) */}
            <Grid item xs={12} md={6}>
              <Stepper />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Modal>
  );
};

export default PopupModal;