import {
    getPopularMovies,
    searchMovies,
    getMovieById,
    getGenresList,
    getTrailerById,
  } from './API/API';





  const filmsList = document.querySelector('.films-list')

  filmsList.addEventListener('click', fullFilmInfo)



  function fullFilmInfo(e) {
    e.preventDefault();
    
    getMovieById().then(data => console.log(data))
  }
