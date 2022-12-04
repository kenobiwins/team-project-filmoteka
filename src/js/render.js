import {
  getPopularMovies,
  searchMovies,
  getMovieById,
  getGenresList,
  getTrailerById,
} from './API/API';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';
const FAKE_POSTER =
  'https://freesvg.org/img/cyberscooty-movie-video-tape-remix.png';
const LOCALSTORAGE_KEY = 'genres';
const galleryRef = document.querySelector('.films-list');
const formRef = document.querySelector('.page-header__form');
const inputRef = document.querySelector('.page-header__input');
const errorSearchRef = document.querySelector('.page-header__error-text');
// let searchQuery = '';
let page = 1;

formRef.addEventListener('submit', onFormSubmit);

//--------------------RENDER POPULAR MOVIES-----------------
getPopularMovies(page).then(data => {
  galleryMarkup(createGalery(data));
});

//--------------------RENDER GALLERY BY SEARCH-----------------
function onFormSubmit(e) {
  e.preventDefault();
  const {
    currentTarget: { searchQuery },
  } = e;
  // Loading.circle();
  // let searchQuery = inputRef.value.trim();
  if (searchQuery != '') {
    searchMovies(searchQuery.value.trim(), page).then(data => {
      if (data.data.results.length === 0) {
        errorSearchRef.classList.remove('is-hidden');
        setTimeout(() => {
          errorSearchRef.classList.add('is-hidden');
        }, 5000);

        inputRef.value = '';
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

function createGalery(data) {
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
  galleryRef.insertAdjacentHTML('beforeend', string);
}

function clearGallery() {
  galleryRef.innerHTML = '';
}

// console.log(getPopularMovies(page));

// console.log(getMovieById(67892));

// console.log(getTrailerById(436270));
