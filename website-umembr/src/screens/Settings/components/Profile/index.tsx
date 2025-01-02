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
import { FetchFileService, States, cdn_url, checkRoleAndPermission, fallbackRestUrl, fileConverter, logoutWithFacebook } from '@/utils';
import {

  editProfileView,
  getPaymentMethod,
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
import { PaymentMethodResponse } from '../../ManageSubscription.tsx/types';
import { ManageSubscription } from '../../ManageSubscription.tsx';
import ChevronLeftIconComponent from '../../../../../public/icons/components/chevron-left';

export const Profile = () => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { status: showPassword, switchStatus: switchShowPassword } = UseIntermitence();
  const { status: showConfirmPassword, switchStatus: switchShowConfirmPassword } = UseIntermitence();
  const [isEditable, setIsEditable] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [showManageSubscription,  setShowManageSubscription]=useState(false);
  const {paymentMethod} = useSelector(subscriptionSelector);
  const [data, setData]= useState<PaymentMethodResponse>();
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

  // const handlePhone = (value: string) => {
  //   setFieldValue('phoneNumber', value);
  // };

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

  // const handleResumeSubscription = () => {
  //   alert('are you sure????');
  //   dispatch(resumeSubscription({ userId: user?.id }));
  // };

  const handleRenewSubscription = () => {
    alert('are you sure????');
    dispatch(renewSubscription({ userId: user?.id }));
  };

  // const options = useMemo(() => {
  //   const keys: any = Object.keys(States || {});
  //   return keys.reduce((acc: any, cur: any) => [...acc, { id: cur, name: States[cur] }], []);
  // }, []);

  const handleEditClick = (field: any) => {
    setEditableField(editableField === field ? null : field);
  };

  // const getPaymentMethod = async () => {
  //   try {
  //     const response = await fetch(`${fallbackRestUrl}/stripe/get-payment-method`, {
  //       method: 'POST', // Use POST method
  //       headers: {
  //         'Content-Type': 'application/json', // Set content type to JSON
  //       },
  //       body: JSON.stringify({ userId: user.id  }), // Add the body with userId
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }

  //     const data = await response.json();

  //     if (data ) {
  //       setData(data);
  //       setShowManageSubscription(true);
  //     } else {
  //       throw new Error('Unexpected response structure');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching payment method:', error);
    
  //   }
  // };

  const manageSub = () =>{
    if(!showManageSubscription) 
    {
    // getPaymentMethod();
  dispatch(getPaymentMethod({userId: user?.id}))
  if(paymentMethod) {
    setShowManageSubscription(true);
  }
}
  else{

    setShowManageSubscription(false);
  }
  }

  useEffect(()=>{
    if(!!errors?.name && !!errors?.lastname && !!errors?.password && !!errors?.confirm_password){
      setIsEditable(true);
    }
  },[errors?.name, errors?.lastname ,errors?.password ,errors?.confirm_password])


  return (
    <Box maxWidth={'600px'} margin={'0 auto'}>
         { !showManageSubscription? 
      <Box
        display={'flex'}
        flexDirection={'column'}
        marginTop={'0rem'}
        bgcolor={'rgba(255, 255, 255, 0.9)'}
        sx={{ backdropFilter: 'blur(4.5625rem)' }}
        minHeight={!isMobile ? 'calc(100vh - 16.735rem)' : 'calc(100vh - 15.735rem)'}
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
       

          <Box display={'flex'} mt={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
<Box
  borderRadius="50%"
  display="flex"
  justifyContent="center"
  alignItems="center"
  marginBottom="1rem"
  width={isMobile ? 90 : 110}
  height={isMobile ? 90 : 110}
  minHeight={isMobile ? 90 : 110}
  minWidth={isMobile ? 90 : 110}
  position="relative"
  sx={{
    cursor: isEditable ? 'pointer' : 'inherit',
    '&:hover .edit-icon': {
      opacity: 1,
      visibility: 'visible',
    },
  }}
>
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
      alt="profile image"
      fill
      sizes="100%"
      style={{ borderRadius: '50%', objectFit: 'cover' }}
      quality={80}
      priority
    />
  )}

  {/* Edit icon appears on hover */}
  <Box
    className="edit-icon"
    position="absolute"
    bottom={8}
    right={8}
    borderRadius="50%"
    bgcolor="rgb(235, 235, 235)"
    width={30}
    height={30}
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{
      opacity: 1,
    }}
  >
    <IconButton
      size="small"
      sx={{
        color: 'white',
        padding: 0,
      }}
      onClick={handleImageEdit}
    >
      <Image src={'/icons/edit-pencil.svg'} alt='icon' width={22} height={22} color={'#fff'} />
    </IconButton>
  </Box>

  {/* Hidden input for file upload */}
  <input
    id="profile-input"
    className="profile-input"
    type="file"
    style={{ display: 'none' }}
    ref={inputRef}
    accept=".jpg, .jpeg, .png"
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
    id="name"
    name="name"
    fullWidth
    variant="standard"
    onBlur={() => handleOnTouched('name')}
    status={changeInputStatus(values.name, errors.name && touched.name)}
    onChange={handleChange}
    value={values.name}
    disabled={editableField !== 'name'}
    autoComplete="First name"
    placeholder="First name"
    label="First name"
    sx={{
      '& .MuiInputLabel-root': {
        fontSize: '1rem',
        color: palette.inputLabelLight,
        top: '-7px',
        '&.Mui-error': { color: palette.error },
        '&.Mui-focused': { color: palette.inputLabelLight },
        '&.Mui-error.Mui-focused': { color: palette.error },
        '&.MuiInputLabel-shrink': { top: '0px' },
      },
      '& .MuiInputBase-root:after': {
        borderBottom: `1px solid ${palette?.inputLabelLight}`,
      },
    }}
    isDarkTheme={false}
    errorMessage={errors.name}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <MuiButton
            type="button"
            variant="contained"
            disabled={editableField === 'name' && !!errors.name} // Disable "Save" if there's an error
            method={() => {
              const hasErrors = Object.values(errors).some((error) => !!error);

              if (hasErrors && editableField !== 'name') {
                // Prevent switching to another field if any field has errors
                return;
              }
              if (editableField === 'name') {
                // Save Mode: Submit the form and disable edit mode
                handleEditClick(null);
                formikSubmit();
              } else {
                // Edit Mode: Enable editing for this field
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
            }}
          >
            <Typography fontSize="0.8rem" color={palette?.inputLabelLight} variant="button">
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
    id="lastname"
    name="lastname"
    variant="standard"
    fullWidth
    onBlur={() => handleOnTouched('lastname')}
    disabled={editableField !== 'lastname'}
    status={changeInputStatus(values.lastname, errors.lastname && touched.lastname)}
    onChange={handleChange}
    value={values.lastname}
    autoComplete="lastname"
    placeholder="lastname"
    label="lastname"
    sx={{
      '& .MuiInputLabel-root': {
        fontSize: '1rem',
        color: palette.inputLabelLight,
        top: '-7px',
        '&.Mui-error': { color: palette.error },
        '&.Mui-focused': { color: palette.inputLabelLight },
        '&.Mui-error.Mui-focused': { color: palette.error },
        '&.MuiInputLabel-shrink': { top: '0px' },
      },
      '& .MuiInputBase-root:after': {
        borderBottom: `1px solid ${palette?.inputLabelLight}`,
      },
    }}
    isDarkTheme={false}
    errorMessage={errors.lastname}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <MuiButton
            type="button"
            variant="contained"
            disabled={editableField === 'lastname' && !!errors.lastname} // Disable Save if lastname has an error
            method={() => {
              const hasErrors = Object.values(errors).some((error) => !!error);

              if (hasErrors && editableField !== 'lastname') {
                // Prevent switching to another field if any field has errors
                return;
              }

              if (editableField === 'lastname') {
                // Save Mode: Submit the form and disable edit mode
                handleEditClick(null);
                formikSubmit();
              } else {
                // Edit Mode: Enable editing for this field
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
            }}
          >
            <Typography fontSize="0.8rem" color={palette?.inputLabelLight} variant="button">
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
    id="password"
    name="password"
    fullWidth
    onBlur={() => {
      handleOnTouched('password');
    }}
    sx={{
      '& .MuiInputLabel-root': {
        fontSize: '1rem',
        color: palette.inputLabelLight,
        top: '-7px',
        '&.Mui-error': { color: palette.error },
        '&.Mui-focused': { color: palette.inputLabelLight },
        '&.Mui-error.Mui-focused': { color: palette.error },
        '&.MuiInputLabel-shrink': { top: '0px' },
      },
      '& .MuiInputBase-root:after': {
        borderBottom: `1px solid ${palette?.inputLabelLight}`,
      },
    }}
    onChange={handleChange}
    value={values.password}
    autoComplete="password"
    placeholder="password"
    label="password"
    variant="standard"
    isDarkTheme={false}
    disabled={editableField !== 'password' } // Disable if not editable or isEditable is true
    type={!showPassword ? 'password' : 'text'}
    errorMessage={errors.password}
    status={changeInputStatus(values.password, errors.password && touched.password)}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <MuiButton
            sx={{ marginBottom: '1rem' }}
            type="button"
            variant="outline"
            disabled={!!errors.confirm_password || Object.values(errors).some((error) => !!error && editableField !== 'password')} // Prevent editing if other fields have errors
            method={() => {
              const hasErrors = Object.values(errors).some((error) => !!error);

              if (hasErrors && editableField !== 'password') {
                // Prevent editing password if other fields have errors
                return;
              }

              if (editableField !== 'password') {
                handleEditClick('password');
                setShowPasswords(true); // Enable confirm password field
              } else {
                handleEditClick(null);
                setShowPasswords(false);
                formikSubmit(); // Save form
              }
            }}
          >
            <Typography
              color={palette?.primary}
              sx={{ textDecoration: 'underline' }}
              variant="button"
            >
              {editableField === 'password' ? 'Save' : 'Change'}
            </Typography>
          </MuiButton>
          <IconButton
            sx={{ marginBottom: '1rem' }}
            onClick={switchShowPassword}
            edge="end"
          >
            <Image
              src={showPassword ? '/icons/eye-black.svg' : '/icons/eye-out-black.svg'}
              alt="icon"
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
  <Grid item xs={isMobile ? 12 : 12}>
    <MuiTextField2
      id="confirm_password"
      name="confirm_password"
      variant="standard"
      fullWidth
      onBlur={() => {
        handleOnTouched('confirm_password');
      }}
      sx={{
        '& .MuiInputLabel-root': {
          fontSize: '1rem',
          color: palette.inputLabelLight,
          top: '-7px',
          '&.Mui-error': { color: palette.error },
          '&.Mui-focused': { color: palette.inputLabelLight },
          '&.Mui-error.Mui-focused': { color: palette.error },
          '&.MuiInputLabel-shrink': { top: '0px' },
        },
        '& .MuiInputBase-root:after': {
          borderBottom: `1px solid ${palette?.inputLabelLight}`,
        },
      }}
      disabled={editableField !== 'password'} // Confirm password only editable if password is editable
      onChange={handleChange}
      value={values.confirm_password}
      autoComplete="new-password"
      placeholder="confirm_password"
      label="confirm_password"
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
)}



            </Grid>
          </form>

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
                            <a onClick={manageSub}>
                          Manage subscription
                          </a>
                        </Typography>
                        <Typography
                          sx={{display:'flex',  gap: '0.4rem' }}
                          variant='body2'
                          color={palette?.inputLabelLight}
                          fontSize={'0.8rem'}>
                          <Button sx={{ fontSize: '0.8rem', padding: '0', color: `${palette?.inputLabelLight}` }}>
                            Payment history
                          </Button>
                          
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
        </Box>
      </Box> 
      :
      <Box
      display={'flex'}
      flexDirection={'column'}
      marginTop={'0rem'}
      bgcolor={'rgba(255, 255, 255, 0.9)'}
      sx={{ backdropFilter: 'blur(4.5625rem)' }}
      minHeight={!isMobile ? 'calc(100vh - 16.735rem)' : 'calc(100vh - 15.735rem)'}
      height={!isMobile ? 'calc(100vh - 13.735rem)' : 'calc(100vh - 13.735rem)'}
      // width={!isMobile ? 'calc(100vh - 13.735rem)' : 'calc(100vh - 13.735rem)'}
      width={isMobile ? '100%' : '600px'}
      minWidth={'50%'}
      padding={'0'}
      borderRadius={'0.625rem'}
      overflow={'hidden'}
    >
      <Box
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        border={`0.063rem solid ${palette.cardBorder}`}
        height={'100%'}
        padding={'0.4rem 2rem'}
        borderRadius={'1.25rem'}
        overflow={'auto'}
      >
    
        {/* Back Button (Left-aligned) */}
        <Box margin={'1rem 0'} >
        <Button
          
          onClick={manageSub}
          startIcon={<ChevronLeftIconComponent color={'#131544'} />}
          variant='outlined'
          style={{ borderRadius: '19px', border: `1px solid ${palette.cardBorder}` }}>
          <Typography variant={'button'} color={`#131544`}>
            Back
          </Typography>
        </Button>
      </Box>
    
 <ManageSubscription paymentMethodResponse={paymentMethod} />    
      </Box>
    </Box>

                  }
      <Box>


        <Box display={'grid '} mt={1} justifyContent={'center'}>
        <Box  zIndex={100} display={'flex'} mt={1} gap={isMobile ? '0.7rem ' : '1.5rem'} justifyContent={'center'}>

          <Link href='/privacy'>
            <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{cursor:'pointer', textDecoration: 'underline' }}>
              {t('privacy_policy')}
            </Typography>
          </Link>
          <Link href='/terms'>
            <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{cursor:'pointer', textDecoration: 'underline' }}>
              {t('term_conditions')}
            </Typography>
          </Link>
          <Link href='mailto:contact@falcon9324.com'>
            <Typography color={'#B3BED4'} fontSize={'0.8rem'} sx={{cursor:'pointer',  textDecoration: 'underline' }}>
              {t('contact')}
            </Typography>
          </Link>
        </Box>
        <Box display={'flex'} mt={2} justifyContent={'center'} gap={'2rem'} >
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
    </Box>
  );
};
