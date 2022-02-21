import Image from 'next/image';

import { Box, Typography, useMediaQuery } from '@mui/material';

import { CardView } from '@interfaces/index';

import theme from '@shared/theme';

import { CircularProgressWithLabel } from './progress';

export const Card: (data: CardView) => JSX.Element = ({
  title,
  subtitle,
  progress,
  image,
  blurDataUrl,
  width,
  height,
  overview,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Box position={'relative'} minHeight={height} minWidth={width}>
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          blurDataURL={blurDataUrl}
          placeholder="blur"
        />
        {!isMobile && progress && (
          <Box
            width={40}
            height={40}
            border={`1px solid ${theme.palette.secondary.main}`}
            borderRadius={'50%'}
            position="absolute"
            bottom={-20}
            left={20}
          >
            <CircularProgressWithLabel value={progress} />
          </Box>
        )}
      </Box>

      <Box px={2} mt={progress ? 3 : 1} mb={progress ? 3 : 0}>
        <Typography component={'h6'} fontWeight={'bold'} color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {subtitle}
        </Typography>
        {(isMobile || isTablet) && (
          <>
            <Box mt={1} />
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: [2, 5],
              }}
            >
              {overview}
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};
