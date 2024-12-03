

export const styles = (isMobile: boolean,bgColor?: string) => ({
  dropDown: {
    width: isMobile ? '20rem' : '25rem',
    borderRadius: '0.5rem',
  },
  item: {
    ':hover': {
      // backgroundColor: palette?.background,
      backgroundColor: {bgColor},
    },
  },
  itemCollaborators: {
    padding: '0 0.5rem',
    width: '100%',
    ':hover': {
      backgroundColor: {bgColor},
    },
  },
});
