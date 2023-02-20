import { refs } from '../refs/refs';
export function preload() {
  refs.preloaderRef.classList.toggle('visually-hidden');

  if (refs.preloaderRef.classList.contains('visually-hidden')) {
    document.body.classList.remove('no-scroll');
  } else {
    document.body.classList.add('no-scroll');
  }
}
