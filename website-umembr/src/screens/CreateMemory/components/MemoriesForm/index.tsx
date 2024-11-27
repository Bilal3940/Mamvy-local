import { palette } from '@/theme/constants';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { hasChangesSelector, intermitenceSelector, memorySelector, storySelector } from '@/store/selectors';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Form, MemoriesList } from './components';
import { MuiButton, MuiSelect } from '@/components';
import {
  selectEditMemory,
  setHideMediaButton,
  setMediaScreenType,
  setMediaType,
  updateMemoryViewG,
} from '@/store/actions';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import { useRouter } from 'next/router';
import { CancelModal } from '../CancelModal';
import { setHasChanges } from '@/store/hasChanges/actions';
const storyPrompts = [
  {
    text: 'life_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_life', value: '' },
      { checked: true, placeholder: 'share_a_memory_person', value: '' },
      { checked: true, placeholder: 'share_a_memory_working', value: '' },
      { checked: true, placeholder: 'share_a_memory_other', value: '' },
    ],
  },
  {
    text: 'classmates_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_fun', value: '' },
      { checked: true, placeholder: 'share_a_memory_challenge', value: '' },
      { checked: true, placeholder: 'share_a_memory_group', value: '' },
      { checked: true, placeholder: 'share_a_memory_other2', value: '' },
    ],
  },
  {
    text: 'teammates_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_team', value: '' },
      { checked: true, placeholder: 'share_a_memory_win', value: '' },
      { checked: true, placeholder: 'share_a_memory_team2', value: '' },
      { checked: true, placeholder: 'share_a_memory_fan', value: '' },
    ],
  },
  {
    text: 'none_of_this_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_other3', value: '' },
      { checked: true, placeholder: 'share_a_memory_fun2', value: '' },
      { checked: true, placeholder: 'share_a_memory_challenge2', value: '' },
      { checked: true, placeholder: 'share_a_memory_other4', value: '' },
    ],
  },
];
export const MemoriesForm: FC<any> = () => {
  const { t } = useTranslation();
  const { mediaScreenType, memoriesLoaded, showMediaButtons } = useSelector(memorySelector);
  const hasChanges = useSelector(hasChangesSelector);



  const [selectedPropmpt, setSelectedPrompt] = useState<any>();
  const [existData, setExistData] = useState<any>(false);
  const { loading } = useSelector(intermitenceSelector);
  const [isLoading, setIsLoading] = useState(false);
  const { story } = useSelector(storySelector);
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef<any>(null);
  const divRef = useRef<any>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [defaultItem, setDefaultItem] = useState<any>(null);
  const { status, switchStatus } = UseIntermitence();

  const showContainer = () => {
    switch (mediaScreenType) {
      case 'list':
        return <MemoriesList prompt={selectedPropmpt} setDefaultItem={setDefaultItem} />;
      case 'form':
      default:
        return (
          <Form
            prompt={selectedPropmpt}
            formRef={formRef}
            setHasChanges={setHasChanges}
            divRef={divRef}
            setDefaultItem={setDefaultItem}
            changeMediaTypeScreen={changeMediaTypeScreen}
            defaultItem={defaultItem}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setExistData={setExistData}
          />
        );
    }
  };

  const renderPrompts = () => {
    return promptsArray?.map((item: any) => (
      <Box
        key={item.id}
        width={'100%'}
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        padding={'0.5rem 0'}
        borderRight={selectedPropmpt == item.id ? `0.25rem solid ${palette.primary}` : 'none'}
        onClick={() => {
          if (!existData) setSelectedPrompt(item.id);
        }}
        sx={{ cursor: 'pointer' }}>
        <Typography
          variant='subtitle2'
          color={selectedPropmpt == item.id ? palette.primary : palette.codGray}
          marginX={'1rem'}>
          {story?.story_details?.type_of_story == 'none_of_this_story' ? `${t(item.name)} ` : t(item.name)}
        </Typography>
      </Box>
    ));
  };

  const changeMediaTypeScreen = () => {
    router.push(`/app/story/${story?.url}/memory/create`);
    dispatch(setMediaScreenType('list'));
    dispatch(setHideMediaButton());
    setDefaultItem(null);
    dispatch(setMediaType(''));
    setExistData(false);
  };

  const selectTypeOfScreen = () => {
    const memoryEdit = memoriesLoaded?.find((item: any) => item.id == router?.query?.memoryId);
    // const propmts = Object.keys(story?.story_details?.prompts || {}).filter((key) => story?.story_details?.prompts[key]);
    // setSelectedPrompt(propmts[0]);

    if (memoryEdit) {
      setDefaultItem(memoryEdit);
      dispatch(setMediaScreenType('form'));
      dispatch(setMediaType(memoryEdit?.type));
      setSelectedPrompt(memoryEdit?.prompt);
      dispatch(selectEditMemory(null));
      dispatch(updateMemoryViewG(memoryEdit?.user_id));
      return;
    }
    if (memoriesLoaded?.length) {
      changeMediaTypeScreen();
      return;
    }
  };

  UseFirstRender(() => {
    selectTypeOfScreen();
  }, [router?.query?.memoryId, memoriesLoaded?.length, story?.story_details?.prompts?.length]);

  const submitForm = () => {
    if (formRef?.current) {
      formRef?.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };
  const closeForm = () => {
    if (hasChanges?.hasChanges) {
      switchStatus();
    } else {
      changeMediaTypeScreen();
    
    }
  };
  const continueForm = () => {
    changeMediaTypeScreen();
    dispatch(setHasChanges(false))
    switchStatus();
  };

  const promptsArray = useMemo(() => {
    if (story) {
      const type = story?.story_details?.type_of_story;
      const promptsBase = storyPrompts.find((item: any) => item.text === type)?.prompts;
      const storyName = story?.title;

      const organizePrompts = promptsBase?.reduce((acc: any, item: any) => {
        const keys = Object.keys(story?.story_details?.prompts);
        if (keys.includes(item?.placeholder) && story?.story_details?.prompts[item?.placeholder]) {
          acc.push({
            name: `${t(item?.placeholder)} from ${storyName}`,
            id: item?.placeholder,
          });
        }

        return acc;
      }, []);

      if (organizePrompts.length === 0) {
        const firstPrompt = promptsBase ? promptsBase[0] : null;
        if (firstPrompt) {
          organizePrompts.push({
            name: `${t(firstPrompt.placeholder)} from ${storyName}`,
            id: firstPrompt.placeholder,
          });
        }
      }

      setSelectedPrompt(
        organizePrompts[0]?.id || storyPrompts.find((story) => story.text === type)?.prompts[0]?.placeholder,
      );
      return organizePrompts;
    }
    return [];
  }, [story, storyPrompts]);

  const handleSelect = (value: any) => {
    setSelectedPrompt(value);
  };

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} height={'100%'} position={'relative'}>
        <Box
          position={'fixed'}
          top={isMobile ? '0' : '4.5rem'}
          left={isMobile ? '3rem' :'13rem'}
          width={'100%'}
          zIndex={10}
          bgcolor={palette.cardBackground}
          padding={'1.1rem'}
          boxShadow={'0px 4px 12px rgba(0, 0, 0, 0.1)'}>
          <Typography variant='h5' color={palette.white} >
            {story?.title}
          </Typography>
        </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={isMobile ? 'center' : 'flex-start'}
        flexDirection={isMobile ? 'column' : 'row'}
        width={'100%'}
        zIndex={0}
        height={'100%'}
        overflow={'hidden'}>
          

        {!isMobile && (
          <Box
            borderRadius={'0.5rem'}
            padding={'1rem 0'}
            width={'11.75rem'}
            minWidth={'11.75rem'}
            marginRight={'1rem'}
            bgcolor={palette.lightCardBackground}
            height={'100%'}
            minHeight={'37.75rem'}>
            {renderPrompts()}
          </Box>
        )}
       
        <Box
          ref={divRef}
          bgcolor={palette.cardBackground}
          borderRadius={'0.5rem'}
          width={'100%'}
          border={`0.063rem solid ${palette.cardBorder}`}
          sx={{ backdropFilter: 'blur(1.5625rem)', overflowY: 'auto', overflowX: 'hidden' }}
          height={'100%'}
          padding={isMobile ? '1.5rem' : '3.5rem'}
          // marginBottom={isMobile ? '0' : '1rem'}
          position={'relative'}>
           
          <Box
            display={'flex'}
            minHeight={'2.375rem'}
            flexDirection={isMobile ? 'column-reverse' : 'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            marginBottom={'1rem'}>
            {!isMobile ? (
              <Typography variant='h5' color={palette.white}>
                {`${t(selectedPropmpt)} ${t('from')} ${story?.title}`}

              </Typography>
            ) : (
              <>

                {selectedPropmpt && (
                  <MuiSelect
                    id='selectedPropmpt'
                    name='selectedPropmpt'
                    value={selectedPropmpt}
                    label={t('selected_prompt')}
                    isDarkTheme={false}
                    handleSelect={(event: any) => handleSelect(event?.target?.value)}
                    options={promptsArray}></MuiSelect>
                )}
              </>
            )}

            <Box
              display={'flex'}
              width={isMobile ? '100%' : 'auto'}
              justifyContent={isMobile ? 'flex-end' : 'space-between'}
              alignItems={isMobile ? 'flex-start' : 'center'}
              marginBottom={isMobile ? '1.5rem' : 0}>
              {mediaScreenType == 'form' && !isMobile && (
                <Box width={'6.5rem'} marginRight={'1rem'}>
                  <MuiButton
                    type='button'
                    loading={false}
                    disabled={loading || isLoading}
                    variant={'outlined'}
                    method={() => closeForm()}>
                    <Typography variant='button' color={palette.white}>
                      {t('cancel')}
                    </Typography>
                  </MuiButton>
                </Box>
              )}
              {showMediaButtons && (
                <Box width={'6.5rem'} alignSelf={'flex-end'}>
                  <MuiButton
                    method={submitForm}
                    type='submit'
                    loading={loading || isLoading}
                    disabled={loading || isLoading}
                    variant={'contained'}>
                    <Typography variant='button' color={palette.white}>
                      {defaultItem?.id ? t('update') : t('save')}
                    </Typography>
                  </MuiButton>
                </Box>
              )}
            </Box>
          </Box>
          {showContainer()}
        </Box>
      </Box>
      </Box>
      <CancelModal open={status} onClose={switchStatus} confirmMethod={continueForm} />
    </>
  );
};
