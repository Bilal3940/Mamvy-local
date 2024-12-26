import { palette } from '@/theme/constants';

import { Modal, Theme, Typography, useMediaQuery, Box, Divider } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { MuiButton } from '@/components';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/store/selectors';
import { UseFirstRender } from '@/hooks';
import { deleteMemoryViewG } from '@/store/actions';

interface ModalDetailProps {
  open: boolean;
  onClose: () => void;
  confirmMethod?: () => void;
  extendedPalette?: any;
}

export const DeleteMemoryModal = ({extendedPalette ,open, onClose, confirmMethod }: ModalDetailProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {user} = useSelector(authSelector)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  UseFirstRender(() => {
    if(user && open){
      dispatch(deleteMemoryViewG(user?.id))
    }
  },[user, dispatch, open])

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Box
        width={isMobile ? '90%' : '40.1875rem'}
        height={'25vh'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        padding={isMobile ? '1rem' : '1.5rem'}
        borderRadius={'1.25rem'}
        justifyContent={'space-between'}
        position={'relative'}
        bgcolor={palette.cardBackground}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}
        border={`0.063rem solid ${palette.cardBorder}`}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography
            fontWeight={isMobile ? 500 : 600}
            textAlign={isMobile ? 'center' : 'left'}
            width={isMobile ? '80%' : '100%'}
            margin={isMobile ? 'auto' : '0 1rem'}
            variant={isMobile ? 'h5' : 'h4'}>
            {t('are_you_sure')}
          </Typography>
        </Box>

        <Typography textAlign={isMobile ? 'center' : 'left'} variant={isMobile ? 'body2' : 'body1'}>
          {t('memory_going_deleted')}
        </Typography>

        {/* <Typography textAlign={isMobile ? 'center' : 'left'} variant={isMobile ? 'body2' : 'body1'}>
          {t('are_you_sure_want')}
        </Typography> */}

        <Divider sx={styles.divider} />
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
          <Box marginRight={'1rem'}>
            <MuiButton type='button' sx={{
              '&:hover':{
                borderColor: extendedPalette.buttonbackgroundIcon,
              }
            }} loading={false} variant={'outlined'} method={onClose}>
              <Typography variant='button' color={palette.white}>
                {t('cancel')}
              </Typography>
            </MuiButton>
          </Box>
          <Box marginRight={'1rem'}>
            <MuiButton type='submit' loading={false} variant={'contained'} 
             sx={{
              '&:hover':{
                backgroundColor: extendedPalette.buttonbackgroundIcon,
              }}}
               backgroundColor={extendedPalette.buttonbackgroundIcon}disabled={false} method={confirmMethod}
            >
              <Typography variant='button' color={palette.white}>
                {t('delete')}
              </Typography>
            </MuiButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
