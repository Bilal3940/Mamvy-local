import { palette } from '@/theme/constants';
import { Box, Modal, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { MuiButton, MuiIconButton } from '@/components';
import { styles } from './styles';
import { FC, useMemo, useState } from 'react';
import { MainContent } from '../MainContent';
import { checkPermissions } from '@/utils';
import { useSelector } from 'react-redux';
import { authSelector, storySelector } from '@/store/selectors';
import Link from 'next/link';
import InfoContent from '../InfoContent';

interface ModalDetailProps {
  open: boolean;
  onClose: () => void;
  mediaContent?: any;
  method: () => void;
}

const StoryDetail: FC<ModalDetailProps> = ({ open, onClose, mediaContent, method }) => {
  const { t } = useTranslation();
  const [mediaSelected, setMediaSelected] = useState('home');
  const { user } = useSelector(authSelector);
  const { story } = useSelector(storySelector);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const switchMedia = (media: string) => {
    switch (media) {
      case 'home':
        return <MainContent description={mediaContent?.description} media={mediaContent} />;
      case 'info':
        return <InfoContent data={mediaContent?.story_details?.general_info} />;
      default:
        return 'home';
    }
  };

  const mediasButton = useMemo(() => {
    const media = [{ name: 'home', label: 'home', icon: 'home' }];
    const validateDetails = Object.keys(mediaContent?.story_details?.general_info || {}).reduce(
      (acc: any, item: any) => {
        const check = mediaContent?.story_details?.general_info[item];
        let valid = acc;
        const values = Object.keys(check || {});
        const checkInfo = (info: any) => {
          const infoKeys = Object.keys(info || {});
          for (const key of infoKeys) {
            valid = valid || !!info[key];
          }
        };
        for (const value of values) {
          if (Array.isArray(check[value])) {
            for (const val of check[value]) {
              checkInfo(val);
            }
          } else {
            checkInfo(check[value]);
          }
        }

        return valid;
      },
      false,
    );
    if (validateDetails) media.push({ name: 'info', label: 'info', icon: 'info' });

    return media;
  }, [mediaContent]);

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Box
        display={'flex'}
        width={isMobile ? '100%' : '40.1875rem'}
        maxHeight={isMobile ? '100%' : '95vh'}
        padding={'1.5rem'}
        borderRadius={isMobile ? '0' : '1.25rem'}
        height={isMobile ? '100%' : 'auto'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        alignItems={'center'}
        position={'relative'}
        bgcolor={palette.cardBackground}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}
        border={isMobile ? 'none' : `0.063rem solid ${palette.cardBorder}`}>
        <Box width={'100%'}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            flexDirection={isMobile ? 'column-reverse' : 'row'}
            alignItems={'center'}
            width={'100%'}>
            <Typography fontSize={'1.125rem'} marginTop={isMobile ? '1rem' : '0'} fontWeight={'600'}>
              {mediaContent?.title}
            </Typography>

            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} width={isMobile ? '100%' : 'auto'}>
              {(checkPermissions(user?.roles || [], 'CLIENT_STORY_DELETE', story?.id) ||
                user?.id === story?.user_id) && (
                <Box width={'6.5rem'} marginRight={'1rem'}>
                  <MuiButton type='button' loading={false} variant={'outlined'} method={method}>
                    <Typography variant='button' color={palette.white}>
                      {t('delete')}
                    </Typography>
                  </MuiButton>
                </Box>
              )}
              {(checkPermissions(user?.roles || [], 'CLIENT_STORY_UPDATE', story?.id) ||
                user?.id === story?.user_id) && (
                <Box width={'6.5rem'} marginRight={'1rem'}>
                  <Link href={`/app/story/${story?.url}/update`} onClick={() => {}}>
                    <MuiButton type='button' loading={false} variant={'contained'} disabled={false}>
                      <Typography variant='button' color={palette.white}>
                        {t('edit_mayus')}
                      </Typography>
                    </MuiButton>
                  </Link>
                </Box>
              )}
              <MuiIconButton icon='/icons/close' altIcon='close' background={'transparent'} method={onClose} />
            </Box>
          </Box>

          <Stack
            sx={{
              height: { xs: '100%', md: '70vh' },
              overflow: 'hidden',
            }}>
            <Stack
              direction='column'
              sx={{ overflowY: 'auto', maxHeight: isMobile ? '60vh' : '100%', position: 'relative' }}>
              {switchMedia(mediaSelected)}
            </Stack>
          </Stack>
        </Box>

        <Box display={'flex'} bottom={'0.5rem'} marginTop={'1rem'}>
          {mediasButton.map((item: any, index: number) => {
            return (
              <Box key={`media-button-${index}`} margin={'0 0.5rem'}>
                <MuiIconButton
                  icon={`/icons/${item?.icon}`}
                  altIcon={item?.icon}
                  iconWidth={item?.icon == 'info' ? 20 : 16}
                  iconHeight={item?.icon == 'info' ? 20 : 16}
                  background={mediaSelected === item?.name ? palette?.primary : palette?.black}
                  method={() => setMediaSelected(item?.name)}
                  label={item?.label}
                  disableRipple
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
};

export default StoryDetail;
