import { Box } from '@mui/material';
import React from 'react';

interface NotificationBadgeProps {
  notifications: number;
  color?:any;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ notifications,color }) => {
  if (notifications === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        backgroundColor: 'red', // Naranja
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: {color}, // Blanco
        fontSize: '16px',
        fontWeight: 'bold',
      }}>
      {notifications > 99 ? '99+' : notifications}
    </Box>
  );
};

export default NotificationBadge;
