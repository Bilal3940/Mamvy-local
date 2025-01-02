import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { useMediaQuery, Theme, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { MuiButton, MuiStepper } from '@/components';
import { intermitenceSelector, storySelector, subscriptionSelector } from '@/store/selectors';
import {
  createPayload,
  createStories,
  setCreateStep,
  setPrompts,
  getUploadSignedUrl,
  createStoryViewG,
  updateSubscriptionStatus,
  refreshUserData,
  openSubscriptionPopup,
  openModal,
  hidePopup,
  showPopup,
  // setPendingStory,
} from '@/store/actions';
import { TypeStory, FormStories, PromptsStories, FinishCreate } from './components';
import { useRouter } from 'next/router';
import { formsByCategory } from './forms';
import { formCategories } from './formsCategories';
import Image from 'next/image';

import { finalPayload, transformPayload } from '@/utils/transformPayload';
import { calculateFileSize, checkPermissions, checkRoleAndPermission, FetchFileService, fileConverter, showDialog } from '@/utils';

import { palette } from '@/theme/constants';
import ChevronLeftIconComponent from '../../../public/icons/components/chevron-left';
import ChevronRightIconComponent from '../../../public/icons/components/chevron-right';
import { UseFirstRender } from '@/hooks';
import { RefreshUserData } from '@/utils/fetchUserData';

type selectedPromptsState = {
  [key: string]: boolean;
};

const ShowScreen: FC<any> = ({
  createStep,
  setHandleForm,
  handleForm,
  setArrayRun,
  setSelectedPrompts,
  selectedPrompts,
  submit,
  values,
  setValues,
  selectedForm,
  setSelectedForm,
  currentFormConfig,
  setActualFormNumber,
  actualFormNumber,
  submitAction,
  handleCreateStories,
  creating,
}) => {
  switch (createStep) {
    case 0:
      return <TypeStory />;
    case 1:
      return (
        <FormStories
          {...{
            submit,
            values,
            setValues,
            selectedForm,
            setSelectedForm,
            currentFormConfig,
            setActualFormNumber,
            actualFormNumber,
            createStep,
            setArrayRun,
            submitAction,
            handleForm,
            setHandleForm,
          }}
        />
      );
    case 2:
      return (
        <PromptsStories
          {...{
            selectedPrompts,
            setSelectedPrompts,
          }}
        />
      );
    case 3:
      return <FinishCreate {...{ handleCreateStories, creating }} />;

    default:
      return <TypeStory />;
  }
};

export const CreateStory = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const createData = useSelector(storySelector);
  const intermitenceData = useSelector(intermitenceSelector);
  const { createStep, storySection, prev_stories, prompts } = createData;
  const user = useSelector((state: any) => state.auth.user);

  const [arrayRun, setArrayRun] = useState(0);
  const [handleForm, setHandleForm] = useState({ execute: false, form: '' });
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const currentFormConfig = useMemo(() => formsByCategory?.[storySection], [storySection]);
  const [actualFormNumber, setActualFormNumber] = useState(0);
  const [values, setValues] = useState<any>({});
  const [selectedPrompts, setSelectedPrompts] = useState<selectedPromptsState>({});
  // const {SubscriptionStatus, actionSuccess} = useSelector(subscriptionSelector)
  const storagePopup = useSelector((state:any) => state.storageLog.storagePopup);
  const [creating, setCreating] = useState(false);
  const submit = useRef<any>(null);
  const steps = [
    { label: 'type_story', value: 0 },
    { label: 'general_info', value: 1 },
    { label: 'prompt', value: 2 },
    { label: 'create', value: 3 },
  ];

  const goback = () => {
    if (createStep == 1 && actualFormNumber > 0) {
      setSelectedForm(formCategories[storySection]?.[actualFormNumber - 1].name);
      setActualFormNumber(actualFormNumber - 1);
      return;
    }
    if (createStep == 2) setActualFormNumber(actualFormNumber - 1);
    dispatch(setCreateStep(createStep - 1));
  };

  const submitAction = () => {
    if (Array.isArray(submit.current)) {
      submit.current.forEach((item: any) => {
        if (Array.isArray(item)) {
          item.forEach((item: any) => {
            item?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          });
        } else {
          item?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      });
      return;
    }
    if (submit?.current) {
      submit?.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const validFormFunction = (num: any) => {
    const formKeys = Object.keys(currentFormConfig || {});
    let notValidForm = '';
    const validForm = formKeys.reduce((acc: any, item: any) => {
      acc = acc && !!values[item];
      if (!notValidForm && !acc) {
        notValidForm = item;
      }
      return acc;
    }, true);
    const countForm = formCategories[storySection]?.length;
    if (createStep == 1 && actualFormNumber == countForm && validForm) {
      dispatch(setCreateStep(num));
      return true;
    } else {
      if (notValidForm) {
        setSelectedForm(notValidForm);
        let actual = 0;
        for (let i = 0; i < Object.keys(currentFormConfig || {}).length; i++) {
          if (notValidForm == Object.keys(currentFormConfig || {})[i]) {
            actual = i;
            break;
          }
        }
        setActualFormNumber(actual);
      }
    }
    return false;
  };

  const setActualSection = async (num: number) => {
    const formKeys = Object.keys(currentFormConfig || {});

    if (createStep == 1 && actualFormNumber < formKeys.length) {
      submitAction();

      if (actualFormNumber >= formKeys.length - 1) {
        const valid = validFormFunction(num);
      }
      return;
    }
    if (createStep == 1 && actualFormNumber >= formKeys.length - 1) {
      const valid = validFormFunction(num);
      return;
    }
    if (createStep == 2) {
      dispatch(setPrompts(selectedPrompts));
    }
    dispatch(setCreateStep(num));
  };

  const checkForm = () => {
    const formKeys = Object.keys(currentFormConfig || {});
    if (createStep == 1 && actualFormNumber < formKeys.length) {
      if (actualFormNumber == formKeys.length - 1) {
        const valid = validFormFunction(createStep + 1);
        if (valid) {
          const imageFile = values.story_title_image
            ? values.story_title_image.cover_image
            : values.story_title.cover_image;
          const valuesCopy = transformPayload(
            values,
            storySection,
            user.id,
            user.email,
            imageFile?.name,
            imageFile?.type,
          );
          dispatch(createPayload(valuesCopy));
        }
      }
      return;
    }
    if (createStep == 1 && actualFormNumber >= formKeys.length - 1) {
      const valid = validFormFunction(createStep + 1);
      if (valid) {
        const imageFile = values.story_title_image
          ? values.story_title_image.cover_image
          : values.story_title.cover_image;
        const valuesCopy = transformPayload(
          values,
          storySection,
          user.id,
          user.email,
          imageFile?.name,
          imageFile?.type,
        );

        dispatch(createPayload(valuesCopy));
      }
      return;
    }
    dispatch(setCreateStep(createStep + 1));
  };

  useEffect(() => {
    if (createStep == 1) checkForm();
  }, [values]);

  UseFirstRender(() => {
    if (user?.id) {
      dispatch(createStoryViewG(user.id));
    }
  }, [dispatch]);

  // const processFile = (prev_stories: any, prompts: {}) => {
  //   dispatch(
  //     getUploadSignedUrl(
  //       { file: `stories/${prev_stories?.title}/${prev_stories?.name_image}`, type: prev_stories?.type_image },
  //       async (res: any) => {
  //         try {
  //           const response = await FetchFileService(
  //             res?.value?.url?.uploadUrl,
  //             'PUT',
  //             values.story_title_image?.cover_image,
  //             prev_stories?.type_image,
  //           );
  //           if (response?.ok) {
  //             const valuesFinal = finalPayload(prev_stories, prompts, storySection);

  //             const result = dispatch(createStories(valuesFinal));
  //             return result;
  //           }
  //         } catch (error) {}
  //       },
  //     ),
  //   );
  // };
  // const MAX_FILE_SIZE_MB = 100;
  // const processFile = (prev_stories: any, prompts: {}) => {
  //   const file = values.story_title_image?.cover_image;
  
  //   // Calculate file size in bytes or MB (if preferred)
  //   const fileSizeBytes = file.size;
  //   const fileSizeMB = fileSizeBytes / (1024 * 1024); // Convert to MB if needed
  //   console.log("File size in bytes:", fileSizeBytes);
  //   console.log("File size in MB:", fileSizeMB);
  
  //   dispatch(
  //     getUploadSignedUrl(
  //       { file: `stories/${prev_stories?.title}/${prev_stories?.name_image}`, type: prev_stories?.type_image },
  //       async (res: any) => {
  //         try {
  //           const response = await FetchFileService(
  //             res?.value?.url?.uploadUrl,
  //             'PUT',
  //             file,
  //             prev_stories?.type_image,
  //           );
  
  //           if (response?.ok) {
  //             // Include file size in the final payload
  //             const valuesFinal = finalPayload({ ...prev_stories, fileSize: fileSizeBytes }, prompts, storySection);
  
  //             // Dispatch the createStories action with updated payload
  //             const result = dispatch(createStories(valuesFinal));
  //             console.log("i am the result",result)
  //             return result;
  //           }
  //         } catch (error) {
  //           console.error("Error uploading file:", error);
  //         }
  //       },
  //     ),
  //   );
  // };
  

  // const handleCreateStories = async () => {
  //   setCreating(true);
  
  //   // Refresh user data to get the latest storage information
  //   const res = await RefreshUserData(user?.token, user?.id);
  //   const userData = res?.result;
  //   const perm = checkRoleAndPermission(
  //     userData?.roles,
  //     'Subscriber_Individual',
  //     'CLIENT_STORY_CREATE',
  //     user?.id
  //   );
  
  //   // Check if user has the required permission
  //   if (!perm) {
  //     setCreating(false);
  //     handleOpenPopup();
  //     return;
  //   }
  
  //   // Get the file size for the story being created
  //   const fileSize = calculateFileSize(prev_stories, prompts); // Assuming calculateFileSize returns the size in appropriate units
  
  //   // Check storage limits before proceeding
  //   const usedStorage = userData?.usedStorage || 0;
  //   const totalStorage = userData?.totalStorage || 0;
  
  //   if (usedStorage + fileSize > totalStorage) {
  //     setCreating(false);
  //     showDialog("Not enough storage available", "error"); // Assuming showDialog displays a toast or message to the user
  //     return;
  //   }
  
  //   // Proceed with story creation if storage is sufficient
  //   setCreating(true);
  //   processFile(prev_stories, prompts);
  // };




  
  const processFile = async(prev_stories:any, prompts:{}) => {
    const file = values.story_title_image?.cover_image;
    const fileSizeBytes = calculateFileSize(file);

  
  
    dispatch(
      getUploadSignedUrl(
        { file: `stories/${prev_stories?.title}/${prev_stories?.name_image}`, type: prev_stories?.type_image },
        async (res:any) => {
          try {
            const response = await FetchFileService(
              res?.value?.url?.uploadUrl,
              'PUT',
              file,
              prev_stories?.type_image,
            );
  
            if (response?.ok) {
              // Include file size in the final payload
              const valuesFinal = finalPayload(
                { ...prev_stories, fileSize: fileSizeBytes },
                prompts,
                storySection
              );
              dispatch(updateSubscriptionStatus({userId: user?.id}))
              // dispatch(refreshUserData())
            
              // Refresh user data to get the latest storage information
              const res = await RefreshUserData(user?.token, user?.id);
              const userData = res?.result;
              const subsperm = checkRoleAndPermission(
                userData?.roles,
                'Subscriber_Individual',
                'CLIENT_STORY_CREATE',
                // 'Client',
                user?.id
              );
            
              // const perm = checkPermissions(userData?.roles, 'CLIENT_STORY_CREATE')
              // Check if the user has the required permission
              if (!subsperm) {
                setCreating(false);
                localStorage.setItem('pendingStory',JSON.stringify(valuesFinal))
                dispatch(openSubscriptionPopup())
                return;
              }
          
  
              // Dispatch the createStories action with updated payload
              const result = dispatch(createStories(valuesFinal));
              return result;
            }
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
      )
    );
  };
  
  const handleCreateStories = async () => {
    setCreating(true);
    // const payload ={
    //   userId: user?.id
    // }
    dispatch(updateSubscriptionStatus({userId: user?.id}))
    // dispatch(refreshUserData())
  
    // Refresh user data to get the latest storage information
    const res = await RefreshUserData(user?.token, user?.id);
    const userData = res?.result;
    // const subsperm = checkRoleAndPermission(
    //   userData?.roles,
    //   'Subscriber_Individual',
    //   'CLIENT_STORY_CREATE',
    //   // 'Client',
    //   user?.id
    // );
  
    // const perm = checkPermissions(userData?.roles, 'CLIENT_STORY_CREATE')
    // // Check if the user has the required permission
    // if (!subsperm) {
    //   setCreating(false);
    //   const valuesFinal = finalPayload(
    //     { ...prev_stories },
    //     prompts,
    //     storySection
    //   );
    //   localStorage.setItem('pendingStory',JSON.stringify(valuesFinal))
    //   dispatch(openSubscriptionPopup())
    //   return;
    // }
  
    // // Get the file size for the story being created
    const file = values.story_title_image?.cover_image;
    const fileSizeBytes = calculateFileSize(file);
  
    // // Check storage limits before proceeding
    const usedStorage = userData?.usedStorage || 0;
    const totalStorage = userData?.totalStorage || 0;

    if (usedStorage + fileSizeBytes > totalStorage) {
 
      setCreating(false);
      // yield call("There is not enough storage in your account.")
      dispatch(openModal({content:"There is not enough storage in your account."}))

      return;
    }
    setCreating(true);
    processFile(prev_stories, prompts);
  };
  

  

  useEffect(() => {
    if (createStep == 0) setValues({});
  }, [createStep]);

  const showStepName = () => {
    switch (createStep) {
      case 0:
        return t('type_story');
      case 1:
        return t('general_info');
      case 2:
        return t('prompt');
      case 3:
        return t('create');
      default:
        return '';
    }
  };

  const validatePrompts = () => {
    if (Object.keys(selectedPrompts || {}).length === 0) {
      return true;
    }

    return Object.values(selectedPrompts).every((value) => value === false);
  };

  return (
    <Box
      display={'flex'}
      padding={isMobile ? '0 1rem' : '0 0.7rem 0 1rem'}
      width={'100%'}
      justifyContent={'flex-start'}
      flexDirection={'column'}
      height={isMobile ? '100vh' : '100%'}
      paddingTop={intermitenceData.separation}
      alignItems={isMobile ? 'flex-start' : 'center'}
      sx={{ overflowY: 'auto' }}>
      <Image
        src={isMobile ? '/images/thread_mobile.svg' : '/images/thread.svg'}
        style={{
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          margin: 'auto',
          zIndex: 0,
        }}
        alt='thread'
        fill
        priority
        sizes='100%'
        quality={80}
      />
      {createStep !== 4 && (
        <Box width={'100%'} zIndex={0} maxWidth={'70.75rem'} margin={isMobile ? '0 auto' : '1rem auto'}>
          <Typography
            fontSize={isMobile ? '1.5rem' : '2.125rem'}
            fontWeight={isMobile ? '700' : '400'}
            textAlign={'center'}
            marginBottom={isMobile ? 0 : '1rem'}>
            {t(createStep == 0 ? 'select_story' : storySection)}
          </Typography>
          {!isMobile && <MuiStepper steps={steps} actualStep={createStep} />}
          {!isMobile ? (
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginTop={'2rem'}>
              <Box width={'6.5rem'}>
                <MuiButton
                  type='button'
                  disabled={false}
                  loading={false}
                  variant={'outlined'}
                  method={() => (createStep == 0 ? router.push('/app/home') : goback())}>
                  <Typography variant='button'>{t('back_minus')}</Typography>
                </MuiButton>
              </Box>
              <Box width={'6.5rem'}>
                {createStep == 3 ? (
                  <MuiButton
                    type='button'
                    disabled={storySection == '' ? true : false || intermitenceData?.loading || creating}
                    loading={intermitenceData?.loading}
                    variant={'contained'}
                    method={() => handleCreateStories()}>
                    <Typography variant='button'>{t('next_minus')}</Typography>
                  </MuiButton>
                ) : (
                  <MuiButton
                    type='button'
                    disabled={storySection == '' || (createStep == 2 && validatePrompts()) ? true : false}
                    loading={false}
                    variant={'contained'}
                    method={() => setActualSection(createStep + 1)}>
                    <Typography variant='button'>{t('next_minus')}</Typography>
                  </MuiButton>
                )}
              </Box>
            </Box>
          ) : (
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <MuiButton
                  type='button'
                  disabled={createStep == 0 ? true : false}
                  loading={false}
                  variant={'text'}
                  method={() => (createStep == 0 ? router.push('/app/home') : goback())}>
                  <ChevronLeftIconComponent color={createStep == 0 ? palette.opacityWhie : palette.primary} />
                  <Typography
                    marginLeft={'0.5rem'}
                    variant='body1'
                    color={createStep == 0 ? palette.opacityWhie : palette.primary}>
                    {t('back_minus')}
                  </Typography>
                </MuiButton>
              </Box>
              <Typography variant='h4'>{t(showStepName())}</Typography>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                {createStep == 3 ? (
                  <MuiButton
                    type='button'
                    disabled={storySection == '' ? true : false || intermitenceData?.loading || creating}
                    loading={intermitenceData?.loading}
                    variant={'text'}
                    method={() => handleCreateStories()}>
                    <Typography
                      variant='body1'
                      marginRight={'0.5rem'}
                      color={storySection == '' ? palette.faintGray : palette.primary}>
                      {t('next_minus')}
                    </Typography>
                    <ChevronRightIconComponent color={storySection == '' ? palette.faintGray : palette.primary} />
                  </MuiButton>
                ) : (
                  <MuiButton
                    type='button'
                    disabled={storySection == '' || (createStep == 2 && validatePrompts()) ? true : false}
                    loading={intermitenceData?.loading}
                    variant={'text'}
                    method={() => setActualSection(createStep + 1)}>
                    <Typography
                      variant='body1'
                      marginRight={'0.5rem'}
                      color={
                        storySection == '' || (createStep == 2 && validatePrompts())
                          ? palette.faintGray
                          : palette.primary
                      }>
                      {t('next_minus')}
                    </Typography>
                    <ChevronRightIconComponent
                      color={
                        storySection == '' || (createStep == 2 && validatePrompts())
                          ? palette.faintGray
                          : palette.primary
                      }
                    />
                  </MuiButton>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
      <Box width={'100%'} zIndex={0} padding={'1rem 0'} height={'auto'}>
        <ShowScreen
          {...{
            handleForm,
            setHandleForm,
            createStep,
            setArrayRun,
            setSelectedPrompts,
            selectedPrompts,
            submit,
            values,
            setValues,
            selectedForm,
            setSelectedForm,
            currentFormConfig,
            setActualFormNumber,
            actualFormNumber,
            submitAction,
            handleCreateStories,
            creating,
          }}
        />
      </Box>
    </Box>
  );
};
