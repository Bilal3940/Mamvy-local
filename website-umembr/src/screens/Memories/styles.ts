import { palette } from '@/theme/constants';

export const styles = (isMobile?: boolean) => ({
  iconContainer: {
    width: isMobile ? '1.8125rem' : '3rem',
    height: isMobile ? '1.8125rem' : '3rem',
    backgroundColor: palette.lightCardBackground,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '1.25rem',
    margin: '0 auto',
  },

  circle: {
    top: '-9999px',
    left: '-9999px',
  },
  text: {
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflowWrap: 'anywhere',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  title: {
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflowWrap: 'anywhere',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    transition: 'all 0.5s',
  },
});
