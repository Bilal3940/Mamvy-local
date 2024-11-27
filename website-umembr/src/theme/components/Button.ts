import { palette } from '../constants';
import { theme } from '@/theme';

export const MuiButton = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ ownerState }: any) => ({
      fontSize: theme?.typography?.h2,
      borderRadius: '0.25rem',

      ...(ownerState.variant === 'contained' && {
        color: palette.error,
        background: palette.primary,
      }),

      ...(ownerState.variant === 'outlined' && {
        color: palette.error,
        border: `2px solid ${palette.white}`,
      }),

      '&:hover': {
        boxShadow: 'none',
        ...(ownerState.variant === 'contained' && {
          background: palette.primary,
        }),
        ...(ownerState.variant === 'outlined' && {
          color: palette.primary,
          border: `2px solid ${palette.primary}`,
          backgroundColor: 'transparent',
        }),
        ...(ownerState.variant === 'text' && {
          color: palette.primary,
          backgroundColor: 'transparent',
        }),
      },

      '&:disabled': {
        ...(ownerState.variant === 'contained' && {
          background: palette.cardBorder,
          color: palette.cardBorder,
        }),
        ...(ownerState.variant === 'outlined' && {
          borderColor: palette.cardBorder,
          color: palette.cardBorder,
        }),
        ...(ownerState.variant === 'text' && {
          backgroundColor: 'transparent',
        }),
      },
    }),
  },
};
