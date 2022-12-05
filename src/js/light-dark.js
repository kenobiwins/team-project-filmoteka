const toggleSwitch = document.querySelector('.theme');
const lightIcon = document.querySelector('.lightTheme__icon');
const darkIcon = document.querySelector('.darkTheme__icon');
toggleSwitch.addEventListener('click', switchTheme);

function switchTheme(e) {
  console.log(e.target);
  console.log('e.target');
  //   document.documentElement.classList.toggle('dark');
  document.body.classList.toggle('dark');
  lightIcon.classList.toggle('is-darkTheme');
  darkIcon.classList.toggle('is-lightTheme');

  //   if (e.target) {
  // document.html.classList.toggle('dark');

  //     document.documentElement.setAttribute('data-theme', 'dark');
  //   } else {
  //     document.documentElement.setAttribute('data-theme', 'light');
  //     console.log(e.target);
  //   }
}

// toggleSwitch.addEventListener('change', switchTheme, false);
