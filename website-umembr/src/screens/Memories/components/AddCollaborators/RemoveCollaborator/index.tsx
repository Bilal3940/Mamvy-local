import { palette } from '@/theme/constants';

import { Modal, Theme, Typography, useMediaQuery, Box, Divider } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { MuiButton } from '@/components';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { removeCollaborator, removeCollaboratorNoRegister } from '@/store/actions';
import { useRouter } from 'next/router';

interface ModalDetailProps {
  color?:any;
  open: boolean;
  onClose: () => void;
  confirmMethod?: () => void;
  values: any;
  role?: any;
  noRegister?: any;
}

export const RemoveCollaborator = ({ color,open, onClose, values, noRegister }: ModalDetailProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  console.log("I ma not reg",noRegister)
  console.log("i ma useradmin",values)

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const deleteCollaborator = (collaborator: any, noRegister?: any) => {
    if (noRegister && noRegister.email) {
      dispatch(removeCollaboratorNoRegister({ story: collaborator, noRegister }));
    } else {
      dispatch(
        removeCollaborator({
          story_id: collaborator.story_id,
          guest_id: collaborator.user_id,
          role_name: collaborator?.role.name,
        }),
      );
    }
    onClose();
  };
  const { pathname } = useRouter();

   let bgColor =  pathname ===   '/app/home' ? palette.primary :color;

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Box
        width={isMobile ? '90%' : '38.1875rem'}
        // height={'25vh'}
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
            variant={isMobile ? 'h6' : 'h5'}>
            {t('are_you_sure_want_remove')}
          </Typography>
        </Box>

        <Typography textAlign={isMobile ? 'center' : 'left'} variant={isMobile ? 'body2' : 'body1'}>
          { noRegister?.email ? noRegister?.email  : values?.user?.email }
        </Typography>

        <Typography textAlign={isMobile ? 'center' : 'left'} variant={isMobile ? 'body2' : 'body1'}>
          {t('are_you_sure_want')}
        </Typography>
        <Divider sx={styles.divider} style={{ margin: '1rem' }} />
        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
          <Box marginRight={'1rem'}>
            <MuiButton type='button' loading={false} variant={'outlined'} method={onClose}
            sx={{'&:hover': {
      borderColor: bgColor,  // Change the border color on hover
              // Change the text color on hover
    },
  }}>
              <Typography variant='button' color={palette.white}>
                {t('cancel')}
              </Typography>
            </MuiButton>
          </Box>
          <Box marginRight={'1rem'}>
            <MuiButton
              type='submit'
              loading={false}
              variant={'contained'}
              backgroundColor={bgColor}
              disabled={false}
              method={() => deleteCollaborator(values, noRegister)}
               sx={{
    '&:hover': {
      backgroundColor:bgColor, // Add your hover color
    },
  }}>
              <Typography variant='button' color={palette.white}>
                {t('confirm')}
              </Typography>
            </MuiButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
