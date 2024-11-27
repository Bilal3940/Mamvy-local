import { MuiButton, MuiIconButton } from '@/components';
import { UseIntermitence } from '@/hooks';
import { openPublishModal } from '@/store/actions';
import { authSelector, currentStorySelector } from '@/store/selectors';
import { palette } from '@/theme/constants';
import { cdn_url } from '@/utils';
import { Box, BoxProps, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { forwardRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../styles';

export interface MemoryHeaderProps {
  isMobile?: boolean;
  story: ReturnType<typeof currentStorySelector>;
  height: string;
  switchStory: ReturnType<typeof UseIntermitence>['switchStatus'];
  onScroll: BoxProps['onScroll'];
}

const MemoryHeader = forwardRef<HTMLDivElement, MemoryHeaderProps>(function MemoryHeader(props, ref) {
  const { isMobile, story, height, switchStory } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useSelector(authSelector);

  const showPublishButton = () => {
    const isAuthor = story.user_id === auth.user.id;
    const isEditor = story.roleUsers?.some((roleUser:any) => roleUser.role_id === 2 && roleUser.user_id === auth.user.id);

    return isAuthor || isEditor;
  };

  return (
    <Box
      onWheel={props.onScroll}
      width={'100%'}
      position={'absolute'}
      minHeight={64}
      top={0}
      left={0}
      right={0}
      zIndex={100}
      sx={{ maxWidth: '-webkit-fill-available' }}>
      <Box
        width={'100%'}
        height={height}
        position={'relative'}
        sx={{ transition: 'all 0.25s' }}
        onWheel={props.onScroll}
        onDrag={props.onScroll}>
        <Image
          src={`${cdn_url}${story?.cover_image}` || ''}
          alt={story?.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          fill
          sizes='100%'
          quality={80}
        />
      </Box>

      <Box
        width={'100%'}
        ref={ref}
        padding={'1rem'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          background:
            Number(height.replace('vh', '')) <= 5
              ? 'linear-gradient(0deg, rgba(33,33,33,0) 0%, #131544 50%)'
              : 'linear-gradient(180deg, rgba(33, 33, 33, 0) 0%, #131544 100%)',
        }}
        position={'absolute'}
        bottom={0}
        zIndex={1}>
        <Box display={'flex'} justifyContent={'flex-start'} width={'100%'}>
          <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
            <Typography
              sx={styles(isMobile).title}
              marginLeft={Number(height.replace('vh', '')) <= 10 ? '3rem' : 0}
              marginRight={'0.5rem'}
              fontSize={Number(height.replace('vh', '')) <= 10 ? '1.5rem' : '1.5rem'}
              color={palette.white}
              zIndex={102}>
              {`${story?.title || ''}` || ''}
            </Typography>
            {!(Number(height.replace('vh', '')) <= 10) && (
              <>
                <Typography
                  sx={{ transition: 'all 0.25s' }}
                  marginLeft={Number(height.replace('vh', '')) <= 10 ? '3rem' : 0}
                  marginRight={'0.5rem'}
                  fontSize={'1.2rem'}
                  color={palette.white}
                  zIndex={1}>
                  {story?.title ? `·` : ''}
                </Typography>

                <Typography
                  sx={{ transition: 'all 0.25s' }}
                  marginLeft={Number(height.replace('vh', '')) <= 10 ? '3rem' : 0}
                  marginRight={'0.5rem'}
                  fontSize={'1.2rem'}
                  color={palette.white}
                  zIndex={1}>
                  {`${story?.status ? (story?.status === 'draft' ? 'Draft' : 'Published') : ''}` || ''}
                </Typography>
              </>
            )}
            {!(Number(height.replace('vh', '')) <= 15) && (
              <>
                {story?.title && (
                  <MuiIconButton
                    icon={`/icons/info`}
                    altIcon={'info'}
                    iconHeight={22}
                    iconWidth={22}
                    width={22}
                    height={22}
                    background={'transparent'}
                    method={() => switchStory()}
                    disableRipple
                  />
                )}
              </>
            )}
          </Box>
        </Box>

        <Box width={'5.75rem'} margin={'0 0.5rem'} display={'flex'}>
          {showPublishButton() && (
            <MuiButton
              type='button'
              disabled={false}
              loading={false}
              variant={'contained'}
              method={() => dispatch(openPublishModal())}>
              <Typography variant='button'>{story?.status == 'draft' ? t('publish') : t('share')}</Typography>
            </MuiButton>
          )}
        </Box>
      </Box>
    </Box>
  );
});

export default memo(MemoryHeader);
