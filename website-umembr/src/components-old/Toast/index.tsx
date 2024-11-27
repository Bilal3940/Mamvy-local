import { Snackbar, Slide, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { intermitenceSelector } from '@/store/selectors';
import { useTranslation } from 'next-i18next';
import { palette } from '@/theme/constants';

export const Toast = () => {
  const { toast } = useSelector(intermitenceSelector);

  const { t } = useTranslation();

  return (
    <Slide direction='left' in={toast.show} timeout={{ enter: 600, exit: 600 }} data-cy='toast'>
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          marginTop: '0.3rem',
          width: '100% !important',
          right: '0 !important',
          left: '0 !important',
        }}>
        <Box
          display={'flex'}
          bgcolor={toast?.type == 'success' ? palette?.primary : palette?.error}
          padding={'0.5rem'}
          borderRadius={'0.5rem'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Typography margin={'0 0.5rem'} variant='subtitle1'>
            {t(toast?.message)}
          </Typography>
        </Box>
      </Snackbar>
    </Slide>
  );
};
