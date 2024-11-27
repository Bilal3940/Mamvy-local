import { VideoPlayer } from '@/components';
import { palette } from '@/theme/constants';
import { cdn_url } from '@/utils';
import { Box, Grid, Theme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

const VideoItem: FC<any> = ({ item, name, elementSelected, handleSelectVideo, thumbnail }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Grid
      item
      position={'relative'}
      borderRadius={'1.25rem'}
      border={elementSelected?.name === name ? `0.0625rem solid ${palette.primary}` : 'none'}
      xs={isMobile ? 3.8 : 3.5}
      onClick={(e) => handleSelectVideo(e, { name, url: `${cdn_url}${item}` })}
      height={'7rem'}
      zIndex={999}>
      <Box
        width={'100%'}
        height={'6.8125rem'}
        borderRadius={'1.25rem'}
        display={'flex'}
        justifyContent={'center'}
        position={'relative'}
        alignItems={'center'}
        bgcolor={'rgba(0, 0, 0, 0.4)'}>
        <Image
          src={'/icons/play-video.svg'}
          alt={item?.name}
          width={30}
          height={30}
          quality={80}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 999,
          }}
        />
        {!!thumbnail ? (
          <Image
            src={`${cdn_url}${thumbnail}` || '/images/default-memory-image.svg'}
            alt={item?.name}
            fill
            sizes='100%'
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.25rem' }}
            quality={80}
            priority
          />
        ) : (
          <VideoPlayer
            containerHeight={'7rem'}
            height={'6.8125rem'}
            isSelected={elementSelected === item}
            disabledVideo
            config={{
              youtube: {
                playerVars: { showinfo: 0 },
              },
            }}
            url={`${cdn_url}${item}` || ''}
          />
        )}
      </Box>
    </Grid>
  );
};

export default VideoItem;
