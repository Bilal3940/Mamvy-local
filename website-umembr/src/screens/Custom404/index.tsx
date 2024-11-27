import { palette } from '@/theme/constants';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';

export const Custom404 = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box display={'flex'} height={'100vh'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Typography
          textAlign={isMobile ? 'center' : 'left'}
          justifyContent={'center'}
          alignItems={'center'}
          fontSize={isMobile ? '2rem' : '3.75rem'}
          color={palette.white}>
          404 Page Not Found
        </Typography>
        <Typography
          textAlign={isMobile ? 'center' : 'left'}
          marginTop={'1rem'}
          width={isMobile ? '80%' : '100%'}
          variant={
            isMobile ? 'h5' : 'h4'
          }>{`We're sorry, but the page you were trying to view does not exist.`}</Typography>
      </Box>
    </Box>
  );
};
