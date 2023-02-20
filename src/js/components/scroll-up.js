const buttonUpRef = document.querySelector('.button-up');
if (document.title === 'Filmoteka') {
  buttonUpRef.addEventListener('click', smoothScrollUp);
  window.onscroll = () => changeScrollButtonVisibility();
}

function changeScrollButtonVisibility() {
  const { scrollHeight, scrollTop } = document.documentElement;

  const offsetTrigger = scrollHeight / 4;
  const pageOffset = scrollTop;

  if (pageOffset > offsetTrigger) {
    buttonUpRef.classList.remove('visually-hidden');
  } else {
    buttonUpRef.classList.add('visually-hidden');
  }
}

export function smoothScrollUp() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
