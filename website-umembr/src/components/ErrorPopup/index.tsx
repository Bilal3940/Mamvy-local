import { closeModal } from '@/store/actions';
import { Box, Divider, Modal, Theme, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from '../AppBar/CancelModal/styles';
import { palette } from '@/theme/constants';
import { MuiButton } from '../Button';
import { useTranslation } from 'react-i18next';

export const ErrorPopup = () => {
    const { open, content } = useSelector((state: any) => state.intermitence.modal);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
      const { t } = useTranslation();
  
    if (!open) return null;
  
    const handleClose = () => {
      dispatch(closeModal());
    };
  
    return (
      <Modal open={open} onClose={handleClose} sx={styles.modal}>
        <Box
          width={isMobile ? '90%' : '38.1875rem'}
          height={'100%'}
          maxHeight={'10rem'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          padding={isMobile ? '1rem' : '1.5rem'}
          borderRadius={'1.25rem'}
          justifyContent={'space-between'}
          position={'relative'}
          bgcolor={palette.cardBackground}
          sx={{ backdropFilter: 'blur(1.5625rem)' }}
          border={`0.063rem solid ${palette.cardBorder}`}
        >
          <Typography variant="body1" mt={isMobile ? '0' : '2'} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {t(`${content}`)}
          </Typography>
          <Divider sx={{ backgroundColor: palette.cardBorder, my: 2, width: '100%' }} />
          <Box display="flex" justifyContent="center" width="100%">
            <Box>
              <MuiButton type="button" loading={false} variant={'outlined'} method={handleClose}>
                <Typography variant="button" color={palette.white}>
                  Close
                </Typography>
              </MuiButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  };
  
