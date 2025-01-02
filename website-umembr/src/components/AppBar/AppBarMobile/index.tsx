import { FilterDropdown, MuiDropdown, MuiIconButton, NotificationsPreview } from '@/components';
import ProfilePopup from '@/components/AppBar/ProfilePopup';
import { expandDrawer, logout } from '@/store/actions';
import { extendedPalette, palette } from '@/theme/constants';
import { AppBar, Box, ClickAwayListener, Paper } from '@mui/material';
import { motion } from 'framer-motion';

import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../styles';

import { UseIntermitence } from '@/hooks';
import {
  authSelector,
  backgroundChangeSelector,
  hideGradientSelector,
  homeSelector,
  notificationsSelector,
  storySelector,
} from '@/store/selectors';
import { cdn_url, logoutWithFacebook } from '@/utils';
import { currentStorySelector, templatesSelector } from '@/store/selectors';
import Link from 'next/link';
import { CancelModal } from '../CancelModal';
import Search from '../Search';
import { getCollaboratorsOptions, getPropmtsOptions, inputVariants } from '../constants';
const MotionBox = motion(Box);
const MotionInputContainer = motion(Box);

export const MuiAppBarMobile: FC<any> = ({adminPalette, search, setSearch }) => {
  const dispatch = useDispatch();
  const hideGradient = useSelector(hideGradientSelector);
  const backgroundChange = useSelector(backgroundChangeSelector);
  const { user } = useSelector(authSelector);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [showHomeElements, setShowHomeElements] = useState(true);
  const notifications = useSelector(notificationsSelector);
  const { status, switchStatus } = UseIntermitence();
  const { stories } = useSelector(homeSelector);
  const { story } = useSelector(storySelector);
  const prompts = getPropmtsOptions(stories, story);
  const collaborators = getCollaboratorsOptions(user?.collaborators || [], story);
  const [notificationsData, setNotificationsData] = useState<any>([]);
  const [notificationsType, setNotificationsType] = useState<any>([]);

  const handleDrawerChange = () => {
    dispatch(expandDrawer());
  };

  const setShowDropdown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
  };

  const setShowNotification = (event: any) => {
    event?.preventDefault();
    event?.stopPropagation();
    setOpenNotification((openNotification) => !openNotification);
  };

  const setShowFilters = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenFilters((openFilters) => !openFilters);
  };

  const handleClose = (event: any) => {
    if (event?.target?.alt !== 'settings') setIsOpen(false);
  };
  const handleCloseNotifications = (event: any) => {
    if (event?.target?.alt !== 'notifications') setOpenNotification(false);
  };

  const handleCloseFilters = (event: any) => {
    if (event?.target?.alt !== 'filters') setOpenFilters(false);
  };

  useEffect(() => {
    if (router.pathname == '/app/home' || router?.pathname == '/app/story/[id]') return setShowHomeElements(true);
    setShowHomeElements(false);
  }, [router.pathname]);

  const getSettingsMobileOptions = [
    {
      label: 'notifications',
      action: () => {
        setShowNotification(event);
        setNotificationsType('notification');
        setNotificationsData(notifications?.notifications?.otherNotifications || [] || []);
        /*   handleCloseFilters(event); */
      },
    },
    {
      label: 'collaborators',
      action: () => {
        setShowNotification(event);
        setNotificationsType('collaborator');
        setNotificationsData(notifications?.notifications?.collaborationNotifications || []);
        /* handleCloseFilters(event); */
      },
    },
    {
      label: 'My profile',
      action: () => router.push('/app/profile'),
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

  const closeProcess = () => {
    if (
      router.pathname?.includes('memory/create') ||
      (router.pathname?.includes('story') && router.pathname?.includes('update'))
    )
      return router.push(`/app/story/${story?.url}`);
    else router.push('/app/home');
  };



  function addOpacityToHex(hexColor: string, opacity: number): string {
  // Ensure opacity is between 0 and 1
  const alpha = Math.min(Math.max(opacity, 0), 1);

  // Convert HEX to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return as RGBA string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
  const accentColorWithOpacity = addOpacityToHex(adminPalette.accentColor, 0.3);
  // const accentColor = adminPalette.accentColor;
 const buttonBackground =
    router.pathname === '/app/story/[id]' // Replace '/specific-page' with your desired route
      ? accentColorWithOpacity // Custom background for the specific page
      : palette?.cardBackground;



  return (
    <>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          // background:'transparent'
          background: backgroundChange
            ? hideGradient
              ? 'none'
              : 'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.25) 35%)'
            : 'transparent',
        }}>
        <Box display={'flex'} padding={'1rem'} justifyContent={'space-between'} alignItems={'center'}>
          {router.pathname == '/app/home' && !isExpanded && (
            <ProfilePopup
              onClick={handleDrawerChange}
              user={{ ...user, avatar: user?.picture ? `${cdn_url}${user?.picture}` : '' }}
            />
          )}

          {router.pathname !== '/app/home' && !isExpanded && (
            <Box height={'2.375rem'}>
              {router.pathname?.includes('memory/create') ? (
                <Link href={`/app/story/${story?.url}`}>
                  <MuiIconButton
                    icon='/icons/left-arrow'
                    background={palette?.cardBackground}
                    borderColor={palette?.cardBorder}
                    iconHeight={16}
                    iconWidth={16}
                    width={32}
                    height={32}
                    altIcon='left-arrow'
                  />
                </Link>
              ) : (
                <Link href={'/app/home'}>
                  <MuiIconButton
                    icon='/icons/left-arrow'
                    background={buttonBackground}
                    borderColor={palette?.cardBorder}
                    iconHeight={16}
                    iconWidth={16}
                    width={32}
                    height={32}
                    altIcon='left-arrow'
                  />
                </Link>
              )}
            </Box>
          )}

          {showHomeElements && (
            <Box
              display={'flex'}
              justifyContent={'flex-end'}
              flexGrow={isExpanded ? 1 : 0}
              zIndex={2}
              alignItems={'center'}
              gap={'0.5rem'}>
              <Paper
                component={MotionBox}
                bgcolor={'transparent !important'}
                elevation={0}
                initial='collapsed'
                animate={isExpanded ? 'expanded' : 'collapsed'}
                display={'flex'}
                alignItems={'center'}
                borderRadius={'6.25rem'}
                sx={isExpanded ? styles().paperMobileExpanded : undefined}
                overflow={'hidden'}>
                {!isExpanded && (
                  <MuiIconButton
                    icon='/icons/search'
                    altIcon='search'
                    background={buttonBackground}
                    borderColor={palette?.cardBorder}
                    positionIcon='flex-end'
                    method={() => setIsExpanded(!isExpanded)}
                  />
                )}

                <MotionInputContainer variants={inputVariants} transition={{ duration: 0 }}>
                  <Search
                  color={buttonBackground}
                    value={search}
                    onChange={(event: any) => setSearch(event.target.value)}
                    onClear={() => setSearch('')}
                  />
                </MotionInputContainer>
                {isExpanded && (
                  <Box>
                    <MuiIconButton
                      icon='/icons/close'
                      altIcon='close'
                      disableRipple
                      background={buttonBackground}
                      borderColor={palette?.cardBorder}
                      iconHeight={16}
                      iconWidth={16}
                      width={38}
                      height={38}
                      method={() => {
                        setIsExpanded(!isExpanded);
                        setSearch('');
                      }}
                    />
                  </Box>
                )}
              </Paper>

              {!isExpanded && (
                <>
                  <Box>
                    <MuiIconButton
                      icon='/icons/filter'
                      altIcon='filters'
                      background={buttonBackground}
                      borderColor={palette?.cardBorder}
                      positionIcon='flex-end'
                      iconHeight={12}
                      method={(event: any) => {
                        setShowFilters(event);
                        handleCloseNotifications(event);
                        handleClose(event);
                      }}
                    />
                    <ClickAwayListener
                      onClickAway={(event: any) => {
                        handleCloseFilters(event);
                      }}
                      touchEvent={false}
                      disableReactTree={true}>
                      <Box position={'relative'}>
                        <FilterDropdown extendedPalette={extendedPalette} isOpen={openFilters} listItem={[prompts, collaborators]} />
                      </Box>
                    </ClickAwayListener>
                  </Box>
                  <Box>
                    <MuiIconButton
                      icon='/icons/settings'
                      altIcon='settings'
                      background={buttonBackground}
                      borderColor={palette?.cardBorder}
                      method={(event: any) => {
                        setShowDropdown(event);
                        handleCloseFilters(event);
                        handleCloseNotifications(event);
                      }}
                    />
                    <ClickAwayListener onClickAway={(event: any) => handleClose(event)} disableReactTree={true}>
                      <Box position={'relative'}>
                        <MuiDropdown isOpen={isOpen} handleClose={handleClose} listItem={getSettingsMobileOptions} />
                      </Box>
                    </ClickAwayListener>

                    <ClickAwayListener
                      onClickAway={(event: any) => handleCloseNotifications(event)}
                      disableReactTree={true}>
                      <Box position={'relative'}>
                        <NotificationsPreview
                          isOpen={openNotification}
                          handleClose={handleCloseNotifications}
                          listItem={notificationsData}
                          type={notificationsType}
                        />
                      </Box>
                    </ClickAwayListener>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
      </AppBar>
      <CancelModal open={status} onClose={switchStatus} confirmMethod={closeProcess} />
    </>
  );
};

export default MuiAppBarMobile;
