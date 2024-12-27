import { palette } from '@/theme/constants';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card, MuiButton } from '@/components';
import { useEffect, useState } from 'react';
import { setCreateMemoryStep, setMediaType } from '@/store/actions';
import Image from 'next/image';
import { collaboratorSelector, memorySelector } from '@/store/selectors';
import { styles } from './styles';

const memoryTypes = [
  { text: 'Add a text memory', value: 0, url: 'text',urlBlue: 'text-blue', extraText: 'add_text' , label:'text', mediaSlct:'text'},
  { text: 'Add a video memory', value: 1, url: 'video', urlBlue: 'media-blue', extraText: 'add_video' , label:'video',mediaSlct:'video'},
  { text: 'Add an image memory', value: 2, url: 'image', urlBlue: 'image-blue', extraText: 'add_image' ,  label:'image',mediaSlct:'image'},
  { text: 'Add an audio memory', value: 3, url: 'audio', urlBlue: 'audio-blue', extraText: 'add_audio', label:'audio' ,mediaSlct:'audio'},
];

export const TypeMemory = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [actualMemory, setActualMemory] = useState(0);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const memoriesData = useSelector(memorySelector);
  const collaborator = useSelector(collaboratorSelector);

  const setStory = (item: any) => {
    setActualMemory(item?.value);
  };

  useEffect(() => {
    setStory(memoryTypes[0]);
  }, []);
 const handleOnClick= (s :string)=>{
  localStorage.setItem('selectMedia', s);
 };
  const goToTypeMemory = () => {
    dispatch(setCreateMemoryStep(memoriesData?.createMemoryStep + 1));
    dispatch(setMediaType(memoryTypes[actualMemory].label));
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={isMobile ? '100%' : '85%'}
      paddingBottom={isMobile ? '0.5rem' : 0}
      justifyContent={'center'}
      alignItems={'center'}
      zIndex={0}
      margin={'1.5rem auto 0 auto'}>
      {collaborator?.guest ? (
        <>
          <Typography
            variant={isMobile ? 'body2' : 'h3'}
            color={palette.white}
            textAlign={'center'}
            marginBottom={'1rem'}>
            {t('umembr_allows')}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant={isMobile ? 'h4' : 'h3'} color={palette.white} textAlign={'center'} marginBottom={'1rem'}>
            {t('congrats')}
          </Typography>
          <Typography variant={isMobile ? 'h6' : 'h4'} width={'80%'} textAlign={'center'} color={palette.white}>
            {t('choose_memory')}
          </Typography>
        </>
      )}
      <Box
        marginTop={'1rem'}
        justifyContent={'space-between'}
        display={'grid'}
        width={'100%'}
        maxWidth={'67.75rem'}
        sx={isMobile ? styles.container : styles.containerDesktop}
        gap={'1rem'}>
        {memoryTypes?.map((item: any, index: number) => {
          return (
            <Card
              key={`${item.text} + ${index}`}
              backgroundImageColor={actualMemory == index ? palette.primary : palette.lightCardBackground}
              text={item?.text}
              isSelected={actualMemory == index}
              method={() => {
                setStory(item);
                handleOnClick(item.mediaSlct);
              }}
              extraText={item?.extraText}
              >
              <Image
                src={`/icons/${actualMemory == index ? item.url : item.urlBlue}.svg`}
                alt={item.text}
                width={90}
                height={90}
                quality={80}
              />
            </Card>
          );
        })}
      </Box>
      {collaborator?.guest && (
        <Typography paddingTop={'3.8125rem'} variant={'h4'} width={'80%'} textAlign={'center'} color={palette.white}>
          {t('select_continue')}
        </Typography>
      )}
      <Box width={'5.75rem'} marginTop={'2rem'}>
        <MuiButton type='submit' disabled={false} loading={false} method={goToTypeMemory} variant={'contained'}>
          <Typography variant='button'>{t('continue')}</Typography>
        </MuiButton>
      </Box>
    </Box>
  );
};
