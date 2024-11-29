import {
  FilterDropdown,
  MuiBreadcrumbs,
  MuiButton,
  MuiDropdown,
  MuiIconButton,
  NotificationsPreview,
} from '@/components';
import ProfilePopup from '@/components/AppBar/ProfilePopup';

import { expandDrawer, logout, openPublishModal } from '@/store/actions';

import {
  authSelector,
  hasChangesSelector,
  homeSelector,
  intermitenceSelector,
  memorySelector,
  notificationsSelector,
  storySelector,
} from '@/store/selectors';
import { extendedPalette, palette } from '@/theme/constants';
import { cdn_url, checkPermissions, logoutWithFacebook } from '@/utils';
import { AppBar, Box, ClickAwayListener, Stack, Typography } from '@mui/material';
import { currentStorySelector, templatesSelector } from '@/store/selectors';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../Search';
import { getCollaboratorsOptions, getPropmtsOptions } from '../constants';
import NotificationBadge from '../../../../public/icons/components/notificationBadge';
import { CancelModal } from '../CancelModal';
const MotionAppBar = motion(AppBar);
import { UseFirstRender, UseIntermitence } from '@/hooks';
import { usePathname } from 'next/navigation';

export const MuiAppBarDesktop: FC<any> = ({ search, setSearch }) => {
  const dispatch = useDispatch();
  const intermitenceData = useSelector(intermitenceSelector);
  const router = useRouter();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openPeople, setOpenPeople] = useState(false);
  const [showHomeElements, setShowHomeElements] = useState(true);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showBreadCrumbs, setShowBreadCrumbs] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const { status, switchStatus } = UseIntermitence();
  const notifications = useSelector(notificationsSelector);
  const hasChanges = useSelector(hasChangesSelector);
  const { stories } = useSelector(homeSelector);
  const { story } = useSelector(storySelector);
  const { user } = useSelector(authSelector);
  const prompts = getPropmtsOptions(stories, story);
  const collaborators = getCollaboratorsOptions(user?.collaborators || [], story);
  const { mediaScreenType } = useSelector(memorySelector);
  const query = router.pathname;
  const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '', // Default value
    textColor: '', // Default value
    accentColor: '', // Default value
  });

  console.log("query", query)
  

  const setShowDropdown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
    setOpenNotification(false);
    setOpenFilters(false);
    setOpenPeople(false);
  };

  const setShowNotification = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenNotification((openNotification) => !openNotification);
    setIsOpen(false);
    setOpenFilters(false);
    setOpenPeople(false);
  };

  const setShowFilters = (event: any) => {
    console.log("I am clicked")
    event.preventDefault();
    event.stopPropagation();
    setOpenFilters((openFilters) => !openFilters);
    setOpenNotification(false);
    setIsOpen(false);
    setOpenPeople(false);
  };

  const setShowPeople = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenPeople((openPeople) => !openPeople);
    setOpenNotification(false);
    setIsOpen(false);
    setOpenFilters(false);
  };

  const handleDrawerChange = () => {
    dispatch(expandDrawer());
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleCloseNotifications = () => {
    setOpenNotification(false);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };
  const handleClosePeople = () => {
    setOpenPeople(false);
  };

  useEffect(() => {
    if (router.pathname == '/app/home') {
      setShowHomeElements(true);
      setShowBreadCrumbs(false);
      return setShowCancelButton(false);
    }

    if (router?.asPath?.includes('story/create')) {
      setShowCancelButton(true);
      setShowBreadCrumbs(false);
      return setShowHomeElements(false);
    }

    if (router?.pathname == '/app/story/[id]') {
      setShowHomeElements(true);
      return setShowBreadCrumbs(true);
    }

    // if (router?.asPath?.includes(`story/${story?.title}/memory/create`)) {
    //   setShowHomeElements(false);
    //   return setShowBreadCrumbs(true);
    // }

    if (router.pathname == '/app/settings') {
      setShowHomeElements(false);
      setShowBreadCrumbs(true);
      return setShowCancelButton(false);
    }

    if (router.pathname.includes('memory/create') || router.pathname.includes('/update')) {
      setShowCancelButton(true);
      setShowBreadCrumbs(false);
      return setShowHomeElements(false);
    }

    setShowBreadCrumbs(false);
    setShowHomeElements(false);
    setShowCancelButton(false);
  }, [router.pathname]);

  const settingsOptions = [
    {
      label: 'settings',
      action: () => router.push('/app/settings'),
    },
    {
      label: 'logout',
      action: async () => {
        dispatch(logout());
        router.push('/app/login');
        await logoutWithFacebook();
      },
    },
  ];
 

  const handleCloseButton = ()=>{
    console.log(" i am the has changes", hasChanges.hasChanges)
      if (hasChanges.hasChanges) {
        switchStatus()
        return;
      }
    
      // Proceed with the existing close logic if no unsaved changes
      if (
        router.pathname?.includes('memory/create') ||
        (router.pathname?.includes('story') && router.pathname?.includes('update'))
      ) {
        router.push(`/app/story/${story?.url}`);
      } else {
        router.push('/app/home');
      }
  }

  const closeProcess = () => {  
    // Proceed with the existing close logic if no unsaved changes
    if (
      router.pathname?.includes('memory/create') ||
      (router.pathname?.includes('story') && router.pathname?.includes('update'))
    ) {
      router.push(`/app/story/${story?.url}`);
    } else {
      router.push('/app/home');
    }
  };
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
 const buttonBackground =
    router.pathname === '/app/story/[id]' // Replace '/specific-page' with your desired route
      ? accentColor // Custom background for the specific page
      : palette?.cardBackground;
  UseFirstRender(() => {
    const memoryHeight = document.getElementById('memories');
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (router?.pathname == '/app/story/[id]' && (entry.contentRect.height || 0) > 835) {
          setShowSlide(true);
        } else {
          setShowSlide(false);
        }
      }
    })
    if (memoryHeight) resizeObserver.observe(memoryHeight)
    if (router?.pathname == '/app/story/[id]' && (memoryHeight?.clientHeight || 0) > 835) {
      setShowSlide(true);
    } else {
      setShowSlide(false);
    }

    return () => { resizeObserver.disconnect() }
  }, [router?.pathname]);
  console.log("ïntermitttance data", intermitenceData)
  return (
    <>
      <MotionAppBar
        position='fixed'
        elevation={0}
        sx={{
          background: 'transparent',
          backdropFilter: intermitenceData?.backgroundChange ? 'blur(1.5625rem)' : 'none',
          ...showSlide ? { left: 0, width: '99.5%' } : {}
        }}>
        <Box display={'flex'} padding={'1rem'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <ProfilePopup
              onClick={handleDrawerChange}
              user={{ ...user, avatar: user?.picture ? `${cdn_url}${user?.picture}` : '' }}
              showName
            />
            {showBreadCrumbs && (
              <Box marginLeft={'1rem'} display={'flex'} alignItems={'center'}>
                {' '}
                <MuiBreadcrumbs route={intermitenceData?.actualSection} />{' '}
                {(checkPermissions(user?.roles || [], 'CLIENT_COLLABORATOR_ADD', story?.id) ||
                  user?.id === story?.user_id) && <Box width={'5.75rem'} marginLeft={'1rem'}>
                    <MuiButton
                      type='button'
                      backgroundColor={accentColor}
                      disabled={false}
                      loading={false}
                      variant={'contained'}
                      method={() => dispatch(openPublishModal())}
                       sx={{
    '&:hover': {
      backgroundColor: accentColor, // Set your desired hover background color here
    },
  }}>
                      <Typography variant='button' color='white'>{story?.status == 'draft' ? t('publish') : t('share')}</Typography>
                    </MuiButton>
                  </Box>}
              </Box>
            )}
          </Box>
          {showCancelButton && (
            <Box width={'5.75rem'}>
              <MuiButton
                type='submit'
                disabled={false}
                loading={false}
                variant={'outlined'}
                method={handleCloseButton}>
                <Typography variant='button'>{t('close')}</Typography>
              </MuiButton>
            </Box>
          )}
          {showHomeElements && (
            <Box display={'flex'} width={'7rem'} justifyContent={'space-between'} alignItems={'center'}>
              <Box position='relative'>
                <MuiIconButton
                
                  icon='/icons/notification'
                  altIcon='notification'
                  background={buttonBackground}
                  borderColor={palette?.cardBorder}
                  method={(event: any) => setShowNotification(event)}
                />
                <NotificationBadge notifications={notifications?.notifications?.otherNotifications?.length || 0} />
          
              </Box>
              <Box position='relative'>
                <MuiIconButton
                  icon='/icons/people'
                  altIcon='people'
                  background={buttonBackground}
                  borderColor={palette?.cardBorder}
                  method={(event: any) => setShowPeople(event)}
                />
                <NotificationBadge
                  notifications={notifications?.notifications?.collaborationNotifications?.length || 0}
                />
             
              </Box>
              <Box>
                <MuiIconButton
                  icon='/icons/settings'
                  altIcon='settings'
                  background={buttonBackground}
                  borderColor={palette?.cardBorder}
                  method={(event: any) => setShowDropdown(event)}
                />

                <ClickAwayListener onClickAway={handleClose} disableReactTree={true}>
                  <Box position={'relative'}>
                    <MuiDropdown isOpen={isOpen} handleClose={handleClose} listItem={settingsOptions} />
                  </Box>
                </ClickAwayListener>
              </Box>
            </Box>
          )}
        </Box>
        { !router.pathname.includes('app/story') && showHomeElements && (
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap={1}
            zIndex={2}
            paddingRight={'1rem'}>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              sx={{ width: '21.5rem' }}
            />
            <Box>
              <MuiIconButton
                icon='/icons/filter'
                altIcon='filter'
                background={palette?.cardBackground}
                borderColor={palette?.cardBorder}
                width={40}
                height={40}
                padding={0}
                iconHeight={12}
                iconWidth={20}
                method={(event: any) => setShowFilters(event)}
              />
            </Box>
          </Stack>
        )}
      </MotionAppBar>

      <ClickAwayListener onClickAway={handleCloseNotifications} disableReactTree={true}>
                  <Box position='relative'>
                    <NotificationsPreview
                      isOpen={openNotification}
                      handleClose={handleCloseNotifications}
                      listItem={notifications?.notifications?.otherNotifications || []}
                      type='notification'
                      blur={true}
                    />
                  </Box>
                </ClickAwayListener>

      <ClickAwayListener onClickAway={handleClosePeople} disableReactTree={true}>
                  <Box position='relative'>
                    <NotificationsPreview
                      isOpen={openPeople}
                      handleClose={handleClosePeople}
                      listItem={notifications?.notifications?.collaborationNotifications || []}
                      type={'collaborator'}
                      blur={true}
                    />
                  </Box>
                </ClickAwayListener>

      <ClickAwayListener onClickAway={handleCloseFilters} disableReactTree={true}>
        <Box position={'relative'}>
          <FilterDropdown isOpen={openFilters} listItem={[prompts, collaborators]} />
        </Box>
      </ClickAwayListener>
      <CancelModal open={status} onClose={switchStatus} confirmMethod={closeProcess} />
    </>
  );
};

export default MuiAppBarDesktop;
