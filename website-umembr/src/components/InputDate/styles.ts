import { palette } from '../../theme/constants';

export const styles = (error: boolean) => ({
  darkTheme: {
    width: '100%',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: error ? palette.error : palette.gray,
    },
    '& .MuiOutlinedInput-input': {
      color: palette.white,
      '::placeHolder': {
        color: palette.white,
        opacity: '1 !important',
      },
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderWidth: 2,
      borderColor: `${error ? palette.error : palette.gray} !important`,
    },

    '& .MuiInputLabel-root': {
      fontSize: '1rem',
      color: error ? palette.error : palette.white,
      top: '-7px',

      '&.MuiInputLabel-shrink': {
        top: '0px',
      },
    },
  },
  lightTheme: {
    width: '100%',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.gray,
    },
    '& .MuiOutlinedInput-input': {
      color: palette.white,

      '::placeHolder': {
        color: palette.white,
        opacity: '1 !important',
      },
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderWidth: 2,
      borderColor: `${error ? palette.error : palette.white} !important`,
    },

    '& .MuiInputLabel-root': {
      fontSize: '1rem',

      color: error ? palette.error : palette.white,
      top: '-7px',
      '&.Mui-error.Mui-focused': {
        color: palette.error,
      },
      '&.MuiInputLabel-shrink': {
        top: '0px',
      },
    },
  },
});
