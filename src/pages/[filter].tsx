import Head from 'next/head';

import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { useInfiniteQuery } from 'react-query';

import { Homepage } from '@views/home-page';

import { moviesAPI } from '@services/index';

const MovieFilterPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const result = useInfiniteQuery(
    ['movie-filter', id],
    async ({ pageParam = 1 }) => {
      return await moviesAPI.getMovieById(id, pageParam);
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.page + 1 < lastPage.data.total_pages
          ? lastPage.data.page + 1
          : null;
      },
    }
  );

  return (
    <>
      <Head>
        <title>Home</title>

        {/*SEO TAGS*/}
        <meta name="description" content="Homepage" />
        <meta name="keywords" content="Homepage" />
        <meta name="author" content="Homepage" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/*OG TAGS*/}
        <meta property="og:title" content="Homepage" />
        <meta property="og:description" content="Homepage" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <Homepage result={result} />;
    </>
  );
};

export const getServerSideProps: GetStaticProps = async (context) => {
  const id = context.params?.filter;

  return {
    props: {
      id,
    },
  };
};

export default MovieFilterPage;
