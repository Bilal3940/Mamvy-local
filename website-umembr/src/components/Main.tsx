import { UseFirstRender, UseIntermitence } from '@/hooks';
import {
  actualStory,
  changeBackground,
  closePublishModal,
  deleteStory,
  getCollaboratorStory,
  getTemplate,
  hideGradient,
  setCode,
  setMediaType,
  showActualSection,
  viewStoryG,
} from '@/store/actions';
import {
  authSelector,
  collaboratorSelector,
  currentStorySelector,
  extrasSelector,
  intermitenceSelector,
  templatesSelector,
} from '@/store/selectors';
import { cdn_url } from '@/utils';
import { Box, BoxProps, Button, CircularProgress, Theme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { Ref, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaGrid from './MediaGrid';
import EllipseLeftImage from '../../public/images/EllipseLeft';
import EllipseRightImage from '../../public/images/EllipseRight';
import { DividerType, EllipseType, palette } from '@/theme/constants';
import StoryHeader from './StoryHeader';
import MemoryFloatingActionButtons from '@/screens/Memories/components/MemoryFloatingActionButtons';
import { PrivateStoryModal } from '@/screens/Memories/components/PrivateStoryModal';
import { AddCollaborators } from '@/screens/Memories/components';

const Main: React.FC = () => {
  const handleBackClick = () => {
    router.push('/app/home');
  };
  const [selectedMemorie, setSelectedMemorie] = useState<any>(null);
  const { status, switchStatus } = UseIntermitence();
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
  const { template, actionSuccess } = useSelector(templatesSelector);
  const { collaborators } = useSelector(collaboratorSelector);
  const { extraContent } = useSelector(extrasSelector);
  const [viewStory, setViewStory] = useState(false);

  const router = useRouter();
  const [tryCode, setTryCode] = useState(true);
  const [foundRole, setFoundRole] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  UseFirstRender(() => {
    if (story?.id) dispatch(getCollaboratorStory(story?.id));
  }, [story]);

  UseFirstRender(() => {
    if (story && (!story?.private || story?.confirmPassword || foundRole)) {
      const DraftSpan = () => {
        return <span style={{ color: 'white', fontWeight: 'normal' }}>· Draft</span>;
      };
      const PublishedSpan = () => {
        return <span style={{ color: 'white', fontWeight: 'normal' }}>· Published</span>;
      };
      dispatch(setMediaType(''));
      dispatch(
        showActualSection({
          title: story?.title,
          publish: story?.status === 'draft' ? DraftSpan : story?.status == 'published' ? PublishedSpan : '',
        }),
      );
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

  useEffect(() => {}, [extraContent]);

  const isMobile = useMediaQuery((template: Theme) => template.breakpoints.down('md'));

  const deleteStoryAction = () => {
    switchDeleteStory();
    dispatch(deleteStory(story?.id));
    router.push(`/app/home`);
  };

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
          return `${
            (boxRef?.current?.scrollTop || 0) > 500 ? 0 : Math.round(35 / ((boxRef?.current?.scrollTop || 0) / 100))
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

  const closeCollaboratorsModal = () => {
    dispatch(closePublishModal());
  };
  useEffect(() => {
    if (Number(mobileHeight.replace('vh', '')) <= 10) dispatch(hideGradient(true));
    if (Number(mobileHeight.replace('vh', '')) > 10) dispatch(hideGradient(false));
  }, [mobileHeight]);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (story?.themeId) {
      dispatch(getTemplate(story?.themeId ? story?.themeId : '1')); // Dispatch Redux action to fetch template data based on themeId
    }
  }, [story?.themeId, dispatch, actionSuccess]);
  let backgroundColor: any;
  let accentColor: any;
  useEffect(() => {
    if (template?.template?.colors) {
      // Assuming the colors array from the API response
      const colors = template.template.colors.reduce((acc: any, color: any) => {
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

      backgroundColor = colors.storyBackgroundColor || '#333333';
      accentColor = colors.accentColor || 'rgba(228, 222, 255, 0.2)';
      setAdminPalette({
        storyBackgroundColor: colors.storyBackgroundColor || '#333333',
        textColor: colors.textColor || '#fff',
        accentColor: colors.accentColor || '#BF5700',
      });
    }
  }, [template]);
  useEffect(() => {
    if (backgroundColor) {
      document.body.style.setProperty('background-color', backgroundColor, 'important');

      return () => {
        document.body.style.removeProperty('background-color');
      };
    }
  }, [template]);

  useEffect(() => {
    const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

    const styleElement = document.createElement('style');

    if (isFirefox) {
      styleElement.innerHTML = `
        html {
          scrollbar-color: ${accentColor} ${accentColor}; /* thumb track */
          scrollbar-width: thin; /* Can also be 'none' or 'auto' */
        }
      `;
    } else {
      styleElement.innerHTML = `
      
        *::-webkit-scrollbar-thumb {
          background-color: ${accentColor};
          border-radius: 12px;
        }
       
      `;
    }

    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [template]);

  const extendedPalette = {
    storyBackground: adminPalette.storyBackgroundColor,
    backButton: {
      color: adminPalette.textColor,
      opacity: 0.7,
      fontSize: '14px',
    },
    edittextColor: adminPalette.textColor,
    editButton: {
      color: '#33333',
      opacity: 0.7,
      backgroundColor: '#3333',
      fontSize: '14px',
      textTransform: 'none',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      padding: '11px 16px',
      marginRight: { xs: '0', md: '50px' },
      boxShadow: '0px 4px 14px 0px #00000029',
      '&:hover': {
        backgroundColor: adminPalette.accentColor, // Hover background color
        opacity: 1, // Optional: Increase opacity on hover // Optional: Smooth transition
      },
    },
    storyTitle: adminPalette.textColor,
    dateStyle: {
      color: adminPalette.textColor,
      opacity: 0.7,
      fontSize: '16px',
      textAlign: 'center',
    },
    description: {
      color: adminPalette.textColor,
      maxWidth: '650px',
    },
    toolBarBackground: 'rgba(0, 0, 0, 0.5)',
    searchField: {
      width: '16rem',
      background: 'linear-gradient(174deg, rgba(27, 27, 27, 0.5) -68.72%, rgba(0, 0, 0, 0.5) 269.6%), #333',
      boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.5) inset',
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
    dividerColor: {
      color: 'rgba(51, 51, 51, 1)',
      opacity: 0.9,
    },

    viewButton: {
      textTransform: 'none',
      color: palette.dirtyWhite,
      '&:hover': {
        color: palette.secondary,
      },
    },
    buttonbackgroundIcon: adminPalette.accentColor,
    buttonColorGrid: adminPalette.storyBackgroundColor,
    buttonHoverColor: '#BA0C2F',

    cardMediaBackground: {
      borderRadius: '10px', // Use camelCase for border-radius
      border: '1px solid rgba(204, 204, 204, 0.20)',
      background: 'linear-gradient(180deg, rgba(34, 34, 34, 0.45) 0%, rgba(17, 17, 17, 0.45) 100%)',
      backdropFilter: 'blur(25px)', // Use camelCase for backdrop-filter
    },

    cardMediaColor: adminPalette.textColor,

    cardHeaderBackground: adminPalette.storyBackgroundColor,
    cardHeaderText: adminPalette.textColor,

    audioGradientColor1: {
      background: 'linear-gradient(45deg, #0072CE, #5DAFFB)',
    },
    audioGradientColor2: adminPalette.accentColor,

    isDividerCheck: { isDivider: false } as DividerType,
    isEllipseCheck: { isEllipseLeft: true } as EllipseType,
    isEllipseRightCheck: { isEllipseRight: false } as EllipseType,

    ellipseLeftGradientColor: adminPalette.accentColor,
    ellipseLeftGradientOpacity: 0.17,
    ellipseRightGradientColor: '#F1E0FF',
    ellipseRightGradientOpacity: 0.15,

    cardIconColor: adminPalette.accentColor,
    filterIconsColor: 'rgba(102, 102, 102, 1)',
    filterIconsSelectedColor: 'rgba(191, 87, 0)',
    filterIconsHoverColor: adminPalette.accentColor,
  };

  console.log('action success', actionSuccess);

  return (
    <>
      {actionSuccess && extendedPalette ? (
        <div style={{ backgroundColor: extendedPalette.storyBackground, minHeight: '200vh' }}>
          {extendedPalette.isEllipseCheck.isEllipseLeft && (
            <Box
              sx={{
                position: 'absolute',
                left: '0%', // Adjust the right position as needed
                top: '0%', // Center vertically
                zIndex: 0, // Behind the content
                width: '80rem', // Adjust width for the desired size
                height: '20%',
                pointerEvents: 'none', // Make it non-interactive
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: 'contain, contain',
              }}>
              <EllipseLeftImage
                color={extendedPalette.ellipseLeftGradientColor}
                opacity={extendedPalette.ellipseLeftGradientOpacity}
              />
            </Box>
          )}

          {/* Ellipse 2 (Right Center) */}
          {extendedPalette.isEllipseRightCheck.isEllipseRight && (
            <Box
              sx={{
                position: 'absolute',
                right: '-9%', // Adjust the right position as needed
                top: '45%', // Center vertically
                // transform: 'translateY(-50%)',
                zIndex: 0, // Behind the content
                width: '60%', // Ellipse size
                height: '73rem',
                // borderRadius: '50%',
                // Blue with transparency, adjust color
                backgroundRepeat: 'no-repeat, no-repeat',
                pointerEvents: 'none',
              }}>
              <EllipseRightImage
                color={extendedPalette.ellipseRightGradientColor}
                opacity={extendedPalette.ellipseRightGradientOpacity}
              />
            </Box>
          )}
          <StoryHeader
            extendedPalette={extendedPalette}
            
            themeId={story?.themeId ? story?.themeId : '1'}
            coverImage={story?.cover_image ? `${cdn_url}${story.cover_image}` : ''} // Fallback cover image
            imgSrc={story?.extraAsset1 ? `${cdn_url}${story.extraAsset1}` : ''} // First extra image
            secondImgSrc={story?.extraAsset2 ? `${cdn_url}${story.extraAsset2}` : ''} // Second extra image
            title={story?.title}
            createdDate={story?.created_at}
            description={story?.description}
            collaborators={collaborators?.collaborators}
            onBackClick={handleBackClick}
            userId={story?.user_id}
          />

          {/* Grid Layout */}
          {/* <GridLayoutCheck /> */}
          <MediaGrid extendedPalette={extendedPalette} story={story && story} />
          <MemoryFloatingActionButtons
            story={story}
            isMobile={isMobile}
            user={user}
            extendedPalette={extendedPalette}
          />
          {!foundRole && !story?.confirmPassword && story?.private && story.url === router.query?.id && (
            <PrivateStoryModal open={privateStatus} onClose={handlePublication} />
          )}
          <AddCollaborators
            extendedPalette={extendedPalette}
            add={showPublishModal}
            onClose={() => closeCollaboratorsModal()}
            mediaContent={selectedMemorie}
            method={() => closeCollaboratorsModal()}
          />
          {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Modal
      </Button> */}

          {/* <PopupModal open={modalOpen} onClose={handleClose} /> */}
        </div>
      ) : (
        <Box width={'100%'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <CircularProgress sx={{ color: palette.primary }} />
        </Box>
      )}
    </>
  );
};

export default Main;
