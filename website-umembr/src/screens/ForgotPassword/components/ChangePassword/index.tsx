import { MuiButton, MuiTextField } from '@/components';
import { UseIntermitence } from '@/hooks';
import { resetPassword } from '@/store/actions';
import { authSelector, intermitenceSelector } from '@/store/selectors';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikConfig } from './formik';

export const ChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const router = useRouter();
  const { status: showPassword, switchStatus: switchShowPassword } = UseIntermitence();
  const { status: showConfirmPassword, switchStatus: switchShowConfirmPassword } = UseIntermitence();
  const { loading } = useSelector(intermitenceSelector);
  const authData: any = useSelector(authSelector);

  const handleSubmit = (data: any) => {
    let email = authData?.email;
    let code = authData?.code;
    dispatch(resetPassword({ ...data, email, code }));
  };

  useEffect(() => {
    if (authData?.isAuth) router.push('/app/home');
  }, [authData?.isAuth]);

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

  return (
    <Box>
      <Typography marginBottom={'1rem'} variant='h4' fontWeight={'400'}>
        {t('verification')}
      </Typography>

      <Typography marginBottom={'1rem'} variant='body2'>
        {t('enter_new_password')}
      </Typography>

      <form onSubmit={formikSubmit}>
        <Grid container width={'100%'} marginBottom={'0.5rem'} rowSpacing={2}>
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
          <Grid item xs={12}>
            <MuiTextField
              id='confirm_password'
              name='confirm_password'
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
            <MuiButton type='submit' disabled={!isValid || !dirty || loading} loading={loading} variant={'contained'}>
              <Typography variant='button'>{t('continue')}</Typography>
            </MuiButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
