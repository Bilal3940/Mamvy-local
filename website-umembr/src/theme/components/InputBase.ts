import { palette } from '../constants';

export const MuiInputBase = {
  styleOverrides: {
    root: {
      '&.MuiOutlinedInput-root': {
        '& .MuiOutlinedInput-input': {
          borderRadius: '0.25rem',
          padding: '8px 8px',
          fontSize: '1rem',
          background: 'transparent',
        },

        '&.MuiInputBase-multiline': {
          padding: 0,
        },

        '&:not(.Mui-error):focus': {
          '& > fieldset': {
            borderColor: palette.primary,
            borderWidth: 2,
          },
        },

        '&.Mui-focused': {
          '& > fieldset': {
            color: palette.primary,
            borderWidth: 2,
          },
        },
        '&.Mui-focused:not(.Mui-error)': {
          '& > fieldset': {
            borderColor: palette?.primary,
            borderWidth: 2,
          },
        },
      },
    },
  },
};
