import type { NextPage, GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components';
import { EditStory } from '@/screens';
import { useSelector } from 'react-redux';
import { storySelector } from '@/store/selectors';
import Head from 'next/head';
import { base_domain, base_url, cdn_url } from '@/utils';
const EditStoryPage: NextPage = () => {
  const { story } = useSelector(storySelector);
  return (
    <Layout>
      <Head>
        <title>{`${story?.title ?? ''} - Memvy`}</title>
        <meta name='description' content={story?.description ?? ''} />

        <meta property='og:url' content={`${base_url}/${story?.title}/update'`} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`${story?.title ?? ''} - Memvy`} />
        <meta property='og:description' content={story?.description ?? ''} />
        <meta property='og:image' content={`${cdn_url}/${story?.image ?? ''}`} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content={base_domain} />
        <meta property='twitter:url' content={`${base_url}/${story?.title}/update'`} />
        <meta name='twitter:title' content={`${story?.title ?? ''} - Memvy`} />
        <meta name='twitter:description' content={story?.description ?? ''} />
        <meta name='twitter:image' content={`${cdn_url}/${story?.image ?? ''}`} />
      </Head>
      <EditStory />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => ({
  props: {
    ...(await serverSideTranslations('en', ['common'])),
  },
});

export default EditStoryPage;
