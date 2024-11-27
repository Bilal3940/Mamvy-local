import { palette } from '@/theme/constants';

export const styles = (isMobile?: boolean) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isMobile ? 0 : '1.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    width: '100%',
  },
  divider: {
    border: `0.063rem solid ${palette.white}`,
    marginBottom: '0.5rem',
    width: '100%',
  },
});
