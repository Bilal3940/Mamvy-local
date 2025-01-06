import { theme } from '@/theme';
import { palette } from '@/theme/constants';

export const styles: any = (width: string, extraStyle: any, qty: number, isMobile: boolean,bgColor?: string) => ({
  '& .MuiTabs-indicator': {
    bottom: '0.35rem',
  },
  '& .Mui-selected': {
    bgcolor: 'transparent',
    color: `${bgColor}`,
    fontSize: theme.typography.h6,
    width: width,
  },
  '& .MuiTab-root': {
    opacity: 1,
    // color: palette.white,
    fontSize: isMobile && qty===3? "0.73rem" : theme.typography.h6,
    width: extraStyle ? `${100 / qty}%` : 'auto',
  },
  '&.MuiTabs-root': {
    ...extraStyle,
  },
});
