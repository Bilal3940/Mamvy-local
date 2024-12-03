
export const styles =(color?:any)=>( {
  dropDown: {
    width: '13rem',
    borderRadius: '0.25px',
  },
  item: {
    ':hover': {
      // backgroundColor: palette?.primary,
      backgroundColor: color,
    },
  },
});
