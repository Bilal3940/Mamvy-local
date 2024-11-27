import { useMediaQuery, Theme } from '@mui/material';
import React, { useDeferredValue, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { authSelector, homeSelector, storySelector } from '@/store/selectors';
import MuiAppBarMobile from './AppBarMobile';
import MuiAppBarDesktop from './AppBarDesktop';
import {
  changeBackground,
  getMemories,
  getNotifications,
  refreshUserData,
  resetMemoryState,
  resetStoryState,
  searchStories,
} from '@/store/actions';
import { UseFirstRender } from '@/hooks';

export const MuiAppBar = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const [firstRender, setFirstRender] = useState(false);
  const router = useRouter();
  const authData = useSelector(authSelector);
  const dispatch = useDispatch();
  const homeData = useSelector(homeSelector);
  const [search, setSearch] = useState<string>('');
  const deferredSearch = useDeferredValue(search);
  const { story } = useSelector(storySelector);

  UseFirstRender(() => {
    if (!firstRender) setFirstRender(true);

    if (!authData?.isAuth && firstRender && router.pathname !== '/app/story/[id]') router.push('/app/login');

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
  }, [deferredSearch]);

  UseFirstRender(() => {
    dispatch(getNotifications());
  }, []);

  return !isMobile ? (
    <MuiAppBarDesktop search={search} setSearch={setSearch} />
  ) : (
    <MuiAppBarMobile search={search} setSearch={setSearch} />
  );
};

export default MuiAppBar;
