import { Avatar, Box, Divider, MenuList, Typography, useMediaQuery, Theme } from '@mui/material';
import { palette } from '@/theme/constants';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { MuiButton } from '../Button';
import { useEffect, useState } from 'react';
import { UseFirstRender } from '@/hooks';
import { useDispatch } from 'react-redux';
import {
  approveMemory,
  removeMemory,
  acceptCollaborateNotification,
  deleteNotification,
  inviteAccepted,
  setGuest,
  clearAllNotifications,
} from '@/store/actions';
import moment from 'moment';
import { useRouter } from 'next/router';
import { cdn_url } from '@/utils';

const MotionContainer = motion(Box);
const MotionList = motion(MenuList);
const MotionBox = motion(Box);

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

interface CustomPopperProps {
  isOpen: boolean;
  handleClose: any;
  width?: string;
  listItem: any;
  type?: string;
  blur?: boolean;
  color?:any;
}

export const NotificationsPreview = ({color, isOpen, listItem, type, blur }: CustomPopperProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const [avatarUrls, setAvatarUrls] = useState<any>({});
const { pathname } = useRouter();
  const sortByDate = (listItem: any[]) => {
    return [...listItem].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  };
  const sortedListItem = sortByDate(listItem);

  UseFirstRender(() => {
    sortedListItem?.forEach((item: any) => {
      if (item.avatar && !avatarUrls[item.avatar]) {
        setAvatarUrls((prevState: any) => ({
          ...prevState,
          [item.avatar]: item?.avatar ? `${cdn_url}${item.avatar}` : '/images/default-user.png',
        }));
      }
    });
  }, [listItem]);

  const handleAccept = ({ actions, item }: any) => {
    // console.log(actions, "actions");
    // console.log(item, "item");
    if (actions?.type === 'COLLABORATION') {
      dispatch(setGuest(actions?.role));
      dispatch(inviteAccepted({ story_id: actions?.story_id, role_name: actions?.role }));
      dispatch(acceptCollaborateNotification(item));
      router.push(`/app/story/${actions?.story_id}`);
      dispatch(deleteNotification(item.id));
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
      // router.push(`/app/story/${actions?.story_url}`);
      dispatch(deleteNotification(item.id));
      return;
    }
  };

  const handleDeleteNotification = (notificationId: string, actions: any) => {
    const { memory_id, story_id } = actions;
    dispatch(deleteNotification(notificationId));
    if (actions?.type === 'APPROVAL' && memory_id && story_id) {
      dispatch(removeMemory({ id: memory_id, story_id }));
    }
  };

  const handlePreview = (item: any) => {
    //router.push(`/app/story/${item.actions?.story_url}/memory/create`);
    router.push(`/app/story/${item.actions?.story_url}/?memoryId=${item.actions?.memory_id}`);
  };

  const handleClearAll = () => {
    const typeofNotification =
      type == 'collaborator' ? 'collaboration' : type == 'notification' ? 'otherNotifications' : 'allNotifications';
    dispatch(clearAllNotifications({ type: typeofNotification }));
  };

  let bgColor =    router.pathname ===   '/app/home' ? palette.cardBackground :'transparent';
  let notificationColor =    router.pathname ===   '/app/home' ? palette.cardBackground :color;




  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          initial={!isOpen ? 'open' : 'closed'}
          exit={!isOpen ? 'open' : 'closed'}
          position={'fixed'}
          top={ blur? '4.375rem':'1rem'}
          right={blur? '1rem' : 0}
          zIndex={blur? 10000 : 10}
          sx={styles(isMobile, bgColor).dropDown}
          id='dropdown'
          animate={isOpen ? 'open' : 'closed'}>
          <MotionList
            sx={styles(isMobile).list}
            variants={{
              open: {
                clipPath: 'inset(0% 0% 0% 0%  )',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.2,
                  delayChildren: 0.1,
                  staggerChildren: 0.02,
                },
              },
              closed: {
                clipPath: 'inset(10% 50% 90% 50%)',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.2,
                },
              },
            }}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
            <Box display={'flex'} flexDirection={'column'}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                padding={'1rem'}
                alignItems={'center'}
                width={'100%'}>
                <Typography variant='body1'>
                  {t(type == 'notification' ? 'manage_notifications' : 'manage_notifications_collab')}
                </Typography>
                {sortedListItem.length > 0 && (
                  <Box sx={styles(isMobile).buttons}>
                    <MuiButton variant={'contained'} backgroundColor={notificationColor} borderRadius='6.35rem' method={() => handleClearAll()}
                       sx={{
    '&:hover': {
      backgroundColor: notificationColor, // Set your desired hover background color here
    }}}>
                      <Typography>{t('clear_all')}</Typography>
                    </MuiButton>
                  </Box>
                )}
              </Box>
              <Box padding={'0 1rem'}>
                <Divider sx={styles(isMobile).divider} />
              </Box>

              {sortedListItem?.length > 0 ? (
                <Box sx={{ overflowY: 'scroll' }} minHeight={'28rem'} height={'28rem'}>
                  {sortedListItem?.map((item: any) => {
                    const { title, message, avatar, created_at, actions } = item;
                    return (
                      <MotionBox key={item.id} sx={styles(isMobile).item} variants={itemVariants}>
                        <Box
                          width={'100%'}
                          display={'flex'}
                          flexDirection={'column'}
                          border={`0.063rem solid ${palette.cardBorder}`}
                          bgcolor={palette.cardBackground}
                          maxHeight={!isMobile ? '12rem' : '14rem'}
                          minHeight={'12rem'}
                          padding={'0.625rem'}
                          borderRadius={'0.5rem'}
                          margin={'0.5rem 0'}>
                          <Box display={'flex'}>
                            {avatarUrls[item.avatar] ? (
                              <Box borderRadius={'50%'}>
                                <Avatar sx={{ width: 40, height: 40 }} src={avatarUrls[avatar]} />
                              </Box>
                            ) : (
                              <Box borderRadius={'50%'}>
                                <Avatar sx={{ width: 40, height: 40 }} />
                              </Box>
                            )}
                            <Box
                              display={'flex'}
                              flexDirection={'column'}
                              marginLeft={'0.5rem'}
                              width={'100%'}
                              sx={styles(isMobile).container}>
                              <Typography variant='body1' marginBottom={'0.5rem'}>
                                {t(title)}
                              </Typography>
                              <Box width={'100%'} sx={styles(isMobile).subContainer}>
                                <Typography
                                  variant='body2'
                                  sx={styles(isMobile).content}
                                  paragraph
                                  marginBottom={'0.5rem'}>
                                  {t(message)}
                                </Typography>
                              </Box>

                              <Typography variant='body2' margin={'0.5rem 0'}>
                                {t(moment(created_at).format('hh:mm a • MM/DD/YYYY'))}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            {( actions?.type !== 'APPROVED' && actions?.type !== 'COLLABORATION_ACCEPTED') && (
                              <MuiButton
                                variant={'outlined'}
                                margin='1rem 0.5rem'
                                height='2.625rem'
                                method={() => handleDeleteNotification(item?.id, actions)}
                                disabled={actions?.action === 'ACCEPTED'}
                                sx={{'&:hover': {
      borderColor: notificationColor,  // Change the border color on hover
              // Change the text color on hover
    },
  }}>
                                <Typography color={palette.white}>{t('decline')}</Typography>
                              </MuiButton>
                            )}
                            {actions?.type !== 'COLLABORATION' && actions?.type !== 'COLLABORATION_ACCEPTED' && (
                              <MuiButton
                                variant={'outlined'}
                                margin='1rem 0.5rem'
                                
                                height='2.625rem'
                                method={() => handlePreview(item)}
                                sx={{'&:hover': {
      borderColor: notificationColor,  // Change the border color on hover
              // Change the text color on hover
    },
  }}>
                                <Typography>{t('preview')}</Typography>
                              </MuiButton>
                            )}

                            <MuiButton
                              variant={'contained'}
                              margin='1rem 0.5rem'
                              backgroundColor={notificationColor}
                              height='2.625rem'
                              method={() => handleAccept({ actions, item })}
                              disabled={actions?.action === 'ACCEPTED'}
                               sx={{
    '&:hover': {
      backgroundColor: notificationColor, // Set your desired hover background color here
    }}}>
                              <Typography>{actions?.type === 'COLLABORATION_ACCEPTED' || actions?.type === 'APPROVED'  ? t('close') :  t('accept')}</Typography>
                            </MuiButton>
                          </Box>
                        </Box>
                      </MotionBox>
                    );
                  })}
                </Box>
              ) : (
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  minHeight={'15rem'}
                  height={'15rem'}>
                  <Typography variant='subtitle2' fontWeight={'600'}>
                    {t('no_notifications')}
                  </Typography>
                </Box>
              )}
            </Box>
          </MotionList>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};
