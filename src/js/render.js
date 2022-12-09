import {
  getPopularMovies,
  searchMovies,
  getMovieById,
  getGenresList,
  getTrailerById,
} from './API/API';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { onBtnQueue, onBtnWatched } from './my-library';
import {
  addToQueue,
  addToWatched,
  colRefQueue,
  colRefWatched,
  handleWatched,
  deleteQueue,
  deleteWatched,
} from './firebase/firebase-data';
import Notiflix from 'notiflix';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import {
  pagination,
  paginationTrendMovie,
  paginationOnSearch,
} from './components/pagination';
import { refs } from './refs/refs';
import { preload } from './helpers/preloader';
import { auth } from './firebase/firebase-auth';
import { onAuthStateChanged } from 'firebase/auth';
import playBtn from '../images/play-btn/play-btn.png';
import fakePoster from '../images/no-poster/no-poster.jpg';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';
// export const FAKE_POSTER = 'https://moviestars.to/no-poster.png';
const LOCALSTORAGE_KEY = 'genres';
const LOCALSTORAGE_TRUESEARCH = 'trueSearch';
// const TRAILER_BTN_IMG =
// 'https://cdn.pixabay.com/photo/2022/05/27/11/18/motion-graphic-7224947_960_720.png';
// 'https://cdn.pixabay.com/photo/2021/12/17/11/52/play-6876336_960_720.png';
// 'https://cdn.pixabay.com/photo/2016/02/01/12/33/play-1173551_960_720.png';
// 'https://cdn.pixabay.com/photo/2013/07/12/13/49/movie-147368_960_720.png';
// 'https://cdn.pixabay.com/photo/2016/11/19/03/08/youtube-1837872_960_720.png';
// 'https://t4.ftcdn.net/jpg/00/31/52/05/240_F_31520505_E1LEpdbXWSPYxb4kuaZWfoi2JvAO8SKC.jpg';

// const galleryRef = document.querySelector('.films-list');
// const formRef = document.querySelector('.page-header__form');
// const inputRef = document.querySelector('.page-header__input');
// const errorSearchRef = document.querySelector('.page-header__error-text');
// let searchQuery = '';
let page = 1;
let genres = [];
let trueSearch = '';
let dataVar = {};

let instance;

// preloader.classList.remove('visually-hidden');

// window.onload = setTimeout(() => {
//   preload();
// }, 1000);
//--------------------RENDER POPULAR MOVIES-----------------
if (document.title === 'Home') {
  refs.form.addEventListener('submit', onFormSubmit);
  window.addEventListener('DOMContentLoaded', async () => {
    // preload();
    // setTimeout(() => {
    //   preload();
    // }, 700);
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))) {
      await getGenresList().then(array => {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(array));
      });
    }
    genres = await JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    getPopularMovies(page).then(data => {
      galleryMarkup(createGalery(data));

      pagination(data.data.page, data.data.total_pages);
      refs.pagination.addEventListener('click', paginationTrendMovie);
    });
    // setTimeout(() => {
    //   preload();
    // }, 700);
  });
}

//--------------------RENDER GALLERY BY SEARCH-----------------
function onFormSubmit(e) {
  e.preventDefault();
  const {
    currentTarget: { searchQuery },
  } = e;
  // Loading.circle();
  // let searchQuery = inputRef.value.trim();
  if (!searchQuery.value) {
    Notiflix.Notify.info(`Please enter request`);
    return;
  }
  preload();
  // if (searchQuery != '') {
  searchMovies(searchQuery.value.trim(), page).then(data => {
    if (data.data.results.length === 0) {
      refs.errorSearchRef.classList.remove('is-hidden');
      preload();
      setTimeout(() => {
        refs.errorSearchRef.classList.add('is-hidden');
      }, 5000);

      searchQuery.value = '';
    } else {
      localStorage.setItem(LOCALSTORAGE_TRUESEARCH, searchQuery.value);
      clearGallery();
      page = 1;

      galleryMarkup(createGalery(data));

      pagination(data.data.page, data.data.total_pages);
      refs.pagination.removeEventListener('click', paginationTrendMovie);
      refs.pagination.addEventListener('click', paginationOnSearch);
      setTimeout(() => {
        preload();
      }, 700);
    }
  });
  // }
  //   else {
  //     clearGallery();
  //     getPopularMovies(page).then(data => {
  //       galleryMarkup(createGalery(data));
  //     });
  //   }
  // e.currentTarget.reset();
}

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
          poster_path = fakePoster;
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
    <h3 class="films-list__title">${title}</h3>
    <p class="films-list__text-ganres">
      ${filmGenres} | ${
          release_date.split('-')[0]
        }  <span class="films-list__text-rating"
  >${String(vote_average).slice(0, 3)}</span
