import { ArrayDynamicForm, DynamicForm, MuiButton, MuiStepper } from '@/components';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import { actualStory, getUploadSignedUrl, updateStory, updateStoryViewG } from '@/store/actions';
import { authSelector, currentStorySelector, intermitenceSelector, templatesSelector } from '@/store/selectors';
import { palette } from '@/theme/constants';
import {
  cdn_url,
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

  const currentFormConfig = useMemo(() => {
    return formsByCategory?.[story?.story_details?.type_of_story];
  }, [story]);
  const [actualFormNumber, setActualFormNumber] = useState(0);
  const [values, setValues] = useState<any>({});
  const submit = useRef<any>(null);
  const { status, switchStatus } = UseIntermitence();
   const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '', // Default value
    textColor: '', // Default value
    accentColor: '', // Default value
  });

  UseFirstRender(() => {
    if (!story?.id) {
      dispatch(actualStory(router.query?.id as string));
    }
  }, [router?.query?.id, story?.id]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(updateStoryViewG(user.id));
    }
  }, [user, dispatch]);

  const renderFormCategories = useCallback(() => {
    const fieldsConfig = formCategories?.[story?.story_details?.type_of_story] ?? formCategories['life_story'];

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
          borderRight={selectedForm == field.name ? `0.25rem solid ${palette.primary}` : 'none'}>
          <Typography
            variant='subtitle2'
            color={selectedForm == field.name ? accentColor : palette.codGray}
            marginX={'1rem'}>
            {t(field.label)}
          </Typography>
        </Box>
      </Button>
    ));
  }, [story, selectedForm]);

  const handleSelectForm = (formKey: string) => {
    submitAction();
    setSelectedForm(formKey);
    let actual = 0;
    for (let i = 0; i < Object.keys(currentFormConfig || {}).length; i++) {
      if (formKey == Object.keys(currentFormConfig || {})[i]) {
        actual = i;
        break;
      }
    }
    setActualFormNumber(actual);
  };

  const currentForm = useMemo(() => {
    return currentFormConfig?.[selectedForm];
  }, [selectedForm, story?.id, currentFormConfig]);

  const handleSubmit = useCallback(
    (values: any) => {
      setValues((prev: any) => ({ ...prev, [selectedForm]: values }));
      if (update) {
        updateAction({ [selectedForm]: values });
      }
    },
    [update, selectedForm],
  );

  const handleSubmitArray = useCallback(
    (values: any, index: any) => {
      setValues((prev: any) => {
        const value = { ...(prev[selectedForm] || {}) };
        value[index] = values;
        const validate = currentForm?.reduce((acc: any, item: any) => {
          return acc && !!value[item?.subtitle || item?.title];
        }, true);
        setArrayRun((prev: any) => {
          if (validate && prev >= currentForm?.length - 1) {
            if (update) {
              updateAction({ ...prev, [selectedForm]: value });
            }
          }
          return prev + 1;
        });
        return { ...prev, [selectedForm]: value };
      });
    },
    [update, selectedForm],
  );

  const setSubmitArray = (index: any, handler: any) => {
    if (!Array.isArray(submit.current) || submit?.current?.length > currentForm?.length) submit.current = [];
    submit.current[index] = handler;
  };

  const nextForm = () => {
    setSelectedForm(formCategories[story?.story_details?.type_of_story]?.[actualFormNumber + 1]?.name);
    setActualFormNumber(actualFormNumber + 1);
    setArrayRun(0);
  };

  const backForm = () => {
    setSelectedForm(formCategories[story?.story_details?.type_of_story]?.[actualFormNumber - 1]?.name);
    setActualFormNumber(actualFormNumber - 1);
    setArrayRun(0);
  };

  const setDefault = async () => {
    const formValues = formCategories[story?.story_details?.type_of_story];
    if (story?.cover_image) {
      const imageFile = await FetchFileService(`${cdn_url}${story?.cover_image}`);
      const fileBlob = await imageFile?.data?.blob();
      const file = new File([fileBlob], story?.cover_image?.split('/').pop(), { type: fileBlob.type });
      const defaultValues = {
        [formValues[0].name]: {
          title: story?.title,
          description: story?.description,
          cover_image: file,
        },
        ...story?.story_details?.general_info,
      };
      setValues(defaultValues);
    }
  };

  UseFirstRender(() => {
    if (story?.id) setDefault();
    if (!update && !actualRoute && story?.url) setActualRoute(story?.url);
    if (!selectedForm && story?.id)
      setSelectedForm(formCategories[story?.story_details?.type_of_story]?.[actualFormNumber]?.name);
  }, [story]);

  const processFile = (prev_stories: any, prompts: {}, updatedValues: any) => {
    dispatch(
      getUploadSignedUrl(
        { file: `stories/${prev_stories?.title}/${prev_stories?.name_image}`, type: prev_stories?.type_image },
        async (res: any) => {
          try {
            const response = await FetchFileService(
              res?.value?.url?.uploadUrl,
              'PUT',
              updatedValues.story_title_image?.cover_image,
              prev_stories?.type_image,
            );

            if (response?.ok) {
              const valuesFinal: any = finalPayload(prev_stories, prompts, story?.story_details?.type_of_story);
              valuesFinal.id = story?.id;
              dispatch(updateStory({valuesFinal, router}));
            }
          } catch (error) {
          }
        },
      ),
    );
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

  const updateAction = useCallback(
    (newValues: any) => {
      const updatedValues = { ...values, ...newValues };
      const imageFile = updatedValues?.story_title_image
        ? updatedValues?.story_title_image?.cover_image
        : updatedValues?.story_title?.cover_image;

      const valuesCopy = transformPayload(
        updatedValues,
        story?.story_details?.type_of_story,
        user?.id,
        user?.email,
        imageFile?.name,
        imageFile?.type,
        story?.status,
      );
      processFile(valuesCopy, story?.story_details?.prompts, updatedValues);
    },
    [values, story],
  );
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

  const backgroundColorEdit=adminPalette.storyBackgroundColor
  const accentColor = adminPalette.accentColor;
  const textColorButton=adminPalette.textColor;
  const buttontext =
    router.pathname === '/app/story/[id]/update' // Replace '/specific-page' with your desired route
      ? textColorButton // Custom background for the specific page
      : palette?.primary;
 const buttonBackground =
    router.pathname === '/app/story/[id]/update' // Replace '/specific-page' with your desired route
      ? accentColor // Custom background for the specific page
      : palette?.cardBackground;
      const notificationBackground =
    router.pathname === '/app/story/[id]/update' // Replace '/specific-page' with your desired route
      ? accentColor // Custom background for the specific page
      : palette?.primary;
      const EditStoryBackground =
    router.pathname === '/app/story/[id]/update' // Replace '/specific-page' with your desired route
      ? backgroundColorEdit // Custom background for the specific page
      : palette?.primary;

       useEffect(() => {
    if (EditStoryBackground) {
      // Dynamically set the body background color with !important
      document.body.style.setProperty('background-color', `${EditStoryBackground} `, 'important');
     
      return () => {
        document.body.style.removeProperty('background-color');
      };
    }
  }, [template,EditStoryBackground]);

  const updateButton = () => {
    submitAction();
    setUpdate(true);
  };

  return (
    <>
      <Box
        display={'flex'}
        padding={isMobile ? '0 1rem' : '0 0.7rem 0 1rem'}
        width={'100%'}
        justifyContent={'flex-start'}
        // bgcolor={EditStoryBackground}
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
                  <MuiButton type='submit' disabled={false} loading={false} method={switchStatus} variant={'outlined'}
                   sx={{'&:hover': {
      borderColor: buttonBackground,  // Change the border color on hover
              // Change the text color on hover
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
      backgroundColor: buttonBackground, // Add your hover color
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
                      <ChevronLeftIconComponent color={actualFormNumber == 0 ? palette.gray : buttontext } />
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
                        formCategories[story?.story_details?.type_of_story]?.[actualFormNumber - 1]?.name
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
