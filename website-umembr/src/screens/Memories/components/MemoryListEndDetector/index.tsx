import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

const MemoryListEndDetector: React.FC<{
  y: number;
  visibilityOffset: number;
  onVisible?: Parameters<typeof useIntersectionObserver>[1];
}> = (props) => {
  const { y, visibilityOffset, onVisible = () => {} } = props;
  const ref = useRef<HTMLDivElement>(null);
  useIntersectionObserver(ref, onVisible, `${visibilityOffset}px`);
  return (
    <div
      ref={ref}
      style={{
        height: '1px',
        width: '100%',
        background: 'transparent',
        position: 'absolute',
        top: y,
        left: 0,
      }}
    />
  );
};

export default MemoryListEndDetector;
