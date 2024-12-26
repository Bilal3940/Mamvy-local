import { MuiButton, MuiIconButton, MuiTextField } from '@/components';

import { UseFirstRender } from '@/hooks';
import {
  actualStory,
  deleteNotification,
  loginApple,
  loginFacebook,
  loginGoogle,
  loginUser,
  loginUserView,
  setStep,
} from '@/store/actions';
import { inviteAccepted, setGuest } from '@/store/collaborator/action';
import { authSelector, collaboratorSelector, intermitenceSelector } from '@/store/selectors';
import { palette } from '@/theme/constants';
import { face_client_id, google_client_id } from '@/utils';
import { Box, Button, Divider, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import AppleLogin from 'react-apple-login';
import { useDispatch, useSelector } from 'react-redux';
import ChevronLeftIconComponent from '../../../public/icons/components/chevron-left';
import { FormikConfig } from './formik';
import collaborator from '@/store/collaborator/reducer';

class ExternalScriptError extends Error {
  constructor(src: string) {
    super(`Error loading script: ${src}`);
    this.name = 'ExternalScriptError';
  }
}

declare let AppleID: any;

export const Login = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const authData = useSelector(authSelector);
  const { loading } = useSelector(intermitenceSelector);
  const clientId = google_client_id;
  const dispatch = useDispatch();
  const [appleReady, setAppleReady] = useState(false);
  const collaborator = useSelector(collaboratorSelector);
  const decodeBase64 = (encodedString: any) => {
    return Buffer.from(encodedString, 'base64').toString('utf-8');
  };
  const [decodedUrl, setDecodedUrl] = useState({
    story: decodeBase64(
      Array.isArray(router?.query?.story_id) ? router.query?.story_id[0] : router.query?.story_id || '',
    ),
    email: decodeBase64(Array.isArray(router?.query?.guest) ? router.query?.guest[0] : router.query?.guest || ''),
    role: decodeBase64(Array.isArray(router?.query?.role) ? router.query?.role[0] : router?.query?.role || ''),
    notification: decodeBase64(
      Array.isArray(router?.query?.notification) ? router.query?.notification[0] : router.query?.notification || '',
    ),
    type: decodeBase64(Array.isArray(router?.query?.type) ? router.query?.type[0] : router.query?.type || ''),
  });

  const handleSubmit = (data: any) => {
    data.email = data.email.toLowerCase();
    dispatch(loginUser(data));
  };

  const handleOnTouched = (key: string) => setTouched({ ...touched, [key]: true });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const {
    values,
    handleSubmit: formikSubmit,
    handleChange,
    errors,
    touched,
    setTouched,
    dirty,
    isValid,
  } = FormikConfig(handleSubmit);

  const changeInputStatus = (value: string, error: any) => {
    if (value !== '') {
      if (error) return 'error';
      return 'inherit';
    }
    return 'inherit';
  };

  const initGoogleLogin = useGoogleLogin({
    scope: 'email',
    onSuccess: (tokenResponse: any) => {
      if (router?.asPath?.includes('invitation')) {
        dispatch(loginGoogle({ ...tokenResponse, invitation: router?.query?.invitation }));
      } else {
        dispatch(loginGoogle(tokenResponse));
      }
    },

    onError: (error: any) => {
      console.log('Login Failed', error);
    },
  });

  useEffect(() => {
    dispatch(setStep(1));
    if (authData?.isAuth) {
      if (router.asPath?.includes('guest')) {
        if (decodedUrl?.email == authData?.user?.email) {
          dispatch(inviteAccepted({ story_id: decodedUrl?.story, role_name: decodedUrl?.role }));
          // dispatch(actualStory(decodedUrl.story));
          // dispatch(setGuest(decodedUrl?.role));
          // if (decodedUrl?.notification.length > 0) dispatch(deleteNotification(decodedUrl?.notification));
          // if (decodedUrl?.role === 'Story_Viewer') {
          //   router.push(`/app/story/${decodedUrl?.story}`);
          // } else {
          //   router.push(`/app/story/${decodedUrl?.story}/memory/create`);
          // }
        } else {
          router.push('/app/home');
        }
      } else {
        router.push('/app/home');
      }
    }
  }, [authData?.isAuth]);

  useEffect(() => {
    if (authData?.isAuth && collaborator.roleUser.length > 0) {
      if (collaborator.roleUser !== 'inactive') {
        dispatch(actualStory(decodedUrl.story));
        dispatch(setGuest(decodedUrl?.role));
        if (decodedUrl?.notification.length > 0 && collaborator.roleUser !== 'collaborating') dispatch(deleteNotification(decodedUrl?.notification));
        if (decodedUrl?.role === 'Story_Viewer') {
          router.push(`/app/story/${decodedUrl?.story}`);
        } else {
          router.push(`/app/story/${decodedUrl?.story}/memory/create`);
        }
      }
      if (authData?.isAuth && collaborator?.roleUser === 'inactive') {
        router.push('/app/home');
      }
    }
  }, [collaborator?.roleUser]);

  UseFirstRender(() => {
    if (!authData?.isAuth) {
      dispatch(loginUserView());
    }
  }, [authData?.isAuth]);

  useEffect(() => {
    const referralCode = router?.query?.referral_code;
    if (referralCode) {
      localStorage.setItem('referral_code', referralCode as string);
    }
  }, [router.query]);


  UseFirstRender(() => {
    // Google script Init
    const google = require('gapi-script');
    const start = () => {
      google.gapi?.client.init({
        clientId: clientId,
        scope: 'email',
        cookiepolicy: 'single_host_origin',
      });
    };

    google.gapi?.load('client', start);

    let winType: any = window;
    winType.fbAsyncInit = function () {
      winType.FB.init({
        appId: face_client_id,
        xfbml: true,
        version: 'v20.0',
      });

      winType.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js: any,
        fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, [])

  function loadScript(src: any, { scriptId = '', insertBeforeAllTags = false } = {}) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.id = scriptId;
      script.onload = resolve;
      script.onerror = (event: any) => {
        reject(new ExternalScriptError(event.target.src));
      };
      script.src = src;

      if (insertBeforeAllTags) {
        let firstScriptTagInDocument = document.getElementsByTagName('script')[0];

        firstScriptTagInDocument.parentNode &&
          firstScriptTagInDocument.parentNode.insertBefore(script, firstScriptTagInDocument);
      } else {
        document.body.appendChild(script);
      }
    });
  }

  const initializeAppleSDK = async () => {
    try {
      if (location) {
        let winType: any = window;
        await loadScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js');
        setAppleReady(true);
        AppleID.auth.init({
          clientId: 'memvy-app-prod-service',
          scope: 'name email',
          redirectURI: winType?.location?.href,
          state: 'initialState',
          usePopup: true,
        });
      }
    } catch (error) {
      console.error('Error loading Apple SDK:', error);
    }
  };

  const appleResponse = (response: any) => {

    if (!response.error) {
      if (router?.asPath?.includes('invitation')) {
        dispatch(loginApple({ ...response, invitation: router?.query?.invitation, location: location }));
      } else {
        dispatch(loginApple({ ...response, location: location }));
      }
    }
  };

  const validateIsFaceLogged = () => {
    return new Promise((resolve) => {
      let winType: any = window;
      winType?.FB?.getLoginStatus(function (response: any) {

        if (response?.status === 'connected') {
          if (router?.asPath?.includes('invitation')) {
            dispatch(loginFacebook({ ...response?.authResponse, invitation: router?.query?.invitation }));
          } else {
            dispatch(loginFacebook(response?.authResponse));
          }
          resolve(true);
        } else if (response?.status === 'unknown') {
          console.log('unkwoh error');

          resolve(false);
        } else {
          console.log('user is not logged in facebook ');
          resolve(false);
        }
      });
    });
  };

  const handleFaceLogin = async () => {
    let winType: any = window;

    const isLogged = await validateIsFaceLogged();

    if (!isLogged) {
      winType?.FB?.login((response: any) => {
        if (response?.authResponse) {
          if (router?.asPath?.includes('invitation')) {
            dispatch(loginFacebook({ ...response?.authResponse, invitation: router?.query?.invitation }));
          } else {
            dispatch(loginFacebook(response?.authResponse));
          }
          //this code return the user facebook primary data
          // winType.FB.api('/me', function (response: any) {
          //   console.log('Good to see you, ' + response.name + '.');
          // });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }
    return null;
  };


  const [location, setLocation] = useState('');


  UseFirstRender(() => {
    if (typeof window !== 'undefined') {
      let winType: any = window;
      setLocation(winType?.location?.href);
    }
  }, [])


  UseFirstRender(() => {
    if(location) {
      initializeAppleSDK();
    }
  }, [location])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'1rem'}
      height={'100vh'}
      width={'100%'}
      zIndex={1}
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
        alt='thread'
        fill
        priority
        sizes='100%'
        quality={80}
      />
      <Box>
        <Button
          component={Link}
          href={'/'}
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
        width={'100%'}
        maxWidth={'29.5rem'}
        borderRadius={'0.5rem'}
        bgcolor={palette.cardBackground}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}
        border={`0.063rem solid ${palette.cardBorder}`}
        padding={isMobile ? '1rem' : '2rem'}
        boxShadow={
          '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
        }>
        <Box marginBottom={'1rem'} position={'relative'}>
          <Image
            src={`/images/stacked-white.svg`}
            alt={'logo'}
            width={isMobile ? 99 : 120}
            height={isMobile ? 94 : 114}
            quality={80}
          />
        </Box>
        <Box display={'flex'} justifyContent={'flex-start'} width={'100%'}>
          <Typography textAlign={'left'} marginBottom={'1rem'} variant='h5'>
            {t('login')}
          </Typography>
        </Box>

        <form onSubmit={formikSubmit}>
          <Grid container width={'100%'} marginBottom={'0.5rem'} rowSpacing={2}>
            <Grid item xs={12}>
              <MuiTextField
                id='email'
                name='email'
                fullWidth
                onBlur={() => {
                  handleOnTouched('email');
                }}
                status={changeInputStatus(values.email, errors.email && touched.email)}
                onChange={handleChange}
                value={values.email}
                autoComplete='email'
                placeholder={t('email')}
                label={'email'}
                isDarkTheme
                errorMessage={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiTextField
                id='password'
                name='password'
                fullWidth
                onBlur={() => {
                  handleOnTouched('password');
                }}
                onChange={handleChange}
                value={values.password}
                autoComplete='current-password'
                placeholder={t('password')}
                label={'password'}
                isDarkTheme
                iconMethod={handleShowPassword}
                iconHeight={18}
                iconWidth={18}
                type={!showPassword ? 'password' : 'text'}
                endIcon={showPassword ? '/icons/eye-white.svg' : '/icons/eye-out-white.svg'}
                errorMessage={errors.password}
                status={changeInputStatus(values.password, errors.password && touched.password)}
              />
            </Grid>

            <Grid item textAlign={'center'} xs={12}>
              <Link href={'/app/forgot-password'}>
                <Typography marginBottom={'2rem'} variant='caption' color={palette.primary}>
                  {t('forgot_password')}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <MuiButton type='submit' disabled={!isValid || !dirty || loading} loading={loading} variant={'contained'}>
                <Typography variant='button'>{t('continue')}</Typography>
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
              <Typography variant='caption'>{t('dont_have_account')}</Typography>
              <Link
                href={
                  router.asPath?.includes('guest')
                    ? `/app/register/?story_id=${router.query.story_id}&guest=${router.query.guest}&type=${router.query.type}&role=${router.query.role}&invitation=${router.query.invitation}`
                    : '/app/register'
                }>
                <Typography variant='caption' marginLeft={isMobile ? 0 : '0.375rem'} color={palette.primary}>
                  {t('create_profile')}
                </Typography>
              </Link>
            </Grid>

            <Grid
              item
              xs={12}
              display={'flex'}
              width={'100%'}
              marginBottom={'0.5rem'}
              gap={'1rem'}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Grid xs={6} item>
                <Divider sx={{ border: `0.063rem solid ${palette.gray}` }} />
              </Grid>
              <Typography textAlign={'center'} color={palette.gray} gap={'5px'} variant={isMobile ? 'body2' : 'body1'}>
                {t('or')}
              </Typography>
              <Grid xs={6} item>
                <Divider sx={{ border: `0.063rem solid ${palette.gray}` }} />
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Box display={'flex'} width={'100%'} justifyContent={'center'} gap={'1.5rem'}>
          <MuiIconButton
            icon={'/images/google'}
            altIcon='google'
            background='transparent'
            iconHeight={32}
            iconWidth={32}
            method={() => initGoogleLogin()}
          />

          <MuiIconButton
            icon={'/images/facebook'}
            altIcon='facebook'
            background='transparent'
            iconHeight={32}
            iconWidth={32}
            method={handleFaceLogin}
          />
          <AppleLogin
            clientId='memvy-app-prod-service'
            redirectURI={location}
            usePopup={appleReady ? true : false}
            callback={appleResponse}
            scope='name email'
            responseMode='form_post'
            state='SignInUserAuthenticationRequest'
            render={(renderProps) => (
              <MuiIconButton
                icon={'/images/apple'}
                altIcon='apple'
                background='transparent'
                iconHeight={38}
                iconWidth={38}
                method={renderProps.onClick}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};
