import { palette } from '../../theme/constants';

export const styles = (color?:string)=>(
  
  {
 
  paper: {
    width: '100%',
    border: `1px solid ${palette.cardBorder} `,
    background: `${color} !important`,
  },
  dropdown: {
    width: '2.75rem',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    zIndex: 999,
  },
  divider: {
    border: `0.0313rem solid ${palette.cardBorder}`,
    height: '1.5rem',
    width: 0,
  },
});
