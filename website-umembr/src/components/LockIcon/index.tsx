import { Box } from '@mui/material';
import Image from 'next/image';
import Lock from '/public/icons/lock.svg'; 

const LockIcon = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '100%',
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image 
        src={Lock} 
        alt="Private" 
        title="Private Memvy"
        width={isMobile ? 30 : 40} 
        height={isMobile ? 30 : 40} 
      />
    </Box>
  );
};

export default LockIcon;
