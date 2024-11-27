import { InputPhone, MuiButton, MuiTextField } from '@/components';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import { actualStory, inviteAccepted, registerUser, registerUserView, setGuest } from '@/store/actions';
import { authSelector, collaboratorSelector, intermitenceSelector } from '@/store/selectors';
import { palette } from '@/theme/constants';
import { Box, Button, Grid, Link, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikConfig } from './formik';
import ChevronLeftIconComponent from '../../../public/icons/components/chevron-left';

export const Register = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { status: showPassword, switchStatus: switchShowPassword } = UseIntermitence();
  const { status: showConfirmPassword, switchStatus: switchShowConfirmPassword } = UseIntermitence();
  const authData = useSelector(authSelector);
  const collaborator = useSelector(collaboratorSelector);
  const decodeBase64 = (encodedString: any) => {
    return Buffer.from(encodedString, 'base64').toString('utf-8');
  };
  const [decodedUrl, setDecodedUrl] = useState({
    story: decodeBase64(
      Array.isArray(router?.query?.story_id) ? router?.query?.story_id[0] : router?.query?.story_id || '',
    ),
    email: decodeBase64(Array.isArray(router?.query?.guest) ? router?.query?.guest[0] : router?.query?.guest || ''),
    role: decodeBase64(Array.isArray(router?.query?.role) ? router?.query?.role[0] : router?.query?.role || ''),
    notification: decodeBase64(
      Array.isArray(router?.query?.notification) ? router.query?.notification[0] : router.query?.notification || '',
    ),
    type: decodeBase64(Array.isArray(router?.query?.type) ? router?.query?.type[0] : router.query?.type || ''),
  });

  const dispatch = useDispatch();
  const { loading } = useSelector(intermitenceSelector);

  useEffect(() => {
    if (authData?.isAuth) {
      if (router.asPath?.includes('guest')) {
        dispatch(inviteAccepted({ story_id: decodedUrl?.story, role_name: decodedUrl?.role }));
        // dispatch(actualStory(decodedUrl?.story));
        // dispatch(setGuest(decodedUrl?.role));
        // if (decodedUrl?.role === 'Story_Viewer') {
        //   router.push(`/app/story/${decodedUrl?.story}`);
        // } else {
        //   router.push(`/app/story/${decodedUrl?.story}/memory/create`);
        // }
      } else {
        router.push('/app/home');
      }
      const storedReferralCode = localStorage.getItem('referral_code');
      if (storedReferralCode){
      localStorage.removeItem('referral_code');
      }
    }
  }, [authData?.isAuth]);

  useEffect(() => {
    if(authData?.isAuth &&collaborator.roleUser.length > 0){
        if(collaborator.roleUser !== 'inactive'){
        dispatch(actualStory(decodedUrl.story));
        dispatch(setGuest(decodedUrl?.role));
        if (decodedUrl?.role === 'Story_Viewer') {
          router.push(`/app/story/${decodedUrl?.story}`);
        } else {
          router.push(`/app/story/${decodedUrl?.story}/memory/create`);
        }
        }
      if(authData?.isAuth && collaborator?.roleUser === 'inactive'){
        router.push('/app/home');
      }
    }
  }, [collaborator?.roleUser]);

  UseFirstRender(() => {
    dispatch(registerUserView());
  }, [dispatch]);

  const handleSubmit = (data: any) => {
    data.email = data.email.toLowerCase();
    const { confirm_password, ...formValues } = data;
    if (router?.asPath?.includes('invitation')) {
      dispatch(registerUser({ ...formValues, invitation: router?.query?.invitation }));
    } else {
      dispatch(registerUser(formValues));
    }
  };

  const handleOnTouched = (key: string) => setTouched({ ...touched, [key]: true });

  const {
    values,
    handleSubmit: formikSubmit,
    handleChange,
    errors,
    touched,
    setTouched,
    dirty,
    isValid,
    setFieldValue,
  } = FormikConfig(handleSubmit);

  const changeInputStatus = (value: string, error: any) => {
    if (value !== '') {
      if (error) return 'error';
      return 'inherit';
    }
    return 'inherit';
  };

  const handlePhone = (value: string) => {
    setFieldValue('phonenumber', value);
  };

  useEffect(() => {
    const storedReferralCode = localStorage.getItem('referral_code');
    if (storedReferralCode) {
      setFieldValue('referralCode', storedReferralCode);
    }
  }, [setFieldValue]);
  

  return (
    <Box
      display={'flex'}
      minHeight={'100vh'}
      maxHeight={'100vh'}
      width={'100%'}
      zIndex={1}
      flexDirection={'column'}
      position={'relative'}
      padding={'0 1rem'}
      justifyContent={'center'}
      alignItems={'center'}
      overflow={'auto'}>
      <Image
        src={isMobile ? '/images/thread_mobile.svg' : '/images/thread.svg'}
        style={{
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          margin: 'auto',
          zIndex: -1,
        }}
        alt='background'
        fill
        priority
        sizes='100%'
        quality={80}
      />
      <Box margin={'1rem 0'} >
        <Button
          component={Link}
          href={'/app/login'}
          startIcon={<ChevronLeftIconComponent color={'#B3BED4'} />}
          variant='outlined'
          style={{ borderRadius: '19px', border: `1px solid ${palette.cardBorder}` }}>
          <Typography variant={'button'} color={`#B3BED4`}>
            Back
          </Typography>
        </Button>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        maxWidth={'59rem'}
        height={'auto'}
        borderRadius={'0.5rem'}
        bgcolor={palette.cardBackground}
        border={`0.063rem solid ${palette.cardBorder}`}
        padding={isMobile ? '1rem' : '2rem'}
        sx={{ overflowY: 'auto', backdropFilter: 'blur(1.5625rem)' }}
        boxShadow={
          '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
        }
        width={'100%'}>
        <Box height={'5.25rem'} marginBottom={'1rem'} position={'relative'}>
          <Image
            src={`/images/stacked-white.svg`}
            alt={'logo'}
            width={isMobile ? 99 : 120}
            height={isMobile ? 94 : 114}
            quality={80}
          />
        </Box>
        <Typography marginBottom={'1rem'} variant='h4' fontWeight={'400'}>
          {t('register')}
        </Typography>

        <Box alignSelf={'center'}>
          <Typography marginBottom={'1rem'} variant='body2'>
            {t('get_started')}
          </Typography>
        </Box>

        <form onSubmit={formikSubmit}>
          <Grid container spacing={isMobile ? 0 : 2} width={'100%'} marginBottom={'0.5rem'} rowSpacing={2}>
            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='name'
                name='name'
                fullWidth
                required
                onBlur={() => {
                  handleOnTouched('name');
                }}
                status={changeInputStatus(values.name, errors.name && touched.name)}
                onChange={handleChange}
                value={values.name}
                autoComplete='given-name'
                placeholder={'name'}
                label={'name'}
                isDarkTheme
                errorMessage={errors.name}
              />
            </Grid>

            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='lastname'
                name='lastname'
                fullWidth
                required
                onBlur={() => {
                  handleOnTouched('lastname');
                }}
                status={changeInputStatus(values.lastname, errors.lastname && touched.lastname)}
                onChange={handleChange}
                value={values.lastname}
                autoComplete='family-name'
                placeholder={'lastname'}
                label={'lastname'}
                isDarkTheme
                errorMessage={errors.lastname}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='email'
                name='email'
                fullWidth
                required
                onBlur={() => {
                  handleOnTouched('email');
                }}
                status={changeInputStatus(values.email, errors.email && touched.email)}
                onChange={handleChange}
                value={values.email}
                autoComplete='email'
                placeholder={'email'}
                label={'email'}
                isDarkTheme
                errorMessage={errors.email}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <InputPhone
                value={values.phonenumber}
                error={!!errors.phonenumber && touched.phonenumber}
                errorMessage={errors.phonenumber}
                autoComplete='tel'
                isDarkTheme
                onChange={(e: any) => {
                  handlePhone(e);
                }}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='password'
                name='password'
                required
                fullWidth
                onBlur={() => {
                  handleOnTouched('password');
                }}
                onChange={handleChange}
                value={values.password}
                autoComplete='new-password'
                placeholder={'password'}
                label={'password'}
                isDarkTheme
                iconMethod={switchShowPassword}
                iconHeight={18}
                iconWidth={18}
                type={!showPassword ? 'password' : 'text'}
                endIcon={showPassword ? '/icons/eye-white.svg' : '/icons/eye-out-white.svg'}
                errorMessage={errors.password}
                status={changeInputStatus(values.password, errors.password && touched.password)}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='confirm_password'
                name='confirm_password'
                required
                fullWidth
                onBlur={() => {
                  handleOnTouched('confirm_password');
                }}
                onChange={handleChange}
                value={values.confirm_password}
                autoComplete='new-password'
                placeholder={'confirm_password'}
                label={'confirm_password'}
                isDarkTheme
                iconMethod={switchShowConfirmPassword}
                iconHeight={18}
                iconWidth={18}
                type={!showConfirmPassword ? 'password' : 'text'}
                endIcon={showConfirmPassword ? '/icons/eye-white.svg' : '/icons/eye-out-white.svg'}
                errorMessage={errors.confirm_password}
                status={changeInputStatus(values.confirm_password, errors.confirm_password && touched.confirm_password)}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiTextField
                id='referralCode'
                name='referralCode'
                fullWidth
                onBlur={() => {
                  handleOnTouched('referralCode');
                }}
                status={changeInputStatus(values.referralCode, errors.referralCode && touched.referralCode)}
                onChange={handleChange}
                value={values.referralCode}
                autoComplete='referral-code'
                placeholder={'referral_code'}
                label={'referral_code'}
                isDarkTheme
                errorMessage={errors.referralCode}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiTextField
                id='description'
                name='description'
                fullWidth
                multiline
                onBlur={() => {
                  handleOnTouched('description');
                }}
                status={changeInputStatus(values.description, errors.description && touched.description)}
                onChange={handleChange}
                value={values.description}
                autoComplete='description'
                placeholder={'about_me'}
                label={'about_me'}
                isDarkTheme
                errorMessage={errors.description}
              />
            </Grid>

            <Grid item xs={12}>
              <MuiButton type='submit' disabled={!isValid || !dirty || loading} loading={loading} variant={'contained'}>
                <Typography variant='button'>{t('register')}</Typography>
              </MuiButton>
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              flexDirection={isMobile ? 'column' : 'row'}
              justifyContent={'center'}
              alignItems={isMobile ? 'center' : 'flex-start'}
              marginBottom={'0.5rem'}>
              <Typography variant='caption'>{t('already_register')}</Typography>
              <Link
                sx={{ textDecoration: 'none' }}
                href={
                  router.asPath?.includes('guest')
                    ? `/app/login/?story_id=${router.query.story_id}&$guest=${router.query.guest}&$role=${router.query.role}`
                    : '/app/login'
                }>
                <Typography variant='caption' marginLeft={isMobile ? 0 : '0.375rem'} color={palette.primary}>
                  {t('click_to_login')}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};