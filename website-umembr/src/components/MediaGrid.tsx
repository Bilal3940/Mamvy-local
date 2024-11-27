// import React, { useEffect, useState } from 'react';
// import { Box, Paper, Typography, Button, TextField, Divider, Link, InputAdornment, Avatar } from '@mui/material';
// import Masonry from '@mui/lab/Masonry';
// import { format } from 'date-fns';
// import Image from 'next/image';
// import MediaModal from './MediaModal';
// import { extendedPalette } from '@/theme/constants';
// import { styles } from '../../../../components/AppBar/CancelModal/styles';
// import VideoThumbnail from './VideoThumbnail';
// import { getMemories } from '@/store/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import { memorySelector } from '@/store/selectors';
// import { cdn_url } from '@/utils';
// import { RtfComponent } from '@/components';
// import Image1Icon from '../../../../../public/icons/image1';
// import Video1Icon from '../../../../../public/icons/video1';
// import Text1Icon from '../../../../../public/icons/test1';
// import Audio1Icon from '../../../../../public/icons/audio1';

// type MediaType = 'image' | 'audio' | 'video' | 'text';

// interface MediaItem {
//   type: MediaType;
//   src?: string;
//   asset?: string;
//   alt?: string;
//   content?: string;
//   username: string;
//   userImage: string;
//   title?: string;
//   memory_details?: {
//     complementaryImage?: string[];
//     complementaryAudio?: string[];
//     complementaryVideo?: string[];
//     complementaryText?: string[];
//   };
// }

// interface MediaGridProps {
//   story: any;
// }

// const MediaGrid: React.FC<MediaGridProps> = ({ story }) => {
//   const dispatch = useDispatch();
//   const { memoriesLoaded } = useSelector(memorySelector);
//    const [avatarError, setAvatarError] = useState(false);
//  const [openModal, setOpenModal] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
//   // Define state for filter and selected media item
//   const [filter, setFilter] = useState('All');

//    const { isDivider } = extendedPalette.isDividerCheck;

//   useEffect(() => {
//     dispatch(getMemories(story?.id));
//   }, [story, dispatch]);
//   console.log("i am the memory loded", memoriesLoaded)

//   const handleClick = (filterType: string) => {
//     setFilter(filterType);
//   };

//   const handleOpenModal = (item: MediaItem) => {
//     setSelectedMedia(item);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedMedia(null);
//   };

//   const filteredMediaItems = memoriesLoaded?.filter(
//     (item:any) => filter === 'All' || item.type === filter.toLowerCase()
//   );

//   const getIcon = (type: string, color: string) => {
//   switch (type) {
//     case 'image':
//       return <Image1Icon color={color} />;
//       case 'video':
//         return <Video1Icon color={color} />;
//       case 'audio':
//         return <Audio1Icon color={color}/>;
//       case 'text':
//         return <Text1Icon color={color} />;
//       default:
//         return null;
//     }
//   };

//   return (
//       <div className='ellipse-background2'>
//     {/* // <Box sx={{ maxWidth: '100%', margin: '0 auto', padding: 2 }}> */}
//     <Box sx={{ maxWidth: '100%', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px', paddingTop: 2, paddingBottom: 2 }}>
//       {/* Search and Filter Controls */}
//      <Box sx={{ padding:'10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2,backgroundColor: '#00000080', flexDirection: { xs: 'column', sm: 'row' }, borderRadius: '16px' }}>
//         {/* Search Field */}
//         <TextField
//           variant="outlined"
//           placeholder="Search"
//           size="small"
//           sx={{...extendedPalette.searchField}}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                  <Image src={'/icons/search.svg'} alt={'icon'} width={22} height={22} />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* Filter Buttons */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
//           {['All', 'Image', 'Video', 'Audio', 'Text'].map((label) => (
//             <Button
//       key={label}
//       variant="contained"
//       onClick={() => handleClick(label)}
//       sx={extendedPalette.filterButton(filter, label)}  // Apply style from palette
//     >
//       {label}
//     </Button>
//           ))}
//         </Box>

