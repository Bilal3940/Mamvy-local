import { Html, Head, Main, NextScript } from 'next/document';
import { FC } from 'react';

const Document: FC = () => {

  return (
    <Html lang='en'>
      <Head>
        <link href='favicon-light.ico' rel='icon' media='(prefers-color-scheme: light)' />
        <link href='favicon-dark.ico' rel='icon' media='(prefers-color-scheme: dark)' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#2b5797' />
        <meta name='theme-color' content='#333333' />
      </Head>
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
