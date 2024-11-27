import { palette } from '../../theme/constants';

export const styles = {
  paper: {
    width: '100%',
    border: `1px solid ${palette.cardBorder} `,
    background: `${palette.cardBackground} !important`,
  },
  dropdown: {
    width: '2.75rem',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    zIndex: 999,
  },
  divider: {
    border: `0.0313rem solid ${palette.cardBorder}`,
    height: '1.5rem',
    width: 0,
  },
};
