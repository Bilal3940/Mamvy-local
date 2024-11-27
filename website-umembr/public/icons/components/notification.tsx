import { Box } from '@mui/material';
import React from 'react';
import { palette } from '@/theme/constants';

interface IconProps {
  color: string;
  notifications: number;
}

// const NotificationIconComponent: React.FC<IconProps> = ({ color, notifications }) => (
//   <svg width='20' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
//     <path
//       d='M8 19.75C9.1 19.75 10 18.85 10 17.75H6C6 18.85 6.89 19.75 8 19.75ZM14 13.75V8.75C14 5.68 12.36 3.11 9.5 2.43V1.75C9.5 0.92 8.83 0.25 8 0.25C7.17 0.25 6.5 0.92 6.5 1.75V2.43C3.63 3.11 2 5.67 2 8.75V13.75L0 15.75V16.75H16V15.75L14 13.75Z'
//       fill={color}
//     />
//     {notifications > 0 && ( 
//       <g transform='translate(6 -2)'>
//         <g transform='translate(6 2)'>
//           <circle cx='6' cy='6' r='6' fill='#EB8334' /> 
//           <text
//             x='5'
//             y='7'
//             dominantBaseline='middle'
//             textAnchor='middle'
//             fill='#FFFFFF'
//             fontSize='8px'
//           >
//             {notifications > 99 ? '99+' : notifications} 
//           </text>
//         </g>
//       </g>
//     )}
//   </svg>
// );
const NotificationIconComponentNew: React.FC<IconProps> = ({ color, notifications }) => (
  <Box position="relative" width="20px" height="20px">
    <svg width="20" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d='M8 19.75C9.1 19.75 10 18.85 10 17.75H6C6 18.85 6.89 19.75 8 19.75ZM14 13.75V8.75C14 5.68 12.36 3.11 9.5 2.43V1.75C9.5 0.92 8.83 0.25 8 0.25C7.17 0.25 6.5 0.92 6.5 1.75V2.43C3.63 3.11 2 5.67 2 8.75V13.75L0 15.75V16.75H16V15.75L14 13.75Z'
        fill={color}
      />
    </svg>
    {notifications > 0 && (
      <Box
        position="absolute"
        top="-4px"
        right="-4px"
        bgcolor={palette.primary}
        borderRadius="50%"
        width="16px"
        height="16px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="#FFFFFF"
        fontSize="10px"
      >
        {notifications > 99 ? '99+' : notifications}
      </Box>
    )}
  </Box>
);

export default NotificationIconComponentNew;
