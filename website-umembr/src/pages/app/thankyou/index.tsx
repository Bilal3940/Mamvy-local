import type { NextPage, GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Home } from '@/screens';
import { Layout } from '@/components';
import Head from 'next/head';
import { base_domain, base_url } from '@/utils';
import ThankYou from '@/screens/thankyou';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{'Thankyou - Memvy'}</title>
        <meta
          name='description'
          content={
            'The future of enjoying the past. Create richer and deeper stories of your shared experiences by sharing audio, image, and video memories to collaborate with friends and family to share your cherished memories.'
          }
        />

        <meta property='og:url' content={`${base_url}/thankyou'`} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Thankyou - Memvy' />
        <meta
          property='og:description'
          content='The future of enjoying the past. Create richer and deeper stories of your shared experiences by sharing audio, image, and video memories to collaborate with friends and family to share your cherished memories.'
        />
        <meta property='og:image' content='' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content={base_domain} />
        <meta property='twitter:url' content={`${base_url}/Thankyou'`} />
        <meta name='twitter:title' content='Thankyou - Memvy' />
        <meta
          name='twitter:description'
          content='The future of enjoying the past. Create richer and deeper stories of your shared experiences by sharing audio, image, and video memories to collaborate with friends and family to share your cherished memories.'
        />
        <meta name='twitter:image' content='' />
      </Head>
      <ThankYou/>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => ({
  props: {
    ...(await serverSideTranslations('en', ['common'])),
  },
});

export default HomePage;

