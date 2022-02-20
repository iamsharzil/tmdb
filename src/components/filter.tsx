import { useState } from 'react';

import { useRouter } from 'next/router';

import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Box } from '@mui/system';

export const MovieFilters = () => {
  const router = useRouter();
  const [value, setValue] = useState(router.query.filter || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    router.push(`/${event.target.value}`);
  };

  const handleClick = () => {
    if (router.query.filter) {
      router.push('/');
    }
  };

  return (
    <>
      <RadioGroup
        aria-labelledby="movie-filters"
        name="movie-filters"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="upcoming"
          control={<Radio />}
          label="Upcoming"
        />
        <FormControlLabel value="popular" control={<Radio />} label="Popular" />
        <FormControlLabel
          value="top_rated"
          control={<Radio />}
          label="Top Rated"
        />
      </RadioGroup>
      <Box mt={2} />
      <Button fullWidth variant="contained" onClick={handleClick}>
        Clear
      </Button>
    </>
  );
};
