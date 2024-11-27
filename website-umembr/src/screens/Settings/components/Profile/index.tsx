import { Box, Grid, Typography, Divider, useMediaQuery, Theme, Avatar } from '@mui/material';
import React, { useMemo, useRef, useState } from 'react';
import { MuiTextField, InputPhone, MuiButton, MuiSelect } from '@/components';
import { palette } from '@/theme/constants';
import Image from 'next/image';
import { FormikConfig } from './formik';
import { useTranslation } from 'next-i18next';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/store/selectors';
import { FetchFileService, States, cdn_url, fileConverter } from '@/utils';
import { editProfileView, updateUserData } from '@/store/actions';
import { getUploadSignedUrl } from '@/store/file/action';

export const Profile = () => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isMobileLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const { status: showPassword, switchStatus: switchShowPassword } = UseIntermitence();
  const { status: showConfirmPassword, switchStatus: switchShowConfirmPassword } = UseIntermitence();
  const [isEditable, setIsEditable] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null); //local
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();
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

  //  maybe can use this

  // useEffect(() => {
  //   fetchProfileData();
  // }, []);

  // const fetchProfileData = () => {
  //   setImageUrl(user?.user?.image ? imageCdn(user?.user?.image) : '');
  //   setSelectedImage(user?.user?.image ? imageCdn(user?.user?.image) : '');
  // };

  const handleImageEdit = () => {
    inputRef?.current?.click();
  };

  const options = useMemo(() => {
    const keys: any = Object.keys(States || {});
    return keys.reduce((acc: any, cur: any) => [...acc, { id: cur, name: States[cur] }], []);
  }, []);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      bgcolor={palette.cardBackground}
      sx={{ backdropFilter: 'blur(1.5625rem)' }}

      minHeight={!isMobile ? 'calc(100vh - 6.735rem)' : 'calc(100vh - 6.735rem)'}
      height={!isMobile ? 'calc(100vh - 6.735rem)' : 'calc(100vh - 6.735rem)'}
      padding={'0'}
      borderRadius={'1.25rem'}
      overflow={'hidden'}>
      <Box
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        bgcolor={palette.cardBackground}
        border={`0.063rem solid ${palette.cardBorder}`}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}
        height={'100%'}
        padding={'1.5rem'}
        borderRadius={'1.25rem'}
        overflow={'auto'}>
        <Grid container display={'flex'} marginBottom={'2rem'} justifyContent={'flex-end'} alignItems={'flex-end'}>
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
        </Grid>

        <Divider sx={{ border: `0.063rem solid ${palette.cardBorder}`, marginBottom: '1rem' }} />
        <Typography color={palette.white} variant='body2' marginBottom={'1rem'}>
          {t('profile_picture')}
        </Typography>
        <Box
          borderRadius={'6.25rem'}
          marginBottom={'2rem'}
          width={isMobile ? 90 : 139}
          height={isMobile ? 90 : 139}
          minHeight={isMobile ? 90 : 139}
          minWidth={isMobile ? 90 : 139}
          position={'relative'}
          onClick={() => {
            isEditable && handleImageEdit();
          }}
          sx={{ cursor: isEditable ? 'pointer' : 'inherit' }}>
          {!selectedImage && !imageUrl ? (
            // <Image
            //   src={'/icons/person-outlined.svg'}
            //   alt='profile image'
            //   fill
            //   sizes='100%'
            //   style={{ borderRadius: '6.25rem', objectFit: 'contain' }}
            //   quality={80}
            // />

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
        <Divider sx={{ border: `0.063rem solid ${palette.cardBorder}`, marginBottom: '2rem' }} />
        <form onSubmit={formikSubmit}>
          <Grid container spacing={isMobile ? 0 : 2} width={'100%'} marginBottom={'0.5rem'} rowSpacing={2}>
            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='name'
                name='name'
                fullWidth
                onBlur={() => {
                  handleOnTouched('name');
                }}
                status={changeInputStatus(values.name, errors.name && touched.name)}
                onChange={handleChange}
                value={values.name}
                disabled={!isEditable}
                autoComplete='name'
                placeholder={'name'}
                label={'name'}
                isDarkTheme={false}
                errorMessage={errors.name}
              />
            </Grid>

            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='lastname'
                name='lastname'
                fullWidth
                onBlur={() => {
                  handleOnTouched('lastname');
                }}
                disabled={!isEditable}
                status={changeInputStatus(values.lastname, errors.lastname && touched.lastname)}
                onChange={handleChange}
                value={values.lastname}
                autoComplete='lastname'
                placeholder={'lastname'}
                label={'lastname'}
                isDarkTheme={false}
                errorMessage={errors.lastname}
              />
            </Grid>

            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='email'
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

            <Grid item xs={isMobile ? 12 : 6}>
              <InputPhone
                value={values.phonenumber}
                error={!!errors.phonenumber && touched.phonenumber}
                errorMessage={errors.phonenumber}
                isDarkTheme={false}
                disable={!isEditable}
                onChange={(e: any) => {
                  handlePhone(e);
                }}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <MuiSelect
                name='address_state'
                placeholder='address_state'
                disabled={!isEditable}
                isDarkTheme={false}
                label='address_state'
                value={values.address_state}
                handleSelect={handleChange}
                errorMessage={errors.address_state}
                error={!!errors.address_state && touched.address_state}
                options={options}></MuiSelect>
            </Grid>

            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='address_city'
                name='address_city'
                fullWidth
                onBlur={() => {
                  handleOnTouched('address_city');
                }}
                disabled={!isEditable}
                status={changeInputStatus(values.address_city, errors.address_city && touched.address_city)}
                onChange={handleChange}
                value={values.address_city}
                autoComplete='address_city'
                placeholder={'address_city'}
                label={'address_city'}
                isDarkTheme={false}
                errorMessage={errors.address_city}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='address_line_1'
                name='address_line_1'
                fullWidth
                onBlur={() => {
                  handleOnTouched('address_line_1');
                }}
                disabled={!isEditable}
                status={changeInputStatus(values.address_line_1, errors.address_line_1 && touched.address_line_1)}
                onChange={handleChange}
                value={values.address_line_1}
                autoComplete='address_line_1'
                placeholder={'address_line_1'}
                label={'address_line_1'}
                isDarkTheme={false}
                errorMessage={errors.address_line_1}
              />
            </Grid>

            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='address_line_2'
                name='address_line_2'
                fullWidth
                onBlur={() => {
                  handleOnTouched('address_line_2');
                }}
                disabled={!isEditable}
                status={changeInputStatus(values.address_line_2, errors.address_line_2 && touched.address_line_2)}
                onChange={handleChange}
                value={values.address_line_2}
                autoComplete='address_line_2'
                placeholder={'address_line_2'}
                label={'address_line_2'}
                isDarkTheme={false}
                errorMessage={errors.address_line_2}
              />
            </Grid>

            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='address_postal_code'
                name='address_postal_code'
                fullWidth
                onBlur={() => {
                  handleOnTouched('address_postal_code');
                }}
                disabled={!isEditable}
                status={changeInputStatus(
                  values.address_postal_code,
                  errors.address_postal_code && touched.address_postal_code,
                )}
                onChange={handleChange}
                value={values.address_postal_code}
                autoComplete='address_postal_code'
                placeholder={'address_postal_code'}
                label={'address_postal_code'}
                isDarkTheme={false}
                errorMessage={errors.address_postal_code}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <MuiTextField
                id='referralCode'
                name='referralCode'
                fullWidth
                onBlur={() => {
                  handleOnTouched('referralCode');
                }}
                disabled={true}
                status={changeInputStatus(values.referralCode, errors.referralCode && touched.referralCode)}
                onChange={handleChange}
                value={values.referralCode}
                autoComplete='referral_code'
                placeholder={'referral_code'}
                label={'referral_code'}
                isDarkTheme={false}
                errorMessage={errors.referralCode}
              />
            </Grid>
            {showPasswords && (
              <>
                <Grid item xs={isMobile ? 12 : 6}>
                  <MuiTextField
                    id='password'
                    name='password'
                    fullWidth
                    onBlur={() => {
                      handleOnTouched('password');
                    }}
                    onChange={handleChange}
                    value={values.password}
                    autoComplete='password'
                    placeholder={'password'}
                    label={'password'}
                    isDarkTheme={false}
                    iconMethod={switchShowPassword}
                    iconHeight={18}
                    iconWidth={18}
                    disabled={!isEditable}
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
                    fullWidth
                    onBlur={() => {
                      handleOnTouched('confirm_password');
                    }}
                    disabled={!isEditable}
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
                    endIcon={showConfirmPassword ? '/icons/eye-white.svg' : '/icons/eye-out-white.svg'}
                    errorMessage={errors.confirm_password}
                    status={changeInputStatus(
                      values.confirm_password,
                      errors.confirm_password && touched.confirm_password,
                    )}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <MuiTextField
                id='description'
                name='description'
                fullWidth
                multiline
                disabled={!isEditable}
                onBlur={() => {
                  handleOnTouched('description');
                }}
                status={changeInputStatus(values.description, errors.description && touched.description)}
                onChange={handleChange}
                value={values.description}
                autoComplete='description'
                placeholder={'about_me'}
                label={'about_me'}
                isDarkTheme={false}
                errorMessage={errors.description}
              />
            </Grid>
          </Grid>
        </form>
      </Box>

    </Box>
  );
};
