import { palette } from '@/theme/constants';

import { Modal, Theme, Typography, useMediaQuery, Box, Link, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { MuiButton, MuiTextField } from '@/components';
import { styles } from './styles';
import Image from 'next/image';
import { FormikConfig } from './formik';
import { useDispatch, useSelector } from 'react-redux';
import { setCode } from '@/store/actions';
import { storySelector } from '@/store/selectors';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UseFirstRender } from '@/hooks';
import ChevronLeftIconComponent from '../../../../../public/icons/components/chevron-left';

interface ModalDetailProps {
  open: boolean;
  onClose: () => void;
  confirmMethod?: () => void;
  item?: any;
}

export const PrivateStoryModal = ({ open, onClose, confirmMethod, item }: ModalDetailProps) => {
  const dispatch = useDispatch();
  const { story } = useSelector(storySelector);
  const handleOnTouched = (key: string) => setTouched({ code: true });
  const handleSubmit = (data: any) => {
    dispatch(setCode({ password: data.code, storyId: story?.id || item?.id }));
  };
  const router = useRouter();

  UseFirstRender(() => {
    if (router?.query?.code) {
      dispatch(setCode({ password: router?.query?.code, storyId: router.query.id }));
    }
  }, [story, router]);

  useEffect(() => {
    if (story?.private && story?.confirmPassword) {
      router.push(`/app/story/${story?.url}`);
      onClose();
    }
  }, [story]);

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
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Modal open={open} onClose={onClose} sx={styles(isMobile).modal}>
      <Box flexDirection={'column'} display={'flex'} alignItems={'center'}>
        <Box marginBottom={'1rem'}>
          <Button
            component={Link}
            href={'/app/home'}
            startIcon={<ChevronLeftIconComponent color={'#B3BED4'} />}
            variant='outlined'
            style={{
              borderRadius: '19px',
              border: `1px solid ${palette.cardBorder}`,
              backdropFilter: 'blur(1.5625rem)',
            }}>
            <Typography variant={'button'} color={`#B3BED4`}>
              Back
            </Typography>
          </Button>
        </Box>
        <Box
          gap={'1rem'}
          width={isMobile ? '100%' : '30rem'}
          maxHeight={isMobile ? '100%' : '95vh'}
          height={isMobile ? '100%' : 'auto'}
          borderRadius={isMobile ? '0' : '1.25rem'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          padding={'1.5rem'}
          justifyContent={isMobile ? 'center' : 'space-between'}
          position={'relative'}
          bgcolor={palette.cardBackground}
          sx={{ backdropFilter: 'blur(1.5625rem)', outline: 'none' }}
          border={isMobile ? 'none' : `0.063rem solid ${palette.cardBorder}`}>
          <Image src={'/images/stacked-white.svg'} alt={'logo'} width={84} height={84} />
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant={'h4'}>{t('welcome')}</Typography>
          </Box>
          <Typography textAlign={'center'} maxWidth={'20rem'} variant={'body2'}>
            {t('to_view_this')}
          </Typography>
          <Box display={'flex'} flexDirection={'column'} gap={'1rem'} width={'20rem'}>
            <form
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}
              onSubmit={formikSubmit}>
              <MuiTextField
                id='code'
                name='code'
                fullWidth
                onBlur={() => {
                  handleOnTouched('code');
                }}
                onChange={handleChange}
                value={values.code}
                placeholder={t('access code')}
                error={!!errors.code && touched.code}
                // isDarkTheme={false}
                // errorMessage={errors.code}
                // status={changeInputStatus(values.code, errors.code && touched.code)}
                helperText={errors.code && touched.code ? errors.code : ''}
              />

              <MuiButton
                type='submit'
                disabled={!isValid || !dirty}
                loading={false}
                variant={'contained'}
                method={confirmMethod}>
                <Typography variant='button' color={palette.white}>
                  {t('access')}
                </Typography>
              </MuiButton>
            </form>
            <Box display={'flex'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
              <Typography align='center' variant={'caption'}>
                {t('are_you_a_collaborator?')}
              </Typography>
              <Typography align='center' variant={'caption'}>
                &nbsp;
              </Typography>

              <Link href={'/app/login'} sx={{ textDecoration: 'none' }}>
                <Typography
                  align='center'
                  sx={{ textDecoration: 'underline' }}
                  color={palette.white}
                  variant={'caption'}>
                  {t('login_with_account')}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
