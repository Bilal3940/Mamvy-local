import {
  Box,
  Grid,
  Typography,
  Divider,
  useMediaQuery,
  Theme,
  Avatar,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {  MuiButton, MuiTextField2 } from '@/components';
import { palette } from '@/theme/constants';
import Image from 'next/image';
import { FormikConfig } from './formik';
import { useTranslation } from 'next-i18next';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, subscriptionSelector } from '@/store/selectors';
import { FetchFileService, States, cdn_url, checkRoleAndPermission, fileConverter, logoutWithFacebook } from '@/utils';
import {

  editProfileView,
  logout,
  openDeleteModal,
  openSubscriptionModal,
  openSubscriptionPopup,
  renewSubscription,
  resumeSubscription,
  updateUserData,
} from '@/store/actions';
import { getUploadSignedUrl } from '@/store/file/action';
import StorageProgressBar from '@/components/ProgressBar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Profile = () => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isMobileLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const { open } = useSelector((state: any) => state.intermitence.subscriptionModal);
  const { status: showPassword, switchStatus: switchShowPassword } = UseIntermitence();
  const { status: showConfirmPassword, switchStatus: switchShowConfirmPassword } = UseIntermitence();
  const { actionSuccess } = useSelector(subscriptionSelector);
  const [isEditable, setIsEditable] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [editableField, setEditableField] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(authSelector);
  const inputRef: any = useRef(null);
  const processFile = (data: any) => {
    dispatch(
      getUploadSignedUrl(
        { file: `${user?.email}/${selectedImage?.name.replace(/\.[^.]+$/, '.webp')}`, type: 'image/webp' },
        async (res: any) => {
          try {
            const convertedImage = await fileConverter(selectedImage);
            const response = await FetchFileService(res?.value?.url?.uploadUrl, 'PUT', convertedImage, 'image/webp');
            if (response?.ok) {
              dispatch(
                updateUserData({
                  ...data,
                  picture: `${user?.email}/${selectedImage?.name.replace(/\.[^.]+$/, '.webp')}`,
                }),
              );
            }
          } catch (error) {
            console.log(error);
          }
        },
      ),
    );
  };
  const handleSubmit = (data: any) => {
    if (typeof selectedImage !== 'string' && selectedImage) {
      return processFile(data);
    }
    dispatch(updateUserData(data));
  };

  const handleOnTouched = (key: string) => setTouched({ ...touched, [key]: true });

  const {
    values,
    handleSubmit: formikSubmit,
    handleChange,
    errors,
    touched,
    setTouched,
    setFieldValue,
  } = FormikConfig(t, handleSubmit, user);

  UseFirstRender(() => {
    if (user?.token) {
      for (const val of Object.keys(values || {})) {
        if (val != 'password') {
          setFieldValue(val, user[val]);
        }
      }
      setFieldValue('referralCode', user?.referalCode?.trim()?.toUpperCase());
    }
    if (user?.picture) setImageUrl(`${cdn_url}${user?.picture}`);
  }, [user]);

  const changeInputStatus = (value: string, error: any) => {
    if (value !== '') {
      if (error) return 'error';
      return 'inherit';
    }
    return 'inherit';
  };

  const handlePhone = (value: string) => {
    setFieldValue('phoneNumber', value);
  };

  UseFirstRender(() => {
    if (user) {
      dispatch(editProfileView(user.id));
    }
  }, [dispatch]);

  const handleImageEdit = () => {
    inputRef?.current?.click();
  };

  useEffect(() => {
    if (typeof selectedImage !== 'string' && selectedImage) {
      processFile(selectedImage);
    }
    setSelectedImage(null);
  }, [selectedImage]);
  const handleLogout = async () => {
    dispatch(logout());
    router.push('/app/login');
    await logoutWithFacebook();
  };
  const handleDeleteAccount = () => {
    dispatch(openDeleteModal());
  };
  const handleSubscriptionCancel = () => {
    dispatch(openSubscriptionModal());
  };

  const handleResumeSubscription = () => {
    alert('are you sure????');
    dispatch(resumeSubscription({ userId: user?.id }));
  };

  const handleRenewSubscription = () => {
    alert('are you sure????');
    dispatch(renewSubscription({ userId: user?.id }));
  };

  const options = useMemo(() => {
    const keys: any = Object.keys(States || {});
    return keys.reduce((acc: any, cur: any) => [...acc, { id: cur, name: States[cur] }], []);
  }, []);

  const handleEditClick = (field: any) => {
    setEditableField(editableField === field ? null : field);
  };


  return (
    <Box maxWidth={'600px'} margin={'0 auto'}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        marginTop={'0rem'}
        bgcolor={'rgba(255, 255, 255, 0.9)'}
        sx={{ backdropFilter: 'blur(4.5625rem)' }}
        minHeight={!isMobile ? 'calc(100vh - 15.735rem)' : 'calc(100vh - 15.735rem)'}
        height={!isMobile ? 'calc(100vh - 13.735rem)' : 'calc(100vh - 13.735rem)'}
        padding={'0'}
        borderRadius={'0.625rem'}
        overflow={'hidden'}>
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          border={`0.063rem solid ${palette.cardBorder}`}
          height={'100%'}
          padding={'0.4rem 2rem'}
          borderRadius={'1.25rem'}
          overflow={'auto'}>
          {/* <Divider sx={{ border: `0.063rem solid ${palette.faintGray}`, marginBottom: '1rem' }} /> */}

          {/* <Grid container display={'flex'} marginBottom={'2rem'} justifyContent={'flex-end'} alignItems={'flex-end'}>
          {isEditable && (
            <>
              <Grid
                data-cy={'change-password-btn'}
                item
                xs={isMobile ? 12 : isMobileLg ? 4 : 2.7}
                width={'100%'}
                marginBottom={isMobile ? '1rem' : '0'}
                marginRight={isMobile ? '0' : '2rem'}>
                <MuiButton
                  type='submit'
                  variant={'contained'}
                  method={() => {
                    setShowPasswords((showPasswords) => !showPasswords);
                  }}>
                  <Typography variant='button'>{t('change_password')}</Typography>
                </MuiButton>
              </Grid>
              <Grid
                item
                xs={isMobile ? 12 : 1}
                width={'100%'}
                marginBottom={isMobile ? '1rem' : '0'}
                marginRight={isMobile ? '0' : '1rem'}>
                <MuiButton
                  type='submit'
                  padding='8px, 22px, 8px, 22px'
                  variant={'outlined'}
                  method={() => setIsEditable(false)}>
                  <Typography variant='button' color={palette.white}>
                    {t('cancel')}
                  </Typography>
                </MuiButton>
              </Grid>
            </>
          )}
          <Grid item xs={isMobile ? 12 : 1} marginBottom={isMobile ? '1rem' : '0'} width={'100%'}>
            <MuiButton
              type='submit'
              variant={'contained'}
              method={() => {
                setIsEditable((isEditable) => !isEditable);
                isEditable ? handleSubmit(values) : null;
              }}>
              <Typography variant='button'>{t(!isEditable ? 'edit_mayus' : 'save')}</Typography>
            </MuiButton>
          </Grid>
        </Grid> */}

          <Box display={'flex'} mt={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            {/* <Typography color={palette.black} variant='body2' marginBottom={'1rem'}>
          {t('profile_picture')}
        </Typography> */}

            <Box
              borderRadius={'6.25rem'}
              display={'flex'}
              justifyContent={'center'}
              marginBottom={'1rem'}
              width={isMobile ? 90 : 110}
              height={isMobile ? 90 : 110}
              minHeight={isMobile ? 90 : 110}
              minWidth={isMobile ? 90 : 110}
              position={'relative'}
              onClick={() => {
                handleImageEdit();
              }}
              sx={{ cursor: isEditable ? 'pointer' : 'inherit' }}>
              {!selectedImage && !imageUrl ? (
                <Avatar
                  sx={{
                    width: '100%',
                    height: '100%',
                    '& img': {
                      objectFit: 'contain',
                    },
                  }}
                  src={`/icons/person-outlined.svg`}
                />
              ) : (
                <Image
                  src={selectedImage ? URL.createObjectURL(selectedImage) : imageUrl}
                  alt='profile image'
                  fill
                  sizes='100%'
                  style={{ borderRadius: '6.25rem', objectFit: 'cover' }}
                  quality={80}
                  priority
                />
              )}

              <input
                id='profile-input'
                className='profile-input'
                type='file'
                style={{ display: 'none' }}
                ref={inputRef}
                accept='.jpg, .jpeg, .png'
                onChange={async (e: any) => {
                  setSelectedImage(e?.target?.files?.[0]);
                }}
              />
            </Box>
            <Grid>
              <Typography fontSize={isMobile ? '1rem' : '2.625rem'} variant='body1' color={palette?.black}>
                {user?.name} {user?.lastname}{' '}
              </Typography>
            </Grid>
          </Box>
          <Box display={'flex'} padding={'1rem'} width={'90%'} margin={'0 auto'} justifyContent={'space-between'}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
              <Typography variant='h5' fontSize={isMobile ? '1rem' : '2.625rem'} color={palette?.background}>
                {user?.memoryCount || 0}
              </Typography>
              <Typography fontSize={'1rem'} color={palette?.inputLabelLight} variant='h6'>
                {t('memories')}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
              <Typography variant='h5' fontSize={isMobile ? '1rem' : '2.625rem'} color={palette?.background}>
                {user?.draftCount || 0}
              </Typography>
              <Typography fontSize={'1rem'} color={palette?.inputLabelLight} variant='h6'>
                {t('drafts')}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
              <Typography variant='h5' fontSize={isMobile ? '1rem' : '2.625rem'} color={palette?.background}>
                {user?.collaboratorCount || 0}
              </Typography>
              <Typography fontSize={'1rem'} color={palette?.inputLabelLight} variant='h6'>
                {t('collaborators')}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ border: `0.063rem solid ${palette.divider}`, margin: '0.4rem 0' }} />

          {checkRoleAndPermission(user?.roles, 'Subscriber_Individual', 'CLIENT_STORY_CREATE', user?.id) && (
            <>
            <Box mb={0.6}>
              <Box>
                <Typography fontSize={'0.8rem'} variant='body2' color={palette?.inputLabelLight}>
                  Storage
                </Typography>
              </Box>
              <StorageProgressBar totalStorage={user && user.totalStorage} usedStorage={user && user.usedStorage} />
            </Box>
            <Divider sx={{ border: `0.063rem solid ${palette.divider}`, margin: '0.4rem 0' }} />
            </>
          )}

          

          <form onSubmit={formikSubmit}>
            <Grid container spacing={isMobile ? 0 : 0} width={'100%'} marginBottom={'0.5rem'} rowSpacing={2}>
              <Grid item xs={12}>
                <MuiTextField2
                  id='name'
                  name='name'
                  fullWidth
                  variant='standard'
                  onBlur={() => handleOnTouched('name')}
                  status={changeInputStatus(values.name, errors.name && touched.name)}
                  onChange={handleChange}
                  value={values.name}
                  disabled={editableField !== 'name'}
                  autoComplete='name'
                  placeholder='Name'
                  label='Name'
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                      color: palette.inputLabelLight,
                      top: '-7px',

                      '&.Mui-error': {
                        color: palette.error,
                      },

                      '&.Mui-focused': {
                        color: palette.inputLabelLight,
                      },
                      '&.Mui-error.Mui-focused': {
                        color: palette.error,
                      },

                      '&.MuiInputLabel-shrink': {
                        top: '0px',
                      },
                    },
                    '& .MuiInputBase-root:after': {
                      borderBottom: `1px solid ${palette?.inputLabelLight}`,
                    },
                  }}
                  isDarkTheme={false}
                  errorMessage={errors.name || errors.password || errors.lastname || errors.phonenumber}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <MuiButton
                          type={editableField === 'name' ? 'button' : 'button'}
                          variant='contained'
                          method={() => {
                            if (editableField === 'name') {
                              handleEditClick(null);
                              formikSubmit();
                            } else {
                              // Edit mode: Enable editing
                              handleEditClick('name');
                            }
                          }}
                          sx={{
                            marginBottom: '1.5rem',
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '2rem',
                            boxShadow: 'none',
                            '&:hover': {
                              backgroundColor: 'white',
                              boxShadow: 'none',
                            },
                          }}>
                          <Typography fontSize='0.8rem' color={palette?.inputLabelLight} variant='button'>
                            {editableField === 'name' ? t('save_mayus') : t('edit_mayus')}
                          </Typography>
                        </MuiButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Last Name Field */}
              <Grid item xs={12}>
                <MuiTextField2
                  id='lastname'
                  name='lastname'
                  variant='standard'
                  fullWidth
                  onBlur={() => handleOnTouched('lastname')}
                  disabled={editableField !== 'lastname'}
                  status={changeInputStatus(values.lastname, errors.lastname && touched.lastname)}
                  onChange={handleChange}
                  value={values.lastname}
                  autoComplete='lastname'
                  placeholder='lastname'
                  label='lastname'
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                      color: palette.inputLabelLight,
                      top: '-7px',

                      '&.Mui-error': {
                        color: palette.error,
                      },

                      '&.Mui-focused': {
                        color: palette.inputLabelLight,
                      },
                      '&.Mui-error.Mui-focused': {
                        color: palette.error,
                      },

                      '&.MuiInputLabel-shrink': {
                        top: '0px',
                      },
                    },
                    '& .MuiInputBase-root:after': {
                      borderBottom: `1px solid ${palette?.inputLabelLight}`,
                    },
                  }}
                  isDarkTheme={false}
                  errorMessage={errors.lastname}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <MuiButton
                          type={editableField === 'lastname' ? 'button' : 'button'}
                          variant='contained'
                          method={() => {
                            if (editableField === 'lastname') {
                              handleEditClick(null);
                              formikSubmit();
                            } else {
                              // Edit mode: Enable editing
                              handleEditClick('lastname');
                            }
                          }}
                          sx={{
                            marginBottom: '1.5rem',
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '2rem',
                            boxShadow: 'none',

                            '&:hover': {
                              backgroundColor: 'white',
                              boxShadow: 'none',
                            },
                          }}>
                          <Typography fontSize='0.8rem' color={palette?.inputLabelLight} variant='button'>
                            {editableField === 'lastname' ? t('save_mayus') : t('edit_mayus')}
                          </Typography>
                        </MuiButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={isMobile ? 12 : 12}>
                <MuiTextField2
                  id='email'
                  variant='standard'
                  name='email'
                  fullWidth
                  onBlur={() => {
                    handleOnTouched('email');
                  }}
                  disabled={true}
                  status={changeInputStatus(values.email, errors.email && touched.email)}
                  onChange={handleChange}
                  value={values.email}
                  autoComplete='email'
                  placeholder={'email'}
                  label={'email'}
                  isDarkTheme={false}
                  errorMessage={errors.email}
                />
              </Grid>

              <Grid item xs={isMobile ? 12 : 12}>
                <MuiTextField2
                  id='password'
                  name='password'
                  fullWidth
                  onBlur={() => {
                    handleOnTouched('password');
                  }}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                      color: palette.inputLabelLight,
                      top: '-7px',

                      '&.Mui-error': {
                        color: palette.error,
                      },

                      '&.Mui-focused': {
                        color: palette.inputLabelLight,
                      },
                      '&.Mui-error.Mui-focused': {
                        color: palette.error,
                      },

                      '&.MuiInputLabel-shrink': {
                        top: '0px',
                      },
                    },
                    '& .MuiInputBase-root:after': {
                      borderBottom: `1px solid ${palette?.inputLabelLight}`,
                    },
                  }}
                  onChange={handleChange}
                  value={values.password}
                  autoComplete='password'
                  placeholder='password'
                  label='password'
                  variant='standard'
                  isDarkTheme={false}
                  disabled={editableField !== 'password'} // Fix: Disable unless the editable field is 'password'
                  type={!showPassword ? 'password' : 'text'}
                  errorMessage={errors.password}
                  status={changeInputStatus(values.password, errors.password && touched.password)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <MuiButton
                          sx={{
                            marginBottom: '1rem',
                          }}
                          type='button' // Submit when saving
                          variant='outline'
                          method={() => {
                            if (editableField !== 'password') {
                              handleEditClick('password');
                              // switchShowPassword();
                              setShowPasswords((showPasswords) => !showPasswords);
                            } else {
                              handleEditClick(null);
                              setShowPasswords(false);
                              formikSubmit();
                            }
                          }}>
                          <Typography
                            color={palette?.primary}
                            sx={{
                              textDecoration: 'underline',
                            }}
                            variant='button'>
                            {editableField === 'password' ? 'Save' : 'Change'}
                          </Typography>
                        </MuiButton>
                        <IconButton
                          sx={{
                            marginBottom: '1rem',
                          }}
                          onClick={switchShowPassword}
                          edge='end'>
                          <Image
                            src={showPassword ? '/icons/eye-black.svg' : '/icons/eye-out-black.svg'}
                            alt='icon'
                            width={18}
                            height={18}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {showPasswords && (
                <>
                  <Grid item xs={isMobile ? 12 : 12}>
                    <MuiTextField2
                      id='confirm_password'
                      name='confirm_password'
                      variant='standard'
                      fullWidth
                      onBlur={() => {
                        handleOnTouched('confirm_password');
                      }}
                      sx={{
                        '& .MuiInputLabel-root': {
                          fontSize: '1rem',
                          color: palette.inputLabelLight,
                          top: '-7px',

                          '&.Mui-error': {
                            color: palette.error,
                          },

                          '&.Mui-focused': {
                            color: palette.inputLabelLight,
                          },
                          '&.Mui-error.Mui-focused': {
                            color: palette.error,
                          },

                          '&.MuiInputLabel-shrink': {
                            top: '0px',
                          },
                        },
                        '& .MuiInputBase-root:after': {
                          borderBottom: `1px solid ${palette?.inputLabelLight}`,
                        },
                      }}
                      disabled={editableField !== 'password'}
                      onChange={handleChange}
                      value={values.confirm_password}
                      autoComplete='new-password'
                      placeholder={'confirm_password'}
                      label={'confirm_password'}
                      isDarkTheme={false}
                      iconMethod={switchShowConfirmPassword}
                      iconHeight={18}
                      iconWidth={18}
                      type={!showConfirmPassword ? 'password' : 'text'}
                      endIcon={showConfirmPassword ? '/icons/eye-black.svg' : '/icons/eye-out-black.svg'}
                      errorMessage={errors.confirm_password}
                      status={changeInputStatus(
                        values.confirm_password,
                        errors.confirm_password && touched.confirm_password,
                      )}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={isMobile ? 12 : 12} mb={0.6}>
                <Box>
                  <Typography fontSize={'0.8rem'} variant='body2' color={palette?.inputLabelLight}>
                    Subscription details
                  </Typography>
                </Box>

                <Box display={'flex'} justifyContent={'space-between'}>
                  {/* Show subscription status dynamically */}
                  <Typography fontSize={'1rem'} variant='h2' color={palette?.background}>
                    {user.isSubscriber
                      ? user.subscriptionStatus === 'cancellation_scheduled'
                        ? 'Cancelled'
                        : 'Active'
                      : 'Not Subscribed'}
                  </Typography>
                  <Box textAlign={'right'}>
                    {user.isSubscriber ? (
                      <>
                        <Typography
                          variant='button'
                          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                          color={palette?.primary}
                          fontSize={'1rem'}>
                          Manage subscription
                        </Typography>
                        <Typography
                          sx={{ gap: '1rem' }}
                          variant='body2'
                          color={palette?.inputLabelLight}
                          fontSize={'0.8rem'}>
                          <Button sx={{ fontSize: '0.8rem', padding: '0', color: `${palette?.inputLabelLight}` }}>
                            Payment history
                          </Button>
                          ,
                          {user.subscriptionStatus === 'cancellation_scheduled' ? (
                            <Button
                              sx={{
                                fontSize: '0.8rem',
                                padding: '0',
                                cursor: 'pointer',
                                color: `${palette?.inputLabelLight}`,
                              }}
                              onClick={handleRenewSubscription}>
                              Renew subscription
                            </Button>
                          ) : (
                            <Button
                              sx={{
                                fontSize: '0.8rem',
                                padding: '0',
                                cursor: 'pointer',
                                color: `${palette?.inputLabelLight}`,
                              }}
                              onClick={handleSubscriptionCancel}>
                              Cancel membership
                            </Button>
                          )}
                        </Typography>
                      </>
                    ) : (
                      <MuiButton
                        sx={{
                          backgroundColor: 'white',
                          color: 'black',
                          borderRadius: '2rem',
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: 'none',
                          },
                        }}
                        method={() => dispatch(openSubscriptionPopup())}>
                        <Typography variant='button' color={palette?.inputLabelLight} fontSize={'0.8rem'}>
                          Start membership
                        </Typography>
                      </MuiButton>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Box>
        <Box display={'flex'} mt={2} gap={isMobile ? '0.7rem ' : '1.5rem'} justifyContent={'center'}>
          <Link href={'#'}>
            {' '}
            <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{ textDecoration: 'underline' }}>
              {' '}
              My data{' '}
            </Typography>
          </Link>
          <Link href={'#'}>
            {' '}
            <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{ textDecoration: 'underline' }}>
              {' '}
              Privacy policy{' '}
            </Typography>
          </Link>
          <Link href={'#'}>
            <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{ textDecoration: 'underline' }}>
              Term & conditions
            </Typography>
          </Link>
          <Link href={'#'}>
            <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{ textDecoration: 'underline' }}>
              Help center
            </Typography>
          </Link>
        </Box>

        <Box display={'flex'} mt={2} justifyContent={'center'} gap={'2rem'}>
          <Box>
            <MuiButton
              minWidth={'8.688rem'}
              type='submit'
              variant='contained'
              sx={{
                marginBottom: '1.5rem',
                backgroundColor: 'rgba(43, 54, 114, 1)',
                color: 'black',
                borderRadius: '2rem',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(43, 54, 114, 1)',
                  boxShadow: 'none',
                },
                '&:focus': {
                  backgroundColor: 'rgba(43, 54, 114, 1)',
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: 'rgba(43, 54, 114, 1)',
                  boxShadow: 'none',
                },
              }}
              method={() => handleLogout()}>
              <Typography fontSize={'0.8rem'} color={palette?.dirtyWhite} variant='button'>
                {t('logout')}
              </Typography>
            </MuiButton>
          </Box>
          <Box>
            <MuiButton
              type='submit'
              minWidth={'8.688rem'}
              variant='contained'
              sx={{
                marginBottom: '1.5rem',
                backgroundColor: 'rgba(43, 54, 114, 1)',
                color: 'black',
                borderRadius: '2rem',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(43, 54, 114, 1)',
                  boxShadow: 'none',
                },
                '&:focus': {
                  backgroundColor: 'rgba(43, 54, 114, 1)',
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: 'rgba(43, 54, 114, 1)',
                  boxShadow: 'none',
                },
              }}
              method={() => handleDeleteAccount()}>
              <Typography fontSize={'0.8rem'} color={palette?.dirtyWhite} variant='button'>
                {t('delete_account')}
              </Typography>
            </MuiButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
