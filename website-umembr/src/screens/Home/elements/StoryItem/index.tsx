import { Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { styles } from '../../styles';
import { palette } from '@/theme/constants';
import { cdn_url } from '@/utils';
import React, { memo } from 'react';
import { PrivateStoryModal } from '@/screens/Memories/components/PrivateStoryModal';
import LockIcon from '@/components/LockIcon';

const StoryItem: FC<any> = memo(({ isMobile, item, handleItemClick, isResult, privateStatus, handlePublication }) => {
  return (
    <>
      {item.private && (
        <PrivateStoryModal
          open={privateStatus}
          onClose={handlePublication}
          item={item} /*confirmMethod={confirmMethod}*/
        />
      )}
      <Grid
        item
        key={item.id}
        display={'flex'}
        sx={styles.container}
        padding={isMobile ? '0.5rem 0' : '1rem 0'}
        flexDirection={'column'}>
        
        <Grid
          item
          xs={1}
          borderRadius={'0.75rem'}
          sx={styles.imageContainer}
          bgcolor={palette.primary}
          minHeight={isMobile ? '10.313rem' : '13.313rem'}
          minWidth={isMobile ? '13.813rem' : isResult ? '22.4rem' : '23.625rem'}
          maxHeight={isMobile ? '10.313rem' : '13.313rem'}
          maxWidth={isMobile ? '13.813rem' : isResult ? '22.4rem' : '23.625rem'}
          position={'relative'}
          onClick={() => handleItemClick(item)}>
          
          {item?.cover_image && (
            <Image
              src={`${cdn_url}${item?.cover_image}` || ''}
              alt={`${item?.title}`}
              fill
              sizes='100%'
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: ' 0.75rem' }}
              loading={isMobile ? 'lazy' : 'eager'}
              priority={!isMobile}
            />
          )}

          {item.private && (
            <LockIcon isMobile={isMobile} />
          )}
        </Grid>

        {/* Title and private label in flex layout */}
        <Box display="flex" alignItems="center" margin={!isMobile ? '0.5rem 0.60rem 0  0.60rem ' : '0.5rem 0.60rem 0 0.60rem'}>
          <Typography variant={isMobile ? 'h5' : 'h4'} sx={styles.title}>
            {item?.title}
          </Typography>
        </Box>
      </Grid>
    </>
  );
});

export default StoryItem;

StoryItem.displayName = 'StoryItem';
