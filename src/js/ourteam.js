(() => {
  const refs = {
    openModalBtn: document.querySelector('.footer__link'),
    closeModalBtn: document.querySelector('.team-modal__button'),
    modal: document.querySelector('.js-team__modal'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.modal.addEventListener('click', onBackdroplick);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

  function onBackdroplick(evt) {
    if (evt.currentTarget === evt.target) {
      toggleModal();
      refs.modal.removeEventListener('click', onBackdroplick);
    }
  }
})();
// console.log(refs);
