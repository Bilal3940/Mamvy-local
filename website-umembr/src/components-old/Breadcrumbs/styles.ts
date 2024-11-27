import { palette } from '@/theme/constants';

export const styles = {
  separator: {
    display: 'flex',
    '.MuiBreadcrumbs-separator': {
      color: palette.white,
      fontWeight: 500,
      fontSize: '1.25rem',
    },
  },
  title: {
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflowWrap: 'anywhere',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    transition: 'all 0.5s',
    textDecoration: 'none',
    maxWidth: '25ch',
  },
};
