import { palette } from '@/theme/constants';

export const styles = (isMobile: boolean) => ({
  dropDown: {
    width: !isMobile ? '25rem' : '20rem',
  },
  list: {
    background: palette.cardBackground,
    border: `0.063rem solid ${palette.cardBorder}`,
    backdropFilter: 'blur(1.5625rem)',
    borderRadius: '0.5rem',
  },

  item: {
    padding: '0 1rem',
  },
  divider: {
    border: `0.063rem solid ${palette.gray}`,
    marginBottom: '1rem',
    width: '100%',
  },
  content: {
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflowWrap: 'anywhere',
    WebkitLineClamp: !isMobile ? 2 : 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    height: isMobile? '100%': 'auto',
  },
  buttons: {
    width: !isMobile ? '9.875rem' : '7rem',
    minWidth: isMobile? '6.25rem': 'auto',
    height: '2.625rem',
    margin: '1rem 0.5rem',
  },
  container: {
    minHeight: isMobile? '9.375rem' : 'auto',
  },
  subContainer:{
    height: isMobile? '100%': 'auto',
  }
});
