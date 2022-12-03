import axios from 'axios';

export {
  getPopularMovies,
  searchMovies,
  getMovieById,
  getGenresList,
  getTrailerById,
};

const API_KEY = 'a6c77db842e34b0d748568175c4ac730';
const BASE_URL = 'https://api.themoviedb.org/3/';

async function getPopularMovies(page = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );
    if (!response.status) {
      throw new Error('No trending films anymore');
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function searchMovies(searchQuery, page = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
    );
    if (!response.status) {
      throw new Error('No results found for your search');
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getMovieById(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    if (!response.status) {
      throw new Error('This movie is not available');
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getGenresList() {
  try {
    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    const response = await axios.get(`${URL}`);
    if (!response.status) {
      throw new Error('Genres list is not available');
    }
    return response.data.genres;
  } catch (error) {
    console.log(error);
  }
}

async function getTrailerById(id) {
  try {
    const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
    const response = await axios.get(`${URL}`);
    if (!response.status) {
      throw new Error('There is no trailer for this film');
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
