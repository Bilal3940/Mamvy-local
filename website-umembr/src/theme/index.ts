import { createTheme } from '@mui/material/styles';
import { OverridesComponents } from './components';
import { palette } from './constants';

// Generate defualt MUI theme for breakpoints
export const defaultTheme = createTheme();

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      dark: palette.error,
    },
    secondary: {
      main: palette.primary,
    },
    success: {
      main: palette.primary,
    },
    error: {
      main: palette.error,
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',

    h1: {
      fontSize: '6.125rem',
      fontWeight: '300',
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: '300',
    },
    h3: {
      fontSize: '3rem',
      fontWeight: '400',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: '400',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: '500',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: '500',
    },

    body1: {
      fontSize: '1rem',
      fontWeight: '400',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: '400',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: '500',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    button: {
      textTransform: 'none',
      fontSize: '0.938rem',
      fontWeight: '500',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: '400',
    },
  },
  components: OverridesComponents,
});
