import React from 'react';

export type TReactChildren = {
  children: React.ReactNode;
};

export type Genres = {
  id: number;
  name: string;
};

export type Cast = {
  cast_id: number;
  character: string;
  credit_id: string;
  id: number;
  name: string;
  profile_path: string;
};

export type Crew = {
  credit_id: string;
  department: string;
  job: string;
  name: string;
};

export type Movie = {
  backdrop_path: string;
  budget: number;
  genres: Genres[];
  id: number;
  overview: string;
  original_language: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
};

export type CardView = Pick<Movie, 'id' | 'title' | 'overview'> & {
  subtitle: string;
  image: string;
  progress?: number | null;
  width?: number[] | number;
  height?: number[] | number;
};

export type MovieCredits = {
  cast: Cast[];
  crew: Crew[];
};
