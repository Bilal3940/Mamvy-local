import { palette } from '@/theme/constants';
import { Avatar, Box, Divider, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, collaboratorSelector, storySelector } from '@/store/selectors';
import { FC, useEffect, useState } from 'react';
import { MuiTextField, MuiButton, MuiSelect } from '@/components';
import { FormikConfig } from './formik';
import { getCollaboratorStory, inviteCollaborator } from '@/store/collaborator/action';
import Image from 'next/image';
import { RemoveCollaborator } from '../RemoveCollaborator';
import { UseFirstRender } from '@/hooks';
import { styles } from '../styles';
import { cdn_url } from '@/utils';

export const Form: FC<any> = ({ formRef, onClose }) => {
  const { t } = useTranslation();
  const { story } = useSelector(storySelector);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [openRemoveCollaborator, setOpenRemoveCollaborator] = useState(false);
  const { collaborators } = useSelector(collaboratorSelector);
  const auth = useSelector(authSelector);
  const [selectedUser, setSelectedUser] = useState({});
  const [noRegister, setNoRegister] = useState({});
  const [validatedCollaborators, setValidatedCollaborators] = useState([]);
  const [nonValidatedCollaborators, setNonValidatedCollaborators] = useState([]);

  const handleSubmit = async () => {
    dispatch(inviteCollaborator({ collaborators: values.collaborators, story_id: story?.id }));
    onClose();
  };

  const handleOnTouched = (key: string) => setTouched({ ...touched, [key]: true });

  const {
    values,
    handleSubmit: formikSubmit,
    errors,
    touched,
    setTouched,
    setFieldValue,
    setErrors,
  } = FormikConfig(handleSubmit);

  const changeInputStatus = (value: string, error: any) => {
    if (value !== '') {
      if (error) return 'error';
      return 'inherit';
    }
    return 'inherit';
  };



  console.log("I AM THE COLLABORATOR", collaborators)
  const isEmailValid = (email: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const addCollaborators = () => {
    const emails = values.email.split(',').map((email: any) => email.trim());
    const validEmails = emails.filter(isEmailValid);
    if (validEmails.length !== emails.length) {
      setErrors({ email: t('please_enter_valid') });
      return;
    }
    if (values.collaborators.filter((c: any) => emails.includes(c.email)).length > 0) {
      setErrors({ email: t('collaborator_already_added') });
      return;
    }

    if (collaborators?.collaborators?.filter((c: any) => emails.includes(c.email)).length > 0) {
      setErrors({ email: t('collaborator_already_added') });
      return;
    }

    const duplicates = new Set(emails).size !== emails.length;

    if (duplicates) {
      setErrors({ email: t('duplicates_collaborators') });
      return;
    }

    const newCollaborators = emails.map((email: any) => ({
      email,
      type: 'other',
      role: 'collaborator',
    }));

    setFieldValue('collaborators', [...values.collaborators, ...newCollaborators]);
    setFieldValue('email', '');
    setErrors({ email: '' });
  };

  const getEmailInitial = (email: string) => email.charAt(0).toUpperCase();

  const handleCollaborator = (user: any, values?: any) => {
    setSelectedUser(user);
    if (values) setNoRegister(values)
    setOpenRemoveCollaborator(true);
  };

  UseFirstRender(() => {
    if (story?.id) dispatch(getCollaboratorStory(story?.id));
  }, [story]);

  useEffect(() => {
    setValidatedCollaborators(collaborators?.collaborators?.filter((user: any) => user?.validated));
    setNonValidatedCollaborators(collaborators?.collaborators?.filter((user: any) => !user?.validated));
  }, [collaborators]);

  console.log("NOVAL",nonValidatedCollaborators)

  const capitalizeAndRemoveS = (string: any) => {
    let result = string?.charAt(0)?.toUpperCase() + string?.slice(1);
    if (result && result?.endsWith('s')) {
      result = result?.slice(0, -1);
    }
    return result || '';
  }


  return (
    <form ref={formRef} onSubmit={formikSubmit} style={{ width: '100%' }}>
      <Grid container marginTop={'1rem'} gap={2}>
        <Typography variant={isMobile ? 'body1' : 'h4'} color={palette.white}>
          {t('collaborators')}
        </Typography>
        {validatedCollaborators?.length > 0 &&
          validatedCollaborators
            .map((user: any) => {
              return (
                <Grid key={user?.id} container spacing={2}>
                  {isMobile ? (
                    <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <Grid display={'flex'} item xs={9} flexDirection={'column'}>
                      <Grid>
                          <Image width={100} height={100} src={user?.picture}  alt='hello'/>
                        </Grid>
                        <Grid>
                          <Typography align='left'>{user?.user?.email}</Typography>
                        </Grid>
                        <Grid>
                          <Typography align='left'>
                            {capitalizeAndRemoveS(user?.user_type)} | {user?.role?.name.replace(/_/g, ' ')}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item textAlign={'right'} xs={3}>
                        <Image
                          src='/icons/close.svg'
                          alt='close'
                          style={{ cursor: 'pointer' }}
                          width={18}
                          height={18}
                          onClick={() => handleCollaborator(user)}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      <Grid item xs={6}>
                        <Typography align='center'>{user?.user?.email}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align='right'>
                          {capitalizeAndRemoveS(user?.user_type)} | {user?.role?.name.replace(/_/g, ' ')}
                        </Typography>
                      </Grid>
                      <Grid item textAlign={'center'} xs={2}>
                        {auth?.user?.email !== user?.user?.email && <Image
                          src='/icons/close.svg'
                          alt='close'
                          style={{ cursor: 'pointer' }}
                          width={18}
                          height={18}
                          onClick={() => handleCollaborator(user)}
                        />}
                      </Grid>
                    </>
                  )}
                </Grid>
              );
            })}

        {(nonValidatedCollaborators?.length > 0 || Object.keys(story?.inviteNoRegister ?? {}).length > 0) && (
          <Grid container marginTop={'1rem'} gap={2}>
            <Typography variant={isMobile ? 'body1' : 'h4'} color={palette.white}>
              {t('pending_acceptance')}
            </Typography>
            {nonValidatedCollaborators?.length > 0 &&
              nonValidatedCollaborators
                .filter((user: any) => user?.user?.email !== auth?.user?.email)
                .map((user: any) => {
                  return (
                    <Grid key={user?.id} container spacing={2}>
                      {isMobile ? (
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                          <Grid display={'flex'} item xs={9} flexDirection={'column'}>
                            <Grid>
                              <Typography align='left'>{user?.user?.email}</Typography>
                            </Grid>
                            <Grid>
                              <Typography align='left'>
                                {capitalizeAndRemoveS(user?.user_type)} | {user?.role?.name.replace(/_/g, ' ')}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item textAlign={'right'} xs={3}>
                            <Image
                              src='/icons/close.svg'
                              alt='close'
                              style={{ cursor: 'pointer' }}
                              width={18}
                              height={18}
                              onClick={() => handleCollaborator(user)}
                            />
                          </Grid>
                        </Grid>
                      ) : (
                        <>

                          <Grid item xs={6}>
                            <Typography align='center'>{user?.user?.email}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography align='right'>
                              {capitalizeAndRemoveS(user?.user_type)} | {user?.role?.name.replace(/_/g, ' ')}
                            </Typography>
                          </Grid>
                          <Grid item textAlign={'center'} xs={2}>
                            {auth?.user?.email !== user?.user?.email && <Image
                              src='/icons/close.svg'
                              alt='close'
                              style={{ cursor: 'pointer' }}
                              width={18}
                              height={18}
                              onClick={() => handleCollaborator(user)}
                            />}
                          </Grid>
                        </>
                      )}
                    </Grid>
                  );
                })}

            {story?.inviteNoRegister &&
              Object?.keys(story?.inviteNoRegister)?.length > 0 &&
              Object?.entries(story?.inviteNoRegister)?.map(([key, value]: any) => {
                return (
                  <Grid key={key} container spacing={2}>
                    {isMobile ? (
                      <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Grid display={'flex'} item xs={9} flexDirection={'column'}>
                          <Grid>
                            <Typography align='left'>{key}</Typography>
                          </Grid>
                          <Grid>
                            <Typography align='left'>
                              {capitalizeAndRemoveS(value?.type)} | {value?.role?.replace(/_/g, ' ')}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item textAlign={'right'} xs={3}>
                          <Image
                            src='/icons/close.svg'
                            alt='close'
                            style={{ cursor: 'pointer' }}
                            width={18}
                            height={18}
                            onClick={() => handleCollaborator(story, value)}
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <Grid item xs={6}>
                          <Typography align='center'>{key}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography align='right'>
                            {capitalizeAndRemoveS(value?.type)} | {value?.role?.replace(/_/g, ' ')}
                          </Typography>
                        </Grid>
                        <Grid item textAlign={'center'} xs={2}>
                          <Image
                            src='/icons/close.svg'
                            alt='close'
                            style={{ cursor: 'pointer' }}
                            width={18}
                            height={18}
                            onClick={() => handleCollaborator(story, value)}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                );
              })}
          </Grid>
        )}

        <RemoveCollaborator
          open={openRemoveCollaborator}
          onClose={() => setOpenRemoveCollaborator(false)}
          values={selectedUser}
          noRegister={noRegister}
        // role={user?.role}
        />

        <Grid item xs={12} container alignItems='flex-start' gap={1}>
          <Grid item xs style={{ flex: 1 }}>
            <MuiTextField
              id='email'
              name='email'
              fullWidth
              onBlur={() => {
                handleOnTouched('email');
              }}
              status={changeInputStatus(values.email, errors.email && touched.email)}
              // onChange={handleChange}
              onChange={(e) => setFieldValue('email', e.target.value)}
              value={values.email}
              placeholder={t('enter email of collaborator')}
              errorMessage={errors.email}
              error={!!errors.email && touched.email}
            // isDarkTheme={false}
            />
          </Grid>
          <Grid item>
            {' '}
            <MuiButton
              type='button'
              method={() => addCollaborators()}
              disabled={false}
              loading={false}
              variant={'contained'}>
              <Typography variant={isMobile ? 'caption' : 'button'}>{t('add')}</Typography>
            </MuiButton>
          </Grid>
        </Grid>
        <Typography variant='caption' color={palette.white} paddingLeft={'0.75rem'}>
          {t('add_multiple_collaborators')}
        </Typography>
        <Divider sx={{ border: `0.063rem solid ${palette.gray}`, width: '100%' }} />

        {values?.collaborators?.map(
          (collaborator: any, index: number) =>
            values?.collaborators[index]?.email?.length > 1 && (
              <Grid item xs={12} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography align='center'>{t('email_collaborator')}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align='right'>{t('user_type')}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align='right'>{t('role')}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display='flex' flexDirection='row' gap={2} alignItems='center'>
                      {!isMobile && (
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#03A9F4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: palette.white,
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            font: 'Patrick Hand',
                          }}>
                          {getEmailInitial(collaborator.email)}
                        </Box>
                      )}

                      <Typography sx={styles.email} marginTop={isMobile ? '0.5rem' : 0}>
                        {collaborator.email}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <Box
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiSelect-select': {
                          textAlign: 'end',
                          paddingRight: '1rem',
                        },
                      }}>
                      <MuiSelect
                        name={`collaborators[${index}].type`}
                        value={collaborator.type}
                        handleSelect={(event: any) => setFieldValue(`collaborators[${index}].type`, event.target.value)}
                        placeholder={t(collaborator.type)}
                        options={[
                          { id: 'other', name: 'Other' },
                          { id: 'family', name: 'Family' },
                          { id: 'friends', name: 'Friends' },
                        ]}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiSelect-select': {
                          textAlign: 'end',
                          paddingRight: '1rem',
                        },
                      }}>
                      <MuiSelect
                        name={`collaborators[${index}].role`}
                        value={collaborator.role}
                        handleSelect={(event: any) => setFieldValue(`collaborators[${index}].role`, event.target.value)}
                        placeholder={t(collaborator.role)}
                        options={[
                          { id: 'owner', name: 'Owner' },
                          { id: 'collaborator', name: 'Collaborator' },
                          { id: 'viewer', name: 'Viewer' },
                          {id:'uga_collaborator', name:'UGA Collaborator'},
                        ]}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ),
        )}
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} gap={'1rem'}>
          <MuiButton type='button' disabled={false} loading={false} variant={'outlined'} method={() => onClose()}>
            <Typography color={palette.white} variant='button'>
              {t('cancel')}
            </Typography>
          </MuiButton>
          <MuiButton type='submit' disabled={values?.collaborators?.length < 1} loading={false} variant={'contained'}>
            <Typography variant='button'>{t('invite')}</Typography>
          </MuiButton>
        </Box>
      </Grid>
    </form>
  );
};
