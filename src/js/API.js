import axios from 'axios';

export { getPopularMovies, searchMovies, getMovieById, getGenresList };

const API_KEY = 'a6c77db842e34b0d748568175c4ac730';
const BASE_URL = 'https://api.themoviedb.org/3/';

async function getPopularMovies(page) {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
  );
  if (!response.status) {
    throw new Error(response.status);
  }
  return response.data.results;
}

async function searchMovies(searchQuery, page) {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
  );
  if (!response.status) {
    throw new Error(response.status);
  }
  return response.data.results;
}

async function getMovieById(id) {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  if (!response.status) {
    throw new Error(response.status);
  }
  return response.data;
}

async function getGenresList() {
  const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  const response = await axios.get(`${URL}`);
  if (!response.status) {
    throw new Error(response.status);
  }
  return response.data.genres;
}
