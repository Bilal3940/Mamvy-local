import type { NextPage, GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ForgotPassword } from '@/screens';
import Head from 'next/head';
import { base_domain, base_url } from '@/utils';

const ForgotPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'Forgot password - Memvy'}</title>
        <meta
          name='description'
          content={
            'The future of enjoying the past. Create richer and deeper stories of your shared experiences by sharing audio, image, and video memories to collaborate with friends and family to share your cherished memories.'
          }
        />

        <meta property='og:url' content={`${base_url}/forgot-password'`} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Forgot password - Memvy' />
        <meta
          property='og:description'
          content='The future of enjoying the past. Create richer and deeper stories of your shared experiences by sharing audio, image, and video memories to collaborate with friends and family to share your cherished memories.'
        />
        <meta property='og:image' content='' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content={base_domain} />
        <meta property='twitter:url' content={`${base_url}/forgot-password'`} />
        <meta name='twitter:title' content='Forgot password - Memvy' />
        <meta
          name='twitter:description'
          content='The future of enjoying the past. Create richer and deeper stories of your shared experiences by sharing audio, image, and video memories to collaborate with friends and family to share your cherished memories.'
        />
        <meta name='twitter:image' content='' />
      </Head>

      <ForgotPassword />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => ({
  props: {
    ...(await serverSideTranslations('en', ['common'])),
  },
});

export default ForgotPasswordPage;
