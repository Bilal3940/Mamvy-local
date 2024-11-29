// import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GridLayoutCheck from './MediaGrid';

import { UseFirstRender, UseIntermitence } from '@/hooks';
import {
  actualStory,
  changeBackground,
  closePublishModal,
  createUserPurchase,
  deleteStory,
  getExtraContent,
  getStoryStatus,
  getTemplate,
  hideGradient,
  removeMemory,
  setCode,
  setMediaType,
  showActualSection,
  viewStoryG,
} from '@/store/actions';
import { authSelector, currentStorySelector, extrasSelector, intermitenceSelector, orderSelector, purchaseSelector, storySelector, templatesSelector } from '@/store/selectors';
import { cdn_url } from '@/utils';
import { Box, BoxProps, Button, Theme, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Ref, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Console } from 'console';
import { format } from 'date-fns';
import MediaGrid from './MediaGrid';
import Image from 'next/image';
import EllipseImage from '../../public/images/EllipseLeft';
import EllipseLeftImage from '../../public/images/EllipseLeft';
import EllipseRightImage from '../../public/images/EllipseRight';
import PopupModal from './PayWallModal';
import { DividerType, EllipseType, palette } from '@/theme/constants';
import StoryHeader from './StoryHeader';


const template = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#2B3672',
    },
  },
});

const Main: React.FC = () => {
  const handleBackClick = () => {
    console.log("Back button clicked");
     router.push('/app/home'); 
  };
  const [selectedMemorie, setSelectedMemorie] = useState<any>(null);
  const { status, switchStatus } = UseIntermitence();
  const { status: storyStatus, switchStatus: switchStory } = UseIntermitence();
  const { status: deleteStatusMemory, switchStatus: switchDeleteMemory } = UseIntermitence();
  const { status: deleteStatusStory, switchStatus: switchDeleteStory } = UseIntermitence();
  const { status: privateStatus, switchStatus: switchPublication } = UseIntermitence();
  const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '',
    textColor: '',
    accentColor: '',
  });
  const { user, isAuth } = useSelector(authSelector);
  const dispatch = useDispatch();
  const story = useSelector(currentStorySelector);
  const { showPublishModal } = useSelector(intermitenceSelector);
  const {template} = useSelector(templatesSelector);
  const {purchase } = useSelector(purchaseSelector)


  // new field for the popup content
  const {extraContent} = useSelector(extrasSelector);
  const [viewStory, setViewStory] = useState(false);


  const router = useRouter();
  const [tryCode, setTryCode] = useState(true);
  const [foundRole, setFoundRole] = useState(false);
  // const { isEllipseLeft } = extendedPalette.isEllipseCheck;
  //  const { isEllipseRight } = extendedPalette.isEllipseRightCheck;
    const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = (): void => setModalOpen(true);
  const handleClose = (): void => setModalOpen(false);

   UseFirstRender(() => {
    if (router.query?.id && !router.query.code) {

 


      dispatch(
        actualStory({
          id: router.query?.id as string,
          router,
          confirmPassword: story?.url === router.query?.id ? story?.confirmPassword : undefined,
        }),
      );
    }
  }, [router.query?.id, story?.confirmPassword]);

  UseFirstRender(() => {
    if (router.query?.id && router.query.code) {
      dispatch(setCode({ password: router?.query?.code, storyId: router.query.id }));

    }
  }, [router.query?.code]);


  // new content for popup content



