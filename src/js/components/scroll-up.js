const buttonUpRef = document.querySelector('.button-up');
if (document.title === 'Filmoteka') {
  buttonUpRef.addEventListener('click', smoothScrollUp);
}
export function smoothScrollUp() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