//         {/* Other Buttons */}
//         <Box
//   sx={{
//     display: 'flex',
//     alignItems: 'center',
//     gap: 0,
//     marginTop: { xs: 2, sm: 0 },
//     justifyContent: { xs: 'center', sm: 'initial' }
//   }}
// >
//   <Button
//       size="small"
//       sx={extendedPalette.viewButton} // Apply style from extendedPalette
//     >
//       View
//     </Button>
//   <Button
//   startIcon={
//     <Image
//       src={'/icons/wait.svg'}
//       alt={'icon'}
//       width={22}
//       height={22}
//       style={{ color: extendedPalette.buttonColorGrid }} // Set the color for the icon
//     />
//   }
//    sx={{
//       '&:hover': {
//         backgroundColor: extendedPalette.buttonHoverColor,
//         '& img': {
//       filter: 'brightness(0) saturate(100%) invert(100%)', // Turn the image white
//     }, // Background hover color
//       },
//     }}
// >
//   {/* Button content */}

// </Button>

//  <Button
//     startIcon={
//       <Image
//         src={'/icons/grid.svg'}
//         alt={'icon'}
//         width={22}
//         height={22}
//         style={{ color: extendedPalette.buttonColorGrid }} // Explicit color for icon
//       />
//     }
//     sx={{
//       '&:hover': {
//         backgroundColor: extendedPalette.buttonHoverColor,
//         '& img': {
//       filter: 'brightness(0) saturate(100%) invert(100%)', // Turn the image white
//     }, // Background hover color
//       },
//     }}
//   />
//  <Button
//   startIcon={
//     <Image
//       src={'/icons/editing.svg'}
//       alt={'icon'}
//       width={22}
//       height={22}
//       style={{ color: extendedPalette.buttonColorGrid }} // Apply color to the icon directly
//     />
//   }
//   sx={{
//     color: extendedPalette.buttonColorGrid, // Base color for text
//     '&:hover': {
//       backgroundColor: extendedPalette.buttonHoverColor, // Background hover color
//       '& img': {
//       filter: 'brightness(0) saturate(100%) invert(100%)', // Turn the image white
//     },
//     },
//   }}
// >
//   {/* Button content */}
// </Button>

// </Box>

//       </Box>

//       {/* <Divider   sx={styles.divider} /> */}
//         {isDivider && <Divider sx={styles.divider} />}

//       {/* Media Grid */}
// <Masonry  columns={{ xs: 2, sm: 3, md: 4 }} spacing={2} sx={{ margin: 0 }}>
//       {filteredMediaItems.map((item:any, index:any) => (
//         <Paper
//           key={index}
//           sx={{
//             borderRadius: 2,
//             overflow: 'hidden',
//             backgroundColor: extendedPalette.cardMediaBackground ,
//             color: extendedPalette.cardMediaColor,
//             display: 'flex',
//             flexDirection: 'column',
//             border: '1px solid rgba(255, 255, 255, 0.2)',
//             cursor: 'pointer', // Add cursor style to indicate clickability
//           }}
//         >
//           {/* Card Header */}
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: '8px 16px',
//               backgroundColor: extendedPalette.cardHeaderBackground,
//               color: extendedPalette.cardHeaderText,
//             }}
//           >
//             {/* Media Icon and Text */}
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Box sx={{ mr: 1 }}>
//   {getIcon(item.type, extendedPalette.cardIconColor)}  {/* Example color passed */}
// </Box>
//               <Box>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     fontFamily: 'PolySans Trial, sans-serif',
//                     fontSize: '16px',
//                     fontWeight: 400,
//                     lineHeight: '19.2px',
//                     textAlign: 'left',
//                   }}
//                 >
//                   {item.title}
//                 </Typography>

//                 <Typography
//                   variant="caption"
//                   sx={{
//                     fontFamily: 'PolySans Trial, sans-serif',
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     lineHeight: '14.4px',
//                     textAlign: 'left',
//                   }}
//                 >
//                   {format(new Date(item.created_at), 'MMM dd, yyyy')}
//                 </Typography>
//               </Box>
//             </Box>

//             {/* User Avatar */}
//             {/* <Link href={`/user/${encodeURIComponent(item.username)}`} underline="none">
//               <Avatar src={item.userImage} alt={item.username} sx={{ width: 32, height: 32 }} />
//             </Link> */}
//             <Link href={`/user/${encodeURIComponent(item.username)}`} underline="none">
//       <Avatar
//         src={avatarError ? '/icons/image1.svg' : item.userImage} // Use dummy avatar if image fails
//         alt={item.username}
//         sx={{ width: 32, height: 32 }}
//         onError={() => setAvatarError(true)} // Set error state if image fails to load
//       />
//     </Link>
//           </Box>

