import { palette } from '@/theme/constants';
import { Box, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memorySelector, storySelector } from '@/store/selectors';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { FileUpload, MuiTextField, RichText } from '@/components';
import { FormikConfig } from './formik';
import { MediaFileRow } from '../MediaFileRow';
import {
  setShowMediaButton,
  sendMemory,
  setMediaType,
  getUploadSignedUrl,
  updateMemory,
  getSignedUrl,
} from '@/store/actions';
import {
  FetchFileService,
  cdn_url,
  complementaryDownload,
  complementaryUpload,
  fileConverter,
  showDialog,
} from '@/utils';
import { UseFirstRender } from '@/hooks';
import { LoadingModal } from '../loadingModal';
// import { storageEventEmitter } from '@/hooks/StorageEventEmitter';

const mediaTypes = [
  { icon: 'video', value: 0, label: 'add_video_memory' },
  { icon: 'audio', value: 1, label: 'add_audio_memory' },
  { icon: 'image', value: 2, label: 'add_image_memory' },
  { icon: 'text', value: 3, label: 'add_text_memory' },
];

export const Form: FC<any> = ({
  formRef,
  changeMediaTypeScreen,
  setHasChanges,
  defaultItem,
  prompt,
  isLoading,
  divRef,
  setIsLoading,
  setExistData,
}) => {
  const { t } = useTranslation();
  const [mediaSelect, setMediaSelect] = useState(localStorage.getItem('selectMedia'));
  const memoryData = useSelector(memorySelector);
  const [fileName, setFileName] = useState<any>('');
  const [type, setType] = useState<any>('');
  const [openModal, setOpenModal] = useState(false);
  const { story } = useSelector(storySelector);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const saveComplementarys = async (complements: any) => {
    const { complementaryMedia, complementaryText } = complements;
    const newData: any = {};
    newData.memory_details = {};
    const complementaryImage = complementaryMedia.filter((item: any) => item?.type?.includes('image'));
    const complementaryVideo = complementaryMedia.filter((item: any) => item?.type?.includes('video'));
    const complementaryAudio = complementaryMedia.filter((item: any) => item?.type?.includes('audio'));

    if (complementaryImage?.length > 0)
      newData.memory_details.complementaryImage = await complementaryUpload(
        dispatch,
        complementaryImage,
        story,
        false,
        true,
      );

    if (complementaryVideo?.length > 0)
      newData.memory_details.complementaryVideo = await complementaryUpload(dispatch, complementaryVideo, story, true);

    if (complementaryAudio?.length > 0)
      newData.memory_details.complementaryAudio = await complementaryUpload(dispatch, complementaryAudio, story);

    if (complementaryText?.length > 0) newData.memory_details.complementaryText = complementaryText;
    return newData;
  };

  const saveTextData = async (data: any) => {
    const newData = { ...data };
    newData.type = memoryData?.mediaType;
    newData.asset = JSON.stringify(data?.richText);
    newData.asset_type = 'text';
    newData.prompt = prompt;
    const complements = await saveComplementarys(data);
    if (defaultItem) {
      newData.id = defaultItem?.id;
      dispatch(updateMemory({ ...newData, ...complements }));
      return;
    }
    dispatch(sendMemory({ ...newData, ...complements }));
    return;
  };
  const handleSubmit = (data: any) => {
    data.story_id = story?.id;
    if (memoryData?.mediaType === 'text') {
      saveTextData(data);
      changeMediaTypeScreen();
      dispatch(setHasChanges(false));
      return;
    }

    // Open modal when uploading video
    if (type === 'video') {
      setOpenModal(true);
    }

    localStorage.setItem('uploading video', 'uploading video');
    dispatch(
      getUploadSignedUrl(
        {
          file:
            type === 'video'
              ? `videos/${data?.media?.name?.split('/')?.pop()}`
              : type === 'image'
              ? `stories/${story?.title}/memory/${data?.media?.name
                  ?.split('/')
                  ?.pop()
                  ?.replace(/\.[^.]+$/, '.webp')}`
              : `stories/${story?.title}/memory/${data?.media?.name?.split('/')?.pop()}`,
          type: type === 'image' ? 'image/webp' : data?.media?.type,
        },
        async (res: any) => {
          try {
            setIsLoading(true);
            let response: any = null;
            if (type === 'image') {
              const newFile = await fileConverter(data?.media);
              response = await FetchFileService(res?.value?.url?.uploadUrl, 'PUT', newFile, 'image/webp');
            } else {
              response = await FetchFileService(res?.value?.url?.uploadUrl, 'PUT', data?.media, data?.media?.type);
            }

            if (response?.ok) {
              localStorage.setItem('uploading video', 'done');
              const newData = { ...data };
              newData.type = type || data?.media?.type?.split('/')[0];
              newData.asset =
                type === 'video'
                  ? `videos/${data?.media?.name?.split('/')?.pop()}`
                  : type === 'image'
                  ? `stories/${story?.title}/memory/${data?.media?.name
                      ?.split('/')
                      ?.pop()
                      ?.replace(/\.[^.]+$/, '.webp')}`
                  : `stories/${story?.title}/memory/${data?.media?.name?.split('/')?.pop()}`;
              newData.asset_type = data?.media?.type;
              newData.prompt = prompt;

              const complements = await saveComplementarys(data);

              if (defaultItem) {
                newData.id = defaultItem?.id;
                dispatch(updateMemory({ ...newData, ...complements }));
                changeMediaTypeScreen();
                dispatch(setHasChanges(false));
                setIsLoading(false);
                setOpenModal(false); // Close modal when done
                return;
              }

              dispatch(sendMemory({ ...newData, ...complements }));
              changeMediaTypeScreen();
              dispatch(setHasChanges(false));

              setIsLoading(false);
              setOpenModal(false);
            }
          } catch (error) {
            setIsLoading(false);
            setOpenModal(false);
          }
        },
      ),
    );
  };

  // const handleSubmit = async (data: any) => {
  //   data.story_id = story?.id;

  //   if (memoryData?.mediaType === 'text') {
  //     saveTextData(data);
  //     changeMediaTypeScreen();
  //     dispatch(setHasChanges(false));
  //     return;
  //   }

  //   // Retrieve user storage info (Assuming it's accessible in local state or Redux)
  //   const usedStorage = user?.usedStorage || 0;
  //   const totalStorage = user?.totalStorage || 0;

  //   // Calculate file size
  //   const fileSize = data?.media?.size || 0;

  //   if (usedStorage + fileSize > totalStorage) {
  //     showDialog("Not enough storage available", "error");
  //     return;
  //   }

  //   // Open modal when uploading video
  //   if (type === 'video') {
  //     setOpenModal(true);
  //   }

  //   localStorage.setItem('uploading video', 'uploading video');

  //   dispatch(
  //     getUploadSignedUrl(
  //       {
  //         file:
  //           type === 'video'
  //             ? `videos/${data?.media?.name?.split('/')?.pop()}`
  //             : type === 'image'
  //             ? `stories/${story?.title}/memory/${data?.media?.name
  //                 ?.split('/')
  //                 ?.pop()
  //                 ?.replace(/\.[^.]+$/, '.webp')}`
  //             : `stories/${story?.title}/memory/${data?.media?.name?.split('/')?.pop()}`,
  //         type: type === 'image' ? 'image/webp' : data?.media?.type,
  //       },
  //       async (res: any) => {
  //         try {
  //           setIsLoading(true);
  //           let response = null;

  //           if (type === 'image') {
  //             const newFile = await fileConverter(data?.media);
  //             response = await FetchFileService(res?.value?.url?.uploadUrl, 'PUT', newFile, 'image/webp');
  //           } else {
  //             response = await FetchFileService(res?.value?.url?.uploadUrl, 'PUT', data?.media, data?.media?.type);
  //           }

  //           if (response?.ok) {
  //             localStorage.setItem('uploading video', 'done');
  //             const newData = {
  //               ...data,
  //               type: type || data?.media?.type?.split('/')[0],
  //               asset:
  //                 type === 'video'
  //                   ? `videos/${data?.media?.name?.split('/')?.pop()}`
  //                   : type === 'image'
  //                   ? `stories/${story?.title}/memory/${data?.media?.name
  //                       ?.split('/')
  //                       ?.pop()
  //                       ?.replace(/\.[^.]+$/, '.webp')}`
  //                   : `stories/${story?.title}/memory/${data?.media?.name?.split('/')?.pop()}`,
  //               asset_type: data?.media?.type,
  //               prompt,
  //             };

  //             const complements = await saveComplementarys(data);

  //             if (defaultItem) {
  //               newData.id = defaultItem?.id;
  //               dispatch(updateMemory({ ...newData, ...complements }));
  //             } else {
  //               dispatch(sendMemory({ ...newData, ...complements }));
  //             }

  //             changeMediaTypeScreen();
  //             dispatch(setHasChanges(false));
  //             setIsLoading(false);
  //             setOpenModal(false); // Close modal when done
  //           }
  //         } catch (error) {
  //           console.error("Error uploading file:", error);
  //           setIsLoading(false);
  //           setOpenModal(false);
  //         }
  //       }
  //     )
  //   );
  // };

  const handleOnTouched = (key: string) => setTouched({ ...touched, [key]: true });

  const {
    values,
    handleSubmit: formikSubmit,
    handleChange: formikHandleChange,
    errors,
    touched,
    setTouched,
    setFieldValue,
    resetForm,
  } = FormikConfig(handleSubmit);

  const setMedia = (name: string) => {
    setFieldValue('type', name);
    const checkValues = Object.keys(values || {}).reduce((acc: any, curr: any) => {
      const check = Array.isArray(values[curr]) ? !!values?.length : !!values[curr];
      return acc || check;
    }, false);
    if (!checkValues && memoryData?.mediaType === name) {
      changeMediaTypeScreen();
      return;
    }
    if (memoryData?.mediaType === name) return;
    setFieldValue('media', '');
    setFieldValue('richText', []);
    setFileName('');
    dispatch(setMediaType(name));
  };
  const setDefaults = async () => {
    const keys = Object.keys(defaultItem || {});
    const valuesKeys = Object.keys(values || {});
    if (defaultItem) {
      keys.map(async (key) => {
        if (valuesKeys.includes(key)) setFieldValue(key, defaultItem[key]);
        if (key == 'memory_details') {
          const memoryDetails = defaultItem[key];
          const detailsKeys = Object.keys(memoryDetails || {});
          let complementaryMedia: any = [];
          const mapping = detailsKeys.map(async (detailKey) => {
            let value = memoryDetails[detailKey];
            if (detailKey !== 'complementaryText') {
              value = await complementaryDownload(dispatch, value);
              complementaryMedia = [...complementaryMedia, ...value];
            }

            if (valuesKeys.includes(detailKey)) setFieldValue(detailKey, value);
          });
          await Promise.all(mapping);
          setFieldValue('complementaryMedia', complementaryMedia);
        }
        if (key == 'asset' && memoryData?.mediaType !== 'text') {
          try {
            const fetchImage = await FetchFileService(`${cdn_url}${defaultItem[key]}`, 'GET');
            const blob = await fetchImage?.data?.blob();
            const file = new File([blob], defaultItem[key], { type: blob.type });
            setFieldValue('media', file);
          } catch (error) {}

          dispatch(setMediaType('media'));
        }
        if (key == 'asset' && memoryData?.mediaType === 'text' && defaultItem?.type === 'text') {
          dispatch(setMediaType('text'));
          setFieldValue('richText', JSON.parse(defaultItem[key]));
        }
      });
      await Promise.all(keys);
      dispatch(setShowMediaButton());
    }
  };
  const countWordsAndLetters = (nodes: any) => {
    let textContent = '';

    const extractText = (nodes: any) => {
      nodes &&
        nodes.forEach((node: any) => {
          if (node.text) {
            textContent += node.text;
          } else if (node.children) {
            extractText(node.children);
          }
        });
    };

    extractText(nodes);

    const words = textContent.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const letterCount = textContent.replace(/\s+/g, '').length;
    const spaceCount = textContent.split('').filter((char) => char === ' ').length;

    return { wordCount, letterCount, spaceCount };
  };

  useEffect(() => {
    if (defaultItem && memoryData?.mediaType) {
      setDefaults();
      dispatch(setHasChanges(false));
    }
  }, [defaultItem, memoryData?.mediaType]);

  const changeInputStatus = (value: string, error: any) => {
    if (value !== '') {
      if (error) return 'error';
      return 'inherit';
    }
    return 'inherit';
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: any) => {
    // Set hasChanges to true if the current value is different from the initial value
    if (values[e.target.name] !== e.target.value) {
      dispatch(setHasChanges(true));
    }
    // Call the original Formik handleChange
    formikHandleChange(e);
  };

  const handleTextChange = (label: any, value: any) => {
    setFieldValue('richText', value);

    // Count for new value
    const newCount = countWordsAndLetters(value);

    // Count for old value
    const oldCount = countWordsAndLetters(values.richText);

    // Compare counts
    if (
      newCount.wordCount !== oldCount.wordCount ||
      newCount.letterCount !== oldCount.letterCount ||
      newCount.spaceCount !== oldCount.spaceCount
    ) {
      dispatch(setHasChanges(true));
    }
  };

  // const uploadMedia = (name: string, value: string) => {

  //   // // setType(value?.type?.split('/')[0] || '');
  //   // setFieldValue(name, value);
  //   // if (name == 'media' && value) {
  //   //   /* setTimeout(() => {
  //   //     ref?.current?.scrollIntoView();
  //   //   }, 10); */
  //   //   dispatch(setShowMediaButton());
  //   // }
  //   dispatch(setHasChanges(true));
  //   setFieldValue(name, value);

  //   if (name == 'media' && value !== '') dispatch(setShowMediaButton());
  // };

  const uploadMedia = (name: string, value: File) => {
    if (value instanceof File) {
      // Get the file size in bytes
      const fileSize = value.size; // fileSize will be in bytes

      // Convert to kilobytes or megabytes if needed
      const fileSizeKB = fileSize / 1024; // size in KB
      const fileSizeMB = fileSizeKB / 1024; // size in MB
    }

    dispatch(setHasChanges(true));
    setFieldValue(name, value);

    if (name === 'media' && value) {
      dispatch(setShowMediaButton());
    }
  };

  useEffect(() => {
    const media = values?.media;
    setFieldValue('type', memoryData?.mediaType);

    setType(media?.type?.split('/')[0] || '');
  }, [values?.media?.type]);
  const setMainAcceptableMedia = (type: string) => {
    return 'image/*,audio/*,video/mp4';
  };

  useEffect(() => {
    if (values?.richText?.length) dispatch(setShowMediaButton());
  }, [values?.richText]);

  const hasData = (values: any): boolean => {
    const { complementaryText, complementaryMedia, ...rest } = values;

    const hasOtherData = Object.values(rest).some((value) => value !== '' && value !== null && value !== undefined);
    const hasComplementaryMedia = complementaryMedia.length > 0;

    return hasOtherData || hasComplementaryMedia;
  };

  useEffect(() => {
    if (hasData(values)) {
      dispatch(setShowMediaButton());
    }
  }, [values]);

  useEffect(() => {
    const checkValues = Object.keys(values || {}).reduce((acc: any, curr: any) => {
      const check = curr === 'type' ? false : Array.isArray(values[curr]) ? !!values?.length : !!values[curr];
      return acc || check;
    }, false);
    setExistData(checkValues);
  }, [values]);

  UseFirstRender(() => {
    setTimeout(() => {
      divRef?.current?.scrollTo({ top: 0 });
    }, 20);
  }, [memoryData?.mediaType]);

  return (
    <>
      <form ref={formRef} onSubmit={formikSubmit} style={{ width: '100%', marginRight: '1rem' }}>
        <Grid container display={'flex'} justifyContent={'space-between'} spacing={isMobile ? 1 : 2} ref={ref}>
          {mediaTypes.map((item: any, index: number) => (
            <Grid key={`${item.label} + ${index}`} item xs={isMobile ? 12 : 6}>
              <Box
                width={'100%'}
                height={'100%'}
                borderRadius={'0.5rem'}
                padding={'0.25rem 0.5rem'}
                bgcolor={memoryData?.mediaType == item?.icon ? palette?.white : palette.cardBackground}
                border={`0.063rem solid ${palette.cardBorder}`}
                display={'flex'}
                onClick={() => (isLoading ? null : setMedia(item.icon))}
                sx={{ backdropFilter: 'blur(1.5625rem)', cursor: 'pointer' }}
                justifyContent={'flex-start'}
                alignItems={'center'}>
                <Box
                  borderRadius={'0.375rem'}
                  bgcolor={memoryData?.mediaType == item?.icon ? palette.gray : palette.background}
                  display={'flex'}
                  padding={'0.25rem'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  marginRight={'1rem'}>
                  <Image src={`/icons/${item.icon}.svg`} alt={item.icon} width={24} height={24} quality={80} />
                </Box>
                <Typography
                  variant='subtitle2'
                  color={memoryData?.mediaType == item?.icon ? palette.gray : palette.white}>
                  {t(item.label)}
                </Typography>
              </Box>
            </Grid>
          ))}
          {memoryData?.mediaType !== '' && (
            <>
              <Grid item xs={12} marginTop={isMobile ? '1rem' : 0}>
                {memoryData?.mediaType !== 'text' && (
                  <>
                    <FileUpload
                      value={values.media}
                      name='media'
                      onChange={(_event: any, value: any) => uploadMedia('media', value)}
                      placeholder='click_here_to_upload'
                      height='9.5rem'
                      disabled={isLoading}
                      setFileName={setFileName}
                      fileName={fileName}
                      errorMessage={errors.media}
                      error={!!errors.media && touched.media}
                      acceptedFormats={setMainAcceptableMedia(memoryData?.mediaType)}
                    />
                    <Typography marginTop={'1rem'} variant='subtitle2'>
                      {t('you_can_upload_medias')}
                    </Typography>
                  </>
                )}
              </Grid>
              {memoryData?.mediaType == 'text' && (
                <Box paddingLeft={'1rem'} width={'100%'}>
                  <RichText
                    name='richtext'
                    placeholder='type_here'
                    disabled={isLoading}
                    value={values.richText}
                    onChange={(_event: any, value: any) => handleTextChange('richText', value)}
                  />
                </Box>
              )}
              <Grid item xs={12} marginTop={isMobile ? '1rem' : 0}>
                <MuiTextField
                  id='title'
                  name='title'
                  fullWidth
                  onBlur={() => {
                    handleOnTouched('title');
                  }}
                  status={changeInputStatus(values.title, errors.title && touched.title)}
                  onChange={handleChange}
                  disabled={isLoading}
                  value={values.title}
                  placeholder={'give_memory_title'}
                  errorMessage={errors.title}
                  error={!!errors.title && touched.title}
                  label={'Title'}
                  required
                  isDarkTheme={false}
                />
              </Grid>

              <Grid item xs={12} marginTop={isMobile ? '0.5rem' : 0}>
                <MuiTextField
                  id='description'
                  name='description'
                  fullWidth
                  disabled={isLoading}
                  onBlur={() => {
                    handleOnTouched('description');
                  }}
                  status={changeInputStatus(values.description, errors.description && touched.description)}
                  onChange={handleChange}
                  value={values.description}
                  placeholder={'provide_more_background'}
                  label={'description'}
                  isDarkTheme={false}
                  error={!!errors.description && touched.description}
                  errorMessage={errors.description}
                />
              </Grid>
            </>
          )}
        </Grid>
        {memoryData?.mediaType !== '' && (
          <>
            <Typography marginTop={'1rem'} variant='body1' color={palette?.white}>
              {t('add_complementary_media')}
            </Typography>
            <MediaFileRow
              name='complementaryMedia'
              onChange={(_event: any, value: any) => uploadMedia('complementaryMedia', value)}
              value={values.complementaryMedia || []}
              disabled={isLoading}
              placeholderIcon={'media'}
              placeholder={'click_to_upload_file'}
              acceptedFormats={'image/*, video/mp4, audio/*'}
            />

            {memoryData?.mediaType !== 'text' && (
              <>
                <Typography marginTop={'1rem'} variant='body1' color={palette?.white}>
                  {t('add_complementary_text')}
                </Typography>

                <RichText
                  name='complementaryText'
                  placeholder='type_here'
                  disabled={isLoading}
                  value={values.complementaryText}
                  onChange={(_event: any, value: any) => handleTextChange('complementaryText', value)}
                />
              </>
            )}
          </>
        )}
      </form>
      <LoadingModal open={openModal} />
    </>
  );
};
