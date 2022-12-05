import {
  getPopularMovies,
  searchMovies,
  getMovieById,
  getGenresList,
  getTrailerById,
} from './API/API';

import {
  pagination,
  paginationTrendMovie,
  paginationOnSearch,
} from './components/pagination';
import { refs } from './refs/refs';
import { preload } from './helpers/preloader';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';
const FAKE_POSTER = 'https://moviestars.to/no-poster.png';
const LOCALSTORAGE_KEY = 'genres';
// const galleryRef = document.querySelector('.films-list');
// const formRef = document.querySelector('.page-header__form');
// const inputRef = document.querySelector('.page-header__input');
// const errorSearchRef = document.querySelector('.page-header__error-text');
// let searchQuery = '';
let page = 1;

refs.form.addEventListener('submit', onFormSubmit);

// preloader.classList.remove('visually-hidden');

window.onload = preload();

//--------------------RENDER POPULAR MOVIES-----------------
window.addEventListener('DOMContentLoaded', () => {
  getPopularMovies(page).then(data => {
    galleryMarkup(createGalery(data));

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
  preload();
  if (searchQuery != '') {
    searchMovies(searchQuery.value.trim(), page).then(data => {
      if (data.data.results.length === 0) {
        refs.errorSearchRef.classList.remove('is-hidden');
        preload();
        setTimeout(() => {
          refs.errorSearchRef.classList.add('is-hidden');
        }, 5000);

        searchQuery.value = '';
      } else {
        clearGallery();
        page = 1;

        galleryMarkup(createGalery(data));

        pagination(data.data.page, data.data.total_pages);
        refs.pagination.removeEventListener('click', paginationTrendMovie);
        refs.pagination.addEventListener('click', paginationOnSearch);
        preload();
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
  // console.log(data);
  return data.data.results
    .map(
      ({ poster_path, title, release_date, genre_ids, vote_average, id }) => {
        let genresArray = [];
        let filmGenres = '';
        genres.map(genre => {
          if (genre_ids.includes(genre['id'])) {
            return genresArray.push(genre['name']);
          }
        });
        filmGenres = genresArray.join(', ');

        if (!genre_ids || genre_ids.length === 0) {
          filmGenres = 'Genre unknown';
        }

        if (!poster_path) {
          poster_path = FAKE_POSTER;
        } else {
          poster_path = BASE_POSTER_URL + poster_path;
        }

        if (!title) {
          title = 'Film without title';
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
      alt="${title}"
      class="films-list__img"
      loading="lazy"
    />
    <h2 class="films-list__title">${title}</h2>
    <span class="films-list__text-ganres">${filmGenres}</span>
    <span class="films-list__span">|</span>
    <span class="films-list__text-date">${release_date.split('-')[0]}|</span>
    <span class="films-list__text-rating">${String(vote_average).slice(
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

// const modalFilm = document.querySelector('.backdrop');

//--------------------RENDER FILM-MODAL BY CLICK-----------------

refs.galleryHome.addEventListener('click', fullFilmInfo);
refs.modalFilm.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModalByEsc);

function closeModal(e) {
  if (e.target === refs.modalFilm) {
    refs.modalFilm.classList.add('is-hidden');
    document.querySelector('body').style.overflow = 'auto';
  }
}

function closeModalByEsc(e) {
  if (e.code === 'Escape') {
    refs.modalFilm.classList.add('is-hidden');
    document.querySelector('body').style.overflow = 'auto';
  }
}

function closeModalByBtn() {
  refs.modalFilm.classList.add('is-hidden');
  document.querySelector('body').style.overflow = 'auto';
}

function fullFilmInfo(e) {
  preload();
  fullFilmInfo;
  e.preventDefault();
  document.querySelector('body').style.overflow = 'hidden';
  const filmId = e.target.closest('li').dataset.id;
  refs.modalFilm.removeChild(refs.modalFilm.lastElementChild);

  getMovieById(filmId)
    .then(data => {
      return data.data;
    })
    .then(data => {
      if (!data.poster_path) {
        data.poster_path = FAKE_POSTER;
      } else {
        data.poster_path = BASE_POSTER_URL + data.poster_path;
      }

      if (!data.title) {
        title = 'no name';
      }

      if (!data.vote_average) {
        data.vote_average = 'N/A';
      } else {
        data.vote_average = String(data.vote_average).slice(0, 3);
      }

      if (!data.vote_count) {
        data.vote_count = 'N/A';
      }

      if (!data.popularity) {
        data.popularity = 'N/A';
      }

      if (!data.genres.length) {
        data.genres = 'genres unknown';
      } else {
        data.genres = data.genres.map(genre => genre.name).join(', ');
      }

      if (!data.overview) {
        data.overview = 'No description';
      }
      preload();
      console.log(data.genres);
      const filmInfo = `<div class="modal">
  <button class="button-close" type="button" data-modal-close>
    <svg class="button-close__icon" width="14" height="14">
      <use href="${refs.hrefIcon}"></use>
    </svg>
  </button>
  <img class="modal__img-wrapper" src="${data.poster_path}" alt="${data.title}">
  <div class="modal__info">
    <p class="modal__title">${data.title}</p>
    <div class="modal__data">
        <p class="modal__data-info"><span class="modal__data-info--grey">Vote / Votes</span><span class="modal__data-number"><span class="modal__data-ratio">${data.vote_average}</span>/ ${data.vote_count}</span></p>
        <p class="modal__data-info"><span class="modal__data-info--grey">Popularity</span><span class="modal__data-number">${data.popularity}</span></p>
        <p class="modal__data-info"><span class="modal__data-info--grey">Original Title</span><span>${data.title}</span></p>
        <p class="modal__data-info"><span class="modal__data-info--grey">Genre</span><span>${data.genres}</span></p>
    </div>
    <div class="modal__description">
        <p class="modal__description-title">About</p>
        <p class="modal__description-about">${data.overview}</p>
    </div>
    <div class="modal__buttons">
        <button class="modal__button" type="button" data-value="watched">ADD TO WATCHED</button>
        <button class="modal__button" type="button" data-value="queue">ADD TO QUEUE</button>
    </div>
  </div>
  `;
      refs.modalFilm.insertAdjacentHTML('beforeend', filmInfo);
      refs.modalFilm.classList.remove('is-hidden');
      const btnCloseModal =
        refs.modalFilm.getElementsByClassName('button-close')[0];
      btnCloseModal.addEventListener('click', closeModalByBtn);
    });
}
