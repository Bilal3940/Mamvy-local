import { UseIntermitence } from '@/hooks';
import { currentStorySelector } from '@/store/selectors';
import { palette } from '@/theme/constants';
import { calculateAspectRatio, cdn_url } from '@/utils';
import { Box, BoxProps, Typography } from '@mui/material';
import Image from 'next/image';
import { forwardRef, memo, useEffect, useState } from 'react';
import { styles } from '../../styles';

interface MemoryMainCardProps {
  isMobile?: boolean;
  story: ReturnType<typeof currentStorySelector>;
  switchStory: ReturnType<typeof UseIntermitence>['switchStatus'];
  onScroll: BoxProps['onScroll'];
}

const MemoryMainCard = forwardRef<HTMLDivElement, MemoryMainCardProps>(function MemoryMainCard(props, ref) {
  const { isMobile, story, switchStory } = props;

  const [aspectRatio, setAspectRatio] = useState('');

  useEffect(() => {
    if (story?.cover_image) {
      const img = new window.Image();
      img.src = `${cdn_url}${story?.cover_image}`;
      img.onload = () => {
        const ratio = calculateAspectRatio(img.width, img.height);
        if (ratio) {
          setAspectRatio(ratio);
        }
      };
    }
  }, [story?.cover_image]);

  return (
    <Box
      onWheel={props.onScroll}
      tabIndex={0}
      ref={ref}
      bgcolor={palette.lightCardBackground}
      display={'flex'}
      justifyContent={'flex-start'}
      padding={'1.5rem 1.5rem 0.75rem 1.5rem'}
      id={'rectangle'}
      width={'23.75rem'}
      flexDirection={'column'}
      sx={{ cursor: 'pointer' }}
      maxHeight={'25.75rem'}
      zIndex={999}
      alignItems={'center'}
      borderRadius={'5rem'}
      gap={'0.5rem'}
      position={'absolute'}
      alignSelf={'center'}
      boxShadow={'0 0 12px 4px rgb(19 21 68)'}
      onClick={() => switchStory()}
      onKeyDown={(e) => e.key === 'Enter' && switchStory()}>
      <Box
        height={'11.25rem'}
        position={'relative'}
        overflow={'hidden'}
        sx={{
          height: '100%',
          width: '100%',
          aspectRatio: aspectRatio,
          maxHeight: '14.5rem',
        }}>
        {story?.cover_image && (
          <Image
            id='mainImage'
            src={`${cdn_url}${story?.cover_image}` || ''}
            alt={story?.title || ''}
            style={{
              width: '',
              maxWidth: '100%',
              height: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '3.75rem',
              margin: 'auto',
            }}
            fill
            sizes='100%'
            priority
            quality={80}
          />
        )}
      </Box>
      <Typography
        variant='h4'
        textAlign={!!story?.description ? 'left' : 'center'}
        fontWeight={'bold'}
        sx={styles(isMobile).title}
        color={palette.lightText}>
        {story?.title || ''}
      </Typography>
      {!!story?.description && (
        <Typography
          textAlign={'center'}
          variant='body1'
          width={'95%'}
          color={palette.lightText}
          overflow={'hidden'}
          style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' }}>
          {story?.description || ''}
        </Typography>
      )}
    </Box>
  );
});

export default memo(MemoryMainCard);
