import { palette } from '@/theme/constants';

export const styles = {
  input: {
    '& .MuiOutlinedInput-input': {
      color: palette.white,
      width: '2.063rem !important',
      height: '2.4375rem',

      textAlign: 'center',
      padding: '0 !important',
      '::placeholder': {
        color: palette.white,
        opacity: 1,
      },
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: 2,
      border: `1px solid ${palette.white}`,
    },
    '& :not(.Mui-error):not(.Mui-focused):hover': {
      '& > fieldset': {
        borderColor: palette.white,
        borderWidth: 2,
      },
    },

    '& .MuiInputLabel-root': {
      fontSize: '1rem',
      color: palette.white,

      top: '-7px',
      '&.Mui-error': {
        color: palette.error,
      },

      '&.Mui-focused': {
        color: palette.white,
      },

      '&.MuiInputLabel-shrink': {
        top: '0px',
      },
    },

    inputStyle: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',

        display: 'none',
      },
    },
  },
};
