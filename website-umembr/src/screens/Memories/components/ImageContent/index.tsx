import { palette } from '@/theme/constants';
import Image from 'next/image';
import { Box, Grid, Stack, Theme, useMediaQuery } from '@mui/material';

import { useState } from 'react';
import ImageItem from './ImageItem';
import { UseFirstRender } from '@/hooks';
import { cdn_url } from '@/utils';

export const ImageContent = ({ mediaData, boxRef }: any) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [elementSelected, setElementSelected] = useState<any>();

  UseFirstRender(() => {
    if (mediaData)
      setElementSelected({ name: mediaData[0]?.split('/').pop(), url: `${cdn_url}${mediaData[0]}` });
  }, [mediaData]);

  return (
    <Box height={'calc(100% - 3.2rem)'} overflow={'auto'} ref={boxRef}>
      <Box
        borderRadius={'1.25rem'}
        border={`2px solid ${palette.primary}`}
        width={'100%'}
        position={'relative'}
        height={isMobile ? '29vh' : '22rem'}
        maxHeight={isMobile ? '29vh' : '22rem'}
        marginTop={'1.5rem'}>
        {!!elementSelected?.url && (
          <Image
            src={elementSelected?.url || ''}
            alt={elementSelected?.name}
            fill
            sizes='100%'
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.15rem' }}
            quality={80}
          />
        )}
      </Box>
      <Box marginTop={'1rem'}>
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
                return (
                  <ImageItem
                    key={index}
                    item={item}
                    name={item?.split('/').pop()}
                    elementSelected={elementSelected}
                    setElementSelected={setElementSelected}
                  />
                );
              })}
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
