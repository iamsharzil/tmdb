import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/material';

import { Card } from '@components/movie-card';

import { Cast } from '@interfaces/index';

export const CastInfo = ({ cast }: { cast: Cast[] }) => {
  return (
    <Stack
      spacing={2}
      width={['100%', '70%']}
      position={'relative'}
      overflow={'hidden'}
      sx={{
        '&:after': {
          content: '""',
          width: '60px',
          height: '100%',
          position: 'absolute',
          top: '0',
          right: '0',
          background: [
            'unset',
            'linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%)',
          ],
        },
      }}
    >
      <Typography component={'h3'} variant="h6" fontWeight={'bold'}>
        Cast
      </Typography>
      <Stack
        direction={'row'}
        spacing={2}
        overflow="auto"
        //pb={2}
      >
        {cast.map((cast) => {
          const image = `https://image.tmdb.org/t/p/w500/${cast.profile_path}`;
          const blurDataUrl = `https://image.tmdb.org/t/p/w92/${cast.profile_path}`;
          const placeHolder = `https://via.placeholder.com/250*250`;

          return (
            <Box
              key={cast.id}
              borderRadius={2}
              border={'1px solid rgb(227, 227, 227)'}
              boxShadow={'0 2px 8px rgb(0 0 0 / 10%)'}
              width={'100%'}
              overflow="hidden"
              minWidth={150}
            >
              <Card
                blurDataUrl={cast.profile_path ? blurDataUrl : placeHolder}
                title={cast.name}
                subtitle={cast.character}
                image={image ?? placeHolder}
                id={cast.id}
                progress={null}
                width={[120, 150]}
                height={[130, 170]}
              />
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};
