import { ArrayDynamicForm, DynamicForm, MuiButton, MuiStepper } from '@/components';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import {
  actualStory,
  createStories,
  getUploadSignedUrl,
  loadPendingStory,
  openSubscriptionPopup,
  setPendingStory,
  updateStory,
  updateStoryViewG,
} from '@/store/actions';
import {
  authSelector,
  currentStorySelector,
  intermitenceSelector,
  pendingStorySelector,
  templatesSelector,
} from '@/store/selectors';
import { palette } from '@/theme/constants';
import {
  calculateFileSize,
  cdn_url,
  checkRoleAndPermission,
  ExtractCallbackType,
  FetchFileService,
  fileConverter,
  finalPayload,
  promisifiedCallback,
  transformPayload,
} from '@/utils';
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChevronLeftIconComponent from '../../../public/icons/components/chevron-left';
import ChevronRightIconComponent from '../../../public/icons/components/chevron-right';
import { formsByCategory } from '../../screens/CreateStory/forms';
import { formCategories } from '../../screens/CreateStory/formsCategories';
import { CancelModal } from './components';
import { RefreshUserData } from '@/utils/fetchUserData';

export const EditStory: FC<any> = () => {
  const { t } = useTranslation();

  const { user } = useSelector(authSelector);
  const story = useSelector(currentStorySelector);
  const { separation } = useSelector(intermitenceSelector);
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [arrayRun, setArrayRun] = useState(0);
  const [update, setUpdate] = useState(false);
  const [actualRoute, setActualRoute] = useState<string>(story?.url);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const intermitenceData = useSelector(intermitenceSelector);
  const pendingStory = useSelector(pendingStorySelector);

  UseFirstRender(() => {
    if (!story?.id) {
      let pendStory = null;
      if (typeof window !== 'undefined') {
        const pstory = localStorage.getItem('pendingStory');
        pendStory = pstory ? JSON.parse(pstory) : null;
      }
      dispatch(setPendingStory(pendStory));
    } else {
      dispatch(actualStory(router.query?.id as string));
    }
  }, [router?.query?.id, story?.id]);

  const currentFormConfig = useMemo(() => {
    if (story?.id) {
      return formsByCategory?.[story?.story_details?.type_of_story] ?? formCategories['life_story'];
    } else {
      return formsByCategory?.[pendingStory?.story_details?.type_of_story] ?? formCategories['life_story'];
    }
  }, [pendingStory]);
  const [actualFormNumber, setActualFormNumber] = useState(0);
  const [values, setValues] = useState<any>({});
  const submit = useRef<any>(null);
  const { status, switchStatus } = UseIntermitence();
  const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '',
    textColor: '',
    accentColor: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && story?.id) {
      dispatch(updateStoryViewG(user.id));
    }
  }, [user, dispatch]);

  const renderFormCategories = useCallback(() => {
    const fieldsConfig = story?.id
      ? formCategories?.[story?.story_details?.type_of_story]
      : pendingStory?.story_details
      ? formCategories?.[pendingStory?.story_details?.type_of_story]
      : formCategories['life_story'];

    return fieldsConfig.map((field: any) => (
      <Button
        key={field.name}
        sx={{ padding: 0, margin: 0, textAlign: 'left', width: '100%' }}
        onClick={() => handleSelectForm(field.name)}>
        <Box
          width={'100%'}
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          height={'2.625rem'}
          borderRight={selectedForm === field.name ? `0.25rem solid ${palette.primary}` : 'none'}>
          <Typography
            variant='subtitle2'
            color={selectedForm === field.name ? palette.codGray : palette.codGray}
            marginX={'1rem'}>
            {t(field.label)}
          </Typography>
        </Box>
      </Button>
    ));
  }, [formCategories, pendingStory, selectedForm]);

  const handleSelectForm = useCallback(
    (formKey: string) => {
      submitAction();
      setSelectedForm(formKey);

      const actual = Object.keys(currentFormConfig || {}).findIndex((key) => key === formKey);
      setActualFormNumber(actual >= 0 ? actual : 0);
    },
    [currentFormConfig],
  );
 console.log("i am actual form num",actualFormNumber)
  const currentForm = useMemo(() => {
    return currentFormConfig?.[selectedForm];
  }, [currentFormConfig, selectedForm]);

  const handleSubmit = useCallback(
    (values: any) => {
      setValues((prev: any) => ({ ...prev, [selectedForm]: values }));

      if (update) {
        updateAction({ [selectedForm]: values });
      }
    },
    [selectedForm, update],
  );

  const handleSubmitArray = useCallback(
    (values: any, index: number) => {
      setValues((prev: any) => {
        const formValues = { ...(prev[selectedForm] || {}) };
        formValues[index] = values;

        const validate = currentForm?.every((item: any) => formValues[item?.subtitle || item?.title]);

        setArrayRun((prev: any) => {
          if (validate && prev >= (currentForm?.length || 0) - 1) {
            if (update) {
              updateAction({ ...prev, [selectedForm]: formValues });
            }
          }
          return prev + 1;
        });

        return { ...prev, [selectedForm]: formValues };
      });
    },
    [currentForm, selectedForm, update],
  );

  const setSubmitArray = (index: number, handler: any) => {
    if (!Array.isArray(submit.current) || submit.current.length > currentForm?.length) {
      submit.current = [];
    }
    submit.current[index] = handler;
  };

  // const nextForm = useCallback(() => {
  //   const nextFormKey =
  //     formCategories[story ? story?.story_details?.type_of_story : pendingStory?.story_details?.type_of_story]?.[
  //       actualFormNumber + 1
  //     ]?.name;

  //   setSelectedForm(nextFormKey);
  //   setActualFormNumber(actualFormNumber + 1);
  //   setArrayRun(0);
  // }, [actualFormNumber, formCategories, pendingStory, story]);

  // const backForm = useCallback(() => {
  //   const prevFormKey = formCategories[pendingStory?.story_details?.type_of_story]?.[actualFormNumber - 1]?.name;

  //   setSelectedForm(prevFormKey);
  //   setActualFormNumber(actualFormNumber - 1);
  //   setArrayRun(0);
  // }, [actualFormNumber, formCategories, pendingStory]);
