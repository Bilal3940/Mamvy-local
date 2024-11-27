import { MuiButton, VideoPlayer } from '@/components';
import { UseFirstRender, UseIntermitence } from '@/hooks';
import { getSignedUrl, removeMemory } from '@/store/actions';
import { authSelector, intermitenceSelector, storySelector } from '@/store/selectors';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteModal } from '../DeleteModal';
import { cdn_url, checkPermissions } from '@/utils';
// import { storageEventEmitter } from '@/hooks/StorageEventEmitter';

const MemoryItem: FC<any> = ({ item, palette }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const { story } = useSelector(storySelector);
  const { user } = useSelector(authSelector);
  const { loading } = useSelector(intermitenceSelector);
  const { status: deleteStatus, switchStatus: switchDelete } = UseIntermitence();
  const [memorySelectedId, setMemorySelectedId] = useState('');

  UseFirstRender(() => {
    if ((item?.asset || item?.preview_asset) && (item?.type === 'image' || item?.type === 'video')) {
      dispatch(
        getSignedUrl({ file: item?.preview_asset || item?.asset }, async (res: any) => {
          if (res?.value?.url) setImageUrl(res?.value?.url?.downloadUrl);
        }),
      );
    }
  }, [item]);

  const openModal = (id: string) => {
    switchDelete();
    setMemorySelectedId(id);
  };

  const deleteMemory = () => {
    dispatch(removeMemory({ id: memorySelectedId, story_id: story?.id }));
    switchDelete();
    setMemorySelectedId('');
    window.location.reload();
  };

  const showMediaImage = () => {
    // let type = item?.type.split('/')[0];

    switch (item?.type) {
      case 'image':
        return imageUrl || '';
      case 'video':
        return imageUrl || '';
      case 'audio':
        return '/images/music.png';
      case 'text':
        return '/images/rich-text.png';
      default:
        return '/images/default-memory-image.png';
    }
  };

  return (
    <>
      <Box
        borderRadius={'0.5625rem'}
        display={'flex'}
        flexDirection={'column'}
        padding={'0.625rem'}
        justifyContent={'flex-start'}
        position={'relative'}
        bgcolor={palette.cardBackground}
        border={`0.063rem solid ${palette.cardBorder}`}
        sx={{ backdropFilter: 'blur(1.5625rem)' }}>
        <Box position={'relative'} width={'100%'} height={'7.5rem'} marginBottom={'0.5rem'}>
          {item?.type === 'video' && !item?.preview_asset ? (
            <VideoPlayer url={imageUrl} width={'100%'} height={'7.5rem'} disabledVideo borderRadius={'0.5625rem'} />
          ) : (
            !!showMediaImage() && (
              <Image
                src={`${showMediaImage()}`}
                alt={'Uploaded image'}
                fill
                priority
                sizes='100%'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.5625rem',
                  border: '0px',
                }}
                quality={80}
              />
            )
          )}
        </Box>

        <Typography fontSize={'1.125rem'} fontWeight={'600'}>
          {item?.title}
        </Typography>
        <Typography variant='body2' marginTop={'0.5rem'} fontWeight={'600'}>
          {item?.content}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginTop={'1rem'}>
          <Box margin={'0 0.25rem 0 0'} width={'5.5rem'}>
            <Link href={`/app/story/${story?.url}/?memoryId=${item?.id}`}>
              <MuiButton type='button' disabled={false} loading={false} variant={'outlined'}>
                <Typography variant='button' color={palette.white}>
                  {t('preview')}
                </Typography>
              </MuiButton>
            </Link>
          </Box>
          <Box margin={'0 0.25rem'} width={'5rem'}>
            {checkPermissions(user?.roles || [], 'CLIENT_MEMORY_DELETE', story?.id) &&
              (user?.id === item?.user_id ||
                user?.roles?.find((role: any) => role.story_id === story?.id && role.role.name === 'Story_Owner')) && (
                <MuiButton
                  type='button'
                  disabled={loading}
                  loading={loading}
                  variant={'outlined'}
                  method={() => openModal(item?.id)}>
                  <Typography variant='button' color={palette.white}>
                    {t('delete')}
                  </Typography>
                </MuiButton>
              )}
          </Box>
          <Box margin='0 0 0 0.25rem' width='5rem'>
            {(user?.id === item?.user_id || user?.roles?.some((role: any) => role.role.name === 'Story_Owner')) && (
              <Link href={`/app/story/${story?.url}/memory/create?memoryId=${item?.id}`}>
                <MuiButton type='button' disabled={loading} loading={false} variant='contained'>
                  <Typography variant='button'>{t('edit_mayus')}</Typography>
                </MuiButton>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
      <DeleteModal open={deleteStatus} onClose={switchDelete} confirmMethod={deleteMemory} />
    </>
  );
};

export default MemoryItem;
