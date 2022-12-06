const toggleSwitch = document.querySelector('.theme');
const lightIcon = document.querySelector('.lightTheme__icon');
const darkIcon = document.querySelector('.darkTheme__icon');
const html = document.querySelector('html');
const footerChange = document.querySelector('.footer');

const darkLibrary = document.querySelector('.site-nav__link');
toggleSwitch.addEventListener('click', setTheme);
let savedTheme = '';
window.addEventListener('load', rememberDarkForLib);
// darkLibrary.addEventListener('click', rememberDarkForLib);

function setTheme() {
  switchTheme();
  localStorage.setItem('ui-theme', html.classList.value);
}
function switchTheme() {
  html.classList.toggle('dark');
  lightIcon.classList.toggle('is-darkTheme');
  darkIcon.classList.toggle('is-lightTheme');
  footerChange.classList.toggle('footer-color');
}

function rememberDarkForLib(e) {
  savedTheme = localStorage.getItem('ui-theme');
  console.log(savedTheme);

  if (savedTheme !== 'dark') {
    return;
  } else {
    switchTheme();
  }
}
