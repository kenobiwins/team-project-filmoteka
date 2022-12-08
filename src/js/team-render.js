import ievgenPlakhotniuk from '../images/team-modal/ievgen-plakhotniuk.jpg';
import maximSidorenko from '../images/team-modal/maxim-sidorenko.jpeg';
import artemFedorets from '../images/team-modal/artem-fedorets.jpeg';
import vladyslavSolomakha from '../images/team-modal/vladyslav-solomakha.jpeg';
import svitlanaBorovec from '../images/team-modal/svitlana-borovec.jpg';
import semenZvehintsev from '../images/team-modal/semen-zvehintsev.jpg';
import sergeyKotcinskiy from '../images/team-modal/sergey-kotcinskiy.jpeg';
import dmitryYerenko from '../images/team-modal/dmitry-yerenko.jpg';
import bogdanYanishevskyy from '../images/team-modal/bogdan-yanishevskyy.jpg';

import symbolDefs from '../images/svg/symbol-defs.svg';

const dataTeam = [
  {
    name: 'Maxim Sidorenko',
    photo: `${maximSidorenko}`,
    teamWrapper: 'Team-leader',
    facebook: 'user has no this site',
    linkedin: 'https://www.linkedin.com/in/max-sidorenko-1a47bb243/',
    git: 'https://github.com/kenobiwins',
  },
  {
    name: 'Ievgen Plakhotniuk',
    photo: `${ievgenPlakhotniuk}`,
    teamWrapper: 'Scrum master',
    facebook: 'https://www.facebook.com/profile.php?id=100001253028429',
    linkedin: 'https://www.linkedin.com/in/ievgen-plakhotniuk-733ab3139/',
    git: 'https://github.com/ievsepl',
  },
  {
    name: 'Artem Fedorets',
    photo: `${artemFedorets}`,
    teamWrapper: 'Full-stack developer',
    facebook: 'https://www.facebook.com/profile.php?id=100008552139741',
    linkedin: 'https://www.linkedin.com/in/artem-fedorets-6015b3242/',
    git: 'https://github.com/fedorzvyk',
  },
  {
    name: 'Vladyslav Solomakha',
    photo: `${vladyslavSolomakha}`,
    teamWrapper: 'Full-stack developer',
    facebook: 'user has no this site',
    linkedin: 'https://www.linkedin.com/in/vladyslav-solomakha-281594259',
    git: 'https://github.com/Vladislav777888',
  },
  {
    name: 'Svitlana Borovec',
    photo: `${svitlanaBorovec}`,
    teamWrapper: 'Full-stack developer',
    facebook: 'https://www.facebook.com/profile.php?id=100017139797534',
    linkedin: 'user has no this site',
    git: 'https://github.com/SvitLana22?tab=repositories',
  },
  {
    name: 'Dmitry Yerenko',
    photo: `${dmitryYerenko}`,
    teamWrapper: 'Full-stack developer',
    facebook: 'https://www.facebook.com/profile.php?id=100077680568378',
    linkedin: 'https://www.linkedin.com/in/dmitry-yerenko-70b796259/',
    git: 'https://github.com/Lawyer0901',
  },
  {
    name: 'SemenZvehintsev',
    photo: `${semenZvehintsev}`,
    teamWrapper: 'Full-stack developer',
    facebook: 'https://www.facebook.com/kvadratniibomzh/',
    linkedin: 'user has no this site',
    git: 'user has no this site',
  },
  {
    name: 'Sergey Kotcinskiy',
    photo: `${sergeyKotcinskiy}`,
    teamWrapper: 'Full-stack developer',
    facebook:
      'https://www.facebook.com/profile.php?id=100083799061802&mibextid=LQQJ4d',
    linkedin: 'http://linkedin.com/in/serhii-kotsynskyi-08156122a',
    git: 'https://github.com/pro100katc',
  },
  {
    name: 'Bogdan Yanishevskyy',
    photo: `${bogdanYanishevskyy}`,
    teamWrapper: 'Full-stack developer',
    facebook: 'user has no this site',
    linkedin: 'https://www.linkedin.com/in/bogdan-yanishevskyy-65357a151/',
    git: 'https://github.com/Bogdan-Yanish',
  },
];
const teamList = document.querySelector('.team__list');

const name = dataTeam
  .map(({ name, photo, teamWrapper, facebook, linkedin, git }) => {
    if (facebook === 'user has no this site') {
      return `<li class="team__item">
        <img
          class="team__img"
          src="${photo}"
          alt="${name}"
          width="200"
          height="260"
        />
        <div class="team-wrapper">
          <h3 class="title team-wrapper__title">${name}</h3>
          <p class="team-wrapper__text">${teamWrapper}</p>

          <ul class="team__list-icon">
           
            <li>
              <a class="team__link" href="${git}"
              target="_blank"
                ><svg width="15" height="15">
                  <use href=${symbolDefs}#icon-github></use></svg
              ></a>
            </li>
            <li>
              <a
                class="team__link"
                href="${linkedin}"
                target="_blank"
              >
                <svg width="15" height="15">
                  <use href='${symbolDefs}#icon-linkedin'></use>
                </svg>
              </a>
            </li>             
          </ul>
        </div>
      </li>`;
    } else if (linkedin === 'user has no this site') {
      return `<li class="team__item">
        <img
          class="team__img"
          src="${photo}"
          alt="${name}"
          width="200"
          height="260"
        />
        <div class="team-wrapper">
          <h3 class="title team-wrapper__title">${name}</h3>
          <p class="team-wrapper__text">${teamWrapper}</p>

          <ul class="team__list-icon">
           
            <li>
              <a class="team__link" href="${git}"
              target="_blank"
                ><svg width="15" height="15">
                  <use href=${symbolDefs}#icon-github></use></svg
              ></a>
            </li>            
             <li>
              <a class="team__link" href="${facebook}" target="_blank"
                ><svg width="15" height="15">
                  <use href='${symbolDefs}#icon-facebook'></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </li>`;
    } else
      return `<li class="team__item">
        <img
          class="team__img"
          src="${photo}"
          alt="${name}"
          width="200"
          height="260"
        />
        <div class="team-wrapper">
          <h3 class="title team-wrapper__title">${name}</h3>
          <p class="team-wrapper__text">${teamWrapper}</p>

          <ul class="team__list-icon">
           
            <li>
              <a class="team__link" href="${git}"
              target="_blank"
                ><svg width="15" height="15">
                  <use href=${symbolDefs}#icon-github></use></svg
              ></a>
            </li>
            <li>
              <a
                class="team__link"
                href="${linkedin}"
                target="_blank"
              >
                <svg width="15" height="15">
                  <use href='${symbolDefs}#icon-linkedin'></use>
                </svg>
              </a>
            </li>
             <li>
              <a class="team__link" href="${facebook}" target="_blank"
                ><svg width="15" height="15">
                  <use href='${symbolDefs}#icon-facebook'></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </li>`;
  })
  .join('');

teamList.insertAdjacentHTML('afterbegin', name);
