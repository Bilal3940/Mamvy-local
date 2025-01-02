
export const styles =(color?:any)=>( {
  dropDown: {
    width: '13rem',
    borderRadius: '0.25px',
    //  WebkitLineClamp: !isMobile ? 2 : 1,
    WebkitBoxOrient: 'vertical',
  },
  item: {
    ':hover': {
      // backgroundColor: palette?.primary,
      backgroundColor: color,
    },
  },
});
