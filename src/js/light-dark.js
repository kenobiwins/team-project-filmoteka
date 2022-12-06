const toggleSwitch = document.querySelector('.theme');
const lightIcon = document.querySelector('.lightTheme__icon');
const darkIcon = document.querySelector('.darkTheme__icon');
const html = document.querySelector('html');
const footerChange = document.querySelector('.footer');
toggleSwitch.addEventListener('click', switchTheme);
function switchTheme() {
  //   document.documentElement.classList.toggle('dark');
  html.classList.toggle('dark');
  lightIcon.classList.toggle('is-darkTheme');
  darkIcon.classList.toggle('is-lightTheme');
  footerChange.classList.toggle('footer-color');
  //   if (e.target) {
  // document.html.classList.toggle('dark');

  //     document.documentElement.setAttribute('data-theme', 'dark');
  //   } else {
  //     document.documentElement.setAttribute('data-theme', 'light');
  //     console.log(e.target);
  //   }
}

// toggleSwitch.addEventListener('change', switchTheme, false);
