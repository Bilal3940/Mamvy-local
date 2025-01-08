import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { palette } from '@/theme/constants';
import { MuiButton } from '@/components';
import { intermitenceSelector, storySelector } from '@/store/selectors';
import { useSelector } from 'react-redux';
import { UseFirstRender } from '@/hooks';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const FinishCreate: FC<any> = ({ handleCreateStories, creating }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { story } = useSelector(storySelector);
  const router = useRouter();
  const intermitenceData = useSelector(intermitenceSelector);

  UseFirstRender(() => {
    if (story?.id) {
      router.push(`/app/story/${story?.url}/memory/create`);
    }
  }, [story]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={isMobile ? '100%' : 'calc(100% - 2rem)'}
      margin={'1.5rem auto 0 auto'}
      borderRadius={'0.5rem'}
      height={'100%'}
      padding={isMobile ? '1.5rem' : '3.5rem'}>
      <Box>
        <Typography
          variant={isMobile ? 'body2' : 'h3'}
          color={palette.white}
          textAlign={'center'}
          marginBottom={'1rem'}>
          {t('almost_there')}
        </Typography>
        <Typography mb={'1.5rem'} variant={'h4'} textAlign={'center'} color={palette.white}>
          {t('click_create')}
        </Typography>
      </Box>
      <Box  width={'5.75rem'}>
        <MuiButton
          method={handleCreateStories}
          type='submit'
          disabled={creating}
          loading={intermitenceData?.loading || creating}
          variant={'contained'}>
          <Typography variant='button'>{t('create')}</Typography>
        </MuiButton>
      </Box>
    </Box>
  );
};
