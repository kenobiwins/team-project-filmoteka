import {
  getPopularMovies,
  searchMovies,
  getMovieById,
  getGenresList,
  getTrailerById,
} from './API/API';

import { pagination, paginationTrendMovie } from './components/pagination';
import { refs } from './refs/refs';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';
const FAKE_POSTER = 'https://moviestars.to/no-poster.png';
const LOCALSTORAGE_KEY = 'genres';
// const galleryRef = document.querySelector('.films-list');
const formRef = document.querySelector('.page-header__form');
// const inputRef = document.querySelector('.page-header__input');
const errorSearchRef = document.querySelector('.page-header__error-text');
// let searchQuery = '';
let page = 1;

formRef.addEventListener('submit', onFormSubmit);

//--------------------RENDER POPULAR MOVIES-----------------
window.addEventListener('DOMContentLoaded', () => {
  getPopularMovies(page).then(data => {
    galleryMarkup(createGalery(data));
    console.log(data.data);
    pagination(data.data.page, data.data.total_pages);
    refs.pagination.addEventListener('click', paginationTrendMovie);
  });
});

//--------------------RENDER GALLERY BY SEARCH-----------------
function onFormSubmit(e) {
  e.preventDefault();
  const {
    currentTarget: { searchQuery },
  } = e;
  // Loading.circle();
  // let searchQuery = inputRef.value.trim();
  if (!searchQuery.value) {
    return;
  }
  if (searchQuery != '') {
    searchMovies(searchQuery.value.trim(), page).then(data => {
      if (data.data.results.length === 0) {
        errorSearchRef.classList.remove('is-hidden');
        setTimeout(() => {
          errorSearchRef.classList.add('is-hidden');
        }, 5000);

        searchQuery.value = '';
      } else {
        clearGallery();
        page = 1;
        galleryMarkup(createGalery(data));
      }
    });
  }
  //   else {
  //     clearGallery();
  //     getPopularMovies(page).then(data => {
  //       galleryMarkup(createGalery(data));
  //     });
  //   }
  // e.currentTarget.reset();
}

getGenresList().then(array => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(array));
});
const genres = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

export function createGalery(data) {
  return data.data.results
    .map(
      ({
        poster_path,
        original_title,
        release_date,
        genre_ids,
        vote_average,
        id,
      }) => {
        genresArray = [];
        let filmGenres = '';
        genres.map(genre => {
          if (genre_ids.includes(genre['id'])) {
            return genresArray.push(genre['name']);
          }
        });
        filmGenres = genresArray.join(', ');

        if (!genre_ids || genre_ids.length === 0) {
          filmGenres = 'genre unknown';
        }

        if (!poster_path) {
          poster_path = FAKE_POSTER;
        } else {
          poster_path = BASE_POSTER_URL + poster_path;
        }

        if (!original_title) {
          original_title = 'no name';
        }

        if (!release_date) {
          release_date = '';
        }

        if (!vote_average) {
          vote_average = 'N/A';
        }

        return `<li class="films-list__item" data-id="${id}">
  <a href="" class="films-list__link">
    <img
      src="${poster_path}"
      alt="${original_title}"
      class="films-list__img"
      loading="lazy"
    />
    <h2 class="films-list__title">${original_title}</h2>
    <span class="films-list__text-ganres">${filmGenres}</span>
    <span class="films-list__span">|</span>
    <span class="films-list__text-date">${release_date.split('-')[0]}|</span>
    <span class="films-list__text-date">${String(vote_average).slice(
      0,
      3
    )}</span>
  </a>
</li>`;
      }
    )
    .join('');
}

function galleryMarkup(string) {
  refs.galleryHome.insertAdjacentHTML('beforeend', string);
}

function clearGallery() {
  refs.galleryHome.innerHTML = '';
}

// console.log(getPopularMovies(page));

// console.log(getMovieById(67892));

// console.log(getTrailerById(436270));

const modalFilm = document.querySelector('.backdrop');

refs.galleryHome.addEventListener('click', fullFilmInfo);
modalFilm.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModalByEsc);

function closeModal(e) {
  if (e.target === modalFilm) {
    modalFilm.classList.add('is-hidden');
    // modalFilm.removeEventListener('click', closeModal)
  }
}

function closeModalByEsc(e) {
  if (e.code === 'Escape') {
    modalFilm.classList.add('is-hidden');
    // window.removeEventListener('keydown', closeModalByEsc)
  }
}

export function fullFilmInfo(e) {
  e.preventDefault();
  const filmId = e.target.closest('li').dataset.id;
  modalFilm.innerHTML = '';

  getMovieById(filmId)
    .then(data => {
      return data.data;
    })
    .then(data => {
      const filmInfo = `<div class="modal">
  <button class="button-close" type="button" data-modal-close>
    <svg class="button-close__icon" width="14" height="14">
      <use href="./images/svg/symbol-defs.svg#icon-close"></use>
    </svg>
  </button>
  <img class="modal__img-wrapper" src="${BASE_POSTER_URL}${
        data.poster_path
      }" alt="${data.original_title}">
  <div class="modal__info">
    <p class="modal__title">${data.original_title}</p>
    <div class="modal__data">
        <p class="modal__data-info"><span class="modal__data-info--grey">Vote / Votes</span><span class="modal__data-number"><span class="modal__data-ratio">${data.vote_average.toFixed(
          1
        )}</span>/ ${data.vote_count}</span></p>
        <p class="modal__data-info"><span class="modal__data-info--grey">Popularity</span><span class="modal__data-number">${data.popularity.toFixed(
          1
        )}</span></p>
        <p class="modal__data-info"><span class="modal__data-info--grey">Original Title</span><span>${
          data.original_title
        }</span></p>
        <p class="modal__data-info"><span class="modal__data-info--grey">Genre</span><span>${data.genres
          .map(genre => genre.name)
          .join(', ')}</span></p>
    </div>
    <div class="modal__description">
        <p class="modal__description-title">About</p>
        <p class="modal__description-about">${data.overview}</p>
    </div>
    <div class="modal__buttons">
        <button class="modal__button" type="button" id="btn-addwatched">ADD TO WATCHED</button>
        <button class="modal__button" type="button" id="btn-addqueue">ADD TO QUEUE</button>
    </div>
  </div>
  `;
      modalFilm.insertAdjacentHTML('beforeend', filmInfo);
      modalFilm.classList.remove('is-hidden');
    });
}
