import Link from 'next/link';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer' }}
            >
              TMDB
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