//           {/* Media Content */}
//           <Box sx={{ padding: '16px' }}
//            onClick={() => handleOpenModal(item)}
//            >
//             {/* {item.type === 'image' && <Image src={`${cdn_url}${item.asset}`} alt={item.title} width={100} height={100} />} */}
//             {item.type === 'image' && (
//   <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
//     <Image src={`${cdn_url}${item.asset}`} alt={item.title} layout="responsive" width={100} height={100} />
//   </Box>
// )}
//             {item.type === 'video' && (
//               <VideoThumbnail videoSrc={`${cdn_url}${item.asset}`}/>
//             )}
//            {item.type === 'audio' && (
//   <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px' }}>
//     {/* Left image with responsive size */}
//     <div
//       style={{
//         position: 'relative',
//         cursor: 'pointer',
//         width: '50px',  // Default size for larger screens
//         maxWidth: '15%',  // Responsive width for smaller screens
//       }}
//       onClick={() => handleOpenModal(item)}
//     >
//       <Image src={'/icons/playbut.svg'} alt={'icon'} layout="responsive" width={50} height={50} />
//     </div>

//     {/* Right image with responsive size */}
//     <div
//       style={{
//         position: 'relative',
//         cursor: 'pointer',
//         flex: '1',
//         display: 'flex',
//         justifyContent: 'center',
//         maxWidth: '70%',  // Limits width for smaller screens
//       }}
//       onClick={() => handleOpenModal(item)}
//     >
//       <Image src={'/icons/audiolay.svg'} alt={'icon'} layout="responsive" width={199} height={55} />
//     </div>
//   </div>
// )}

//             {/* {item.type === 'text' && (
//               <Box
//                 sx={{
//                   maxHeight: { xs: '200px', sm: '220px', md: '264px' },  // Responsive maxHeight
//                   width: { xs: '100%', sm: '220px', md: '250px' },        // Responsive width
//                   overflow: 'hidden',
//                   position: 'relative',
//                   '&:after': {
//                     content: '""',
//                     position: 'absolute',
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     height: '20px',
//                     padding: '18px',
//                     background: 'linear-gradient(to bottom, rgba(43, 54, 114, 0), #2B3672)',
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   color="white"
//                   sx={{
//                     fontFamily: 'PolySans Trial, sans-serif',
//                     fontSize: { xs: '10px', sm: '11px', md: '12px' }, // Responsive font size
//                     fontWeight: 400,
//                     lineHeight: { xs: '12px', sm: '13.2px', md: '14.4px' }, // Responsive line height
//                     textAlign: 'left',
//                     //whiteSpace: 'pre-line',
//                   }}
//                 >
//                 <RtfComponent rtf={item?.type === 'text' ? JSON.parse(item?.asset) : ''} label={'p'} />

//                 </Typography>
//               </Box>
//             )} */}
//             {item.type === 'text' && (
//   <Box
//     sx={{
//       maxHeight: { xs: '36px', sm: '39.6px', md: '43.2px' },  // Approximate height for 3 lines
//       width: { xs: '100%', sm: '220px', md: '250px' },        // Responsive width
//       overflow: 'hidden',
//       position: 'relative',
//       '&:after': {
//         content: '""',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: '15px',
//         background: 'linear-gradient(to bottom, rgba(43, 54, 114, 0), #333333)',
//       },
//     }}
//   >
//     <Typography
//       variant="body2"
//       color="white"
//       sx={{
//         fontFamily: 'PolySans Trial, sans-serif',
//         fontSize: { xs: '10px', sm: '11px', md: '12px' }, // Responsive font size
//         fontWeight: 400,
//         lineHeight: { xs: '12px', sm: '13.2px', md: '14.4px' }, // Responsive line height
//         textAlign: 'left',
//         display: '-webkit-box',
//         WebkitBoxOrient: 'vertical',
//         WebkitLineClamp: 2, // Limit to 3 lines
//         overflow: 'hidden',
//       }}
//     >
//       <RtfComponent rtf={item?.type === 'text' ? JSON.parse(item?.asset) : ''} label={'p'} />
//     </Typography>
//   </Box>
// )}

