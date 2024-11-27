import { setMediaScreenType, setMediaType } from '@/store/actions';
import { memorySelector } from '@/store/selectors';
import { palette } from '@/theme/constants';
import { Box, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemoryItem from './MemoryItem';

export const MemoriesList: FC<any> = ({ setDefaultItem, prompt }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isMobileLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const { mediaType, memoriesLoaded } = useSelector(memorySelector);

  const isMultipleOfFour = memoriesLoaded?.length % 4 === 0;

  const mediaTypes = [
    { icon: 'video', value: 0, label: 'add_video_memory'  },
    { icon: 'audio', value: 1, label: 'add_audio_memory' },
    { icon: 'image', value: 2, label: 'add_image_memory' },
    { icon: 'text', value: 3, label: 'add_text_memory'},
  ];
  

  const editMemory = (item: any) => {
    dispatch(setMediaScreenType('form'));
    setDefaultItem(item);
    
    dispatch(setMediaType(item?.type));
  };

  const showForm = (mediaType: string) => {
    dispatch(setMediaType(mediaType));
    dispatch(setMediaScreenType('form'));
  };

  const filterMemories = useMemo(() => {
    return memoriesLoaded?.filter((item: any) => item?.prompt == prompt)?.sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  }, [memoriesLoaded, prompt]);

  const chnageGridDistribution = () => {
    if (isMobileLg) return 2;
    if (isMobile) return 1;
    return 4;
  };

  const chnageGridMediaButtonsDistribution = () => {
    if (isMobileLg) return 12;
    if (isMobile) return 12;
    return 5.9;
  };
  // const handleOnClick = (mediaType:string , icon:string)=>{
  //   localStorage.setItem('selectMedia',icon);
  //   showForm(mediaType);

  // }
  return (
    <>
      <Grid container gap={1} display={'flex'} justifyContent={'center'}>
        {mediaTypes.map((item: any, index: number) => (
          <Grid key={`${item.label} + ${index}`} item xs={chnageGridMediaButtonsDistribution()}>
            <Box
              width={'100%'}
              height={'100%'}
              borderRadius={'0.5rem'}
              padding={'0.25rem 0.5rem'}
              bgcolor={palette.cardBackground}
              border={`0.0625rem solid ${item.icon == mediaType ? palette.primary : palette.cardBorder}`}
              display={'flex'}
              onClick={() =>  showForm(item.icon)}
              sx={{ cursor: 'pointer' }}
              justifyContent={'flex-start'}
              alignItems={'center'}>
              <Box
                borderRadius={'0.375rem'}
                bgcolor={palette.background}
                display={'flex'}
                padding={'0.25rem'}
                justifyContent={'center'}
                alignItems={'center'}
                marginRight={'1rem'}>
                <Image src={`/icons/${item.icon}.svg`} alt={item.icon} width={24} height={24} quality={80} />
              </Box>
              <Typography variant='subtitle2' color={palette.white}>
                {t(item.label)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{ gridTemplateColumns: `repeat(${chnageGridDistribution()}, 1fr)` }}
        marginTop={'1rem'}
        width={'100%'}
        rowGap={2}
        columnGap={1.5}
        flexDirection={isMobile ? 'column' : 'row'}
        display={isMobile ? 'flex' : 'grid'}
        justifyContent={isMultipleOfFour ? 'space-between' : 'flex-start'}>
        {filterMemories?.map((item: any, index: number) => {
          return <MemoryItem key={index} index={index} item={item} editMemory={editMemory} palette={palette} />;
        })}
      </Box>
    </>
  );
};
