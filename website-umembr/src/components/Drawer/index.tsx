import { collapseDrawer } from '@/store/actions';
import { authSelector, intermitenceSelector } from '@/store/selectors';
import { palette } from '@/theme/constants';
import { Box, Drawer as MuiDrawer, Slide, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MuiIconButton } from '../IconButton';
import { styles } from './styles';
import { cdn_url } from '@/utils';

export const Drawer = () => {
  const intermitenceData = useSelector(intermitenceSelector);
  const { drawerOpen } = intermitenceData;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { user } = useSelector(authSelector);
  const [showImage, setShowImage] = useState(true);
  const [muiDrawerOpen, setMuiDrawerOpen] = useState(drawerOpen);

  const handleDrawerChange = (event: any) => {
    if (event?.target?.id === 'drawer' || event?.target?.alt === 'close') return dispatch(collapseDrawer());
  };


  return (
    <MuiDrawer
      variant='permanent'
      elevation={16}
      anchor='left'
      onClick={handleDrawerChange}
      PaperProps={{
        style: {
          width: drawerOpen || muiDrawerOpen ? '100%' : 0,
          opacity: drawerOpen ? 1 : 0,
          overflowX: 'hidden',
          height: '100%',
          background: 'transparent',
        },
      }}>
      <Slide
        appear
        id='drawer'
        direction={'right'}
        in={drawerOpen}
        mountOnEnter
        unmountOnExit
        onExited={() => setMuiDrawerOpen(false)}
        onEnter={() => setMuiDrawerOpen(true)}>
        <Box
          width={'100%'}
          height={'100%'}
          component={'div'}
          boxShadow={
            '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
          }>
          <Stack
            bgcolor={palette.cardBackground}
            border={isMobile ? 'none' : `0.063rem solid ${palette.cardBorder}`}
            sx={{
              margin: { xs: 0, md: '1rem' },
              height: { xs: '100%', md: 'calc(100vh - 2rem)' },
              width: { xs: '100%', md: '20.75rem' },
              borderRadius: { xs: 0, md: '1rem' },
              overflow: 'hidden',
              backdropFilter: 'blur(1.5625rem)',
            }}>
            <Stack
              direction='column'
              alignItems={'center'}
              justifyContent={'flex-start'}
              sx={{ overflowY: 'auto', p: '1.5rem 1rem', width: '100%', height: '100%', position: 'relative' }}>
              <Box
                sx={styles.icon}
                zIndex={1101}
                onClick={(event) => handleDrawerChange(event)}
                data-cy={'drawerButton'}>
                <MuiIconButton
                  icon={'/icons/close-circle-white'}
                  altIcon={'close'}
                  background={'transparent'}
                  iconHeight={20}
                  iconWidth={20}
                />
              </Box>
              <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                <Image
                  src={'/images/glyph-white.svg'}
                  alt={t('app_name')}
                  width={isMobile ? 69 : 90}
                  height={isMobile ? 64 : 84}
                  quality={80}
                />
              </Box>

              <Typography variant='body1' marginBottom={'1.5rem'}>
                {t('interactive_profile')}
              </Typography>

              <Box
                borderRadius={'50%'}
                width={isMobile ? 90 : 160}
                height={isMobile ? 90 : 160}
                minHeight={isMobile ? 90 : 160}
                minWidth={isMobile ? 90 : 160}
                position={'relative'}
                border={`0.1875rem solid ${palette.white}`}>
                <Image
                  onErrorCapture={() => setShowImage(false)}
                  src={
                    showImage && user.picture
                      ? `${cdn_url}${user?.picture}` || `/icons/person-outlined.svg`
                      : '/icons/person-outlined.svg'
                  }
                  alt='profile image'
                  fill
                  sizes='100%'
                  style={{
                    borderRadius: '50%',
                    width: '100%',
                    height: '100%',
                    objectFit:
                      showImage && user.picture ? (`${cdn_url}${user?.picture}` ? 'cover' : 'contain') : 'contain',
                  }}
                />
              </Box>

              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'column'}>
                <Typography variant={isMobile ? 'body1' : 'h4'} margin={'1rem 0 0.25rem 0'}>
                  {(user?.name || '') + ' ' + (user?.lastname || '')}
                </Typography>

                <Typography variant='subtitle2'>
                  {user?.address_city ? `${user?.address_city}, ${user?.address_state}` : ''}
                </Typography>
              </Box>

              <Box
                marginTop={'1rem'}
                display={'flex'}
                padding={'1rem'}
                width={'100%'}
                justifyContent={'space-between'}
                // bgcolor={palette.background}
                // borderRadius={'1.25rem'}
                 sx={{
    borderRadius: '10px',
    border: '1px solid rgba(204, 204, 204, 0.20)',
    background: 'linear-gradient(180deg, rgba(34, 34, 34, 0.45) 0%, rgba(17, 17, 17, 0.45) 100%)',
    backdropFilter: 'blur(25px)', // Applies the blur effect
  }}
                >
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                  <Typography variant='h5'>{user?.storyCount || 0}</Typography>
                  <Typography variant='h6'>{t('stories')}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                  <Typography variant='h5'>{user?.collaboratorCount || 0}</Typography>
                  <Typography variant='h6'>{t('collaborators')}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                  <Typography variant='h5'>{user?.collaborationsCount || 0}</Typography>
                  <Typography variant='h6'>{t('collaborations')}</Typography>
                </Box>
              </Box>
              {!!user?.description && (
                <Box
                  marginTop={'1rem'}
                  display={'flex'}
                  padding={'1rem'}
                  width={'100%'}
                  justifyContent={'space-between'}
                  bgcolor={palette.background}
                  borderRadius={'1.25rem'}>
                  <Typography variant='body2'>{user?.description}</Typography>
                </Box>
              )}
              {user?.collaborators?.length > 0 && (
                <Box
                  width={'100%'}
                  display={'flex'}
                  marginTop={'1.5rem'}
                  flexDirection={'column'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-start'}>
                  <Typography textAlign={'left'} variant='h4' marginBottom={isMobile ? '1rem' : 0}>
                    {t('collaborators')}
                  </Typography>
                  <Box
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'flex-start'}
                    flex={'1'}
                    alignItems={'flex-start'}
                    >
                    <Box display={'flex'} width={'100%'} flexDirection={'column'}>
                      {user?.collaborators?.map((item: any, index: number) => {
                        return (
                          <Box
                            marginTop={'1rem'}
                            key={`${item?.email} + ${index}`}
                            display={'flex'}
                            padding={'1rem'}
                            width={'100%'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            // bgcolor={palette.background}
                            // borderRadius={'1.25rem'}
                             sx={{
    borderRadius: '10px',
    border: '1px solid rgba(204, 204, 204, 0.20)',
    background: 'linear-gradient(180deg, rgba(34, 34, 34, 0.45) 0%, rgba(17, 17, 17, 0.45) 100%)',
    backdropFilter: 'blur(25px)', // Applies the blur effect
  }}
                            >
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                              <Box
                                width={isMobile ? 30 : 40}
                                height={isMobile ? 30 : 40}
                                sx={{ outline: `0.0625rem solid ${palette.white}` }}
                                borderRadius={'50%'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                position={'relative'}
                                overflow={'hidden'}>
                                <Image
                                  src={item?.picture ? `${cdn_url}${item?.picture}` : `/icons/person-outlined.svg`}
                                  alt='profile image'
                                  fill={!!item?.picture}
                                  width={item?.picture ? undefined : isMobile ? 20 : 30}
                                  height={item?.picture ? undefined :isMobile ? 20 : 30}
                                />
                              </Box>
                              <Box marginLeft={'0.5rem'}>
                                <Typography variant={'h6'}>{item?.userName}</Typography>
                                <Typography variant={'caption'}>
                                  {item?.name || ''} {item?.lastname || ''}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              )}
            </Stack>
          </Stack>
        </Box>
      </Slide>
    </MuiDrawer>
  );
};