useEffect(()=>{

  dispatch(getExtraContent(router.query?.id as string))
  if(extraContent){

  
  if(extraContent.isPaid)
    { 
    setModalOpen(true);
     
    }else{
      setModalOpen(false)
    }
  }
},[router.query.id])

  console.log("extra content",extraContent )
  console.log("purchase",purchase)





  UseFirstRender(() => {
    if (story && (!story?.private || story?.confirmPassword || foundRole)) {
      const DraftSpan = () => {
        return <span style={{ color: 'white', fontWeight: 'normal' }}>· Draft</span>
      }
      const PublishedSpan = () => {
        return <span style={{ color: 'white', fontWeight: 'normal' }}>· Published</span>
      }
      dispatch(setMediaType(''));
      dispatch(showActualSection({ title: story?.title, publish: story?.status === 'draft' ? DraftSpan : story?.status == 'published' ? PublishedSpan : '' }));
    }
  }, [story, foundRole]);

  useEffect(() => {
    if (story?.url === router.query?.id)
      router.push(
        router?.query?.memoryId
          ? `/app/story/${story?.url}?memoryId=${router?.query?.memoryId}`
          : `/app/story/${story?.url}`,
      );
  }, [router.query?.id, story?.url]);
  const ispaid= true;
  const ispurchased = false;
  useEffect(() => {

  }, [extraContent]);


  const isMobile = useMediaQuery((template: Theme) => template.breakpoints.down('md'));

  // const deleteMemory = async () => {
  //   setSelectedMemorie(null);
  //   switchDeleteMemory();
  //   router.push(`/app/story/${story?.url}`);
  //   const { callback, promise } = promisifiedCallback<ExtractCallbackType<typeof removeMemory>>();
  //   dispatch(removeMemory({ id: selectedMemorie?.id, story_id: story?.id }, callback));
  //   const { ok } = await promise;
  //   if (ok && floatingMemoriesRef.current) {
  //     floatingMemoriesRef.current.removeBubble(selectedMemorie?.id);
  //   }
  // };

  const deleteStoryAction = () => {
    switchDeleteStory();
    dispatch(deleteStory(story?.id));
    router.push(`/app/home`);
  };

  // UseFirstRender(() => {
  //   if (router?.query?.memoryId && floatingMemoriesRef.current) {
  //     const memory = floatingMemoriesRef.current
  //       .getMemories()
  //       .find((memory) => Number(memory?.id) === Number(router?.query?.memoryId));
  //     setSelectedMemorie(memory);
  //     switchStatus();
  //   }
  // }, [router?.query]);

  const closeMemory = () => {
    setSelectedMemorie(null);
    router.push(`/app/story/${story?.url}`);
    switchStatus();
  };

  UseFirstRender(() => {
    if (user && isAuth) {
      const validRoles = ['Story_Collaborator', 'Story_Viewer', 'Story_Owner'];
      const hasRole = user?.roles?.find(
        (role: any) => role.story_id === story?.id && validRoles.includes(role.role.name) && role?.validated,
      );
      const userCreate = user?.id === story?.user_id;
      const foundRole = hasRole || userCreate ? true : false;
      setFoundRole(foundRole);
    }
  }, [user, story, isAuth]);

  useEffect(() => {
    if (story?.id && !viewStory) {
      dispatch(viewStoryG(story));
      setViewStory(true);
    }
  }, [dispatch, story, viewStory]);
//  console.log('I am story',story)
  UseFirstRender(() => {
    const validRoles = ['Story_Collaborator', 'Story_Viewer', 'Story_Owner'];
    const hasRole = user?.roles?.find(
      (role: any) => role.story_id === story?.id && role?.validated && validRoles.includes(role.role.name),
    );
    const userCreate = user?.id === story?.user_id;
    const foundRole = hasRole || userCreate ? true : false;
    if (story?.private && tryCode && !story?.newCode && !foundRole) {
      switchPublication();
      setTryCode(false);
    }
  }, [story?.private]);

  const handlePublication = () => {
    if (story?.private && !tryCode && !story?.confirmPassword) {
      switchPublication();
      router.push(`/app/home`);
    }
    if (story?.private && !tryCode && story?.confirmPassword && !story?.newCode) {
      switchPublication();
    }
  };

  const boxRef = useRef<HTMLElement | null>(null);

  const [mobileHeight, setMobileHeight] = useState('35vh');

  useEffect(() => {
    const resize = () => {
      if ((boxRef?.current?.scrollTop || 0) > 100) {
        setMobileHeight((prev: any) => {
          return `${(boxRef?.current?.scrollTop || 0) > 500 ? 0 : Math.round(35 / ((boxRef?.current?.scrollTop || 0) / 100))
            }vh`;
        });
        return;
      }
      setMobileHeight('35vh');
    };
    if (boxRef.current) {
      boxRef.current?.addEventListener('scroll', resize);
    }
    dispatch(changeBackground(true));

    return () => {
      if (boxRef.current) {
        boxRef.current?.removeEventListener('scroll', resize);
      }
    };
  }, [story]);
