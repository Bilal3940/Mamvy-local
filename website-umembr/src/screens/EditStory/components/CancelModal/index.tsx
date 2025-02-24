import { palette } from '@/theme/constants';

import { Modal, Theme, Typography, useMediaQuery, Box, Divider } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { MuiButton } from '@/components';
import { styles } from './styles';
import Link from 'next/link';

interface ModalDetailProps {
  open: boolean;
  onClose: () => void;
  confirmRoute: string;
  color?:string;
}

export const CancelModal = ({color, open, onClose, confirmRoute }: ModalDetailProps) => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
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
        border={`0.063rem solid ${palette.cardBorder}`}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography
            fontWeight={isMobile ? 500 : 600}
            textAlign={isMobile ? 'center' : 'left'}
            width={isMobile ? '80%' : '100%'}
            margin={isMobile ? 'auto' : '0 1rem'}
            variant={isMobile ? 'h5' : 'h4'}>
            {t('are_you_sure_cancel')}
          </Typography>
        </Box>

        <Typography textAlign={isMobile ? 'center' : 'left'} variant={isMobile ? 'body2' : 'body1'}>
          {t('data_going_lost')}
        </Typography>

        <Typography textAlign={isMobile ? 'center' : 'left'} variant={isMobile ? 'body2' : 'body1'}>
          {t('are_you_sure_want')}
        </Typography>

        <Divider sx={styles.divider} />
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
          <Box marginRight={'1rem'}>
            <MuiButton type='button' loading={false} variant={'outlined'} method={onClose}
             sx={{'&:hover': {
      borderColor: color  // Change the border color on hover
              // Change the text color on hover
    },
  }}>
              <Typography variant='button' color={palette.white}>
                {t('cancel')}
              </Typography>
            </MuiButton>
          </Box>
          <Box marginRight={'1rem'}>
            <Link href={confirmRoute}>
              <MuiButton type='submit' loading={false} variant={'contained'} backgroundColor={color} disabled={false}
              sx={{
    backgroundColor: color,
    '&:hover': {
      backgroundColor: color, // Add your hover color
    },
  }}>
                <Typography variant='button' color={palette.white}>
                  {t('confirm')}
                </Typography>
              </MuiButton>
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
