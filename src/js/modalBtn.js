import {
    toggleWatched,
    toggleQueue,
    isMovieWatched,
    isMovieQueued,
    loadWatchedMovies,
    loadQueuedMovies,
} from './libraryBtn';
  
import { refs } from './refs';

const refs = {
    libraryMovieList:document.querySelector('.library'),
}
  
const refsBtn = {
    addWatchedBtn: null,
    addQueueBtn: null,
};
  
function updateWatchedBtnTextContent(movieId) {
    if (isMovieWatched(movieId)) {
        refsBtn.addWatchedBtn.textContent = 'Remove from watched';
        refsBtn.addWatchedBtn.classList.add('active');
    } else {
        refsBtn.addWatchedBtn.textContent = 'Add to watched';
        refsBtn.addWatchedBtn.classList.remove('active');
    }
}
  
function updateQueuedBtnTextContent(movieId) {
    if (isMovieQueued(movieId)) {
        refsBtn.addQueueBtn.textContent = 'Remove from queued';
        refsBtn.addQueueBtn.classList.add('active');
    } else {
        refsBtn.addQueueBtn.textContent = 'Add to queued';
        refsBtn.addQueueBtn.classList.remove('active');
    }
}
  
export function setupModalButtons(movie) {
    refsBtn.addWatchedBtn = document.querySelector('#btn-addwatched');
    refsBtn.addQueueBtn = document.querySelector('#btn-addqueue');

    refsBtn.addWatchedBtn.addEventListener('click', () => {
        toggleWatched(movie);
        updateWatchedBtnTextContent(id);
  
        if (
        !refs.libraryMovieList ||
        !refs.btnWatched.classList.value.includes('modal__button--active')
        ) {
        return;
        }
  
    loadWatchedMovies();
    });

    refsBtn.addQueueBtn.addEventListener('click', () => {
        toggleQueue(movie);
        updateQueuedBtnTextContent(id);
  
        if (
        !refs.libraryMovieList ||
        !refs.btnQueue.classList.value.includes('modal__button--active')
        ) {
        return;
        }
    loadQueuedMovies();
    });

    updateWatchedBtnTextContent(id);
    updateQueuedBtnTextContent(id);
}