import { Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export const CardSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={220} height={220} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Stack>
  );
};
