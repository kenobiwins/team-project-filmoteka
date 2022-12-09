import { refs } from './refs/refs';
import { getMovieById } from './API/API';

// const filmsList = document.querySelector('.films-list')

refs.filmsList.addEventListener('click', fullFilmInfo);

function fullFilmInfo(e) {
  e.preventDefault();

  getMovieById().then(data => console.log(data));
}
