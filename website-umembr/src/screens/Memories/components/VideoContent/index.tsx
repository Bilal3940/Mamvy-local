import { Box, Grid, Stack, Theme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { VideoPlayer } from '@/components';
import { UseFirstRender } from '@/hooks';
import VideoItem from './VideoItem';
import { cdn_url } from '@/utils';

export const VideoContent = ({ mediaData, boxRef }: any) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [elementSelected, setElementSelected] = useState<any>();

  const handleSelectVideo = (e: any, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    setElementSelected(item);
  };

  UseFirstRender(() => {
    if (mediaData) {
      const formatMediaData = typeof mediaData[0] === 'string' ? mediaData[0] : mediaData[0].video;
      setElementSelected({ name: formatMediaData?.split('/').pop(), url: `${cdn_url}${formatMediaData}` });
    }
  }, [mediaData]);
  return (
    <Box height={'calc(100% - 3.2rem)'} ref={boxRef}>
      <Box marginTop={'1.5rem'}>
        <VideoPlayer
          url={elementSelected?.url}
          containerHeight={isMobile ? '15rem' : '22rem'}
          height={isMobile ? '14.8125rem' : '21.8125rem'}
        />
      </Box>

      <Stack
        sx={{
          height: { xs: '100%' },
          width: { xs: '100%' },
          overflow: 'hidden',
        }}>
        <Stack
          direction='column'
          alignItems={'center'}
          justifyContent={'flex-start'}
          sx={{ overflowY: 'auto', width: '100%', height: '30vh', position: 'relative' }}>
          <Grid container marginTop={'1rem'} gap={isMobile ? 1 : 3} display={'flex'} flexWrap={'wrap'}>
            {mediaData?.map((item: any, index: number) => {
              const formatItem = typeof item === 'string' ? item : item.video;
              return (
                <VideoItem
                  key={index}
                  thumbnail={typeof item === 'string' ? null : item.thumb}
                  item={formatItem}
                  name={formatItem?.split('/').pop()}
                  elementSelected={elementSelected}
                  handleSelectVideo={handleSelectVideo}
                />
              );
            })}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
};