//           </Box>

//         </Paper>
//       ))}
//     </Masonry>
//     {selectedMedia && (
//         <MediaModal open={openModal} onClose={handleCloseModal} mediaContent={selectedMedia} />
//       )}
//     </Box>
//     </div>

//   );
// };

// export default MediaGrid;
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Typography, Button, TextField, Divider, Link, InputAdornment, Avatar, MenuItem, Select, ClickAwayListener , useMediaQuery} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { format } from 'date-fns';
import Image from 'next/image';
import MediaModal from './MediaModal';
import { extendedPalette, palette } from '@/theme/constants';
import { styles } from './AppBar/CancelModal/styles';
import VideoThumbnail from './VideoThumbnail';
import { getMemories } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, homeSelector, memorySelector } from '@/store/selectors';
import { cdn_url } from '@/utils';
import { FilterDropdown, MuiIconButton, RtfComponent } from '@/components';
import Image1Icon from '../../public/icons/image1';
import Video1Icon from '../../public/icons/video1';
import Text1Icon from '../../public/icons/test1';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import Audio1Icon from '../../public/icons/audio1';
import Search from '@/components/AppBar/Search';
import { getCollaboratorsOptions, getPropmtsOptions } from '@/components/AppBar/constants';
import Wait1Icon from '../../public/icons/wait1';
import GridIcon1 from '../../public/icons/gridicom';
import EditIcon from '../../public/icons/editing1';
import Audio2Icon from '../../public/icons/audioGradient';
import { MemoryDetail } from '@/screens/Memories/components';
import { Router, useRouter } from 'next/router';
type MediaType = 'image' | 'audio' | 'video' | 'text';

interface MediaItem {
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
  story: any;
  extendedPalette: any;
}

