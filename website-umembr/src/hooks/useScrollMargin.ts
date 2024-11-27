import { useState, useEffect } from 'react';

const UseScrollMargin = (ref: any) => {
  const [scrollMargin, setScrollMargin] = useState('1.25rem');

  useEffect(() => {
    const checkScroll = () => {
      if (ref?.current) {
        const hasScrolledHorizontally = ref?.current?.scrollLeft > 0;
        setScrollMargin(hasScrolledHorizontally ? 'initial' : '1.25rem');
      }
    };

    const currentRef = ref.current;
    currentRef?.addEventListener('scroll', checkScroll);

    return () => currentRef?.removeEventListener('scroll', checkScroll);
  }, [ref]);

  return scrollMargin;
};
export default UseScrollMargin;
