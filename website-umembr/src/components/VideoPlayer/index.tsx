import { palette } from '@/theme/constants';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { MuiIconButton } from '@/components';
import style from './styles.module.scss';
export const VideoPlayer = ({
  url,
  containerHeight = '22rem',
  height = '21.8125rem',
  disabledVideo,
  borderRadius = '1.25rem',
  isSelected,
  cover
}: any) => {
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showHover, setShowHover] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const playerRef: any = useRef(null);
  const [seeking, setSeeking] = useState<boolean>(false);

  const playMedia = (event: any) => {
    if (event?.target?.alt === 'pause') return setPlaying(true);

    if (event?.target?.localName === 'video') return setPlaying(true);
  };

  const pauseMedia = () => {
    setPlaying(false);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    if (!seeking) {
      setPlayedSeconds(progress.playedSeconds);
    }
  };

  const restartVideo = () => {
    playerRef?.current?.seekTo(0);
    setPlaying(true);
  };

  const pad = (num: number, size: number): string => num.toString().padStart(size, '0');

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(secondsLeft, 2)}`;
    } else {
      return `${pad(minutes, 2)}:${pad(secondsLeft, 2)}`;
    }
  };

  const hideControls = () => {
    setTimeout(() => setShowHover(false), 200);
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - boundingRect.left;
    const newPosition = (clickPosition / boundingRect.width) * duration;
    playerRef.current.seekTo(newPosition);
    setPlayedSeconds(newPosition);
  };

  const skipBackward = () => {
    const newTime = Math.max(0, playedSeconds - 10);
    playerRef.current.seekTo(newTime);
    setPlayedSeconds(newTime);
    setPlaying(true);
  };

  const skipForward = () => {
    const newTime = Math.min(playedSeconds + 10, duration);
    playerRef.current.seekTo(newTime);
    setPlayedSeconds(newTime);
    setPlaying(true);
  };

  return (
    <Box
      borderRadius={borderRadius}
      data-cy={'video-player'}
      border={isSelected ? `2px solid ${palette.primary}` : 'none'}
      width={'100%'}
      position={'relative'}
      onClick={(event) => (!disabledVideo ? (playing ? pauseMedia() : playMedia(event)) : null)}
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => hideControls()}
      sx={{ cursor: 'pointer' }}
      maxHeight={containerHeight}
      height={containerHeight}>
      <Box height={containerHeight}>
        <ReactPlayer
          width={'100%'}
          ref={playerRef}
          onClickPreview={() => (!disabledVideo ? playMedia(event) : null)}
          playing={playing}
          controls={false}
          onStart={() => setShowControls(true)}
          onDuration={handleDuration}
          onProgress={handleProgress}
          height={height}
          className={cover ? style._player : ''}
          style={{
            borderRadius: '1.25rem',
            overflow: 'hidden',
          }}
          
          url={url}
        />
      </Box>
      {showControls && showHover && (
        <Box
          display={'flex'}
          position={'absolute'}
          paddingTop={'0.5rem'}
          bgcolor={palette.backgroundOpacity}
          bottom={'0.5rem'}
          left={0}
          right={0}
          flexDirection={'column'}>
          <Box
            width={'100%'}
            padding={'0 1rem'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Box width={'10%'}>
              <Typography variant='subtitle2'>{formatTime(playedSeconds)}</Typography>
            </Box>
            <Box width={'80%'} margin={'0 auto'}>
              <LinearProgress
                variant='determinate'
                onClick={handleSeek}
                sx={{ height: '0.5rem' }}
                value={(playedSeconds / duration) * 100}
                color='secondary'
              />
            </Box>
            <Box width={'10%'}>
              <Typography variant='subtitle2' textAlign={'right'}>
                {formatTime(duration)}
              </Typography>
            </Box>
          </Box>
          <Box
            display={'flex'}
            margin={'1rem auto 0 auto'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'50%'}>
            <MuiIconButton
              icon='/icons/restart'
              altIcon='restart'
              background={'transparent'}
              iconHeight={20}
              iconWidth={20}
              method={() => restartVideo()}
            />

            <MuiIconButton
              icon='/icons/play-track-left'
              altIcon='play-track-left'
              background={'transparent'}
              iconHeight={20}
              iconWidth={20}
              method={() => skipBackward()}
            />
            <MuiIconButton
              icon={!playing ? '/icons/play' : '/icons/pause'}
              altIcon='pause'
              background={'transparent'}
              iconHeight={38}
              iconWidth={38}
              method={(event) => (playing ? pauseMedia() : playMedia(event))}
            />

            <MuiIconButton
              icon='/icons/play-track-right'
              altIcon='play-track-right'
              background={'transparent'}
              iconHeight={20}
              iconWidth={20}
              method={() => skipForward()}
            />
            <Box width={32} height={32} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
