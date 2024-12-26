import { useMediaQuery, Theme } from '@mui/material';
import React, { useDeferredValue, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { authSelector, homeSelector, storySelector, templatesSelector } from '@/store/selectors';
import MuiAppBarMobile from './AppBarMobile';
import MuiAppBarDesktop from './AppBarDesktop';
import {
  changeBackground,
  getMemories,
  getNotifications,
  getTemplate,
  refreshUserData,
  resetMemoryState,
  resetStoryState,
  searchStories,
} from '@/store/actions';
import { UseFirstRender } from '@/hooks';

export const MuiAppBar = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const [firstRender, setFirstRender] = useState(false);
  const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '', // Default value
    textColor: '', // Default value
    accentColor: '', // Default value
  });
  const router = useRouter();
  const authData = useSelector(authSelector);
  const dispatch = useDispatch();
  const homeData = useSelector(homeSelector);
  const [search, setSearch] = useState<string>('');
  const deferredSearch = useDeferredValue(search);
  const { story } = useSelector(storySelector);
  const {template} = useSelector(templatesSelector)

  UseFirstRender(() => {
    if (!firstRender) setFirstRender(true);

    //if (!authData?.isAuth && firstRender && router.pathname !== '/app/story/[id]') router.push('/app/login');

    if (authData?.isAuth && firstRender) dispatch(refreshUserData());
  }, [authData?.isAuth, firstRender]);

  UseFirstRender(() => {
    if (router?.pathname != '/app/story/[id]') dispatch(changeBackground(false));
    if (
      (!router?.pathname?.includes('memory') && !router?.pathname?.includes('story')) ||
      router.pathname?.includes('story/create') ||
      router.pathname === '/app/story/[id]'
    ) {
      dispatch(resetMemoryState());
      dispatch(resetStoryState());
    }
  }, [router.pathname]);

  UseFirstRender(() => {
    if (authData?.isAuth) {
      if (story?.id && story?.url === router.query.id) {
        return dispatch(getMemories(story?.id, { ...homeData?.criterias, search: deferredSearch }));
      }
      dispatch(searchStories({ ...homeData?.criterias, search: deferredSearch }));
    }
    if(story?.themeId){
      dispatch(getTemplate(story?.themeId))
    }

  }, [deferredSearch]);

  UseFirstRender(() => {
    dispatch(getNotifications());
  }, []);

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
  }, [template]); 

  return !isMobile ? (
    <MuiAppBarDesktop adminPalette={adminPalette} search={search} setSearch={setSearch} />
  ) : (
    <MuiAppBarMobile  adminPalette={adminPalette} search={search} setSearch={setSearch} />
  );
};

export default MuiAppBar;