const nextForm = useCallback(() => {
  // Safely access `type_of_story` and fallback to an empty string if not available
  const typeOfStory =
    story?.story_details?.type_of_story || pendingStory?.story_details?.type_of_story || '';

  // Guard for when `actualFormNumber` is undefined or null
  const nextFormIndex = actualFormNumber + 1;
  
  // Check if the next form exists in `formCategories`
  const nextFormKey =
    formCategories[typeOfStory]?.[nextFormIndex]?.name || '';  // Fallback to an empty string if undefined

  // Only update if the next form exists
  if (nextFormKey) {
    setSelectedForm(nextFormKey);
    setActualFormNumber(nextFormIndex);
    setArrayRun(0);
  } else {
    // Optionally handle the case where no next form is available
    console.warn('No next form available');
  }
}, [actualFormNumber, formCategories, pendingStory, story]);

  const backForm = useCallback(() => {
  const prevFormIndex = actualFormNumber - 1;
  if (prevFormIndex >= 0) {
    const prevFormKey = formCategories[story ? story?.story_details?.type_of_story : pendingStory?.story_details?.type_of_story]?.[actualFormNumber - 1]?.name;
    console.log("i am priviuos key",prevFormKey)
    if (prevFormKey) {
      setSelectedForm(prevFormKey);
      setActualFormNumber(prevFormIndex);
    } else {
      console.warn('No form found at this index:', prevFormIndex);
    }
  } else {
    console.warn('Cannot go back, already at the first form.');
  }
  setArrayRun(0);
}, [actualFormNumber, formCategories, pendingStory]);

  const setDefault = async () => {
    try {
      const formValues = story?.id
        ? formCategories[story?.story_details?.type_of_story]
        : formCategories[pendingStory?.story_details?.type_of_story];

      const source = story?.id ? story : pendingStory;

      if (source?.cover_image) {
        const imageFile = await FetchFileService(`${cdn_url}${source?.cover_image}`);
        const fileBlob = await imageFile?.data?.blob();
        const file = new File([fileBlob], source?.cover_image?.split('/').pop(), { type: fileBlob.type });

        const defaultValues = {
          [formValues[0].name]: {
            title: source?.title,
            description: source?.description,
            cover_image: file,
          },
          ...source?.story_details?.general_info,
        };
        setValues(defaultValues);
      }
    } catch (error) {
      console.error('Error setting default values:', error);
    }
  };

  UseFirstRender(() => {
    if (story?.id) {
      setDefault();
      setSelectedForm(formCategories[story?.story_details?.type_of_story]?.[actualFormNumber]?.name);
      return;
    }

    if (!story?.id && pendingStory) {
      setDefault();
      setSelectedForm(formCategories[pendingStory?.story_details?.type_of_story]?.[actualFormNumber]?.name);
      return;
    }
    setValues({});
    setSelectedForm(formCategories['life_story']?.[0]?.name);
  }, [story, pendingStory]);

  const processFile = (prev_stories: any, prompts: {}, updatedValues: any) => {
    const idSource = story?.id ? story : pendingStory;
    dispatch(
      getUploadSignedUrl(
        {
          file: `stories/${prev_stories?.title}/${prev_stories?.name_image}`,
          type: prev_stories?.type_image,
        },
        async (res: any) => {
          try {
            const response = await FetchFileService(
              res?.value?.url?.uploadUrl,
              'PUT',
              updatedValues.story_title_image?.cover_image,
              prev_stories?.type_image,
            );

            if (response?.ok) {
              const valuesFinal: any = finalPayload(prev_stories, prompts, idSource?.story_details?.type_of_story);
              valuesFinal.id = idSource?.id;
              if (story?.id) {
                dispatch(updateStory({ valuesFinal, router }));
              } else {
                const file = values.story_title_image?.cover_image;
                const fileSizeBytes = calculateFileSize(file);
                const valuesFinal: any = finalPayload(
                  { ...prev_stories, fileSize: fileSizeBytes },
                  prompts,
                  idSource?.story_details?.type_of_story,
                );
                const result = dispatch(createStories(valuesFinal));
              }
            }
          } catch (error) {
            console.error('File processing failed:', error);
          }
        },
      ),
    );
  };

  const submitAction = () => {
    if (Array.isArray(submit.current)) {
      submit.current.forEach((item: any) => {
        if (Array.isArray(item)) {
          item.forEach((subItem: any) => {
            subItem?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
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

  const updateAction = useCallback(
    async (newValues: any) => {
      const idSource = story?.id ? story : pendingStory;
      const updatedValues = { ...values, ...newValues };

      const imageFile = updatedValues?.story_title_image
        ? updatedValues?.story_title_image?.cover_image
        : updatedValues?.story_title?.cover_image;

      const valuesCopy = transformPayload(
        updatedValues,
        idSource?.story_details?.type_of_story,
        user?.id,
        user?.email,
        imageFile?.name,
        imageFile?.type,
        idSource?.status,
      );
      const res = await RefreshUserData(user?.token, user?.id);
      const userData = res?.result;
      const subsperm = checkRoleAndPermission(
        userData?.roles,
        'Subscriber_Individual',
        'CLIENT_STORY_CREATE',
        // 'Client',
        user?.id,
      );
      if (!subsperm) {
        localStorage.setItem('router_history', `/app/story/${story?.url}`)
        dispatch(openSubscriptionPopup());
      } else {
        processFile(valuesCopy, idSource?.story_details?.prompts, updatedValues);
      }
    },
    [values, story, pendingStory],
  );

  const { template } = useSelector(templatesSelector);
  useEffect(() => {
    if (template?.template?.colors) {
      const colors = template.template.colors.reduce((acc: any, color: any) => {
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

      setAdminPalette({
        storyBackgroundColor: colors.storyBackgroundColor || '#333333',
        textColor: colors.textColor || '#ccc',
        accentColor: colors.accentColor || '#BF5700',
      });
    }
  }, [template]);

  const backgroundColorEdit = adminPalette.storyBackgroundColor;
  const accentColor = adminPalette.accentColor;
  const textColorButton = adminPalette.textColor;
  const buttontext = router.pathname === '/app/story/[id]/update' ? textColorButton : palette?.primary;
  const buttonBackground = router.pathname === '/app/story/[id]/update' ? accentColor : palette?.cardBackground;
  const notificationBackground = router.pathname === '/app/story/[id]/update' ? accentColor : palette?.primary;
  const EditStoryBackground = router.pathname === '/app/story/[id]/update' ? backgroundColorEdit : palette?.primary;

  useEffect(() => {
    if (EditStoryBackground) {
      document.body.style.setProperty('background-color', `${EditStoryBackground} `, 'important');

      return () => {
        document.body.style.removeProperty('background-color');
      };
    }
  }, [template, EditStoryBackground]);

  const updateButton = () => {
    submitAction();
    setUpdate(true);
  };
  const handleBack = () => {
    if (story?.id) {
      switchStatus();
    } else {
      router.push('/app/home');
    }
  };

  return (
    <>
      <Box
        display={'flex'}
        padding={isMobile ? '0 1rem' : '0 0.7rem 0 1rem'}
        width={'100%'}
        justifyContent={'flex-start'}
        flexDirection={'column'}
        height={isMobile ? '100vh' : '100%'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        sx={{ overflowY: 'auto' }}>
        <Box width={'100%'} zIndex={0} padding={'1rem 0'} height={'auto'}>
          <Box
            display={'flex'}
            height={'100%'}
            justifyContent={'space-between'}
            marginBottom={isMobile ? '0' : '1rem'}
            alignItems={isMobile ? 'center' : 'flex-start'}
            flexDirection={isMobile ? 'column' : 'row'}
            paddingTop={separation}
            width={'100%'}
            overflow={'auto'}>
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
            {!isMobile && (
              <Box
                borderRadius={'0.5rem'}
                padding={'1rem 0'}
                width={'20%'}
                marginRight={'1.5rem'}
                bgcolor={palette.lightCardBackground}
                height={'100%'}
                zIndex={0}
                minHeight={'37.75rem'}>
                {renderFormCategories()}
              </Box>
            )}

            <Box
              borderRadius={'0.5rem'}
              zIndex={0}
              width={isMobile ? '100%' : '80%'}
              minHeight={isMobile ? '100%' : '37.75rem'}
              height={'100%'}
              padding={isMobile ? '0.5rem ' : '3.5rem'}
              position={'relative'}
              border={`0.063rem solid ${palette.cardBorder}`}
              bgcolor={palette.cardBackground}
              sx={{ backdropFilter: 'blur(1.5625rem)' }}>
              <Box display={'flex'} justifyContent={'flex-end'}>
                <Box width={'5.75rem'} marginRight={'1rem'}>
                  <MuiButton
                    type='submit'
                    disabled={false}
                    loading={false}
                    method={handleBack}
                    variant={'outlined'}
                    sx={{
                      '&:hover': {
                        borderColor: buttonBackground,
                      },
                    }}>
                    <Typography variant='button' color={palette.white}>
                      {t('cancel')}
                    </Typography>
                  </MuiButton>
                </Box>

                <Box width={'5.75rem'}>
                  <MuiButton
                    type='submit'
                    disabled={false}
                    loading={intermitenceData?.loading}
                    backgroundColor={buttonBackground}
                    variant={'contained'}
                    method={updateButton}
                    sx={{
                      backgroundColor: buttonBackground,
                      '&:hover': {
                        backgroundColor: buttonBackground,
                      },
                    }}>
                    <Typography variant='button'>{t('save')}</Typography>
                  </MuiButton>
                </Box>
              </Box>
              {isMobile && (
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <MuiButton
                      type='button'
                      disabled={false}
                      loading={false}
                      variant={'text'}
                      method={() => backForm()}>
                      <ChevronLeftIconComponent color={actualFormNumber == 0 ? palette.gray : buttontext} />
                      <Typography
                        marginLeft={'0.5rem'}
                        variant='body1'
                        color={actualFormNumber == 0 ? palette.gray : buttontext}>
                        {t('back_minus')}
                      </Typography>
                    </MuiButton>
                  </Box>
                  <Typography variant='subtitle1' color={palette?.white}>
                    {t(`${selectedForm}_minus`)}
                  </Typography>
                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <MuiButton
                      type='button'
                      // disabled={story?.story_details?.type_of_story == '' ? true : false}
                      disabled={story?.story_details?.type_of_story === '' || selectedForm === undefined || actualFormNumber === undefined} // Disable if no form number or undefined
                      loading={false}
                      variant={'text'}
                      method={() => nextForm()}>
                      <Typography
                        variant='body1'
                        marginRight={'0.5rem'}
                        color={story?.story_details?.type_of_story == '' ? palette.faintGray : buttontext}>
                        {t('next_minus')}
                      </Typography>
                      <ChevronRightIconComponent
                        color={story?.story_details?.type_of_story == '' ? palette.faintGray : buttontext}
                      />
                    </MuiButton>
                  </Box>
                </Box>
              )}
              {!!currentForm && Array.isArray(currentForm)
                ? currentForm?.map((item: any, index: number) =>
                    item?.type === 'array' ? (
                      <ArrayDynamicForm
                        color={accentColor}
                        setSubmit={(sub: any) => setSubmitArray(index, sub)}
                        submitHandler={(values: any) => handleSubmitArray(values, item?.subtitle || item?.title)}
                        key={index}
                        fieldsConfig={item}
                        defaultValues={
                          values[selectedForm] ? values[selectedForm][item?.subtitle || item?.title] : null
                        }
                        title={
                          formCategories[story?.story_details?.type_of_story]?.[actualFormNumber]?.name
                        }></ArrayDynamicForm>
                    ) : (
                      <DynamicForm
                        setSubmit={(sub: any) => setSubmitArray(index, sub)}
                        submitHandler={(values: any) => handleSubmitArray(values, item?.subtitle || item?.title)}
                        key={index}
                        defaultValues={
                          values[selectedForm] ? values[selectedForm][item?.subtitle || item?.title] : null
                        }
                        fieldsConfig={item}></DynamicForm>
                    ),
                  )
                : currentForm?.type === 'array'
                ? !!currentForm && (
                    <ArrayDynamicForm
                      setSubmit={(handler: any) => (submit.current = handler)}
                      submitHandler={handleSubmit}
                      fieldsConfig={currentForm}
                      isEdit
                      defaultValues={values[selectedForm] ? values[selectedForm] : null}
                      title={
                        formCategories[
                          story?.id ? story?.story_details?.type_of_story : pendingStory?.story_details?.type_of_story
                        ]?.[actualFormNumber - 1]?.name
                      }></ArrayDynamicForm>
                  )
                : !!currentForm && (
                    <DynamicForm
                      defaultValues={values[selectedForm] ? values[selectedForm] : null}
                      setSubmit={(handler: any) => (submit.current = handler)}
                      submitHandler={handleSubmit}
                      isEdit
                      fieldsConfig={currentForm}></DynamicForm>
                  )}
              {isMobile && (
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <MuiButton
                      type='button'
                      disabled={false}
                      loading={false}
                      variant={'text'}
                      method={() => backForm()}>
                      <ChevronLeftIconComponent color={actualFormNumber == 0 ? palette.gray : buttontext} />
                      <Typography
                        marginLeft={'0.5rem'}
                        variant='body1'
                        color={actualFormNumber == 0 ? palette.gray : buttontext}>
                        {t('back_minus')}
                      </Typography>
                    </MuiButton>
                  </Box>
                  <MuiStepper
                    buttonBackground={buttonBackground}
                    steps={formCategories[story?.story_details?.type_of_story]}
                    actualStep={actualFormNumber}
                  />
                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <MuiButton
                      type='button'
                      disabled={story?.story_details?.type_of_story == '' ? true : false}
                      loading={false}
                      variant={'text'}
                      method={() => nextForm()}>
                      <Typography
                        variant='body1'
                        marginRight={'0.5rem'}
                        color={story?.story_details?.type_of_story == '' ? palette.faintGray : buttontext}>
                        {t('next_minus')}
                      </Typography>
                      <ChevronRightIconComponent
                        color={story?.story_details?.type_of_story == '' ? palette.faintGray : buttontext}
                      />
                    </MuiButton>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <CancelModal color={accentColor} open={status} onClose={switchStatus} confirmRoute={`/app/story/${story?.url}`} />
    </>
  );
};
