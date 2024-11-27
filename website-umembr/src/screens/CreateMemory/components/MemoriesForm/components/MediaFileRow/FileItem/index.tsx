import { CircularProgress, Grid, IconButton, Theme, useMediaQuery } from '@mui/material';
import { FC, useMemo } from 'react';
import { styles } from '../styles';
import { VideoPlayer } from '@/components';
import Image from 'next/image';
import { palette } from '@/theme/constants';

const FileItem: FC<any> = ({ value, deleteImage, index, loading }) => {
  const showImageType = (uploadedFileBackground: File) => {
    switch (uploadedFileBackground?.type?.split('/')[0]) {
      case 'image':
        return uploadedFileBackground ? URL.createObjectURL(uploadedFileBackground) : '/images/image.png';
      case 'audio':
        return '/images/music.png';
      default:
        return uploadedFileBackground ? URL.createObjectURL(uploadedFileBackground) : '/images/image.png';
    }
  };
  const urlFile = useMemo(
    () => (value?.type?.split('/')[0] === 'video' ? (value ? URL.createObjectURL(value) : '') : showImageType(value)),
    [value],
  );

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Grid item xs={isMobile ? 5.66 : 2.15} marginTop={'1rem'} sx={styles(value).emptyItem}>
      {value ? (
        <>
          {value?.type?.split('/')[0] == 'video' ? (
            <VideoPlayer
              url={urlFile}
              width={'100%'}
              height={'7.5rem'}
              containerHeight={'7.5rem'}
              borderRadius={'0.5625rem'}
            />
          ) : (
            <Image
              src={urlFile}
              alt='Uploaded image'
              fill
              priority
              sizes='100%'
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
              quality={80}
            />
          )}

          <IconButton sx={styles(null).icon} onClick={() => deleteImage(index)}>
            <Image src={`/icons/trash.svg`} alt='delete' width={20} height={20} quality={80} />
          </IconButton>
        </>
      ) : (
        loading && <CircularProgress sx={{ color: palette.primary }} />
      )}
    </Grid>
  );
};

export default FileItem;
