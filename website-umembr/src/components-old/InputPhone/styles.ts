import { palette } from '@/theme/constants';

export const styles: any = (error: boolean) => ({
  inputDark: {
    borderTopLeftRadius: '0.25rem',
    borderBottomLeftRadius: '0.25rem',
    fontSize: '1rem',
    background: 'transparent',
    height: '39px',
    paddingLeft: '3rem',
    paddingTop: '0.2rem',
    color: palette.white,
    borderColor: error ? palette.error : palette.gray,
  },
  inputLight: {
    borderTopLeftRadius: '0.25rem',
    borderBottomLeftRadius: '0.25rem',
    fontSize: '1rem',
    background: 'transparent',
    height: '39px',
    paddingLeft: '3rem',
    paddingTop: '0.2rem',
    color: palette.white,
    borderColor: error ? palette.error : palette.gray,
  },

  buttonDark: {
    background: 'transparent',
    borderLeft: 0,
    borderTop: 0,
    borderBottom: 0,
    borderRight: `1px solid ${error ? palette.error : palette.gray}`,
    paddingLeft: '0px',
  },

  buttonLight: {
    background: 'transparent',
    borderLeft: 0,
    borderTop: 0,
    borderBottom: 0,
    borderRight: `1px solid ${error ? palette.error : palette.gray}`,
    paddingLeft: '0px',
  },

  dropdown: {
    borderRadius: '0.25rem',
    color: palette.gray,
    minWidth: '100%',
  },
});
