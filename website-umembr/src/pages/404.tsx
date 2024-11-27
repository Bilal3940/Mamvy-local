import type { NextPage } from 'next';

import { Custom404 } from '@/screens';
import Head from 'next/head';
import { Layout } from '@/components';
import { base_domain } from '@/utils';

const Custom404Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'404 - Memvy'}</title>
        <meta
          name='description'
          content={
            'The future of enjoying the past. Create richer and deeper stories of your shared experiences by sharing audio, image, and video memories to collaborate with friends and family to share your cherished memories.'
          }
        />

        <meta property='og:type' content='website' />
        <meta property='og:title' content='404 - Memvy' />
        <meta
          property='og:description'
          content='The future of enjoying the past. Create richer and deeper stories of your shared experiences by sharing audio, image, and video memories to collaborate with friends and family to share your cherished memories.'
        />
        <meta property='og:image' content='' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content={base_domain} />

        <meta name='twitter:title' content='404 - Memvy' />
        <meta
          name='twitter:description'
          content='The future of enjoying the past. Create richer and deeper stories of your shared experiences by sharing audio, image, and video memories to collaborate with friends and family to share your cherished memories.'
        />
        <meta name='twitter:image' content='' />
      </Head>
      <Layout>
        <Custom404 />
      </Layout>
    </>
  );
};

export default Custom404Page;
