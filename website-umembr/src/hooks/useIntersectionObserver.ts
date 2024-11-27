import { useEffect } from "react";

function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  rootMargin?: IntersectionObserverInit['rootMargin'],
  threshold?: IntersectionObserverInit['threshold'],
) {
  useEffect(() => {
    const current = ref.current;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) callback() }, { rootMargin, threshold });
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [rootMargin, threshold, ref, callback]);
}

export default useIntersectionObserver;
