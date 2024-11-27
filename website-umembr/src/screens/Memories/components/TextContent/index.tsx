import { RtfComponent } from '@/components';
import { palette } from '@/theme/constants';
import { Box } from '@mui/material';

export const TextContent = ({ mediaData, boxRef }: any) => {
  return (
    <Box flexDirection={'column'} ref={boxRef} height={'calc(100% - 3.2rem)'}>
      <Box height={'100%'} sx={{ overflowY: 'auto' }}>
        <Box
          minHeight={'6.25rem'}
          bgcolor={palette.cardBackground}
          sx={{ backdropFilter: 'blur(1.5625rem)' }}
          border={`0.063rem solid ${palette.cardBorder}`}
          margin={'1rem 0'}
          borderRadius={'1.25rem'}
          padding={'1rem 1.1875rem'}>
          <RtfComponent rtf={mediaData} label={'p'} />
        </Box>
      </Box>
    </Box>
  );
};
