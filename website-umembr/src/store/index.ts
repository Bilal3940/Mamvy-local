import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import reducers from './reducers';
import sagas from './sagas';
import reconcile from './reconcile';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, getStoredState, REHYDRATE } from 'redux-persist';

function crossBrowserListener(store: any, persistConfig: any) {
  return async function () {
    let state = await getStoredState(persistConfig);
    if (state !== undefined) {
      store.dispatch({
        type: REHYDRATE,
        key: persistConfig.key,
        payload: state,
      });
    }
  };
}

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const reducer = (state: any, action: any) => {
  let reconcileState = {};

  if (action.type == '__NEXT_REDUX_WRAPPER_HYDRATE__') reconcileState = reconcile(state, action.payload);
  if (action.type === HYDRATE) return { ...state, ...action.payload, ...reconcileState };

  return reducers(state, action);
};

const makeStore: any = ({ isServer }: any) => {
  if (isServer) {
    return configureStore({
      reducer,
      middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
          thunk: false,
          serializableCheck: false,
          inmutableCheck: false,
        });
      },
    });
  } else {
    const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();
    const persistConfig = {
      key: 'memvy-nextjs',
      whitelist: ['auth','subscription','order', 'tempconfig'],
      blacklist: ['page', 'intermitence', 'home', 'forgotPassword'],
      storage,
    };
    const sagaMiddleware = createSagaMiddleware();

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store: any = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: false,
          serializableCheck: false,
          inmutableCheck: false,
        }).concat(sagaMiddleware),
      devTools: process.env.NODE_ENV !== 'production',
    });

    store.__persistor = persistStore(store);
    store['sagaTask'] = sagaMiddleware.run(sagas);

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', crossBrowserListener(store, persistConfig));
    }

    return store;
  }
};

const wrapper: any = createWrapper(makeStore, { debug: false });
type ConfigureStore = ReturnType<typeof makeStore>;
type StoreGetState = ConfigureStore['getState'];
export type RootState = ReturnType<StoreGetState>;

export default wrapper;
