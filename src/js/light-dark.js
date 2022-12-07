const html = document.querySelector('html');
const toggleSwitch = document.querySelector('.theme');
const lightIcon = document.querySelector('.lightTheme__icon');
const darkIcon = document.querySelector('.darkTheme__icon');
const footerChange = document.querySelector('.footer');

let savedTheme = '';

toggleSwitch.addEventListener('click', setTheme);

window.addEventListener('load', rememberDarkForLib);

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
  // console.log(savedTheme);

  if (savedTheme !== 'dark') {
    return;
  } else {
    switchTheme();
  }
}
