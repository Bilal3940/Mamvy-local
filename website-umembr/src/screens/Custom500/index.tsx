import { Layout } from '@/components';
import { palette } from '@/theme/constants';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';

export const Custom500 = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Layout>
      <Box display={'flex'} height={'100vh'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
          <Typography
            textAlign={isMobile ? 'center' : 'left'}
            justifyContent={'center'}
            alignItems={'center'}
            fontSize={isMobile ? '2rem' : '3.75rem'}
            color={palette.white}>
            500 An error has occurred
          </Typography>
          <Typography
            textAlign={'center'}
            marginTop={'1rem'}
            width={isMobile ? '80%' : '100%'}
            variant={isMobile ? 'h5' : 'h4'}>{`Please contact support`}</Typography>
        </Box>
      </Box>
    </Layout>
  );
};
