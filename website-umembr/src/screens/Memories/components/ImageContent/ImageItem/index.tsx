import { palette } from '@/theme/constants';
import { cdn_url } from '@/utils';
import { Grid, Theme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

const ImageItem: FC<any> = ({color, item, name, elementSelected, setElementSelected }) => {
  const router=useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  let bgColor =    router.pathname ===   '/app/home' ? palette.primary :color;
  return (
    <Grid
      item
      position={'relative'}
      border={elementSelected?.name === name ? `0.0625rem solid ${bgColor}` : 'none'}
      borderRadius={'1.25rem'}
      xs={isMobile ? 3.8 : 3.5}
      width={isMobile ? 'inherit' : '11.0625rem'}
      sx={{ cursor: 'pointer' }}
      onClick={() => setElementSelected({ name: name, url: `${cdn_url}${item}` })}
      height={'7rem'}>
      {!!item && (
        <Image
          src={`${cdn_url}${item}` || ''}
          alt={item?.name}
          fill
          sizes='100%'
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.25rem' }}
          quality={80}
          priority
        />
      )}
    </Grid>
  );
};

export default ImageItem;
