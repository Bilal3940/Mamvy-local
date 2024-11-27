import { palette } from '@/theme/constants';

export const styles = {
  input: {
    width: '17rem',
    backgroundColor: palette.primary,
    color: palette.white,
    borderRadius: '6.25rem',
    marginRight: '1rem',
    '& .MuiOutlinedInput-root': {
      borderRadius: '6.25rem',
    },
    '& .MuiOutlinedInput-input': {
      borderRadius: '6.25rem',
      color: palette.white,
      '::placeholder': {
        color: palette.white,
        opacity: 1,
      },
    },
  },
  container: {
    '&:first-of-type': { marginLeft: '0' },
    '&:last-child': { marginRight: '0' },
  },
  scrollableContainer: {
    overflowX: 'auto',
  },
  imageContainer: {
    cursor: 'pointer',
    // border: `0.375rem solid ${palette.primary}`,
    '&:hover': {
      outline: `0.375rem solid ${palette.white}`,
    },
  },
  title: {
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflowWrap: 'anywhere',
    WebkitLineClamp: 1,
    maxWidth: '22ch',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
};
