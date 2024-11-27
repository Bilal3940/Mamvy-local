import { Box, Stack } from '@mui/material';

import AudioItem from './AudioItem';

export const AudioContent = ({ mediaData, boxRef }: any) => {
  return (
    <Box flexDirection={'column'} sx={{ overflowY: 'auto' }} height={'calc(100% - 3.2rem)'} ref={boxRef}>
      <Stack
        sx={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}>
        <Stack
          direction='column'
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          sx={{ overflowY: 'auto', width: '100%', height: '60vh', position: 'relative' }}>
          {mediaData?.map((item: any, index: number) => {
            return (
              <Box key={index} width={'100%'} display={'flex'}>
                <AudioItem item={item} index={index} />{' '}
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
