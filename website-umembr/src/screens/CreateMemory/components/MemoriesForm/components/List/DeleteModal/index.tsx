import { palette } from '@/theme/constants';

import { Modal, Typography, Box, Divider } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { MuiButton } from '@/components';
import { styles } from './styles';

interface ModalDetailProps {
  open: boolean;
  onClose: () => void;
  confirmMethod?: () => void;
}

export const DeleteModal = ({ open, onClose, confirmMethod }: ModalDetailProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Box
        width={'38.1875rem'}
        height={'25vh'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        padding={'1.5rem'}
        borderRadius={'1.25rem'}
        justifyContent={'space-between'}
        position={'relative'}
        bgcolor={palette.cardBackground}
        border={`0.063rem solid ${palette.cardBorder}`}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant={'h4'}>{t('are_you_sure')}</Typography>
        </Box>

        <Typography variant={'body1'}>{t('memory_going_deleted')}</Typography>

        <Typography variant='body1'>{t('are_you_sure_want')}</Typography>
        <Divider sx={styles.divider} />
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
          <Box marginRight={'1rem'}>
            <MuiButton type='button' loading={false} variant={'outlined'} method={onClose}>
              <Typography variant='button' color={palette.white}>
                {t('cancel')}
              </Typography>
            </MuiButton>
          </Box>
          <Box marginRight={'1rem'}>
            <MuiButton type='submit' loading={false} variant={'contained'} disabled={false} method={confirmMethod}>
              <Typography variant='button' color={palette.white}>
                {t('aprove')}
              </Typography>
            </MuiButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
