import { Box, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const MovieInfoSkeleton = () => {
  return (
    <Box p={2}>
      <Stack spacing={2}>
        <Stack
          spacing={2}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          width={'100%'}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: ['100%', '50%'],
              height: [250, 500],
            }}
          />
          <Stack spacing={1} width={'100%'}>
            <Skeleton variant="text" height={50} />
            <Skeleton variant="text" width={'60%'} height={50} />
            <Skeleton variant="text" width={120} height={30} />
            <Skeleton variant="text" width={120} height={30} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={100} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={100} />
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          direction={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Skeleton
            variant="rectangular"
            height={300}
            sx={{
              width: ['100%', '60%'],
            }}
          />
          <Skeleton
            variant="rectangular"
            height={300}
            sx={{
              width: ['100%', '40%'],
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
