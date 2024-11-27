import { palette } from '@/theme/constants';

export const styles = (isMobile: boolean) => ({
  dropDown: {
    width: isMobile ? '20rem' : '25rem',
    borderRadius: '0.5rem',
  },
  item: {
    ':hover': {
      backgroundColor: palette?.background,
    },
  },
  itemCollaborators: {
    padding: '0 0.5rem',
    width: '100%',
    ':hover': {
      backgroundColor: palette?.background,
    },
  },
});
