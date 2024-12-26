import { useState } from 'react';
import { Modal, Typography, Box, Divider, TextField, useMediaQuery, Theme } from '@mui/material';
import { MuiButton } from '@/components';
import { styles } from './styles';
import { palette } from '@/theme/constants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { closeDeleteModal, deleteUser, openModal } from '@/store/actions';
import { authSelector } from '@/store/selectors';

interface ModalDetailProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmationText: string; 
}

export const ConfirmationModal = ({ onClose, onConfirm, confirmationText }: ModalDetailProps) => {
  const [userInput, setUserInput] = useState('');
  const {user} = useSelector(authSelector)
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const dispatch = useDispatch()
const { open } = useSelector((state: any) => state.intermitence.deletionModal);



  const handleConfirm = async () => {
    if (userInput === confirmationText) {
      setLoading(true);
      setUserInput('');
      try {
        dispatch(deleteUser(user?.id))
        dispatch(closeDeleteModal())
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    } else {

      dispatch(openModal({content:'text_not_match'}))
    }
  };
      const handleClose = () => {
      setUserInput('');
        dispatch(closeDeleteModal());
      };
  if(!open) return null;

  return (
    <Modal open={open} onClose={handleClose} sx={styles.modal}>
      <Box
        width={isMobile ? '90%' : '38.1875rem'}
        height={'100%'}
        maxHeight={'20rem'}
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
        <Typography
          fontWeight={isMobile ? 500 : 600}
          textAlign={isMobile ? 'center' : 'left'}
          width={isMobile ? '80%' : '100%'}
          margin={isMobile ? 'auto' : '0 1rem'}
          variant={isMobile ? 'h5' : 'h4'}>
          Are you sure you want to delete your account?
        </Typography>
        <Typography textAlign={isMobile ? 'center' : 'left'} variant={isMobile ? 'body2' : 'body1'}>
          Please enter the following text to confirm:
        </Typography>
        <Typography variant='body1' mb={2} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {confirmationText}
        </Typography>
        <TextField
          variant='outlined'
          fullWidth
          sx={{
            background: '#fff',
          }}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder='Enter the text here'
        />
        <Divider sx={{ my: 2, width: '100%' }} />
        <Box display='flex' justifyContent='flex-end' width='100%'>
          <Box marginRight={'1rem'}>
            <MuiButton
              type='button'
              loading={false}
              variant={'outlined'}
              method={handleClose}
              sx={{
                '&:hover': {
                  borderColor: palette?.primary, 
                  
                },
              }}>
              <Typography variant='button' color={palette.white}>
                {t('cancel')}
              </Typography>
            </MuiButton>
          </Box>
          <Box marginRight={'1rem'}>
            <MuiButton
              type='button'
              variant='contained'
              method={handleConfirm}
              backgroundColor={palette?.primary}
              disabled={loading}>
              <Typography variant='button' color={palette.white}>
                {loading ? 'Deleting...' : 'Confirm'}
              </Typography>
            </MuiButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
