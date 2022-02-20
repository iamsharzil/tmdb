import { GetStaticProps } from 'next';

import { MovieView } from '@views/movie-page';

const MoviePage = ({ id }: { id: string | string[] | undefined }) => {
  return <MovieView id={id} />;
};

export const getServerSideProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  return {
    props: {
      id,
    },
  };
};

export default MoviePage;
