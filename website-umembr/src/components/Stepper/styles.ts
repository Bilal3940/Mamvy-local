import { theme } from '@/theme';
import { palette } from '@/theme/constants';

export const styles = {
  stepper: {
    '& .MuiStepLabel-label': {
      color: palette.white,
      fontSize: theme.typography.h4,
      fontWeight: 400,
      '&.Mui-active': {
        fontSize: theme.typography.h4,
        fontWeight: '500 !important',
        color: palette.white,
      },
      '&.Mui-completed': {
        fontSize: theme.typography.h4,
        fontWeight: '500 !important',
        color: palette.white,
      },
    },
  },
  defaultIcon: {
    color: 'transparent',
    height: '1.5rem',
    width: '1.313rem',
    borderRadius: '6.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: palette?.gray,
  },
  activeIcon: {
    backgroundColor: palette.lightCardBackground,

    height: '1.5rem',
    width: '1.313rem',
    borderRadius: '6.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileStepper: {
    '&.MuiMobileStepper-root': {
      background: 'transparent',
      display: 'flex',
      justifyContent: 'center',
    },
    '.MuiMobileStepper-dot': {
      backgroundColor: palette.lightCardBackground,
      margin: '0 0.2rem',
    },
    '.MuiMobileStepper-dotActive': {
      backgroundColor: palette.primary,
    },
  },
};
