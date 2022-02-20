import Image from 'next/image';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { Box, Stack, Typography, useMediaQuery } from '@mui/material';

import { CircularProgressWithLabel } from '@components/progress';

import { Movie } from '@interfaces/index';

import theme from '@shared/theme';

dayjs.extend(duration);

export const MovieInfo = ({
  data,
}: {
  data: Movie & { director: string | undefined };
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const {
    backdrop_path,
    genres,
    overview,
    poster_path,
    release_date,
    tagline,
    title,
    vote_average,
    director,
    runtime,
  } = data;
  const formattedReleaseDate = dayjs(release_date).format('DD/MM/YYYY');

  const runtimeInHoursAndMinutes = dayjs
    .duration(runtime, 'minutes')
    .format('H[h] m[m]');

  return (
    <Box
      sx={{
        background:
          'linear-gradient(to bottom right, rgba(241.5, 220.5, 52.5, 1), rgba(241.5, 220.5, 52.5, 0.84))',
        zIndex: 1,
        position: 'relative',
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right 0 top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        sx={{
          background:
            'linear-gradient(to bottom right, rgba(241.5, 220.5, 52.5, 1), rgba(241.5, 220.5, 52.5, 0.84))',
        }}
        p={[3, 5]}
      >
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={2}
          overflow="hidden"
          borderRadius={2}
        >
          <Box
            width={'100%'}
            maxWidth={['100%', '100%', 400]}
            height={[200, 200, 510]}
            position="relative"
            overflow="hidden"
            borderRadius={2}
          >
            <Image
              alt={title}
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              objectFit={isMobile || isTablet ? 'contain' : 'cover'}
              layout="fill"
            />
          </Box>

          <Stack>
            <Stack
              spacing={1}
              direction={'row'}
              flexWrap="wrap"
              justifyContent={['center', 'center', 'flex-start']}
            >
              <Typography component={'h1'} variant="h4" fontWeight={'bold'}>
                {title}
              </Typography>
              <Typography component={'span'} variant="h4" fontWeight="400">
                (1995)
              </Typography>
            </Stack>

            <Box mt={1} />

            <Stack
              direction={'row'}
              spacing={1}
              alignItems="center"
              justifyContent={['center', 'center', 'flex-start']}
              flexWrap={'wrap'}
            >
              <Box border={'1px solid rgba(0,0,0,0.6)'} p={'2px 4px'}>
                <Typography>U</Typography>
              </Box>
              <Typography variant="h6">{formattedReleaseDate} (IN)</Typography>

              <Stack direction={'row'} spacing={1}>
                <Typography variant="h6">&#8226;</Typography>
                <Typography variant="h6">
                  {genres.map((genre) => genre.name).join(', ')}
                </Typography>
              </Stack>

              <Stack direction={'row'} spacing={1}>
                <Typography variant="h6">&#8226;</Typography>
                <Typography variant="h6">{runtimeInHoursAndMinutes}</Typography>
              </Stack>
            </Stack>

            <Box mt={2} />

            <Stack
              direction={'row'}
              alignItems="center"
              spacing={1}
              justifyContent={['center', 'center', 'flex-start']}
            >
              <CircularProgressWithLabel
                value={vote_average * 10}
                width={60}
                height={60}
              />
              <Stack direction={'row'} alignItems="center">
                <Typography variant="h6">User</Typography>
                <Typography variant="h6">Score</Typography>
              </Stack>
            </Stack>

            <Box mt={2} />

            <Typography fontStyle={'italic'} variant="h6">
              {tagline}
            </Typography>

            <Box mt={2} />
            <Box>
              <Typography variant="h6" fontWeight={'bold'}>
                Overview
              </Typography>
              <Typography>{overview}</Typography>
            </Box>

            <Box mt={2} />
            <Box>
              <Typography variant="h6" fontWeight={'bold'}>
                {director}
              </Typography>
              <Typography>Director</Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
