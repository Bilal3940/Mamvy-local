import { palette } from '@/theme/constants';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { Card } from '@/components';
import { useState } from 'react';
import { setCreateSection } from '@/store/actions';
import { styles } from './styles';
import Image from 'next/image';

const storyTypes = [
  { text: 'life_story', value: 0, url: 'life-story', content: 'life_story_content' },
  { text: 'classmates_story', value: 1, url: 'classmates-story', content: 'classmates_story_content' },
  { text: 'teammates_story', value: 2, url: 'teammates-story', content: 'teammates_story_content' },
  { text: 'none_of_this_story', value: 3, url: 'none-story', content: 'none_of_this_story_content' },

  
];

export const TypeStory = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [actualStory, setActualStory] = useState(-1);
  const [actualStoryContent, setActualStoryContent] = useState('');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isMobileLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const setStory = (item: any) => {
    setActualStory(item?.value);
    setActualStoryContent(item?.content);
    dispatch(setCreateSection(item?.text));
  };

  const enterHoverMethod = (index: number) => {
    setHoverIndex(index);
    setActualStoryContent(storyTypes[index]?.content);
  };

  const leaveHoverMethod = () => {
    setHoverIndex(null);
    actualStory == -1 && setActualStoryContent('');
  };

  return (
    <Box display={'flex'} flexDirection={'column'} width={'100%'} maxWidth={'70.75rem'} margin={'1.5rem auto 0 auto'}>
      <Box
        display={isMobileLg ? 'grid' : 'grid'}
        paddingBottom={isMobile ? '0.5rem' : 0}
        sx={isMobile ? styles.container : styles.containerDesktop}
        gap={'1rem'}>
        {storyTypes?.map((item: any, index: number) => {
          return (
            <Card
              key={`${item.text} + ${index}`}
              backgroundImageColor={palette.lightCardBackground}
              enterHoverMethod={() => enterHoverMethod(index)}
              leaveHoverMethod={() => leaveHoverMethod()}
              text={item?.text}
              isSelected={actualStory === index || hoverIndex === index}
              method={() => setStory(item)}>
              <Image
                src={`/images/${item.url}.png`}
                alt={item.text}
                fill
                sizes='100%'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                quality={80}
              />
            </Card>
          );
        })}
      </Box>
      <Box
        borderRadius={'1.25rem'}
        padding={'0.75rem'}
        minHeight={'9rem'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        marginTop={isMobile ? 0 : '1.5rem'}
        marginBottom={'1.5rem'}
        bgcolor={palette.lightCardBackground}>
        <Typography
          fontSize={isMobile ? 'h6' : '1rem'}
          lineHeight={'1.25rem'}
          textAlign={'center'}
          color={palette.codGray}>
          {t(actualStoryContent == '' ? 'click_on_template' : actualStoryContent)}
        </Typography>
      </Box>
    </Box>
  );
};
