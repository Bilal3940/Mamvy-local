import { Box, Grid, IconButton, styled, Theme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';
import { styles } from '../../styles';

import Link from 'next/link';
import MediaItem from '../MediaItem';
import { useSelector } from 'react-redux';
import { authSelector } from '@/store/selectors';

const MotionBox = motion(Grid);

const MemoryFloatingItem: FC<any> = ({ item, story, palette, position }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [isFocused, setIsFocused] = useState(false);
  const { user } = useSelector(authSelector)

  const StyledLink = useMemo(
    () =>
      styled(Link)({
        borderRadius: '50%',
        outline: `1px solid ${palette.primary}}`,
        '&:focus': {
          outline: `0.25rem solid ${palette.primary}}`,
        },
      }),
    [palette.primary],
  );

  const showIcon = (type: string) => {
    switch (type) {
      case 'image':
        return 'image';
      case 'video':
        return 'video';
      case 'audio':
        return 'microphone';

      case 'text':
        return 'text';
      default:
        return 'image';
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const boxSize = isMobile ? 140 : 160;

  return (
    <StyledLink
      href={`/app/story/${story?.url}/?memoryId=${item?.id}`}
      style={{
        outline: isFocused
          ? !user?.viewMemories?.includes(item?.id)
            ? `0.25rem solid ${palette.primary}`
            : `0.0625rem solid ${palette.primary}`
          : !user?.viewMemories?.includes(item?.id)
            ? `0.25rem solid ${palette.primary}`
            : 'none',
        position: 'absolute',
        top: position.y - boxSize / 2 || 0,
        left: position.x - boxSize / 2 || 0,
        width: boxSize,
        height: boxSize,
      }}>
      <MotionBox
        item
        borderRadius={'50%'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          display: 'inline-block',
          borderRadius: '50%',
          transition: 'all 0.5s',
          textDecoration: 'none',
          '&:hover': {
            outline: `0.25rem solid ${palette.primary}`,
          },
          '&:focus': {
            outline: `0.25rem solid ${palette.primary}`,
          },
        }}
        id={'circle'}
        width={boxSize}
        height={boxSize}
        overflow={'hidden'}
        bgcolor={palette.lightCardBackground}
        // animate={['initial']}
        // whileHover={['grow']}
        variants={{
          grow: {
            scale: 1.1,
          },
          // initial: {
          //   y: [-20, 20],
          //   rotate: 0,
          //   transition: {
          //     delay: 0.2,
          //     duration: 2,
          //     repeat: Infinity,
          //     repeatType: 'reverse',
          //   },
          // },
        }}>
        <Box
          style={{
            borderRadius: '62.5rem 62.5rem 37.5rem 37.5rem',
            width: isMobile ? 140 : '160px',
            height: isMobile ? 104 : '124px',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: palette?.gray,
          }}>
          {/* <MediaItem {...item} isMobile={isMobile} palette={palette} /> */}
        </Box>

        <IconButton sx={{ ...styles(isMobile).iconContainer, outline: 'none' }} disableRipple tabIndex={-1}>
          <Image
            src={`/icons/${showIcon(item?.type)}-blue.svg`}
            alt={item?.type}
            width={isMobile ? 14 : 25}
            height={isMobile ? 14 : 25}
            quality={80}
          />
        </IconButton>
      </MotionBox>
    </StyledLink>
  );
};

export default MemoryFloatingItem;
