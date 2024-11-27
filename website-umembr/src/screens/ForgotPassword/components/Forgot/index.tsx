import { Box, Grid, Typography, useMediaQuery, Theme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { InputToken, MuiButton, MuiTextField } from '@/components';
import { FormikConfig } from './formik';
import { useTranslation } from 'next-i18next';
import { forgotPassword, resetForgotPassword, resetPasswordView, setStep, validateResetCode } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, intermitenceSelector } from '@/store/selectors';
import { useRouter } from 'next/router';
import { palette } from '@/theme/constants';
import Link from 'next/link';
import { UseFirstRender } from '@/hooks';

export const Forgot = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { code, email } = router.query;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [showOTP, setShowOTP] = useState(false);
  const [token, setToken]: any = useState('');
  const { loading } = useSelector(intermitenceSelector);
  const authData = useSelector(authSelector);

  const handleSubmit = (data: any) => {
    dispatch(forgotPassword(data));
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
  } = FormikConfig(handleSubmit);

  const changeInputStatus = (value: string, error: any) => {
    if (value !== '') {
      if (error) return 'error';
      return 'inherit';
    }
    return 'inherit';
  };

  const handleToken = (value: string) => {
    setToken(value);
  };

  const sendToken = () => {
    if (authData?.recover?.message?.toLowerCase()?.includes('validated')) return dispatch(resetForgotPassword());

    let emailData = authData?.email || email;
    dispatch(validateResetCode({ email: emailData, code: token }));
  };

  useEffect(() => {
    if (authData?.recover?.message?.toLowerCase()?.includes('email')) setShowOTP(true);
    if (!authData?.recover) setShowOTP(false);
    if (authData?.recover?.message?.toLowerCase()?.includes('code')) dispatch(setStep(2));
  }, [authData?.recover]);

  useEffect(() => {
    if (code) {
      setShowOTP(true);
      return setToken(code);
    }
  }, []);

  UseFirstRender(() => {
    dispatch(resetPasswordView());
  }, [dispatch]);

  return (
    <>
      {!showOTP ? (
        <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
          <Typography marginBottom={'1rem'} variant='h4' fontWeight={'400'}>
            {t('you_forgot_password')}
          </Typography>

          <Typography marginBottom={'1rem'} variant='body2'>
            {t('enter_email')}
          </Typography>

          <Box width={'100%'}>
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
                  <MuiButton type='submit' disabled={!isValid || !dirty} variant={'contained'}>
                    <Typography variant='button'>{t('continue')}</Typography>
                  </MuiButton>
                </Grid>

                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  flexDirection={isMobile ? 'column' : 'row'}
                  justifyContent={'center'}
                  alignItems={isMobile ? 'center' : 'flex-start'}>
                  <Typography variant='caption'>{t('want_to_try_login')}</Typography>
                  <Link href={'/app/login'}>
                    <Typography variant='caption' marginLeft={isMobile ? 0 : '0.375rem'} color={palette.primary}>
                      {t('click_to_login')}
                    </Typography>
                  </Link>
                </Grid>
                <Grid
                  item
                  sx={{
                    '&.MuiGrid-item': {
                      paddingTop: '0.3rem',
                    },
                  }}
                  xs={12}
                  display={'flex'}
                  flexDirection={isMobile ? 'column' : 'row'}
                  justifyContent={'center'}
                  alignItems={isMobile ? 'center' : 'flex-start'}
                  marginBottom={'0.5rem'}>
                  <Typography variant='caption'>{t('or')}</Typography>

                  <Link href={'/app/register'}>
                    <Typography variant='caption' marginLeft={isMobile ? 0 : '0.375rem'} color={palette.primary}>
                      {t('create_profile')}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      ) : (
        <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
          <Typography marginBottom={'1rem'} variant='h4' fontWeight={'400'}>
            {t('enter_verification')}
          </Typography>

          <Typography marginBottom={'1rem'} textAlign={'center'} width={'70%'} variant='body2'>
            {t('enter_verification_code')}
          </Typography>

          <Grid container display={'flex'} flexDirection={'column'}>
            <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <InputToken value={token} onChange={handleToken} numInputs={6} inputType={isMobile ? 'tel' : 'number'} />
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              marginTop={'1rem'}
              flexDirection={isMobile ? 'column' : 'row'}
              justifyContent={'center'}
              alignItems={isMobile ? 'center' : 'flex-start'}
              marginBottom={'0.5rem'}>
              <Typography variant='caption'>{t('resend_token')}</Typography>
              <Typography
                onClick={() => handleSubmit(values)}
                variant='caption'
                sx={{ cursor: 'pointer' }}
                marginLeft={isMobile ? 0 : '0.375rem'}
                color={palette.primary}>
                {t('resend')}
              </Typography>
            </Grid>
            <Grid item xs={12} marginTop={'6rem'}>
              <MuiButton
                type='submit'
                method={() => sendToken()}
                disabled={token?.length < 6 || loading}
                loading={loading}
                variant={'contained'}>
                <Typography variant='button'>{t('continue')}</Typography>
              </MuiButton>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
