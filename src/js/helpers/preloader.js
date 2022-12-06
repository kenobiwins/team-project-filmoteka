const preloaderRef = document.querySelector('.preloader');

export function preload() {
  preloaderRef.classList.toggle('visually-hidden');
}
