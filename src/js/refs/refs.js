export { refs };

const refs = {
  btnWatched: document.querySelector('#btn-watched'),
  btnQueue: document.querySelector('#btn-queue'),
  form: document.querySelector('.page-header__form'),
  pagination: document.querySelector('.pagination'),
  galleryHome: document.querySelector('.films-list'),
  galleryLibrary: document.querySelector('.library'),
  filmsList: document.querySelector('.films-list'),
  errorSearchRef: document.querySelector('.page-header__error-text'),
  modalFilm: document.querySelector('.backdrop'),
  hrefIcon: document.querySelector('.button-close-img').getAttribute('href'),
  /* звідси беру вже зібране парселом посилання */
  signUpBtn: document.querySelector('.link[data-action="sign-up"]'),
  backdropRegister: document.querySelector('.backdrop[data-value="sign-up"]'),
  modalRegister: document.querySelector('.modal[data-value="sign-up"]'),
  formRegister: document.querySelector('.signup'),
  formLogin: document.querySelector('.login[data-value="login"]'),
  buttonLogin: document.querySelector('.modal__button[data-action="login"]'),
  buttonLoginWithGoogle: document.querySelector(
    '.modal__button[data-action="login-with-google"]'
  ),
  addWatchedBtn: document.querySelector('.modal__button[data-value="watched"]'),
  addQueueBtn: document.querySelector('.modal__button[data-value="queue"]'),
  buttonLogout: document.querySelector('.modal__button[data-action="logout"]'),
  headerNav: document.querySelector('.site-nav__list'),
  buttonCloseRegister: document.querySelector(
    '.button-close[data-value="sign-up"]'
  ),
  getWatchedDataBtn: document.querySelector(
    '.button--watched[data-value="watched"]'
  ),
  getQueueDataBtn: document.querySelector('.button--queue[data-value="queue"]'),
  preloaderRef: document.querySelector('.preloader'),
  buttonsWrapper: document.querySelector('.modal__buttons'),
};
