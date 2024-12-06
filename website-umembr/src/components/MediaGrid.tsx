import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Divider,
  InputAdornment,
  Avatar,
  ClickAwayListener,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';

import Image from 'next/image';

import { palette } from '@/theme/constants';
import { styles } from './AppBar/CancelModal/styles';
import { getExtraContent, getMemories, getUserPurchases, removeMemory } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, extrasSelector, homeSelector, memorySelector, purchaseSelector } from '@/store/selectors';
import {
  cdn_url,
  checkPermissions,
  ExtractCallbackType,
  formatDate,
  hasUserPurchasedTheStory,
  promisifiedCallback,
} from '@/utils';
import { FilterDropdown, MuiButton, MuiIconButton, RtfComponent } from '@/components';
import Image1Icon from '../../public/icons/image1';

import Video1Icon from '../../public/icons/video1';
import Text1Icon from '../../public/icons/test1';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import Audio1Icon from '../../public/icons/audio1';

import { getCollaboratorsOptions, getPropmtsOptions } from '@/components/AppBar/constants';

import Audio2Icon from '../../public/icons/audioGradient';
import { DeleteMemoryModal, MemoryDetail } from '@/screens/Memories/components';
import { useRouter } from 'next/router';
import { Masonry } from '@mui/lab';
import PopupModal from './PayWallModal';
import VideoThumbnail from './VideoThumbnail';
import Search from './AppBar/Search';

type MediaType = 'image' | 'audio' | 'video' | 'text';

interface MediaItem {
  id?: any;
  extendedPalette: any;
  type: MediaType;
  src?: string;
  asset?: string;
  alt?: string;
  content?: string;
  username: string;
  userImage: string;
  title?: string;
  memory_details?: {
    complementaryImage?: string[];
    complementaryAudio?: string[];
    complementaryVideo?: string[];
    complementaryText?: string[];
  };
}

interface MediaGridProps {
  story?: any;
  extendedPalette?: any;
}

