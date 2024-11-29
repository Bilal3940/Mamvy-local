import { Box, Checkbox, FormControlLabel, MenuItem, MenuList, Theme, Typography, useMediaQuery } from '@mui/material';
import { palette } from '@/theme/constants';
import { useTranslation } from 'next-i18next';
import { currentStorySelector, templatesSelector } from '@/store/selectors';
import { styles } from './styles';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { MuiTabs } from '../Tabs';
import { FC, useEffect } from 'react';
import { getTabsFilters } from '../AppBar/constants';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeSelector, memorySelector, storySelector } from '@/store/selectors';
import { getMemories, searchStories } from '@/store/actions';
import { useRouter } from 'next/router';

const MotionContainer = motion(Box);
const MotionList = motion(MenuList);
const MotionItem = motion(MenuItem);

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

interface CustomPopperProps {
  isOpen: boolean;

  listItem: any;
}

export const FilterDropdown = ({ isOpen, listItem }: CustomPopperProps) => {
  const { t } = useTranslation();
 console.log('I am list',listItem)
 const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '#333333', // Default value
    textColor: '#fff', // Default value
    accentColor: '#BF5700', // Default value
  });

  const [showSection, setShowSection] = useState(0);
  const router = useRouter();
  const tabs = getTabsFilters(setShowSection);
  const dispatch = useDispatch();
  const homeData = useSelector(homeSelector);
  const { story } = useSelector(storySelector);
  const { memoryTypes } = useSelector(memorySelector);
  console.log('memory type',memoryTypes)

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const handleCheckPrompts = (value: any) => {
    if (value === undefined) return;

    let updatedPrompts = [...(homeData?.criterias?.prompts || [])];
    const index = updatedPrompts.findIndex((promptId) => promptId === value);

    if (index > -1) updatedPrompts.splice(index, 1);
    if (index == -1) updatedPrompts.push(value);

    if (story?.id) {
      return dispatch(getMemories(story?.id, { ...homeData?.criterias, prompts: updatedPrompts }));
    }
    dispatch(searchStories({ ...homeData?.criterias, prompts: updatedPrompts }));
  };

  const handleCheckCollaborators = (value: any) => {
    if (value === undefined) return;

    let updatedData = [...(homeData?.criterias?.collaborators || [])];
    const index = updatedData.findIndex((valueId) => valueId === value);

    if (index > -1) updatedData.splice(index, 1);
    if (index == -1) updatedData.push(value);
    if (story?.id) {
      return dispatch(getMemories(story?.id, { ...homeData?.criterias, collaborators: updatedData }));
    }
    dispatch(searchStories({ ...homeData?.criterias, collaborators: updatedData }));
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
  const backgroundColor = adminPalette.storyBackgroundColor;

  let bgColor =    router.pathname ===   '/app/home' ? palette.cardBackground :accentColor;
  let bgColorCheck =    router.pathname ===   '/app/home' ? palette.primary :accentColor;
  console.log("I am color",bgColor)
  const handleCheckTypes = (value: any) => {
    if (value === undefined) return;

    let updatedData = [...(homeData?.criterias?.types || [])];
    const index = updatedData.findIndex((valueId) => valueId === value);

    if (index > -1) updatedData.splice(index, 1);
    if (index == -1) updatedData.push(value);
    if (story?.id) {
      return dispatch(getMemories(story?.id, { ...homeData?.criterias, types: updatedData }));
    }
    dispatch(searchStories({ ...homeData?.criterias, types: updatedData }));
  };

  // const types = useMemo(() => {
  //   const types = [
  //     {
  //       id: 'video',
  //       label: 'Video',
  //     },
  //     {
  //       id: 'image',
  //       label: 'Image',
  //     },
  //     {
  //       id: 'audio',
  //       label: 'Audio',
  //     },
  //     {
  //       id: 'text',
  //       label: 'Text',
  //     },
  //   ];

  //   return types.filter((type) => memoryTypes?.includes(type.id));
  // }, [memoryTypes?.length]);

  const filterTabs = useMemo(() => {
    const filterTabs = [...tabs];
    if (!listItem[0]?.length) filterTabs.splice(0, 1);
    if (!listItem[1]?.length) filterTabs.splice(1, 1);
    if (!listItem[2]?.length) filterTabs.splice(2, 1);
    return filterTabs;
  }, [listItem[2]?.length, listItem[0]?.length, listItem[1]?.length, listItem, tabs]);

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          initial={!isOpen ? 'open' : 'closed'}
          exit={!isOpen ? 'open' : 'closed'}
          position={'absolute'}
          top={isMobile? '1rem' : '7rem'}
          right={0}
          width={'20rem'}
          zIndex={10}
          sx={styles(isMobile).dropDown}
          id='dropdown'
          animate={isOpen ? 'open' : 'closed'}>
          <MotionList
            sx={{
              background: `${backgroundColor}d9`,
              border: `0.063rem solid ${palette.cardBorder}`,
              borderRadius: '0.25rem',
              padding: '1rem',
              backdropFilter: 'blur(1.5625rem) !important',
            }}
            variants={{
              open: {
                clipPath: 'inset(0% 0% 0% 0%  )',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.2,
                  delayChildren: 0.1,
                  staggerChildren: 0.02,
                },
              },
              closed: {
                clipPath: 'inset(10% 50% 90% 50%)',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.2,
                },
              },
            }}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
            <Box display={'flex'} justifyContent={'center'} marginBottom={'0.5rem'}>
              <MuiTabs
              color={accentColor}
                tabs={filterTabs}
                value={showSection}
                width='100%'
                qty={filterTabs.length}
                extraStyle={{
                  width: '100%',
                  color:'red',
                }}
              />
            </Box>
            {showSection == 0 ? (
              <>
                <Box sx={{ overflowY: 'auto' }} maxHeight={'calc(100vh - 35vh)'}>
                  {listItem[0]?.map((item: any) => {
                    return (
                      <FormControlLabel
                        key={item.label}
                        control={
                          <MotionItem variants={itemVariants} sx={styles(isMobile,bgColor).item} disableRipple>
                            <Box
                              display={'flex'}
                              onChange={() => handleCheckPrompts(item.label)}
                              justifyContent={'flex-start'}
                              alignItems={'center'}>
                              <Checkbox
                                checked={homeData?.criterias?.prompts?.includes(item.label)}
                                sx={{
                                  color: palette.white,
                                  padding: '0.5rem 0.35rem 0.5rem 0',
                                  '&.Mui-checked': {
                                    color: bgColorCheck,
                                  },
                                }}
                              />
                              <Typography variant={isMobile ? 'body2' : 'body1'} whiteSpace={'break-spaces'}>
                                {t(item.label)}{' '}
                                {story?.story_details?.type_of_story == 'none_of_this_story' &&
                                  `${t('from')} ${story?.title}`}
                              </Typography>
                            </Box>
                          </MotionItem>
                        }
                        label={undefined}
                      />
                    );
                  })}
                </Box>
              </>
            ) : showSection == 1 ? (
              <Box sx={{ overflowY: 'auto' }} minHeight={'15rem'} maxHeight={'70vh'}>
                {!!listItem[1]?.[0]?.family?.length && (
                  <Box>
                    <Typography variant='body1' marginBottom={isMobile ? '0.5rem' : '1rem'}>
                      {t('family')}
                    </Typography>

                    <Box display={'flex'} flexDirection={'column'} marginBottom={'1rem'} width={'100%'}>
                      {listItem[1]?.[0]?.family?.map((item: any) => {
                        return (
                          <FormControlLabel
                            key={item.label}
                            control={
                              <MotionItem variants={itemVariants} sx={styles(isMobile,bgColor).itemCollaborators} disableRipple>
                                <Box
                                  display={'flex'}
                                  onChange={() => handleCheckCollaborators(item.id)}
                                  justifyContent={'flex-start'}
                                  alignItems={'center'}
                                  width={'100%'}>
                                  <Checkbox
                                    checked={homeData?.criterias?.collaborators?.includes(item.id)}
                                    sx={{
                                      color: palette.white,
                                      padding: '0.5rem 0.35rem 0.5rem 0',
                                      '&.Mui-checked': {
                                        color: bgColorCheck,
                                      },
                                    }}
                                  />
                                  <Typography variant={isMobile ? 'body2' : 'body1'} whiteSpace={'break-spaces'}>
                                    {t(item.label)}
                                  </Typography>
                                </Box>
                              </MotionItem>
                            }
                            label={undefined}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                )}
                {!!listItem[1]?.[0]?.friends?.length && (
                  <Box>
                    <Typography variant='body1' marginBottom={isMobile ? '0.5rem' : '1rem'}>
                      {t('friends')}
                    </Typography>

                    <Box display={'flex'} flexDirection={'column'} marginBottom={'1rem'}>
                      {listItem[1]?.[0]?.friends?.map((item: any) => {
                        return (
                          <FormControlLabel
                            key={item.label}
                            control={
                              <MotionItem variants={itemVariants} sx={styles(isMobile,bgColor).itemCollaborators} disableRipple>
                                <Box
                                  display={'flex'}
                                  onChange={() => handleCheckCollaborators(item.id)}
                                  justifyContent={'flex-start'}
                                  alignItems={'center'}>
                                  <Checkbox
                                    checked={homeData?.criterias?.collaborators?.includes(item.id)}
                                    sx={{
                                      color: palette.white,
                                      padding: '0.5rem 0.35rem 0.5rem 0',
                                      '&.Mui-checked': {
                                        color: bgColorCheck,
                                      },
                                    }}
                                  />
                                  <Typography variant={isMobile ? 'body2' : 'body1'} whiteSpace={'break-spaces'}>
                                    {t(item.label)}
                                  </Typography>
                                </Box>
                              </MotionItem>
                            }
                            label={undefined}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                )}
                {!!listItem[1]?.[0]?.others?.length && (
                  <Box>
                    <Typography variant='body1' marginBottom={isMobile ? '0.5rem' : '1rem'}>
                      {t('others')}
                    </Typography>

                    <Box display={'flex'} flexDirection={'column'} marginBottom={'1rem'}>
                      {listItem[1]?.[0]?.others?.map((item: any) => {
                        return (
                          <FormControlLabel
                            key={item.label}
                            control={
                              <MotionItem variants={itemVariants} sx={styles(isMobile,bgColor).itemCollaborators} disableRipple>
                                <Box
                                  display={'flex'}
                                  onChange={() => handleCheckCollaborators(item.id)}
                                  justifyContent={'flex-start'}
                                  alignItems={'center'}>
                                  <Checkbox
                                    checked={homeData?.criterias?.collaborators?.includes(item.id)}
                                    sx={{
                                      color: palette.white,
                                      padding: '0.5rem 0.35rem 0.5rem 0',
                                      '&.Mui-checked': {
                                        color: bgColorCheck,
                                      },
                                    }}
                                  />
                                  <Typography variant={isMobile ? 'body2' : 'body1'} whiteSpace={'break-spaces'}>
                                    {t(item.label)}
                                  </Typography>
                                </Box>
                              </MotionItem>
                            }
                            label={undefined}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ overflowY: 'auto' }} minHeight={'15rem'} maxHeight={'70vh'}>
                <Box display={'flex'} flexDirection={'column'} marginBottom={'1rem'} width={'100%'}>
                  {listItem[2]?.map((item: any) => {
                    return (
                      <FormControlLabel
                        key={item.label}
                        control={
                          <MotionItem variants={itemVariants} sx={styles(isMobile,bgColor).itemCollaborators} disableRipple>
                            <Box
                              display={'flex'}
                              onChange={() => handleCheckTypes(item.id)}
                              justifyContent={'flex-start'}
                              alignItems={'center'}
                              width={'100%'}>
                              <Checkbox
                                checked={homeData?.criterias?.types?.includes(item.id)}
                                sx={{
                                  color: palette.white,
                                  padding: '0.5rem 0.35rem 0.5rem 0',
                                  '&.Mui-checked': {
                                    color: bgColorCheck,
                                  },
                                }}
                              />
                              <Typography variant={isMobile ? 'body2' : 'body1'} whiteSpace={'break-spaces'}>
                                {t(item.label)}
                              </Typography>
                            </Box>
                          </MotionItem>
                        }
                        label={undefined}
                      />
                    );
                  })}
                </Box>
              </Box>
            )}
          </MotionList>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};
