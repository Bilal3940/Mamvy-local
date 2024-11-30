import { palette } from '@/theme/constants';


export const styles = (color?: string)=>({
  inputMobile: {
    border: `0.063rem solid ${palette.cardBorder}`,
    background: color,

    color: palette.white,
    borderRadius: '6.25rem',

    '& .MuiOutlinedInput-root': {
      borderRadius: '6.25rem',
      paddingLeft: '6px',
      paddingRight: '6px',
    },
    '& .MuiOutlinedInput-input': {
      height: '1.375rem',
      borderRadius: '6.25rem',
      color: palette.white,
    },
  },
  paperMobileExpanded: {
    flexGrow: 1,
    gap: '0.5rem',
  },
});
