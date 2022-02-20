import Head from 'next/head';

import { useQuery } from 'react-query';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Stack, Typography } from '@mui/material';

import { CastInfo } from '@components/movie/cast';
import { MovieInfo } from '@components/movie/info';
import { MovieInfoSkeleton } from '@components/skeleton/movie-info';

import { Movie, MovieCredits } from '@interfaces/index';

import { moviesAPI } from '@services/index';

export const MovieView = ({ id }: { id: string | string[] | undefined }) => {
  const movieInfoQuery = useQuery(`movie-${id}`, () =>
    moviesAPI.getMovieById(id)
  );

  const movieCreditsQuery = useQuery(`movie-credits-${id}`, () =>
    moviesAPI.getMovieCreditsById(id)
  );

  const loading = movieInfoQuery.isLoading || movieCreditsQuery.isLoading;

  const error = movieInfoQuery.error || movieCreditsQuery.error;

  const movieInfo: Movie = movieInfoQuery?.data?.data;
  const movieCredits: MovieCredits = movieCreditsQuery?.data?.data;

  if (loading) {
    return <MovieInfoSkeleton />;
  }

  if (error) {
    return (
      <span>
        Error:{' '}
        {
          (
            (movieInfoQuery.isError
              ? movieInfoQuery.error
              : movieCreditsQuery.error) as Error
          ).message
        }
      </span>
    );
  }

  const director = movieCredits?.crew.find(
    (crewMember) => crewMember.job === 'Director'
  );

  const data = {
    ...movieInfo,
    director: director?.name,
  };

  return (
    <>
      <Head>
        <title>{movieInfo.title}</title>
        {/*SEO TAGS*/}
        <meta name="description" content={movieInfo.overview} />
        <meta
          name="keywords"
          content={movieInfo.genres.map((genre) => genre.name).join(', ')}
        />
        <meta
          name="author"
          content={movieInfo.genres.map((genre) => genre.name).join(', ')}
        />

        {/*OG TAGS*/}
        <meta property="og:title" content={movieInfo.title} />
        <meta property="og:description" content={movieInfo.overview} />
        <meta property="og:type" content="website" />
        {/*<meta property="og:url" content="https://www.example.com" />*/}
        <meta
          property="og:image"
          content={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={movieInfo.title} />
        <meta property="og:site_name" content="Homepage" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <MovieInfo data={data} />
      <Box mt={[0, 2]} p={[3, 5]}>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={2}
        >
          <CastInfo cast={movieCredits.cast} />
          <Stack spacing={2}>
            <Stack direction={'row'} spacing={2}>
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
            </Stack>

            <Stack>
              <Typography variant="h6" fontWeight={'bold'}>
                Status
              </Typography>
              <Typography component={'span'}>{movieInfo.status}</Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" fontWeight={'bold'}>
                Original Language
              </Typography>
              <Typography component={'span'}>
                {movieInfo.original_language === 'en' ? 'English' : 'Others'}
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" fontWeight={'bold'}>
                Budget
              </Typography>
              <Typography component={'span'}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(movieInfo.budget)}
              </Typography>
            </Stack>

            <Stack>
              <Typography variant="h6" fontWeight={'bold'}>
                Revenue
              </Typography>
              <Typography component={'span'}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(movieInfo.revenue)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
