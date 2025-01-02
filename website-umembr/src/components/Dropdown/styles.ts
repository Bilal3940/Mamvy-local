export const styles = (color?: string) => ({
  dropDown: {
    width: '13rem',
    borderRadius: '0.25rem',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  item: {
    ':hover': {
      backgroundColor: color,
    },
  },
});
