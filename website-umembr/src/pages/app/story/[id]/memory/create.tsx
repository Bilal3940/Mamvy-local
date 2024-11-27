import type { NextPage, GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '@/components';
import { CreateMemory } from '@/screens';
import Head from 'next/head';
import { storySelector } from '@/store/selectors';
import { useSelector } from 'react-redux';
import { base_domain, base_url, cdn_url } from '@/utils';

const CreateMemoryPage: NextPage = () => {
  const { story } = useSelector(storySelector);
  return (
    <Layout>
      <Head>
        <title>{`${story?.title ?? ''} Create memory - Memvy`}</title>
        <meta name='description' content={story?.description ?? ''} />

        <meta property='og:url' content={`${base_url}/${story?.title}/memory/create'`} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={`${story?.title ?? ''}' Create memory - Memvy'`} />
        <meta property='og:description' content={story?.description ?? ''} />
        <meta property='og:image' content={`${cdn_url}/${story?.image ?? ''}`} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content={base_domain} />
        <meta property='twitter:url' content={`${base_url}/${story?.title}//memory/create'`} />
        <meta name='twitter:title' content={`${story?.title ?? ''} ' Create memory - Memvy'`} />
        <meta name='twitter:description' content={story?.description ?? ''} />
        <meta name='twitter:image' content={`${cdn_url}/${story?.image ?? ''}`} />
      </Head>
      <CreateMemory />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => ({
  props: {
    ...(await serverSideTranslations('en', ['common'])),
  },
});

export default CreateMemoryPage;
