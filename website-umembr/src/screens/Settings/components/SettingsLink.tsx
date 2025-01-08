import React from 'react';
import { Box, Typography,  } from '@mui/material';
import {  MuiButton} from '@/components';
import Link from 'next/link';

interface SettingsLinksProps {
  t: (key: string) => string; // Assuming you have a translation function
  handleLogout: () => void;
  handleDeleteAccount: () => void;
  isMobile: boolean;
  palette?: any; // Assuming you have a palette object to manage colors
}

const SettingsLinks: React.FC<SettingsLinksProps> = ({
  t,
  handleLogout,
  handleDeleteAccount,
  isMobile,
  palette,
}) => {
  return (
    <Box display={'grid '} mt={1} justifyContent={'center'}>
    <Box  zIndex={100} display={'flex'} mt={1} gap={isMobile ? '0.7rem ' : '1.5rem'} justifyContent={'center'}>

      <Link href='/privacy'>
        <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{cursor:'pointer', textDecoration: 'underline' }}>
          {t('privacy_policy')}
        </Typography>
      </Link>
      <Link href='/terms'>
        <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{cursor:'pointer', textDecoration: 'underline' }}>
          {t('term_conditions')}
        </Typography>
      </Link>
      <Link href='mailto:contact@falcon9324.com'>
        <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{cursor:'pointer',  textDecoration: 'underline' }}>
          {t('contact')}
        </Typography>
      </Link>
    </Box>
    <Box display={'flex'} mt={2} justifyContent={'center'} gap={'2rem'} >
      <Box>
        <MuiButton
          minWidth={'8.688rem'}
          type='submit'
          variant='contained'
          sx={{
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(43, 54, 114, 1)',
            color: 'black',
            borderRadius: '2rem',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'rgba(43, 54, 114, 1)',
              boxShadow: 'none',
            },
            '&:focus': {
              backgroundColor: 'rgba(43, 54, 114, 1)',
              boxShadow: 'none',
            },
            '&:active': {
              backgroundColor: 'rgba(43, 54, 114, 1)',
              boxShadow: 'none',
            },
          }}
          method={() => handleLogout()}>
          <Typography fontSize={'0.8rem'} color={palette?.dirtyWhite} variant='button'>
            {t('logout')}
          </Typography>
        </MuiButton>
      </Box>
      <Box>
        <MuiButton
          type='submit'
          minWidth={'8.688rem'}
          variant='contained'
          sx={{
            marginBottom: '1.5rem',
            backgroundColor: 'rgba(43, 54, 114, 1)',
            color: 'black',
            borderRadius: '2rem',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'rgba(43, 54, 114, 1)',
              boxShadow: 'none',
            },
            '&:focus': {
              backgroundColor: 'rgba(43, 54, 114, 1)',
              boxShadow: 'none',
            },
            '&:active': {
              backgroundColor: 'rgba(43, 54, 114, 1)',
              boxShadow: 'none',
            },
          }}
          method={() => handleDeleteAccount()}>
          <Typography fontSize={'0.8rem'} color={palette?.dirtyWhite} variant='button'>
            {t('delete_account')}
          </Typography>
        </MuiButton>
      </Box>
      </Box>
    </Box>
  );
};

export default SettingsLinks;