const MediaGrid: React.FC<MediaGridProps> = ({ story, extendedPalette }) => {
  const dispatch = useDispatch();
  const { memoriesLoaded } = useSelector(memorySelector);
   const [avatarError, setAvatarError] = useState(false);
 const [openModal, setOpenModal] = useState(false);
 const [search, setSearch] = useState('');
 const router = useRouter();
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const { status: deleteStatusMemory, switchStatus: switchDeleteMemory } = UseIntermitence();
  // Define state for filter and selected media item
  const [filter, setFilter] = useState('All');
  const { stories } = useSelector(homeSelector);
  const prompts = getPropmtsOptions(stories, story);
  const { user } = useSelector(authSelector);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openPeople, setOpenPeople] = useState(false);
  const { status, switchStatus } = UseIntermitence();
  const collaborators = getCollaboratorsOptions(user?.collaborators || [], story);
  const ITEMS_PER_PAGE = 10;

  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE); // Number of items initially visible

  const { isDivider } = extendedPalette.isDividerCheck.isDivider || true;

  useEffect(() => {
    if (story?.id) {
      dispatch(getMemories(story?.id));
    }
  }, [story?.id, dispatch]);
  console.log('i am the memory loded', memoriesLoaded);

  const handleClick = (filterType: string) => {
    setFilter(filterType);
  };

  const handleOpenModal = (item: MediaItem) => {
    setSelectedMedia(item);
    setOpenModal(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };
  const handleClosePeople = () => {
    setOpenPeople(false);
  };
  const setShowFilters = (event: any) => {
    console.log('I am clicked');
    event.preventDefault();
    event.stopPropagation();
    setOpenFilters((openFilters) => !openFilters);
    setOpenNotification(false);
    setIsOpen(false);
    setOpenPeople(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMedia(null);
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

    return types.filter((type) => memoriesLoaded?.includes(type.id));
  }, [memoriesLoaded?.length]);

   UseFirstRender(() => {
    console.log("I am query first",router.query)
    if (router?.query?.memoryId && memoriesLoaded.current) {
      const memory = memoriesLoaded.current
        .getMemories()
        .find((memory:any) => Number(memory?.id) === Number(router?.query?.memoryId));
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


console.log("I am query",router.query)
  const closeMemory = () => {
    setSelectedMedia(null);
    router.push(`/app/story/${story?.url}`);
    switchStatus();
  };

  // const filteredMediaItems = memoriesLoaded?.filter(
  //   (item:any) => filter === 'All' || item.type === filter.toLowerCase()
  // );

  // const filteredMediaItems = memoriesLoaded
  // ?.filter((item: any) => filter === 'All' || item.type === filter.toLowerCase())
  // ?.sort((a: any, b: any) => {
  //   if (!sortOrder) return 0; // No sorting
  //   switch (sortOrder) {
  //     case 'asc':
  //       return a.title.localeCompare(b.title); // Title Ascending
  //     case 'desc':
  //       return b.title.localeCompare(a.title); // Title Descending
  //     default:
  //       return 0;
  //   }
  // });
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
      if (!sortOrder) return 0; // No sorting
      switch (sortOrder) {
        case 'asc':
          return a.title.localeCompare(b.title); // Title Ascending
        case 'desc':
          return b.title.localeCompare(a.title); // Title Descending
        default:
          return 0;
      }
    });

  const getIcon = (type: string, color: string) => {
    switch (type) {
      case 'image':
        return <Image1Icon color={color} />;
      case 'video':
        return <Video1Icon color={color} />;
      case 'audio':
        return <Audio1Icon color={color} />;
      case 'text':
        return <Text1Icon color={color} />;
      default:
        return null;
    }
  };

  const allItemsLoaded = visibleItems >= filteredMediaItems.length;
  // loadmore button handler
  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE); // Load 10 more items on button click
  };

  return (
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
            flexDirection: { xs: 'column', sm: 'row' },
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
            sx={{ ...extendedPalette.searchField }}
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
              justifyContent: 'center',
              flexGrow: 1,
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
            }}>
            {['All', 'Image', 'Video', 'Audio', 'Text'].map((label) => (
              <Button
                key={label}
                variant='contained'
                onClick={() => handleClick(label)}
                sx={extendedPalette.filterButton(filter, label)}>
                {label}
              </Button>
            ))}

            {/* Sort Dropdown */}
            <MuiIconButton
              icon='/icons/filter'
              altIcon='filter'
              background={extendedPalette.filterIconsColor}
              borderColor={palette.black}
              width={40}
              height={40}
              // padding={0}
              iconHeight={12}
              iconWidth={20}
              method={(event: any) => setShowFilters(event)} // Toggle state on click
            />
            <ClickAwayListener onClickAway={handleCloseFilters} disableReactTree={true}>
              <Box position={'relative'}>
                <FilterDropdown isOpen={openFilters} listItem={[prompts, collaborators, types]} />
              </Box>
            </ClickAwayListener>
          </Box>

          {/* Other Buttons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              marginTop: { xs: 2, sm: 0 },
              justifyContent: { xs: 'center', sm: 'initial' },
            }}>
            <Button
              size='small'
              sx={extendedPalette.viewButton} // Apply style from extendedPalette
            >
              View
            </Button>
            <Button
              startIcon={<Wait1Icon color={extendedPalette.filterIconsColor} className='img' />}
              sx={{
                '&:hover': {
                  backgroundColor: extendedPalette.filterIconsHoverColor,
                  '& .img': {
                    filter: 'brightness(0) saturate(100%) invert(100%)', // Turn the image white+
                    // color:"white"
                  }, // Background hover color
                },
              }}>
              {/* Button content */}
            </Button>

            <Button
              startIcon={<GridIcon1 color={extendedPalette.filterIconsColor} className='img' />}
              sx={{
                '&:hover': {
                  backgroundColor: extendedPalette.filterIconsHoverColor,
                  '& .img': {
                    filter: 'brightness(0) saturate(100%) invert(100%)', // Turn the image white+
                    // color:"white"
                  }, // Background hover color
                },
              }}>
              {/* Button content */}
            </Button>
            <Button
              startIcon={<EditIcon color={extendedPalette.filterIconsColor} className='img' />}
              sx={{
                '&:hover': {
                  backgroundColor: extendedPalette.filterIconsHoverColor,
                  '& .img': {
                    filter: 'brightness(0) saturate(100%) invert(100%)', // Turn the image white+
                    // color:"white"
                  }, // Background hover color
                },
              }}>
              {/* Button content */}
            </Button>
          </Box>
        </Box>
        {/* <Divider   sx={styles.divider} /> */}
        {isDivider && <Divider sx={styles.divider} />}
        {/* Media Grid */}
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2} sx={{ margin: 0 }}>
          {filteredMediaItems.slice(0, visibleItems).map((item: any, index: any) => (
            <Paper
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
                  backgroundColor: extendedPalette.cardHeaderBackground,
                  color: extendedPalette.cardHeaderText,
                }}>
                {/* Media Icon and Text */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 1 }}>
                    {getIcon(item.type, extendedPalette.cardIconColor)} {/* Example color passed */}
                  </Box>
                  <Box>
                    <Typography
                      variant='body2'
                      sx={{
                        fontFamily: 'PolySans Trial, sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '19.2px',
                        textAlign: 'left',
                      }}>
                      {item.title}
                    </Typography>

                    <Typography
                      variant='caption'
                      sx={{
                        fontFamily: 'PolySans Trial, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '14.4px',
                        textAlign: 'left',
                      }}>
                      {format(new Date(item.created_at), 'MMM dd, yyyy')}
                    </Typography>
                  </Box>
                </Box>

                {/* User Avatar */}
                {/* <Link href={`/user/${encodeURIComponent(item.username)}`} underline="none">
              <Avatar src={item.userImage} alt={item.username} sx={{ width: 32, height: 32 }} />
            </Link> */}
                <Link href={`/user/${encodeURIComponent(item.username)}`} underline='none'>
                  <Avatar
                    src={avatarError ? '/icons/image1.svg' : item.userImage} // Use dummy avatar if image fails
                    alt={item.username}
                    sx={{ width: 32, height: 32 }}
                    onError={() => setAvatarError(true)} // Set error state if image fails to load
                  />
                </Link>
              </Box>

              {/* Media Content */}
              <Box sx={{ padding: '16px' }} onClick={() => handleOpenModal(item)}>
                {/* {item.type === 'image' && <Image src={`${cdn_url}${item.asset}`} alt={item.title} width={100} height={100} />} */}
                {item.type === 'image' && (
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Image
                      src={`${cdn_url}${item.asset}`}
                      alt={item.title}
                      layout='responsive'
                      width={100}
                      height={100}
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
                      onClick={() => handleOpenModal(item)}>
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
                      }}
                      onClick={() => handleOpenModal(item)}>
                      <Audio2Icon
                        color={extendedPalette.audioGradientColor1}
                        color2={extendedPalette.audioGradientColor2}
                      />
                      {/* <Image src={'/icons/audiolay.svg'} alt={'icon'} layout="responsive" width={199} height={55} /> */}
                    </div>
                  </div>
                )}
                {item.type === 'text' && (
                  <Box
                    sx={{
                      maxHeight: { xs: '36px', sm: '39.6px', md: '43.2px' }, // Approximate height for 3 lines
                      width: { xs: '100%', sm: '100%', md: '100%' }, // Responsive width
                      overflow: 'hidden',
                      position: 'relative',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', // Gradual fade effect
                      maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                      maskSize: '100% 100%',
                      WebkitMaskSize: '100% 100%',
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
                    {/* <Typography
      variant="body2"
      color="white"
      sx={{
        fontFamily: 'PolySans Trial, sans-serif',
        fontSize: { xs: '10px', sm: '11px', md: '12px' }, // Responsive font size
        fontWeight: 400,
        lineHeight: { xs: '12px', sm: '13.2px', md: '14.4px' }, // Responsive line height
        textAlign: 'left',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2, // Limit to 3 lines
        overflow: 'hidden',
      }}
    > */}
                    <RtfComponent rtf={item?.type === 'text' ? JSON.parse(item?.asset) : ''} label={'p'} />
                    {/* </Typography> */}
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </Masonry>
        {/* Load More or No More Data */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          {!allItemsLoaded && (
            <Button
              variant='contained'
              color='primary'
              onClick={handleLoadMore}
              sx={{
                textTransform: 'none', // To maintain consistent typography with primary styling
                fontWeight: '500',
              }}>
              Load More
            </Button>
          )}
        </Box>
        {selectedMedia && (
          <MediaModal
            extendedPalette={extendedPalette}
            open={openModal}
            onClose={handleCloseModal}
            mediaContent={selectedMedia}
          />
        )}
      </Box>
    </div>
  );
};

export default MediaGrid;
