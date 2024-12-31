import { palette } from '@/theme/constants';
import { Box, CircularProgress, Fab, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';

import { clearExtraContent, clearTemplatesData, getProfileStories, logStorageUsage, openModal, showActualSection } from '@/store/actions';
import { authSelector, extrasSelector, homeSelector, intermitenceSelector, storagelogSelector } from '@/store/selectors';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseFirstRender, UseIntermitence, UseScrollMargin } from '@/hooks';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const StoryItem = dynamic(() => import('./elements/StoryItem'), {
  loading: () => <CircularProgress sx={{ color: palette.primary }} />,
  ssr: false,
});

const CategoriesContainer = dynamic(() => import('./elements/CategoriesContainer'), {
  loading: () => <CircularProgress sx={{ color: palette.primary }} />,
  ssr: false,
});

export const Home = () => {
  const { t } = useTranslation();

  const { separation } = useSelector(intermitenceSelector);
  const { criterias, stories, storiesResult, homeLoading } = useSelector(homeSelector);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);

  const containerMargin1 = UseScrollMargin(containerRef1);
  const containerMargin2 = UseScrollMargin(containerRef2);
  const containerMargin3 = UseScrollMargin(containerRef3);

  const { user } = useSelector(authSelector);

  const storageLog= useSelector((state:any)=>state.storageLog.storageLog)
  const { status: privateStatus, switchStatus: switchPublication } = UseIntermitence();
  const router = useRouter();
  // UseFirstRender(() => {
  //   if(user?.token){

  //     dispatch(getProfileStories());
  //     dispatch(clearExtraContent())
  //   }
  //   else{
  //     router?.push('/app/login')
  //   }
  //   dispatch(logStorageUsage({userId: user?.id, usedStoragePercentage: usedStoragePercentage}))

  // }, [user]);
  UseFirstRender(() => {
    if (user?.token) {
      dispatch(getProfileStories());
      dispatch(clearExtraContent());
    } else {
      router?.push('/app/login');
    }
  }, [user]);

  const handleItemClick = (item: any) => {
  

    if (item.resultContain && item.private) {
      const validRoles = ['Story_Collaborator', 'Story_Viewer', 'Story_Owner'];
      
      const hasRole = user?.roles?.find(
        (role: any) => role.story_id === item?.id && validRoles.includes(role.role.name),
      );
  
      const userIsCreator = user?.id === item?.user_id;
  
      if (hasRole || userIsCreator) {
        router.push(`/app/story/${item?.url}`);
      } else {
        dispatch(showActualSection(item?.title));
        switchPublication();
      }
    } else {
      dispatch(showActualSection(item?.title));
      router.push(`/app/story/${item?.url}`);
    }
  };
  
  useEffect(()=>{
    dispatch(clearTemplatesData())
  },[])

  const handlePublication = () => {
    switchPublication();
  };

  return (
    <>
     {/* <EventBenefitsPopup open={isPopupOpen} onClose={handleClosePopup} confirmMethod={() => alert('Proceeding to payment...')} /> */}
      {homeLoading ? (
        <Box width={'100%'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <CircularProgress sx={{ color: palette.primary }} />
        </Box>
      ) : (
        <Box
          display={'flex'}
          width={'100%'}
          height={'100vh'}
          paddingTop={separation}
          position={'relative'}
          flexDirection={'column'}
          zIndex={1}
          overflow={'auto'}>
          {stories?.draftStories?.length == 0 &&
          stories?.publishedStories?.length == 0 &&
          stories?.collaboratorStories?.length == 0 &&
          stories?.purchasedStories?.length == 0 &&
          criterias?.search?.length == 0 &&
          !homeLoading ? (
            <Box
              width={'100%'}
              height={'calc(100vh - 7.875rem)'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Box width={'100%'} height={'36rem'} position={'relative'}>
                <Image src={'/images/empty-stories.svg'} alt='Empty stories' fill priority sizes='100%' quality={80} />
              </Box>
            </Box>
          ) : (
            <Box display={'flex'} position={'relative'} flexDirection={'column'} zIndex={1}>
              {criterias?.search?.length == 0 &&
              criterias?.prompts?.length == 0 &&
              criterias?.collaborators?.length == 0 ? (
                <>
                 {stories?.purchasedStories?.length > 0 && (
                    <CategoriesContainer
                      {...{
                        title: 'purchased',
                        data: stories.purchasedStories,
                        t,
                        isMobile,
                        handleItemClick,
                        scrollMargin: containerMargin2,
                        containerRef: containerRef2,
                      }}
                    />
                  )}
                  {stories?.draftStories?.length > 0 && (
                    <CategoriesContainer
                      {...{
                        title: 'drafts',
                        data: stories.draftStories,
                        t,
                        isMobile,
                        handleItemClick,
                        scrollMargin: containerMargin1,
                        containerRef: containerRef1,
                      }}
                    />
                  )}
                  {stories?.publishedStories?.length > 0 && (
                    <CategoriesContainer
                      {...{
                        title: 'published',
                        data: stories.publishedStories,
                        t,
                        isMobile,
                        handleItemClick,
                        scrollMargin: containerMargin2,
                        containerRef: containerRef2,
                      }}
                    />
                  )}
                  {stories?.collaboratorStories?.length > 0 && (
                    <CategoriesContainer
                      {...{
                        title: 'collaborators',
                        data: stories.collaboratorStories,
                        t,
                        isMobile,
                        handleItemClick,
                        scrollMargin: containerMargin3,
                        containerRef: containerRef3,
                      }}
                    />
                  )}
                </>
              ) : (
                <>{resultsContainer(storiesResult, isMobile, handleItemClick, t, privateStatus, handlePublication)}</>
              )}
            </Box>
          )}
        </Box>
      )}
      <Fab
        size={isMobile ? 'medium' : 'large'}
        component={Link}
        href={'/app/story/create'}
        // color={'secondary'}
        sx={{ position: 'fixed', right: { xs: '0.75rem', lg: '1.5rem' }, bottom: { xs: '0.5rem', lg: '1.0rem' } }}>
        <Image
          src={`/icons/add.svg`}
          width={isMobile ? 20 : 26}
          height={isMobile ? 20 : 26}
          quality={80}
          alt={t('add')}
        />
      </Fab>
     
    </>
  );
};

const resultsContainer = (
  data: any,
  isMobile: boolean,
  handleItemClick: any,
  t: any,
  privateStatus: boolean,
  handlePublication?: any,
) => {
  return (
    <Grid
      container
      paddingRight={'1rem'}
      paddingLeft={'0.5rem'}
      columnSpacing={isMobile ? 1 : 1.5}
      width={isMobile ? '100%' : '100%'}
      margin={'2rem auto'}>
      {data?.length > 0 ? (
        <>
          {(data ?? [])?.map((item: any) => {
            return (
              <StoryItem
                key={item.id}
                isMobile={isMobile}
                item={{ ...item, resultContain: true }}
                isResult
                handleItemClick={handleItemClick}
                privateStatus={privateStatus}
                handlePublication={handlePublication}
              />
            );
          })}
        </>
      ) : (
        <Box
          display={'flex'}
          height={'calc(100vh - 12.375rem)'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          width={'100%'}>
          <Image src={`/icons/notfound.svg`} alt={'logo'} width={90} height={90} quality={80} />
          <Typography fontSize={'2rem'}>{t('not_results')}</Typography>
          <Typography variant={'h4'}>{t('broadening_search')}</Typography>
        </Box>
      )}
    </Grid>
  );
};
