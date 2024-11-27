import { palette } from '@/theme/constants';

export const styles: any = (isSelected?: boolean) => ({
  icon: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    background: palette.cardBackground,
    border: `0.125rem solid  ${palette.cardBorder}`,
    // backdropFilter: 'blur(1.5625rem)',
  },
  gridItem: {
    borderRadius: '1.25rem',
    position: 'relative',
    width: '100%',
    backgroundColor: palette.cardBackground,
    cursor: 'pointer',
    border: `0.125rem dashed ${palette.cardBorder}`,

    height: '8.75rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyItem: {
    borderRadius: '1.25rem',
    position: 'relative',
    width: '100%',
    border: isSelected ? `0.25rem solid ${palette.primary}` : `0.125rem dashed ${palette.cardBorder}`,
    height: '8.75rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
