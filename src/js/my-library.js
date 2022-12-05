import { refs } from './refs/refs';

refs.btnWatched.addEventListener('click', onBtnWatched);
refs.btnQueue.addEventListener('click', onBtnQueue);

export function onBtnQueue(evt) {
  evt.preventDefault();
  refs.btnWatched.classList.remove('button--active');
  evt.target.classList.add('button--active');
}

export function onBtnWatched(evt) {
  evt.preventDefault();
  refs.btnQueue.classList.remove('button--active');
  evt.target.classList.add('button--active');
}
