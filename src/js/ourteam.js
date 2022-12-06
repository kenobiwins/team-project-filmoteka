const refs = {
  openModalBtn: document.querySelector('.footer__link'),
  closeModalBtn: document.querySelector('.team-modal__button'),
  modal: document.querySelector('.js-team__modal'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.modal.addEventListener('click', onBackdroplick);

function onOpenModal() {
  window.addEventListener('keydown', onEscCloseModal);
  document.body.style.overflow = 'hidden';
  refs.modal.classList.remove('is-hidden');
}
function onCloseModal() {
  refs.modal.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
}
function onBackdroplick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

function onEscCloseModal(e) {
  const KEY_CODE = 'Escape';
  if (e.code === KEY_CODE) {
    onCloseModal();
  }
}
// console.log(refs);
