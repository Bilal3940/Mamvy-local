import React, { FC, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { Provider } from 'react-redux';

type ContainerType = {
  children?: ReactNode;
  store?: any;
};

const AppContainer: FC<ContainerType> = ({ children, store }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </Provider>
  );
};

export default AppContainer;