const MediaGrid: React.FC<MediaGridProps> = ({ story, extendedPalette }) => {
  const dispatch = useDispatch();
  const { memoriesLoaded } = useSelector(memorySelector);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { extraContent } = useSelector(extrasSelector);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const { status: deleteStatusMemory, switchStatus: switchDeleteMemory } = UseIntermitence();

  const [filter, setFilter] = useState('All');
  const [rotate, setRotate] = useState(false);
  const { stories } = useSelector(homeSelector);
  const prompts = getPropmtsOptions(stories, story);
  const { userPurchases } = useSelector(purchaseSelector);
  const { user, isAuth } = useSelector(authSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openPeople, setOpenPeople] = useState(false);
  const { status, switchStatus } = UseIntermitence();
  const homeData = useSelector(homeSelector);
  const [loading, setLoading] = useState(false);
  const collaborators = getCollaboratorsOptions(user?.collaborators || [], story);
  const [Types, setTypes] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const handleClose = (step: any): void => {
    if (step === 2) {
      setStep(step);
     
      dispatch(getUserPurchases(user && user?.id));
      setModalOpen(false);
    } else {
      setModalOpen(false);
    }
  };
  const { isDivider } = extendedPalette.isDividerCheck.isDivider || true;
  const callbackfunction = (flag: boolean) => {
    setIsFilterActive(flag);
  };
  useEffect(() => {
    if (story?.id) {
      setLoading(true);
      dispatch(getMemories(story?.id));
      dispatch(getExtraContent(router.query?.id as string));
    }
    setLoading(false);
  }, [story?.id, dispatch, step]);

  const handleOpenModal = (item: MediaItem) => {
    setSelectedMedia(item);
    setOpenModal(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const setShowFilters = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenFilters((openFilters) => !openFilters);
    setOpenNotification(false);
    setIsOpen(false);
    setOpenPeople(false);
  };
  const deleteMemory = async () => {
    setSelectedMedia(null);
    switchDeleteMemory();
    router.push(`/app/story/${story?.url}`);
    const { callback, promise } = promisifiedCallback<ExtractCallbackType<typeof removeMemory>>();
    dispatch(removeMemory({ id: selectedMedia?.id, story_id: story?.id }, callback));
    const { ok } = await promise;
    if (ok) {
    }
  };

  useEffect(() => {
    if (user && user.id) {
   
      dispatch(getUserPurchases(user && user?.id));
    }
  }, [step , setStep]);
  const AllowOpenModel = (item: any) => {
    if (user && user.id) {
      
      dispatch(getUserPurchases(user && user?.id));
    }
    if (extraContent) {
      if (extraContent.isPaid) {
        if (isAuth) {
          if (
            hasUserPurchasedTheStory(user.id, story.id, userPurchases) ||
            checkPermissions(user?.roles || [], 'CLIENT_STORY_GET', story?.id) ||
            user?.id === story?.user_id ||
            user?.roles?.find((role: any) => role.story_id === story?.id && role.role.name === 'Story_Owner')
          ) {
            setModalOpen(false);
            handleOpenModal(item);
            window.history.pushState({}, '', `/app/story/${story?.url}/?memoryId=${item?.id}`);
          } else {
            setModalOpen(true);
          }
        } else {
          setModalOpen(true);
        }
      } else {
        setModalOpen(false);
        handleOpenModal(item);
      }
    }
  };
  const AllowHandleLoadMore = () => {
    dispatch(getExtraContent(router.query?.id as string));
    if (user && user.id) {
      dispatch(getUserPurchases(user && user?.id));
    }
    if (extraContent) {
      if (extraContent.isPaid) {
        if (isAuth) {
          if (
            hasUserPurchasedTheStory(user.id, story.id, userPurchases) ||
            checkPermissions(user?.roles || [], 'CLIENT_STORY_GET', story?.id) ||
            user?.id === story?.user_id ||
            user?.roles?.find((role: any) => role.story_id === story?.id && role.role.name === 'Story_Owner')
          ) {
            setModalOpen(false);
            handleLoadMore();
          } else {
            setModalOpen(true);
          }
        } else {
          setModalOpen(true);
        }
      } else {
        setModalOpen(false);
      }
    }
  };
  const types = useMemo(() => {
    const types = [
      {
        id: 'video',
        label: 'Video',
      },
      {
        id: 'image',
        label: 'Image',
      },
      {
        id: 'audio',
        label: 'Audio',
      },
      {
        id: 'text',
        label: 'Text',
      },
    ];

    return types.filter((type) => memoriesLoaded?.some((memory: any) => memory.type === type.id));
  }, [memoriesLoaded]);

  UseFirstRender(() => {
    if (router?.query?.memoryId && memoriesLoaded.current) {
      const memory = memoriesLoaded.current
        .getMemories()
        .find((memory: any) => Number(memory?.id) === Number(router?.query?.memoryId));
      setSelectedMedia(memory);
      switchStatus();
    }
  }, [router?.query]);

  useEffect(() => {
    if (story?.url === router.query?.id)
      router.push(
        router?.query?.memoryId
          ? `/app/story/${story?.url}?memoryId=${router?.query?.memoryId}`
          : `/app/story/${story?.url}`,
      );
  }, [router.query?.id, story?.url]);

  const closeMemory = () => {
    setSelectedMedia(null);
    router.push(`/app/story/${story?.url}`);
    switchStatus();
  };
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {}, [isFilterActive]);

  const [isChronological, setIsChronological] = useState(story?.isChronological || false);

  const toggleSortingOrder = () => {
    setIsChronological((prev?: any) => !prev);
  };

  const filteredMediaItems = memoriesLoaded
    ?.filter(
      (item: any) =>
        (filter === 'All' || item.type === filter.toLowerCase()) &&
        (!search ||
          (search.length >= 3 &&
            (item.title?.toLowerCase().includes(search.toLowerCase()) ||
              item.username?.toLowerCase().includes(search.toLowerCase())))),
    )
    ?.sort((a: any, b: any) => {
      if (!isChronological) {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const allItemsLoaded = visibleItems >= filteredMediaItems.length;

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleRefresh = () => {
    setRotate(true);
    dispatch(getMemories(story?.id));
    setTimeout(() => setRotate(false), 1000);
  };

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const sizeText = isSmallScreen ? '25px' : '30px';
  const sizeImage = isSmallScreen ? '25px' : '40px';
  const sizeVideo = isSmallScreen ? '25px' : '40px';
  const sizeAudio = isSmallScreen ? '25px' : '40px';

  const getIcon = (type: string, color: string) => {
    switch (type) {
      case 'image':
        return <Image1Icon color={color} size={sizeImage} />;
      case 'video':
        return <Video1Icon color={color} size={sizeVideo} />;
      case 'audio':
        return <Audio1Icon color={color} size={sizeAudio} />;
      case 'text':
        return <Text1Icon color={color} size={sizeText} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <Box
          sx={{
            padding:'10px 1px 10px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            backgroundColor: extendedPalette.toolBarBackground ? extendedPalette.toolBarBackground : null,
            flexDirection:'row',
            borderRadius: '16px',
            margin:'8px',
          }}>
          
          <Search
            color={'linear-gradient(174deg, rgba(27, 27, 27, 0.5) -68.72%, rgba(0, 0, 0, 0.5) 269.6%),#333'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              sx={{ width: {
            xs: '12rem', // Small screens
            sm: '16rem', // Large screens
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Remove border
              color:"white"
            },
            '& input': {
              color: 'white', // Change the text and password dots color to white
            },
      
          },
          
      
          '& .MuiOutlinedInput-root.Mui-focused': {
            '& fieldset': {
              border: 'none', // Ensure no border on focus
            },
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px white inset', // Match the background color
            WebkitTextFillColor: 'white', // Match the text color
            transition: 'background-color 5000s ease-in-out 0s', // Prevent autofill background reset
          },
         }}
            />
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-end', sm: 'flex-end' },
              flexGrow: 1,
              flexWrap: { xs: 'nowrap', sm: 'nowrap' },
              gap: '2px',
              margin:'0',
            }}>
            {/* Sort Dropdown */}
            <MuiIconButton
              icon='/icons/sortIcon'
              altIcon='filter'
              background={
                isChronological ? ` ${palette.black}  !important` : `${extendedPalette.buttonbackgroundIcon} !important`
              }
              width={40}
              height={40}
              iconHeight={18}
              iconWidth={20}
              sx={{
                transform: !isChronological ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.9s ease',
                '&:hover': {
                  backgroundColor: extendedPalette.buttonbackgroundIcon,
                },
              }}
              method={(event: any) => toggleSortingOrder()}
            />
            <MuiIconButton
              icon='/icons/regenerate'
              altIcon='filter'
              background={palette?.black}
              width={40}
              height={40}
              iconHeight={25}
              iconWidth={20}
              sx={{
                transition: 'transform 3s ease',
                transform: rotate ? 'rotate(2000deg)' : 'rotate(0deg)',
                '&:hover': {
                  backgroundColor: extendedPalette.buttonbackgroundIcon,
                },
              }}
              method={(event: any) => handleRefresh()}
            />
            <MuiIconButton
              icon='/icons/filter'
              altIcon='filter'
              background={
                isFilterActive ? `${extendedPalette.buttonbackgroundIcon} !important` : ` ${palette.black}  !important`
              }
              borderColor={palette.black}
              width={40}
              height={40}
              iconHeight={12}
              iconWidth={20}
              sx={{
                transform: openFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  backgroundColor: extendedPalette.buttonbackgroundIcon,
                },
              }}
              method={(event: any) => setShowFilters(event)}
            />

            <ClickAwayListener onClickAway={handleCloseFilters} disableReactTree={true}>
              <Box position={'relative'}>
                <FilterDropdown
                  extendedPalette={extendedPalette}
                  callbackfunction={(flag: boolean) => callbackfunction(flag)}
                  top={'4rem'}
                  isOpen={openFilters}
                  listItem={[prompts, collaborators, types]}
                />
              </Box>
            </ClickAwayListener>
          </Box>
        </Box>

        {isDivider && <Divider sx={styles.divider} />}

        {/* Media Grid */}

          {memoriesLoaded.length > 0 ? (
        <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2} sx={{ margin: 0 }}>

     
          {  filteredMediaItems.slice(0, visibleItems).map((item: any, index: any) => (
              <Paper
                onClick={() => AllowOpenModel(item)}
                key={index}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundColor: extendedPalette.cardMediaBackground,
                  color: extendedPalette.cardMediaColor,
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                }}>
                {/* Card Header */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 16px',

                    color: extendedPalette.cardHeaderText,
                  }}>
                  {/* Media Icon and Text */}
                  <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '10px' }}>
                    <Box sx={{ mr: 1 }}>
                      {getIcon(item.type, extendedPalette.cardIconColor)} {/* Example color passed */}
                    </Box>
                    <Box>
                      <Typography
                        variant='body2'
                        sx={{
                          fontFamily: 'DM Sans',
                          fontSize: { xs: '14px', sm: '16px' },
                          fontWeight: 400,
                          lineHeight: { xs: '16.8px', sm: '19.2px' },
                          textAlign: 'left',
                        }}>
                        {item.title}
                      </Typography>

                      <Typography
                        variant='caption'
                        sx={{
                          fontFamily: 'DM Sans',
                          fontSize: { xs: '10px', sm: '12px' },
                          fontWeight: 400,
                          lineHeight: { xs: '12px', sm: '14.4px' },
                          textAlign: 'left',
                        }}>
                        {formatDate(item.created_at)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* User Avatar */}

                  <Avatar
                    src={item?.user?.picture ? `${cdn_url}${item?.user?.picture}` : '/icons/image1.svg'}
                    alt={item.username}
                    sx={{ width: 32, height: 32 }}
                    title={`${item?.user?.name} ${item?.user?.lastname}`}
                  />
                </Box>

                <Box
                  sx={{ padding: '16px' }}
                  onClick={() => {
                    AllowOpenModel(item);
                  }}>
                  {item.type === 'image' && (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderRadius: '12px' }}>
                      <Image
                        src={`${cdn_url}${item.asset}`}
                        alt={item.title}
                        layout='responsive'
                        width={100}
                        height={100}
                        style={{ borderRadius: '12px' }}
                      />
                    </Box>
                  )}
                  {item.type === 'video' && <VideoThumbnail videoSrc={`${cdn_url}${item.asset}`} />}
                  {item.type === 'audio' && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        gap: '5px',
                      }}>
                      {/* Left image with responsive size */}
                      <div
                        style={{
                          position: 'relative',
                          cursor: 'pointer',
                          width: '50px',
                          maxWidth: '15%',
                        }}>
                        <Image src={'/icons/playbut.svg'} alt={'icon'} layout='responsive' width={50} height={50} />
                      </div>

                      {/* Right image with responsive size */}
                      <div
                        style={{
                          position: 'relative',
                          cursor: 'pointer',
                          flex: '1',
                          display: 'flex',
                          justifyContent: 'center',
                          maxWidth: '70%',
                        }}>
                        <Audio2Icon
                          color={extendedPalette.audioGradientColor2}
                          color2={extendedPalette.audioGradientColor2}
                        />
                      </div>
                    </div>
                  )}
                  {item.type === 'text' && (
                    <Box
                      sx={{
                        maxHeight: { xs: '80px', sm: '80px', md: '135px' },
                        width: { xs: '100%', sm: '100%', md: '100%' },
                        overflow: 'hidden',
                        position: 'relative',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',

                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '15px',
                          background: 'linear-gradient(to bottom, rgba(43, 54, 114, 0))',
                        },
                      }}>
                      <RtfComponent rtf={item?.type === 'text' ? JSON.parse(item?.asset) : ''} label={'p'} />
                    </Box>
                  )}
                </Box>
              </Paper>
            ))
          }
          


        </Masonry>
):(

  <Box width={'100%'} height={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
  <CircularProgress sx={{ color: palette.faintGray }} />
</Box>
)
}

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          {!allItemsLoaded && (
            <MuiButton
              type='button'
              loading={false}
              backgroundColor={extendedPalette.buttonbackgroundIcon}
              variant={'contained'}
              sx={{
                '&:hover': {
                  backgroundColor: extendedPalette.buttonbackgroundIcon,
                },
              }}
              method={AllowHandleLoadMore}>
              <Typography variant='button' color={palette.white}>
                Load More{' '}
              </Typography>
            </MuiButton>
          )}
        </Box>
        <PopupModal open={modalOpen} onClose={(step: any) => handleClose(step)} />
        <MemoryDetail
          open={Boolean(selectedMedia)}
          isLocked={story && story.isLocked}
          onClose={closeMemory}
          mediaContent={selectedMedia}
          method={switchDeleteMemory}
        />
        <DeleteMemoryModal
          extendedPalette={extendedPalette}
          open={deleteStatusMemory}
          onClose={switchDeleteMemory}
          confirmMethod={deleteMemory}
        />
      </div>
    </>
  );
};

export default MediaGrid;
