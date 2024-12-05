import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
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
import { cdn_url, checkPermissions, ExtractCallbackType, formatDate, hasUserPurchasedTheStory, promisifiedCallback } from '@/utils';
import { FilterDropdown, MuiIconButton, RtfComponent } from '@/components';
import Image1Icon from '../../public/icons/image1';

import Video1Icon from '../../public/icons/video1';
import Text1Icon from '../../public/icons/test1';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import Audio1Icon from '../../public/icons/audio1';

import { getCollaboratorsOptions, getPropmtsOptions } from '@/components/AppBar/constants';

import Audio2Icon from '../../public/icons/audioGradient';
import { DeleteMemoryModal, DeleteStoryModal, MemoryDetail } from '@/screens/Memories/components';
import { useRouter } from 'next/router';
import { Masonry } from '@mui/lab';
import PopupModal from './PayWallModal';
import VideoThumbnail from './VideoThumbnail';

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

const MediaGrid: React.FC<MediaGridProps> = ({story, extendedPalette }) => {
  const dispatch = useDispatch();
  const { memoriesLoaded } = useSelector(memorySelector);
  const [avatarError, setAvatarError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { extraContent } = useSelector(extrasSelector);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const { status: deleteStatusMemory, switchStatus: switchDeleteMemory } = UseIntermitence();
  // Define state for filter and selected media item
  const [filter, setFilter] = useState('All');
  const { stories } = useSelector(homeSelector);
  const prompts = getPropmtsOptions(stories, story);
  const { userPurchases } = useSelector(purchaseSelector);
  const { user, isAuth } = useSelector(authSelector);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
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
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE); // Number of items initially visible
  const [modalOpen, setModalOpen] = useState(false);
  const {purchase} = useSelector(purchaseSelector);
  const [step, setStep]=useState(0)
  const handleClose = (step:any): void =>{
    if (step===2) {
        setStep(step);
        setModalOpen(false);
        // router.reload();
      }else{
        setModalOpen(false);

      }
    
   
  } 
  console.log("i am the colab", collaborators)
  const { isDivider } = extendedPalette.isDividerCheck.isDivider || true;
  const callbackfunction = (flag: boolean) => {

    setIsFilterActive(flag);
  };
  useEffect(() => {
    if (story?.id) {
      setLoading(true);
      dispatch(getMemories(story?.id));
      dispatch(getExtraContent(router.query?.id as string))
    }
    setLoading(false);
  }, [story?.id, dispatch]);
  // console.log('i am the memory loded', memoriesLoaded);

  const handleOpenModal = (item: MediaItem) => {
    setSelectedMedia(item);
    setOpenModal(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const setShowFilters = (event: any) => {
    // console.log('I am clicked');
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
  }, []);
  const AllowOpenModel = (item:any) => {
    // Dispatch to fetch user purchases
  // Check if extraContent is available
  // alert('called');
 
  if(user &&  user.id ){
  dispatch(getUserPurchases( user && user?.id));
  }
  if (extraContent) {
    // alert('called iff');
    // Only check if the content is paid
    if (extraContent.isPaid) {
      if (isAuth) {
        // Check if the user has purchased the story
        if (hasUserPurchasedTheStory(user.id, story.id, userPurchases) || (checkPermissions(user?.roles || [], 'CLIENT_STORY_GET', story?.id) ||
        user?.id === story?.user_id ||
        user?.roles?.find(
          (role: any) => role.story_id === story?.id && role.role.name === 'Story_Owner',
        ))) {
          // console.log('User has purchased it');

          setModalOpen(false);  
          handleOpenModal(item);
          window.history.pushState({}, '', `/app/story/${story?.url}/?memoryId=${item?.id}`);// Close the modal if the user has purchased
        } else {
           console.log('User has not purchased it');
          setModalOpen(true);   // Keep the modal open if the user hasn't purchased it
        }
      } else {
        // console.log('User is not authenticated');
        setModalOpen(true); // Open the modal if the user is not authenticated
      }
    } else {
      // console.log('Content is not paid');
      setModalOpen(false);  // Close the modal if the content is not paid
    }
  }
}
const AllowHandleLoadMore = () => {
  // Dispatch to fetch user purchases
// Check if extraContent is available
dispatch(getExtraContent(router.query?.id as string))
if(user &&  user.id ){
  // console.log('calling purchases')
dispatch(getUserPurchases( user && user?.id));
}
if (extraContent) {
  // Only check if the content is paid
  if (extraContent.isPaid) {
    if (isAuth) {
      // Check if the user has purchased the story
      if (hasUserPurchasedTheStory(user.id, story.id, userPurchases)|| (checkPermissions(user?.roles || [], 'CLIENT_STORY_GET', story?.id) ||
      user?.id === story?.user_id ||
      user?.roles?.find(
        (role: any) => role.story_id === story?.id && role.role.name === 'Story_Owner',
      ))) {
        // console.log('User has purchased it');

        setModalOpen(false);  
        handleLoadMore();
       // window.history.pushState({}, '', `/app/story/${story?.url}/?memoryId=${item?.id}`);// Close the modal if the user has purchased
      } else {
         console.log('User has not purchased it');
        setModalOpen(true);   // Keep the modal open if the user hasn't purchased it
      }
    } else {
      // console.log('User is not authenticated');
      setModalOpen(true); // Open the modal if the user is not authenticated
    }
  } else {
    // console.log('Content is not paid');
    setModalOpen(false);  // Close the modal if the content is not paid
  }
}
}
  const types = useMemo(() => {
    // console.log(memoriesLoaded);

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

  console.log("memories loaded", memoriesLoaded)

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

  useEffect(() => {
  }, [isFilterActive]);

  const isChronological = true; 

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
      if (isChronological) {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    

  const allItemsLoaded = visibleItems >= filteredMediaItems.length;
  // loadmore button handler
  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE); // Load 10 more items on button click
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
        {/* // <Box sx={{ maxWidth: '100%', margin: '0 auto', padding: 2 }}> */}
        <Box
          sx={{
            maxWidth: '100%',
            minheight: '100vh',
            margin: '0 auto',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: 2,
            paddingBottom: 2,
          }}>
          {/* Search and Filter Controls */}
          <Box
            sx={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              backgroundColor: extendedPalette.toolBarBackground ? extendedPalette.toolBarBackground : null,
              flexDirection: { xs: 'row', sm: 'row' },
              borderRadius: '16px',
            }}>
            {/* Search Field */}
            {/* <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              sx={{ width: '16rem' }}
            /> */}
            {/* Search Field */}
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // onClear={() => setSearch('')}
              placeholder='Search'
              size='small'
              sx={{
                ...extendedPalette.searchField,
                '& .MuiInputBase-input': {
                  color: 'white', // Replace with your desired color
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Image src={'/icons/search.svg'} alt={'icon'} width={22} height={22} />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-end' }, // Center on mobile, align to the right on larger screens
                flexGrow: 1,
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                gap: 1, // Add some spacing between buttons if needed
              }}>
              {/* Sort Dropdown */}
              <MuiIconButton
                icon='/icons/filter'
                altIcon='filter'
                background={
                  isFilterActive
                    ? `${extendedPalette.buttonbackgroundIcon} !important`
                    : ` ${palette.black}  !important`
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
                    // Hover background color
                    backgroundColor: extendedPalette.buttonbackgroundIcon, // Adjust this color as needed
                  },
                }}
                method={(event: any) => setShowFilters(event)} // Toggle state on click
              />

              <ClickAwayListener onClickAway={handleCloseFilters} disableReactTree={true}>
                <Box position={'relative'}>
                  <FilterDropdown
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
              
          
          <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2} sx={{ margin: 0 }}>
            {filteredMediaItems  &&  filteredMediaItems.slice(0, visibleItems).map((item: any, index: any) => (
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
                  cursor: 'pointer', // Add cursor style to indicate clickability
                }}>
                {/* Card Header */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 16px',
                    // backgroundColor: extendedPalette.cardHeaderBackground,
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
                          fontSize: { xs: '14px', sm: '16px' }, // Responsive font size
                          fontWeight: 400,
                          lineHeight: { xs: '16.8px', sm: '19.2px' }, // Adjust line height for mobile
                          textAlign: 'left',
                        }}>
                        {item.title}
                      </Typography>

                      <Typography
                        variant='caption'
                        sx={{
                          fontFamily: 'DM Sans',
                          fontSize: { xs: '10px', sm: '12px' }, // Responsive font size for date
                          fontWeight: 400,
                          lineHeight: { xs: '12px', sm: '14.4px' }, // Adjust line height for mobile
                          textAlign: 'left',
                        }}>
                        {formatDate(item.created_at)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* User Avatar */}

                  <Avatar
                    src={item?.user?.picture ? `${cdn_url}${item?.user?.picture}` :'/icons/image1.svg'} // Use dummy avatar if image fails
                    alt={item.username}
                    sx={{ width: 32, height: 32 }}
                   title={`${item?.user?.name} ${item?.user?.lastname}`} // Show full name on hover
                    onError={() => setAvatarError(true)} // Set error state if image fails to load
                  />
                </Box>

                <Box
                  sx={{ padding: '16px' }}
                  onClick={() => {
                    AllowOpenModel(item);
                  }}>
                  {/* {item.type === 'image' && <Image src={`${cdn_url}${item.asset}`} alt={item.title} width={100} height={100} />} */}
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
                          width: '50px', // Default size for larger screens
                          maxWidth: '15%', // Responsive width for smaller screens
                        }}
                        // onClick={() => handleOpenModal(item)}
                      >
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
                          maxWidth: '70%', // Limits width for smaller screens
                        }}>
                        <Audio2Icon
                          color={extendedPalette.audioGradientColor2}
                          color2={extendedPalette.audioGradientColor2}
                        />
                        {/* <Image src={'/icons/audiolay.svg'} alt={'icon'} layout="responsive" width={199} height={55} /> */}
                      </div>
                    </div>
                  )}
                  {item.type === 'text' && (
                    <Box
                      sx={{
                        maxHeight: { xs: '80px', sm: '80px', md: '60px' }, // Approximate height for 3 lines
                        width: { xs: '100%', sm: '100%', md: '100%' }, // Responsive width
                        overflow: 'hidden',
                        position: 'relative',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', // Gradual fade effect
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                        // maskSize: '100% 100%',
                        // WebkitMaskSize: '100% 100%',
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '15px',
                          background: 'linear-gradient(to bottom, rgba(43, 54, 114, 0))', // Enhances the blur effect
                        },
                      }}>
                      <RtfComponent rtf={item?.type === 'text' ? JSON.parse(item?.asset) : ''} label={'p'} />
                    </Box>
                  )}
                </Box>
              </Paper>
            ))}
          </Masonry>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            {!allItemsLoaded && (
              <Button
                variant='contained'
                color='primary'
                onClick={AllowHandleLoadMore}
                sx={{
                  textTransform: 'none', // To maintain consistent typography with primary styling
                  fontWeight: '500',
                }}>
                Load More
              </Button>
            )}
          </Box>
        </Box>
        <PopupModal open={modalOpen} onClose ={ (step :any)=> handleClose(step)} />
        <MemoryDetail
          open={Boolean(selectedMedia)}
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
