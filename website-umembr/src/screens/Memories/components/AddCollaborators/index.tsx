import { palette } from '@/theme/constants';

import { Box, Grid, Modal, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { MuiButton } from '@/components';
import { styles } from './styles';
import Image from 'next/image';
import { Form } from './Form';
import { useDispatch, useSelector } from 'react-redux';
import { setPublication } from '@/store/actions';
import { intermitenceSelector, storySelector } from '@/store/selectors';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { base_url } from '@/utils';

interface ModalDetailProps {
  extendedPalette?: any;
  add: boolean;
  onClose: () => void;
  mediaContent?: any;
  method: () => void;
}

export const AddCollaborators = ({ add, onClose,extendedPalette }: ModalDetailProps) => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const story = useSelector(storySelector);
  const { loading } = useSelector(intermitenceSelector);
  const [link, setLink] = useState(false);
  const [linkCode, setLinkCode] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handlePublication = (publication: any) => {
    if (publication === 'public') {
      dispatch(setPublication({ ...story.story, isPrivate: false }));
    } else if (publication === 'private') {
      dispatch(setPublication({ ...story.story, isPrivate: true }));
    } else {
      dispatch(setPublication({ ...story.story, isPrivate: true, newCode: true }));
    }
  };
  const copyLink = () => {
    setLink(true);
    navigator.clipboard.writeText(`${base_url}${router?.asPath}${story?.story?.user?.refferal_code ? `?referral_code=${story?.story?.user?.referalCode?.trim()}` : ''}`);
    setTimeout(() => setLink(false), 2000);
  };

  const copyLinkCode = () => {
    setLinkCode(true);
    navigator.clipboard.writeText(`${base_url}${router?.asPath}?code=${story?.story?.password}${story?.story?.user?.refferal_code ? `?referral_code=${story?.story?.user?.referalCode?.trim()}` : ''}`);
    setTimeout(() => setLinkCode(false), 2000);
  };
  return (
    <Modal open={add} onClose={onClose} sx={styles.modal}>
      <Box
        display={'flex'}
        width={isMobile ? '100%' : '48.25rem'}
        height={isMobile ? '100%' : 'inherit'}
        maxHeight={isMobile ? '100%' : '95vh'}
        padding={'1.5rem'}
        borderRadius={isMobile ? 0 : '1.25rem'}
        flexDirection={'column'}
        justifyContent={isMobile ? 'flex-start' : 'space-between'}
        alignItems={'center'}
        position={'relative'}
        overflow={'auto'}
        bgcolor={palette.cardBackground}
        sx={{ backdropFilter: 'blur(1.5625rem)', outline: 'none' }}
        border={`0.063rem solid ${palette.cardBorder}`}>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={'1rem'}>
          <Box display={'flex'} alignItems={'center'}>
            <Box display={'flex'} gap={'1rem'} alignItems={'center'} width={'100%'}>
              <Image src='/icons/add-people.svg' alt='invite' width={24} height={24} />
              <Typography variant={isMobile ? 'body1' : 'h4'} color={palette.white}>
                {t('manage access')}
              </Typography>
              <Image
                src='/icons/close.svg'
                alt='close'
                style={{ cursor: 'pointer', marginLeft: 'auto' }}
                width={18}
                height={18}
                onClick={onClose}
              />
            </Box>
          </Box>
          {story?.story?.private ? (
            <>
              <Typography variant={isMobile ? 'body1' : 'h4'} color={palette.white}>
                {t('published_private')}
              </Typography>
              <Typography variant={isMobile ? 'body1' : 'h4'} color={palette.white}>
                {t('code')}:
              </Typography>
              <Typography
                display={'flex'}
                margin={'auto'}
                variant={isMobile ? 'body1' : 'h4'}
                padding={'1rem'}
                style={{ backgroundColor: palette.opacityGray, borderRadius: '14px', gap: '0.5rem' }}
                color={palette.white}>
                {t(`${story?.story?.password}`)}
                <Image
                  onClick={() => handlePublication('newCode')}
                  style={{ cursor: 'pointer' }}
                  src='/icons/regenerate.svg'
                  alt='new-code'
                  width={24}
                  height={24}
                />
              </Typography>
              <Grid item xs={3}>
                <Grid
                  width={'100%'}
                  display={'flex'}
                  flexDirection={isMobile ? 'column' : 'row'}
                  justifyContent={'space-between'}
                  gap={'1rem'}>
                  <MuiButton
                    type='button'
                    disabled={false}
                    loading={loading}
                    variant={'outlined'}
                    method={() => handlePublication('public')}
                     sx={{'&:hover': {
      borderColor: extendedPalette.buttonbackgroundIcon,  // Change the border color on hover
              // Change the text color on hover
    },
  }}>
                    <Typography color={palette.white} variant={isMobile ? 'caption' : 'button'}>
                      {t('to_public')}
                    </Typography>
                  </MuiButton>
                  <MuiButton
                    type='button'
                    disabled={false}
                    loading={false}
                    variant={'contained'}
                    method={() => copyLink()}
                    sx={{
                      backgroundColor: extendedPalette.buttonbackgroundIcon,
                      '&:hover': {
                        backgroundColor: extendedPalette.buttonbackgroundIcon, // Add your hover color
                      },
                    }}
                    >
                    <Typography variant={isMobile ? 'caption' : 'button'}>
                      {link ? t('copied') : t('copy link')}
                    </Typography>
                  </MuiButton>
                  <MuiButton
                    type='button'
                    disabled={false}
                    loading={false}
                    backgroundColor={extendedPalette.buttonbackgroundIcon}
                    variant={'contained'}
                    method={() => copyLinkCode()}
                     sx={{
    backgroundColor: extendedPalette.buttonbackgroundIcon,
    '&:hover': {
      backgroundColor: extendedPalette.buttonbackgroundIcon, // Add your hover color
    },
  }}>
                    <Typography variant={isMobile ? 'caption' : 'button'}>
                      {linkCode ? t('copied') : t('copy_link_with_code')}
                    </Typography>
                  </MuiButton>
                </Grid>
              </Grid>
            </>
          ) : !story?.story?.private && story?.story?.password === 'public' ? (
            <>
              <Typography variant={isMobile ? 'body1' : 'h4'} color={palette.white}>
                {t('published_public')}
              </Typography>
              <Grid item xs={2}>
                <Box width={'100%'} display={'flex'} justifyContent={'space-between'} gap={'1rem'}>
                  <MuiButton
                    type='button'
                    disabled={false}
                    loading={loading}
                    variant={'outlined'}
                    method={() => handlePublication('private')}
                    sx={{'&:hover': {
      borderColor: extendedPalette.buttonbackgroundIcon,  // Change the border color on hover
              // Change the text color on hover
    },
  }}>
                    <Typography color={palette.white} variant={isMobile ? 'caption' : 'button'}>
                      {t('to_private')}
                    </Typography>
                  </MuiButton>
                  <MuiButton
                    type='button'
                    disabled={false}
                    loading={false}
                    backgroundColor={extendedPalette.buttonbackgroundIcon}
                    variant={'contained'}
                    method={() => copyLink()}
                    sx={{
    backgroundColor: extendedPalette.buttonbackgroundIcon,
    '&:hover': {
      backgroundColor: extendedPalette.buttonbackgroundIcon, // Add your hover color
    },
  }}>
                    <Typography variant={isMobile ? 'caption' : 'button'}>
                      {link ? t('copied') : t('copy link')}
                    </Typography>
                  </MuiButton>
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Typography variant={isMobile ? 'body1' : 'h4'} color={palette.white}>
                {t('publish')}
              </Typography>
              <Grid item xs={2}>
                <Grid
                  width={'100%'}
                  display={'flex'}
                  flexDirection={isMobile ? 'column' : 'row'}
                  justifyContent={'space-between'}
                  gap={'1rem'}>
                  <MuiButton
                    type='button'
                    disabled={false}
                    backgroundColor={extendedPalette.buttonbackgroundIcon}
                    loading={false}
                    variant={'contained'}
                    method={() => handlePublication('private')}
                    sx={{ '&:hover': {
      backgroundColor: extendedPalette.buttonbackgroundIcon, // Add your hover color
    },
  }}>
                    <Typography variant={'button'}>{t('publish as private')}</Typography>
                  </MuiButton>
                  <MuiButton
                    type='button'
                    disabled={false}
                     backgroundColor={extendedPalette.buttonbackgroundIcon}
                    loading={false}
                    variant={'contained'}
                    method={() => handlePublication('public')}
                     sx={{ '&:hover': {
      backgroundColor: extendedPalette.buttonbackgroundIcon, // Add your hover color
    },
  }}>
                    <Typography variant={'button'}>{t('publish as public')}</Typography>
                  </MuiButton>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
        <Form onClose={onClose} extendedPalette={extendedPalette} />
      </Box>
    </Modal>
  );
};
