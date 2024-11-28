import { palette } from '@/theme/constants';

import { MuiButton, MuiIconButton } from '@/components';
import { UseFirstRender } from '@/hooks';
import { approveMemory, deleteNotification, setCreateMemoryStep, viewMemory, viewMemoryG } from '@/store/actions';
import { authSelector, currentStorySelector, notificationsSelector } from '@/store/selectors';
import { checkPermissions, findNotificationByMemoryId } from '@/utils';
import { Box, Modal, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  templatesSelector } from '@/store/selectors'
import { AudioContent } from '../AudioContent';
import { ImageContent } from '../ImageContent';
import { MainContent } from '../MainContent';
import { TextContent } from '../TextContent';
import { VideoContent } from '../VideoContent';
import { styles } from './styles';

interface ModalDetailProps {
  open: boolean;
  onClose: () => void;
  mediaContent?: any;
  method: () => void;
}

export const MemoryDetail = ({ open, onClose, mediaContent, method }: ModalDetailProps) => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [mediaSelected, setMediaSelected] = useState('home');
  const { user } = useSelector(authSelector);
  const { isAuth } = useSelector(authSelector);
  const story = useSelector(currentStorySelector);
  const { notifications } = useSelector(notificationsSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '#333333', // Default value
    textColor: '#fff', // Default value
    accentColor: '#BF5700', // Default value
  });

  const [approve, setApprove] = useState();
  UseFirstRender(() => { 
    if (mediaContent?.id) {
      setMediaSelected('home');
      dispatch(viewMemory(mediaContent?.id));
      setApprove(mediaContent?.approved);
    }
  }, [mediaContent?.id]);

  const switchMedia = (media: string) => {
    switch (media) {
      case 'home':
        return (
          <MainContent description={mediaContent?.description} media={mediaContent} boxRef={boxRef} height={height} />
        );
      case 'image':
        return <ImageContent mediaData={mediaContent?.memory_details?.complementaryImage} boxRef={boxRef} />;
      case 'text':
        return <TextContent mediaData={mediaContent?.memory_details?.complementaryText} boxRef={boxRef} />;
      case 'video':
        return <VideoContent mediaData={mediaContent?.memory_details?.complementaryVideo} boxRef={boxRef} />;
      case 'audio':
        return <AudioContent mediaData={mediaContent?.memory_details?.complementaryAudio} boxRef={boxRef} />;

      default:
        return 'home';
    }
  };

  const mediasButton = useMemo(() => {
    const media = [{ name: 'home', label: 'home', icon: 'home' }];
    if (mediaContent?.memory_details?.complementaryImage) media.push({ name: 'image', label: 'image', icon: 'image' });
    if (mediaContent?.memory_details?.complementaryVideo) media.push({ name: 'video', label: 'video', icon: 'video' });
    if (mediaContent?.memory_details?.complementaryAudio)
      media.push({ name: 'audio', label: 'audio', icon: 'microphone' });
    if (mediaContent?.memory_details?.complementaryText) media.push({ name: 'text', label: 'text', icon: 'text' });
    return media;
  }, [mediaContent]);

  const notification = useMemo(
    () => findNotificationByMemoryId(notifications?.otherNotifications, mediaContent?.id),
    [notifications, mediaContent?.id],
  );
  UseFirstRender(() => {
    if (user && open && isAuth) dispatch(viewMemoryG(user?.id));
  }, [user, dispatch, open, isAuth]);

  const handleAcceptMemory = () => {
    dispatch(approveMemory({ id: mediaContent?.id, story_id: story?.id }));
    if (notification) dispatch(deleteNotification(notification.id));
    onClose();
    router.push(`/app/story/${story?.url}`);
  };

  const [height, setHeight] = useState(false);

  const boxRef = useRef<any>(null);
  useEffect(() => {
    const resize = () => {
      const windowOffset = window.innerHeight - 240;
      if (boxRef?.current?.offsetHeight > windowOffset) return setHeight(true);
      setHeight(false);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [boxRef.current, mediaSelected]);

  const { template } = useSelector(templatesSelector);

  useEffect(() => {
    if (template?.template?.colors) {
      const colors = template.template.colors.reduce((acc:any, color:any) => {
        // Map each color to the corresponding palette key
        switch (color.PLabel) {
          case 'storyBackground':
            acc.storyBackgroundColor = color.PValue;
            break;
          case 'TextColor':
            acc.textColor = color.PValue;
            break;
          case 'AccentColor':
            acc.accentColor = color.PValue;
            break;
          default:
            break;
        }
        return acc;
      }, {});

      // Set the colors to the adminPalette state
      setAdminPalette({
        storyBackgroundColor: colors.storyBackgroundColor || '#333333', // Fallback if color is missing
        textColor: colors.textColor || '#fff', // Fallback
        accentColor: colors.accentColor || '#BF5700', // Fallback
      });
    }
  }, [template]); // Make sure to add template to the dependency array

  const accentColor = adminPalette.accentColor;

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Box
        display={'flex'}
        width={isMobile ? '100%' : '40.1875rem'}
        maxHeight={isMobile ? '100%' : '95vh'}
        padding={'1.5rem'}
        height={isMobile ? '100%' : 'auto'}
        borderRadius={isMobile ? '0' : '1.25rem'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        alignItems={'center'}
        position={'relative'}
        bgcolor={palette.cardBackground}
        sx={{ backdropFilter: 'blur(1.5625rem)', outline: 'none' }}
        border={isMobile ? 'none' : `0.063rem solid ${palette.cardBorder}`}>
        <Box width={'100%'} height={'calc(100% - 4.25rem)'}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            flexDirection={isMobile ? 'column-reverse' : 'row'}>
            <Typography
              marginTop={isMobile ? '1rem' : '0'}
              fontSize={'1.125rem'}
              textAlign={isMobile ? 'center' : 'left'}
              width={isMobile ? '100%' : '50%'}
              fontWeight={'600'}>
              {mediaContent?.title}
            </Typography>

            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} width={isMobile ? '100%' : '50%'}>
              {((checkPermissions(user?.roles || [], 'CLIENT_MEMORY_DELETE', story?.id) &&
                user?.id === mediaContent?.user_id) ||
                user?.id === story?.user_id ||
                user?.roles?.find((role: any) => role.story_id === story?.id && role.role.name === 'Story_Owner')) && (
                <Box width={'6.5rem'} marginRight={'1rem'}>
                  <MuiButton type='button' loading={false} variant={'outlined'} method={method} sx={{
    '&:hover': {
      borderColor: accentColor,  // Change the border color on hover
      color: '#EB8334',         // Change the text color on hover
    },
  }}>
                    <Typography variant='button' color={palette.white}>
                      {t('delete')}
                    </Typography>
                  </MuiButton>
                </Box>
              )}
              {!approve &&
                (checkPermissions(user?.roles || [], 'CLIENT_STORY_UPDATE', story?.id) ||
                  user?.id === story?.user_id ||
                  user?.roles?.find(
                    (role: any) => role.story_id === story?.id && role.role.name === 'Story_Owner',
                  )) && (
                  <Box width={'6.5rem'} marginRight={'1rem'}>
                    <MuiButton
                      type='button'
                      backgroundColor={accentColor}
                      loading={false}
                      variant={'contained'}
                      disabled={false}
                      method={() => {
                        // dispatch(approveMemory({ id: selectedMemorie?.id, story_id: story?.id }));

                        handleAcceptMemory();
                      }}
                       sx={{
    '&:hover': {
      backgroundColor: accentColor, // Set your desired hover background color here
    },
  }}
                      >
                      <Typography variant='button' color={palette.white}>
                        {t('accept')}
                      </Typography>
                    </MuiButton>
                  </Box>
                )}
              {((checkPermissions(user?.roles || [], 'CLIENT_MEMORY_UPDATE', story?.id) &&
                user?.id === mediaContent?.user_id) ||
                user?.id === story?.user_id ||
                user?.roles?.find((role: any) => role.story_id === story?.id && role.role.name === 'Story_Owner')) && (
                <Box width={'6.5rem'} marginRight={'1rem'}>
                  <Link
                    href={`/app/story/${story?.url}/memory/create?memoryId=${mediaContent?.id}`}
                    onClick={() => {
                      dispatch(setCreateMemoryStep(1));
                    }}>
                    <MuiButton type='button' backgroundColor={accentColor} loading={false} variant={'contained'} disabled={false}  sx={{
    '&:hover': {
      backgroundColor: accentColor, // Set your desired hover background color here
    },
  }}>
                      <Typography variant='button' color={palette.white}>
                        {t('edit_mayus')}
                      </Typography>
                    </MuiButton>
                  </Link>
                </Box>
              )}
              <MuiIconButton icon='/icons/close' altIcon='close' background={'transparent'} method={onClose} />
            </Box>
          </Box>
          {switchMedia(mediaSelected)}
        </Box>

        <Box display={'flex'} bottom={'0.5rem'} marginTop={isMobile ? '2rem' : '1rem'}>
          {mediasButton.map((item: any, index: number) => {
            return (
              <Box key={`media-button-${index}`} margin={'0 0.5rem'}>
                <MuiIconButton
                  icon={`/icons/${item?.icon}`}
                  altIcon={item?.icon}
                  // background={mediaSelected === item?.name ? palette?.primary : palette?.black}
                  background={accentColor}
                  method={() => setMediaSelected(item?.name)}
                  label={item?.label}
                  disableRipple
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
};
