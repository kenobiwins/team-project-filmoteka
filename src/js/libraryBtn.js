import { save, load, remove } from './localStorageAPI/localstorage';
import { refs } from './refs/refs';
import { fullFilmInfo, createGalery } from './render';
import { onBtnQueue, onBtnWatched } from './my-library';

const refs = {
    libraryFilmList:document.querySelector('.library'),
}

function toggleItems(movie, storageKey) {
    let storedItems = load(storageKey);

    if (Array.isArray(storedItems)) {
        const isIndex = storedItems.findIndex(item => item.id === id);
    if (isIndex > -1) {
        storedItems.splice(isIndex, 1);
    } else {
        storedItems.push(movie);
    }
    } else {
        storedItems = [movie];
    }
    save(storageKey, storedItems);
}

export function toggleWatched(movie) {
    toggleItems(movie, 'watched');
}

export function toggleQueue(movie) {
    toggleItems(movie, 'queue');
}

function findMovieIndex(movieId, storageKey) {
    let items = load(storageKey);
    if (Array.isArray(items)) {
    return items.findIndex(item => item.id === movieId);
    }
    return -1;
}

export function isMovieWatched(movieId) {
    return findMovieIndex(movieId, 'watched') > -1;
}

export function isMovieQueued(movieId) {
    return findMovieIndex(movieId, 'queue') > -1;
}

export function loadWatchedMovies() {
    const watchedMovies = load('watched') || [];
    if (watchedMovies.length !== 0) {
    refs.libraryMovieList.innerHTML = fullFilmInfo(watchedMovies);
    } else {
    refs.libraryMovieList.innerHTML = `<span> 😟 🙈 </span>`;
    }
}

export function loadQueuedMovies() {
    const queuedMovies = load('queue') || [];
    if (queuedMovies.length !== 0) {
    refs.libraryMovieList.innerHTML = fullFilmInfo(queuedMovies);
    } else {
    refs.libraryMovieList.innerHTML = `<span> 😟 🙈 </span>`;
    }
}

function onBtnQueueClick() {
    onBtnQueue();
    loadQueuedMovies();
}

function onBtnWatchedClick() {
    onBtnWatched();
    loadWatchedMovies();
}

refs.btnQueue.addEventListener('click', onBtnQueueClick);
refs.btnWatched.addEventListener('click', onBtnWatchedClick);