>
    </p>
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

if (document.title === 'Home') {
  refs.galleryHome.addEventListener('click', fullFilmInfo);
  refs.modalFilm.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalByEsc);
} else {
  refs.modalFilm.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalByEsc);
}

export function closeModal(e) {
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

export function fullFilmInfo(e) {
  e.preventDefault();
  fullFilmInfo;
  if (e.target === e.currentTarget) {
    return;
  }
  preload();
  document.querySelector('body').style.overflow = 'hidden';
  const filmId = e.target.closest('li').dataset.id;
  const firebaseId = e.target.closest('li').getAttribute('firebase-id');
  refs.modalFilm.removeChild(refs.modalFilm.lastElementChild);

  getMovieById(filmId)
    .then(data => {
      return data.data;
    })
    .then(data => {
      if (!data.poster_path) {
        data.poster_path = fakePoster;
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
      setTimeout(() => {
        preload();
      }, 100);
      // console.log(data.genres);
      dataVar = data;
      // console.log(dataVar);
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
        <p class="modal__description-title">About<button class="modal__button-play" type="button" data-value="${filmId}"><img class="modal__button-play-wrapper" src="${playBtn}" alt="trailer"></button></p>
        <p class="modal__description-about">${data.overview}</p>
    </div>
    <div class="modal__buttons" >
        <button class="modal__button modal__button--watched" type="button" data-value="watched">ADD TO WATCHED</button>
        <button class="modal__button modal__button--queue" type="button" data-value="queue">ADD TO QUEUE</button>
    </div>
  </div>
  `;
      refs.modalFilm.insertAdjacentHTML('beforeend', filmInfo);
      refs.modalFilm.classList.remove('is-hidden');
      const btnCloseModal =
        refs.modalFilm.getElementsByClassName('button-close')[0];
      btnCloseModal.addEventListener('click', closeModalByBtn);

      const btnTrailerModal =
        refs.modalFilm.getElementsByClassName('modal__button-play')[0];
      // btnTrailerModal.addEventListener('click', FUNCTION(filmId)); -------- сюди додату функцію для відтворення трейлера
      btnTrailerModal.addEventListener('click', showTrailer);

      async function showTrailer(e) {
        let trailerId = e.currentTarget.dataset.value;
        try {
          const data = await getTrailerById(trailerId);

          if (data.length === 0 || data === undefined) {
            Notiflix.Notify.failure('Sorry, trailer not found.');
            return;
          }

          let key = '';
          data.forEach(element => {
            if (element.type === 'Trailer') {
              if (element.name.includes('Official')) {
                key = element.key;
                return;
              }
            }
          });

          if (!key) {
            key = data[0].key;
          }

          instance = basicLightbox.create(
            `                
              <iframe class="youtube-modal" allow="fullscreen" src="https://www.youtube.com/embed/${key}"></iframe>
                
            `,
            {
              onShow: () => {
                // console.log('Добавили ESC');
                document.addEventListener('keydown', onPressEscape);
              },
              onClose: () => {
                // console.log('Убрали ESC');
                document.removeEventListener('keydown', onPressEscape);
              },
            }
          );

          instance.show();
        } catch (error) {
          Notiflix.Notify.failure('Sorry, trailer not found.');
        }
      }

      function onPressEscape(event) {
        if (event.key === 'Escape') {
          instance.close(() => {
            // console.log('Закрыли, когда нажали ESC');
          });
        }
      }

      // ===================================================================================
      const buttonsWrapper =
        refs.modalFilm.getElementsByClassName('modal__buttons')[0];
      buttonsWrapper.setAttribute('firebase-id', firebaseId);
      const addQueueBtn = refs.modalFilm.getElementsByClassName(
        'modal__button--queue'
      )[0];
      const addWatchedBtn = refs.modalFilm.getElementsByClassName(
        'modal__button--watched'
      )[0];

      if (document.title === 'My library') {
        buttonsWrapper.removeEventListener('click', handleSaveData);

        addQueueBtn.addEventListener('click', deleteQueue);
        addWatchedBtn.addEventListener('click', deleteWatched);
        if (refs.btnWatched.classList.contains('button--active')) {
          // console.log('watched');
          getDocs(colRefWatched).then(snapshot => {
            snapshot.docs.forEach(doc => {
              const data = [doc.data()].some(el => {
                return el['id'] === Number(filmId);
              });
              // ? (addWatchedBtn.textContent = 'Remove from Watched')
              // : null;
              // return;
              if (data) {
                // console.log(addWatchedBtn);
                addQueueBtn.style.display = 'none';
                addWatchedBtn.style.display = 'block';
                addWatchedBtn.textContent = 'Remove from Watched';

                return;
              }
              //  else {
              //   addWatchedBtn.style.display = 'none';
              //   addQueueBtn.style.display = 'block';
              // }
              //
            });
          });
        } else if (refs.btnQueue.classList.contains('button--active')) {
          // console.log('queue');
          getDocs(colRefQueue).then(snapshot => {
            snapshot.docs.forEach(doc => {
              const data = [doc.data()].some(el => {
                return el['id'] === Number(filmId);
              });
              // ? (addQueueBtn.textContent = 'Remove from Queue')
              // : null;
              // return;
              // console.log(data);
              if (data) {
                // console.log(addQueueBtn);
                addWatchedBtn.style.display = 'none';
                addQueueBtn.style.display = 'block';
                addQueueBtn.textContent = 'Remove from Queue';

                return;
              }
              //  else {
              //   addQueueBtn.style.display = 'none';
              //   addWatchedBtn.style.display = 'block';
              //   return;
              // }
              // ? (addQueueBtn.textContent = 'Remove from Queue')
              // : null;
            });
          });
        }
      } else if (document.title === 'Home') {
        onAuthStateChanged(auth, user => {
          if (user) {
            buttonsWrapper.addEventListener('click', handleSaveData);

            getDocs(colRefWatched).then(snapshot => {
              snapshot.docs.forEach(doc => {
                [doc.data()].some(el => {
                  return el['id'] === Number(filmId);
                })
                  ? addWatchedBtn.setAttribute('disabled', '')
                  : null;
              });
            });

            getDocs(colRefQueue).then(snapshot => {
              snapshot.docs.forEach(doc => {
                [doc.data()].some(el => {
                  return el['id'] === Number(filmId);
                })
                  ? addQueueBtn.setAttribute('disabled', '')
                  : null;
              });
            });
          } else {
            Notiflix.Notify.info('Just sign up for save movies!');
            addQueueBtn.classList.add('visually-hidden');
            addWatchedBtn.classList.add('visually-hidden');
            addQueueBtn.setAttribute('disabled', '');
            addWatchedBtn.setAttribute('disabled', '');
          }
        });
      }
    });
}

// console.log(trueSearch);

function handleSaveData(e) {
  const { target, currentTarget } = e;
  const addQueueBtn = refs.modalFilm.getElementsByClassName(
    'modal__button--queue'
  )[0];
  const addWatchedBtn = refs.modalFilm.getElementsByClassName(
    'modal__button--watched'
  )[0];

  if (target === currentTarget) {
    return;
  }
  if (target === addQueueBtn) {
    saveData(colRefQueue, dataVar);
    target.setAttribute('disabled', '');
    return;
  } else if (target === addWatchedBtn) {
    saveData(colRefWatched, dataVar);
    target.setAttribute('disabled', '');
    return;
  }
}

function saveData(collectionRef, data) {
  // console.log(collectionRef);
  Notiflix.Notify.success(
    `Movie has saved to ${collectionRef._path.segments[1]}`
  );
  addDoc(collectionRef, data);
}

// const trailerBtn = document.querySelector('.modal__button-play');
// console.log(trailerBtn);
