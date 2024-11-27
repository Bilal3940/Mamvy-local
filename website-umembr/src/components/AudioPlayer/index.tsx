import React, { useEffect, useState } from 'react';
import { Box, Theme, Typography, useMediaQuery, CircularProgress } from '@mui/material';
import { MuiIconButton } from '@/components';
import Wavesurfer from '@wavesurfer/react';
import { palette } from '@/theme/constants';
import { styles } from './styles';

export const AudioPlayer = ({ audioData, index, name }: any) => {
  const [playing, setPlaying] = useState(false);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [wavesurfer, setWavesurfer]: any = useState(null);

  const handleTogglePlay = () => {
    setPlaying(!playing);
    wavesurfer && wavesurfer?.playPause();
  };

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setPlaying(false);
  };

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on('seek', (position: any) => {
        if (position < 0) {
          wavesurfer.seekTo(0);
        }
      });
    }
  }, [wavesurfer]);

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      margin={'1rem 0'}
      width={'100%'}
      paddingRight={'0.5rem'}
      flexDirection={isMobile ? 'column' : 'row'}>
      <Box display={'flex'} flexDirection={isMobile ? 'row' : 'column'} marginBottom={isMobile ? '0.5rem' : '0'}>
     
        <Typography variant='body2' sx={styles.audioText} color={palette.white}>
          {name}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        bgcolor={palette.primary}
        borderRadius={'6.25rem'}
        height={'2.4375rem'}
        width={isMobile ? '100%' : '80%'}
        justifyContent={'space-between'}
        position={'relative'}
        alignItems={'center'}
        padding={'0.25rem 0.625rem 0.25rem 0.25rem'}>
        <MuiIconButton
          icon='/icons/audio-play'
          altIcon='play'
          background={palette.white}
          disableRipple
          width={34}
          height={34}
          iconHeight={34}
          iconWidth={34}
          method={handleTogglePlay}
        />
        {!wavesurfer && (
          <Box display='flex' position={'absolute'} justifyContent='center' alignItems='center' width={'100%'}>
            <CircularProgress sx={{ color: palette.white }} variant='indeterminate' thickness={4} size={24} />
          </Box>
        )}
        <Box width={'100%'}>
          <Wavesurfer
            waveColor={palette.white}
            barWidth={2}
            barGap={2}
            barRadius={3}
            height={30}
            cursorColor={palette.white}
            progressColor={palette.primary}
            url={audioData}
            onReady={onReady}
            onPlay={() => setPlaying(true)}
            backend='WebAudio'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AudioPlayer;
