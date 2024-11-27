import { palette } from '@/theme/constants';
import { Modal, Theme, Typography, useMediaQuery, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';

interface LoadingModalProps {
  open: boolean;
}

export const LoadingModal = ({ open }: LoadingModalProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Modal open={open} sx={styles.modal}>
      <Box
        width={isMobile ? '90%' : '38.1875rem'}
        height={'100%'}
        maxHeight={'12rem'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        padding={isMobile ? '1rem' : '1.5rem'}
        borderRadius={'1.25rem'}
        justifyContent={'space-between'}
        position={'relative'}
        bgcolor={palette.cardBackground}
        border={`0.04rem solid ${palette.cardBorder}`}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <CircularProgress size={isMobile ? 40 : 60} color='primary' />
          <Typography
            fontWeight={isMobile ? 500 : 600}
            textAlign={'center'}
            width={isMobile ? '80%' : '100%'}
            marginTop={'1rem'}
            variant={isMobile ? 'h6' : 'h5'}>
            {t('uploading_video')}
          </Typography>
          <Typography textAlign={'center'} variant={isMobile ? 'body2' : 'body1'} marginTop={'0.5rem'}>
            {t('this_might_take_some_time')}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
