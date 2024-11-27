'use client';
import useBubblePaginator from '@/hooks/useBubblePaginator';
import { currentStorySelector } from '@/store/selectors';
import { palette } from '@/theme/constants';
import { Box } from '@mui/material';
import { forwardRef, memo, useImperativeHandle } from 'react';
import MemoryFloatingItem from '../MemoryFloatingItem';
import MemoryListEndDetector from '../MemoryListEndDetector';

export interface FloatingMemoriesHandle {
  removeBubble: (memoryId: string) => void;
  getMemories: () => readonly { readonly [key: string]: any }[];
}
export interface FloatingMemoriesProps {
  story: ReturnType<typeof currentStorySelector>;
  confirmPassword?: any;
  user?: any;
}
const FloatingMemories = forwardRef<FloatingMemoriesHandle, FloatingMemoriesProps>(function FloatingMemories(
  props,
  ref,
) {
  const { story, user, confirmPassword } = props;
  const {
    boxMargin,
    next,
    mergedData,
    contentContainerHeight: height,
    circleDiameter,
    setMergedData,
    mergedDataRef,
  } = useBubblePaginator(story?.id, story, user, confirmPassword);
  useImperativeHandle(ref, () => ({
    removeBubble: (memoryId) => {
      setMergedData((prev) => prev.filter((item) => item?.id !== memoryId));
    },
    getMemories: () => mergedDataRef.current,
  }));

  return (
    <Box
      height={height}
      id='memories'
      display={'flex'}
      position={'relative'}
      justifyContent={'center'}
      alignItems={'center'}
      marginTop={boxMargin}
      marginBottom={'2rem'}
      width={'100%'}>
      {mergedData?.map((item) => {
        return <MemoryFloatingItem key={item?.id} item={item} position={item} palette={palette} story={story} />;
      })}
      <MemoryListEndDetector y={height ?? 0} visibilityOffset={circleDiameter} onVisible={next} />
    </Box>
  );
});

export default memo(FloatingMemories);
