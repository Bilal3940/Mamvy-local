import { palette } from '@/theme/constants';

export const styles = (isDarkTheme: boolean) => ({
  width: '100%',

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: `${isDarkTheme ? palette.gray : palette.gray} !important`,
  },
  '& .MuiOutlinedInput-input': {
    color: isDarkTheme ? palette.white : palette.white,
  },
  '&:not(.Mui-error):not(.Mui-focused):hover': {
    '& > fieldset': {
      borderColor: isDarkTheme ? palette.gray : palette.gray,
      borderWidth: 2,
    },
  },
  '& .Mui-disabled': {
    color: `${palette?.gray} !important`,
    opacity: 1,

    WebkitTextFillColor: `${palette?.gray} !important`,
    '::placeholder': {
      color: palette?.gray,
      opacity: 1,
    },
  },
});