console.log("i am story", story)
  const closeCollaboratorsModal = () => {
    dispatch(closePublishModal());
  };
  useEffect(() => {
    if (Number(mobileHeight.replace('vh', '')) <= 10) dispatch(hideGradient(true));
    if (Number(mobileHeight.replace('vh', '')) > 10) dispatch(hideGradient(false));
  }, [mobileHeight]);

  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback<Required<BoxProps>['onWheel']>((e) => {
    if (boxRef.current) {
      boxRef.current.scrollTo({ top: boxRef.current.scrollTop + e.deltaY, behavior: 'instant' });
    }
  }, []);


  
  useEffect(() => {
    if (story?.themeId) {
      dispatch(getTemplate(story?.themeId?  story?.themeId : "1")); // Dispatch Redux action to fetch template data based on themeId
    }
  }, [story?.themeId, dispatch]);
  let backgroundColor:any;
  let accentColor:any;
  useEffect(() => {
    if (template?.template?.colors) {
      // Assuming the colors array from the API response
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
  

      backgroundColor= colors.storyBackgroundColor || '#333333'
      accentColor=colors.accentColor || 'rgba(228, 222, 255, 0.2)'
      // Set the colors to the adminPalette state
      setAdminPalette({
        storyBackgroundColor: colors.storyBackgroundColor || '#333333', // Fallback if color is missing
        textColor: colors.textColor || '#fff', // Fallback
        accentColor: colors.accentColor || '#BF5700', // Fallback
      });
    }


  }, [template]);
  useEffect(() => {
    if (backgroundColor) {
      // Dynamically set the body background color with !important
      document.body.style.setProperty('background-color', backgroundColor, 'important');
  
      // Clean up effect to reset to the default background color
      return () => {
        document.body.style.removeProperty('background-color');
      };
    }
  }, [template]);
  
  
  console.log("i am the admin palette", adminPalette)
  
  const extendedPalette = {
    storyBackground: adminPalette.storyBackgroundColor,
    backButton: {
      color: adminPalette.textColor,
      opacity: 0.7,
      fontSize: '14px',
    },
    editButton: {
      color: adminPalette.textColor,
      opacity: 0.7, 
      backgroundColor: adminPalette.storyBackgroundColor, 
      fontSize: '14px',
      textTransform: 'none',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      padding: '11px 16px',
      marginRight: { xs: '0', md: '50px' },
      boxShadow: '0px 4px 14px 0px #00000029',
    },
    storyTitle: adminPalette.textColor,
    dateStyle: {
      color: adminPalette.textColor,
      opacity: 0.7,
      fontSize: '16px',
      textAlign: 'center',
    },
    description: {
      color: adminPalette.textColor, maxWidth: '650px'
    },
    toolBarBackground: 'rgba(0, 0, 0, 0.5)',
  
    // 
    searchField: {
  width: '16rem',
  '& .MuiOutlinedInput-root': {
    backgroundColor: adminPalette.storyBackgroundColor,
    color: palette.white,
    marginLeft: '20px',
    borderRadius: '30px',
    '& fieldset': {
      borderColor: adminPalette.storyBackgroundColor,
    },
    '&:hover fieldset': {
      borderColor: adminPalette.storyBackgroundColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: palette.white, // Focus state outline is now white
    },
    '&:focus-visible fieldset': {
      borderColor: palette.white, // Ensure compatibility with :focus-visible
    },
  },
  '& input': {
    color: adminPalette.textColor,
    padding: '10px 15px',
    fontSize: '0.9rem',
  },
  '& .MuiInputAdornment-root': {
    backgroundColor: adminPalette.storyBackgroundColor,
    marginRight: '4px',
  },
},

    filterButton: (filter: any, label: any) => ({
      textTransform: 'none',
      backgroundColor: filter === label ? adminPalette.textColor : adminPalette.storyBackgroundColor,
      color: filter === label ? palette.black : adminPalette.textColor,
      borderRadius: '20px',
      margin: '8px',
      '&:hover': {
        backgroundColor: filter === label ? adminPalette.textColor : adminPalette.storyBackgroundColor,
        color: filter === label ? palette.black : adminPalette.textColor,
      },
    }),
    dividerColor:{
      
      color:'rgba(51, 51, 51, 1)',
      opacity:0.9,
    },
  
    viewButton: {
      textTransform: 'none',
      color: palette.dirtyWhite, 
      '&:hover': {
        color: palette.secondary, 
      },
    },
    buttonColorGrid: adminPalette.storyBackgroundColor,
    buttonHoverColor: '#BA0C2F',
  
    cardMediaBackground: adminPalette.storyBackgroundColor,
    cardMediaColor: adminPalette.textColor,
  
  
    cardHeaderBackground: adminPalette.storyBackgroundColor,
    cardHeaderText: adminPalette.textColor,
  
    audioGradientColor1: adminPalette.accentColor,
    audioGradientColor2: '#77BCE580',
  
    isDividerCheck: { isDivider: false } as DividerType,
    isEllipseCheck: { isEllipseLeft: true } as EllipseType,
    isEllipseRightCheck: { isEllipseRight: false } as EllipseType,
    
    ellipseLeftGradientColor: adminPalette.accentColor,
    ellipseLeftGradientOpacity: 0.17,
    ellipseRightGradientColor: '#F1E0FF',
    ellipseRightGradientOpacity: 0.15,
  
    cardIconColor: adminPalette.accentColor,
    filterIconsColor: 'rgba(102, 102, 102, 1)',
    filterIconsHoverColor: adminPalette.accentColor,
  };

  return (
    // <ThemeProvider template={template}>
    <div style={{ backgroundColor: extendedPalette.storyBackground, minHeight:'200vh' }}>

              
{extendedPalette.isEllipseCheck.isEllipseLeft && (
        <Box
          sx={{
            position: 'absolute',
            left: '0%', // Adjust the right position as needed
            top: '0%',  // Center vertically
            zIndex: 0,   // Behind the content
            width: '80rem', // Adjust width for the desired size
            height: '20%',
            pointerEvents: 'none', // Make it non-interactive
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundSize: 'contain, contain',
          }}
        >
          <EllipseLeftImage color={extendedPalette.ellipseLeftGradientColor} opacity={extendedPalette.ellipseLeftGradientOpacity} />
        </Box>)}


          {/* Ellipse 2 (Right Center) */}
          {extendedPalette.isEllipseRightCheck.isEllipseRight  && (<Box
            sx={{
              position: 'absolute',
              right: '-9%', // Adjust the right position as needed
              top: '45%',  // Center vertically
              // transform: 'translateY(-50%)',
              zIndex: 0, // Behind the content
              width: '60%', // Ellipse size
              height: '73rem',
              // borderRadius: '50%',
              // Blue with transparency, adjust color
              backgroundRepeat: 'no-repeat, no-repeat',
              pointerEvents: 'none', 
            }}
          >
          <EllipseRightImage color={extendedPalette.ellipseRightGradientColor} opacity={extendedPalette.ellipseRightGradientOpacity} />
          </Box>)}
      {/* <div style={extendedPalette.ellipseBackground1}> */}
        {/* StoryHeader Component */}
        {/* <StoryHeader
          imgSrc={`${cdn_url}${story?.cover_image}`}  // Replace with the correct path to your image
          title={story?.title}
          createdDate={story?.created_at}
          description={story?.description}
          collaborators={[
            { src: "/assets/Ellipse 51.png", alt: "Collaborator 1" },
            { src: "/assets/Ellipse 52.png", alt: "Collaborator 2" },
            { src: "/assets/Ellipse 56.png", alt: "Collaborator 3" },
            { src: "/assets/Ellipse 54.png", alt: "Collaborator 4" },
          ]}
          onBackClick={handleBackClick}
        /> */}
<StoryHeader 
  extendedPalette = {extendedPalette}
  themeId={story?.themeId ? story?.themeId : "1"}
  coverImage={story?.cover_image ? `${cdn_url}${story.cover_image}` : ''} // Fallback cover image
  imgSrc={story?.extraAsset1 ? `${cdn_url}${story.extraAsset1}` : ''} // First extra image
  secondImgSrc={story?.extraAsset2 ? `${cdn_url}${story.extraAsset2}` : ''} // Second extra image
  title={story?.title}
  createdDate={story?.created_at}
  description={story?.description}
  collaborators={[
    // { src: "/assets/Ellipse 51.png", alt: "Collaborator 1" },
    // { src: "/assets/Ellipse 52.png", alt: "Collaborator 2" },
    // { src: "/assets/Ellipse 56.png", alt: "Collaborator 3" },
    // { src: "/assets/Ellipse 54.png", alt: "Collaborator 4" },
  ]}
  onBackClick={handleBackClick}
  userId={story?.user_id}
/>


        {/* Grid Layout */}
        {/* <GridLayoutCheck /> */}
        <MediaGrid extendedPalette={extendedPalette}  story={story && story} />
        <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Modal
      </Button>

      <PopupModal open={modalOpen} onClose={handleClose} />
      </div>
      // </div>

      


  );
};

export default Main;
