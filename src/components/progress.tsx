import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from '@mui/material';

export const CircularProgressWithLabel = (
  props: CircularProgressProps & {
    value: number;
    width?: number;
    height?: number;
  }
) => {
  const voteAverage = props.value ? `${Math.round(props.value)}%` : 'NR';

  return (
    <Box position={'relative'} display={'inline-flex'}>
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          borderRadius: '50%',
          color: '#22d07a',
          bgcolor: 'primary.main',
          width: `${props.width || 40}px !important`,
          height: `${props.height || 40}px !important`,
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          fontWeight={'bold'}
          variant="body2"
          component="div"
          color="#fff"
        >
          {voteAverage}
        </Typography>
      </Box>
    </Box>
  );
};
