import React, { useRef } from 'react';

import Link from 'next/link';

import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { UseInfiniteQueryResult } from 'react-query';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { MovieFilters } from '@components/filter';
import { Card } from '@components/movie-card';
import { CardSkeleton } from '@components/skeleton/card';

import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

import { Movie } from '@interfaces/index';

import theme from '@shared/theme';

export const Homepage = ({
  result,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: UseInfiniteQueryResult<AxiosResponse<any, any>, unknown>;
}) => {
  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = result;

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  if (status === 'error') {
    return <Box>Error: {(error as Error).message}</Box>;
  }

  const loadingItemsLength = Array.from({ length: 20 }).map(
    (_, index) => index
  );

  const loader = loadingItemsLength.map((_, i) => <CardSkeleton key={i} />);

  const movieData = data?.pages.map((page) => (
    <React.Fragment key={page.data.page}>
      {page.data.results.map((movie: Movie) => {
        const subtitle = dayjs(movie.release_date).format('MMM DD, YYYY');
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        return (
          <Link
            key={movie.id}
            href="/movie/[id]"
            as={`/movie/${movie.id}`}
            passHref
          >
            <Paper
              sx={{
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              <Stack
                direction={{
                  xs: 'row',
                  md: 'column',
                }}
                height={['100%']}
              >
                <Card
                  id={movie.id}
                  key={movie.id}
                  title={movie.title}
                  subtitle={subtitle}
                  image={imageUrl}
                  progress={movie.vote_average * 10}
                  overview={movie.overview}
                  width={[100, 220]}
                  height={[120, 260]}
                />
              </Stack>
            </Paper>
          </Link>
        );
      })}
    </React.Fragment>
  ));

  return (
    <Container>
      <Box mt={2}>
        <Stack
          spacing={3}
          width="100%"
          direction={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Paper
            elevation={2}
            sx={{
              alignSelf: 'flex-start',
              width: ['100%', '100%', 'auto'],
            }}
          >
            <Box p={3}>
              <Typography
                variant="h6"
                color={theme.palette.secondary.main}
                fontWeight="bold"
              >
                Popular Movies
              </Typography>
              <Box mt={2} />
              <MovieFilters />
            </Box>
          </Paper>
          <Box flexGrow={1}>
            <Box>
              <Box
                display={'grid'}
                gridTemplateColumns={[
                  'repeat(auto-fit, minmax(200px, 1fr))',
                  'repeat(auto-fit, minmax(310px, 1fr))',
                  'repeat(auto-fit, minmax(200px, 1fr))',
                ]}
                mb={2}
                sx={{
                  gridGap: '1.5rem',
                }}
              >
                {status === 'loading' ? loader : movieData}
              </Box>

              <Box mt={4} />

              <Button
                ref={loadMoreButtonRef}
                variant="contained"
                fullWidth
                disabled={!hasNextPage || isFetchingNextPage}
                onClick={() => fetchNextPage()}
                sx={{
                  backgroundColor: '#00b4e4',
                  '&:hover': {
                    backgroundColor: '#00b4e4',
                  },
                }}
              >
                {isFetchingNextPage ? (
                  <CircularProgress
                    sx={{
                      color: '#fff',
                    }}
                  />
                ) : (
                  <Typography
                    variant="h4"
                    fontWeight={'bold'}
                    textTransform={'capitalize'}
                  >
                    Load More
                  </Typography>
                )}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};
