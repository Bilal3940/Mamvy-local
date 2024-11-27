import { Toast } from '../../src/components/Toast/index';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { UnknownAction } from 'redux';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';

describe('Toast component', () => {
  const initialState = {
    toast: {
      text: 'Text test',
      type: 'success',
      show: true,
    },
  };

  const errorsState = {
    toast: {
      text: 'Text test',
      type: 'error',
      show: true,
    },
  };

  const setStore = (initialState: any) => {
    const intermitence = (state = initialState, { type }: UnknownAction) => {
      switch (type) {
        default:
          return state;
      }
    };

    const reducers = combineReducers({
      intermitence,
    });

    const persistConfig = {
      key: 'root',
      storage: storage,
      blacklist: ['intermitence'],
      whitelist: [''],
    };

    const persistedReducer = persistReducer(persistConfig, reducers);

    const store: any = configureStore({
      reducer: persistedReducer,
    });
    return store;
  };

  it('renders the component', () => {
    cy.mount(
      <ThemeProvider theme={theme}>
        <Provider store={setStore(initialState)}>
          <Toast />
        </Provider>
      </ThemeProvider>,
    );
  });
  it('renders the component with error status', () => {
    cy.mount(
      <ThemeProvider theme={theme}>
        <Provider store={setStore(errorsState)}>
          <Toast />
        </Provider>
      </ThemeProvider>,
    );
  });
});
