import { Box, Typography, useMediaQuery, Theme, Avatar, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import { MuiButton, MuiIconButton } from '@/components';
import { palette } from '@/theme/constants';

import { useTranslation } from 'next-i18next';

import { useDispatch } from 'react-redux';

import { UseFirstRender } from '@/hooks';
import {
  acceptCollaborateNotification,
  approveMemory,
  clearAllNotifications,
  deleteNotification,
  generalNotificationsView,
  getNotifications,
  inviteAccepted,
  removeMemory,
  setGuest,
} from '@/store/actions';
import moment from 'moment';
import { useRouter } from 'next/router';
import { cdn_url } from '@/utils';

export const Notifications = ({ notifications, user }: { notifications: any; user: any }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  //const notificationData = dummyNotification();
  //const notifications = useSelector(notificationsSelector);
  const isMobileLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [avatarUrls, setAvatarUrls] = useState<any>({});

  UseFirstRender(() => {
    dispatch(getNotifications());
  }, []);

  UseFirstRender(() => {
    if (user) {
      dispatch(generalNotificationsView(user.id));
    }
  }, [dispatch]);

  UseFirstRender(() => {
    notifications?.notifications?.allNotifications.forEach((item: any) => {
      if (item.avatar && !avatarUrls[item.avatar]) {
        setAvatarUrls((prevState: any) => ({
          ...prevState,
          [item.avatar]: `${cdn_url}/${item.avatar}`,
        }));
      }
    });
  }, [notifications]);

  const handleDeleteNotification = (notificationId: string, actions: any) => {
    const { memory_id, story_id } = actions;
    dispatch(deleteNotification(notificationId));
    if (actions?.type === 'APPROVAL' && memory_id && story_id) {
      dispatch(removeMemory({ id: memory_id, story_id }));
    }
  };

  const handleAccept = (item: any) => {
    const actions = item.actions;
    if (actions?.type === 'COLLABORATION') {
      dispatch(setGuest(actions?.role));
      dispatch(inviteAccepted({ id: actions?.story_id, role_name: actions?.role }));
      dispatch(acceptCollaborateNotification(item));
      router.push(`/app/story/${actions?.story_id}`);
      dispatch(deleteNotification(item.id));
      return;
    }
    if (actions?.memory_id && actions?.story_id && actions?.type === 'APPROVAL') {
      dispatch(approveMemory({ id: actions?.memory_id, story_id: actions?.story_id }));
      router.push(`/app/story/${actions?.story_url}`);
      dispatch(deleteNotification(item.id));
      return;
    }
    if (actions?.type === 'APPROVED') {
      router.push(`/app/story/${actions?.story_url}`);
      dispatch(deleteNotification(item.id));
      return;
    }
    if (actions?.type === 'COLLABORATION_ACCEPTED') {
      router.push(`/app/story/${actions?.story_url}`);
      dispatch(deleteNotification(item.id));
      return;
    }
  };
  const handlePreview = (item: any) => {
    router.push(`/app/story/${item.actions?.story_url}/?memoryId=${item.actions?.memory_id}`);
    // router.push(`/app/story/${item.actions?.story_url}/memory/create`);
  };
  const handleClearAll = () => {
    dispatch(clearAllNotifications({ type: 'allNotifications' }));
  };
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      bgcolor={palette.cardBackground}
      border={`0.063rem solid ${palette.cardBorder}`}
      sx={{ backdropFilter: 'blur(1.5625rem)' }}
      height={'calc(100vh - 6.375rem)'}
      minHeight={'calc(100vh - 6.735rem)'}
      padding={'1.5rem'}
      width={'100%'}
      borderRadius={'1.25rem'}>
      <Grid container display={'flex'} marginBottom={'2rem'} justifyContent={'flex-end'} alignItems={'flex-end'}>
        <Grid xs={isMobile ? 12 : isMobileLg ? 3 : 2}>
          {notifications?.notifications?.allNotifications?.length > 0 && (
            <MuiButton type='submit' variant={'contained'} method={() => handleClearAll()}>
              <Typography variant='button'>{t('clear_all')}</Typography>
            </MuiButton>
          )}
        </Grid>
      </Grid>
      <Divider sx={{ border: `0.063rem solid ${palette.cardBorder}`, marginBottom: '2rem' }} />

      <Box sx={{ overflowY: 'auto', overflowX: 'none' }} paddingRight={'0.5rem'}>
        {notifications?.notifications?.allNotifications.map((item: any) => {
          return (
            <Box
              width={'100%'}
              key={`${item?.title} ${item?.date} `}
              display={'flex'}
              flexDirection={'column'}
              bgcolor={palette.gray}
              justifyContent={'space-between'}
              maxHeight={isMobile ? '14rem' : '12rem'}
              minHeight={isMobile ? '14rem' : '12rem'}
              padding={'0.625rem'}
              borderRadius={'0.5rem'}
              sx={{ overflowY: 'auto' }}
              margin={'0.5rem 0'}>
              <Box display={'flex'}>
                {!isMobile &&
                  (avatarUrls[item.avatar] ? (
                    <Box borderRadius={'50%'}>
                      <Avatar sx={{ width: 40, height: 40 }} src={avatarUrls[item.avatar]} />
                    </Box>
                  ) : (
                    <Box borderRadius={'50%'}>
                      <Avatar sx={{ width: 40, height: 40 }} />
                    </Box>
                  ))}
                <Box display={'flex'} flexDirection={'column'} marginLeft={isMobile ? 0 : '0.5rem'} width={'100%'}>
                  <Box display={'flex'} marginBottom={'0.5rem'} justifyContent={'flex-start'} alignItems={'center'}>
                    <Typography variant='body1' marginRight={'1rem'}>
                      {t(item?.title)}
                    </Typography>
                    {!isMobile && <Typography variant='body2'>{t(item?.date)}</Typography>}
                  </Box>

                  <Box width={'100%'}>
                    <Typography variant='body2' paragraph margin={'0.5rem 0'}>
                      {t(item?.message)}
                    </Typography>
                  </Box>
                </Box>
                {item.actions?.type !== 'COLLABORATION' && item.actions?.type !== 'COLLABORATION_ACCEPTED' && (
                  <MuiIconButton
                    icon='/icons/close'
                    altIcon='close'
                    background={palette?.gray}
                    iconHeight={16}
                    iconWidth={16}
                    method={() => handleDeleteNotification(item?.id, item?.actions)}
                  />
                )}
              </Box>
              {isMobile && (
                <Typography variant='body2'>{t(moment(item?.created_at).format('hh:mm a • MM/DD/YYYY'))}</Typography>
              )}

              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                {item.actions?.type !== 'COLLABORATION' && item.actions?.type !== 'COLLABORATION_ACCEPTED' && (
                  <MuiButton
                    variant={'outlined'}
                    margin={isMobile ? '1rem 0' : '1rem 0.5rem'}
                    height='2.625rem'
                    method={() => handlePreview(item)}>
                    <Typography>{t('preview')}</Typography>
                  </MuiButton>
                )}
                {(item.actions?.type == 'COLLABORATION' || item.actions?.type == 'COLLABORATION_ACCEPTED') && (
                  <MuiButton
                    variant={'outlined'}
                    margin='1rem 0.5rem'
                    height='2.625rem'
                    method={() => handleDeleteNotification(item?.id, item?.actions)}>
                    <Typography color={palette.primary}>{t('cancel')}</Typography>
                  </MuiButton>
                )}
                <MuiButton
                  variant={'contained'}
                  margin='1rem 0.5rem'
                  height='2.625rem'
                  method={() => handleAccept(item)}>
                  <Typography>{t('accept')}</Typography>
                </MuiButton>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
