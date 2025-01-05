import { palette } from '@/theme/constants';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';

import { AudioPlayer, RtfComponent, VideoPlayer } from '@/components';
import { calculateAspectRatio, cdn_url } from '@/utils';
import { useCallback, useEffect, useState } from 'react';

export const MainContent = ({ extendedPalette,description, media, boxRef, height }: any) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [aspectRatio, setAspectRatio] = useState('16/9');

  const showMedia = useCallback(
    (type: string) => {
      const types: any = {
        image: (
          <Image
            src={`${cdn_url}${media?.asset || media?.cover_image}` || ''}
            alt={media?.cover_image}
            fill
            sizes='100%'
            style={{
              width: '',
              maxWidth: '100%',
              border: (media?.type === 'image' || media?.asset_type?.includes('image')) || media?.cover_image ? ` ${palette.primary}` : 'none',
              objectFit: 'contain',
              height: '100%',
              margin: 'auto',
              borderRadius: '1.15rem',

              maxHeight: '100%',
            }}
            quality={80}
            priority
          />
        ),
        video: (
          <VideoPlayer
            containerHeight={'100%'}
            height={'100%'}
            url={`${cdn_url}${media?.asset || media?.cover_image}`}
            disabledVideo={false}
          />
        ),
        audio: (
          <Box padding={'0 1rem'}>
            <AudioPlayer
              audioData={`${cdn_url}${media?.asset || media?.cover_image}`}
              index={0}
              name={media?.asset?.split('/').pop()}
            />
          </Box>
        ),
        text: (
          <Box height={'100%'} padding={'1rem 0.5rem 1rem 1rem'}>
            <Box
              height={'100%'}
              sx={{
                overflowY: 'auto',
              }}>
              <Typography marginRight={'0.5rem'}>
                <RtfComponent rtf={type === 'text' ? JSON.parse(media?.asset) : ''} label={'p'} />
              </Typography>
            </Box>
          </Box>
        ),
      };

      const typeArray = Object.keys(types || {});

      if (typeArray.includes(type)) {
        return types[type?.split('/')[0] || media?.asset_type?.split('/')[0]];
      } else {
        return types['image'];
      }
    },
    [media?.asset || media?.cover_image],
  );

  useEffect(() => {
    if (media?.asset) {
      const img = new window.Image() as HTMLImageElement;
      img.src = `${cdn_url}${media?.asset}`;
      img.onload = () => {
        const ratio = calculateAspectRatio(img.width, img.height);
        if (ratio) {
          setAspectRatio(ratio);
        }
      };
    }
  }, [media?.asset]);

  return (
    <>
      <Box
        borderRadius={'1.25rem'}
        border={(media?.type === 'image' || media?.asset_type?.includes('image')) || media?.cover_image ? 'none' : `2px solid ${extendedPalette.cardIconColor}`}
        width={'100%'}
        ref={boxRef}
        position={'relative'}
        height={isMobile ? '30vh' : height ? 'calc(100% - 5rem)' : '22rem'}
        maxHeight={isMobile ? '30vh' : '20rem'}
        marginTop={'1.5rem'}
        sx={{
          aspectRatio: (media?.type === 'image' || media?.asset_type?.includes('image')) || media?.cover_image ? aspectRatio : '16/9',
          height: '100%',
          width: '100%',
        }}>
        {showMedia(media?.type)}
      </Box>
      <Box
        padding={'0.5rem'}
        display={'flex'}
        marginTop={'1rem'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}>
        <Typography variant='body2' color={palette.white}>
          {description}
        </Typography>
      </Box>
    </>
  );
};
