import axios from 'axios';

import { API_KEY, BASE_API } from '@config/index';

export const moviesAPI = {
  discoverMovie(page = 1) {
    return axios.get(
      `${BASE_API}discover/movie?api_key=${API_KEY}&page=${page}`
    );
  },
  filterMovieByType(type: string | string[] | undefined) {
    if (type) {
      return axios.get(`${BASE_API}movie/${type}?api_key=${API_KEY}`);
    }
  },
  getMovieById(id: string | string[] | undefined, page = 1) {
    return axios.get(`${BASE_API}movie/${id}?api_key=${API_KEY}&page=${page}`);
  },
  getMovieCreditsById(id: string | string[] | undefined) {
    return axios.get(`${BASE_API}movie/${id}/credits?api_key=${API_KEY}`);
  },
};
