import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { Box, ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import wrapper from '../store';
import { Toast } from '@/components';
import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { google_client_id } from '@/utils';
import GoogleTagManager from '@/components/GoogleTagManager';
import ErrorBoundary from '@/components/ErrorBoundary';
import { PaletteProvider } from '@/hooks/PaletteContext';

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  const [firstRender, setFirstRender] = useState(false);
  const GOOGLE_CLIENT_ID = google_client_id;
  const { auth } = store.getState();

  useEffect(() => {
    if (!firstRender) setFirstRender(true);

    if (
      auth.isAuth &&
      firstRender &&
      !router.asPath?.includes('guest') &&
      (router.pathname === '/app/login' ||
        router.pathname === '/app/register' ||
        router.pathname === '/app/forgot-password' ||
        router.asPath === '/app')
    ) {
      router.push('/app/home');
    }
  }, [auth?.isAuth, firstRender]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PaletteProvider>
        {/* Wrap ThemeProvider inside PaletteProvider */}
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ErrorBoundary>
              <Toast />
              <Head>
                <title>Memvy</title>
                <meta name='viewport' content='width=device-width,initial-scale=1' />
              </Head>
              <GoogleTagManager />
              <Box width='100%'>
                <Component {...props} />
              </Box>
            </ErrorBoundary>
          </Provider>
        </ThemeProvider>
      </PaletteProvider>
    </GoogleOAuthProvider>
  );
};

export default appWithTranslation(App);
