import { VideoPlayer } from '@/components';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { styles } from '../../styles';

import { cdn_url } from '@/utils';

interface IMediaItem {
  preview_asset?: string;
  asset: string;
  title: string;
  type: string;
  description: string;
}
const showMediaCover = (type: string, item?: IMediaItem) => {
  switch (type) {
    case 'audio':
      return '/images/sound-wave.svg';

    default:
      return `${cdn_url}${item?.preview_asset ?? item?.asset}`;
  }
};

interface VideoItemProps extends IMediaItem {}
const VideoItem: FC<VideoItemProps> = (props) => {
  return props.preview_asset ? (
    <ImageItem {...props} />
  ) : (
    <VideoPlayer url={showMediaCover(props.type, props)} width={'100%'} height={'100%'} containerHeight={'100%'} cover={true} disabledVideo />
  );
};

interface TextItemProps extends IMediaItem {
  isMobile: boolean;
  palette: { [key: string]: string };
}
const TextItem: FC<TextItemProps> = (props) => {
  const { palette, description, isMobile } = props;
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} padding={'2rem'}>
      <Typography textAlign={'center'} variant='body2' sx={styles(isMobile).text} color={palette.white}>
        {description}
      </Typography>
    </Box>
  );
};

interface ImageItemProps extends IMediaItem {}

const ImageItem: FC<ImageItemProps> = (props) => {
  const mediaSrc = showMediaCover(props.type, props);
  return (
    mediaSrc && (
      <Image
        src={mediaSrc || '/images/default-memory-image.png'}
        alt={props?.title}
        fill
        sizes='100%'
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        quality={80}
        priority={true}
      />
    )
  );
};

interface MediaItemProps extends IMediaItem {
  isMobile: boolean;
  palette: { [key: string]: string };
}
const MediaItem: FC<MediaItemProps> = (props) => {
  const { isMobile, palette, ...item } = props;
  const { type } = item;
  switch (type) {
    case 'video':
      return <VideoItem {...item} />;
    case 'text':
      return <TextItem {...item} isMobile={isMobile} palette={palette} />;
    case 'image':
    case 'audio':

    default:
      return <ImageItem {...item} />;
  }
};

export default MediaItem;
