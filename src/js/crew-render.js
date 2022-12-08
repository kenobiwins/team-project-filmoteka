import IevgenPlakhotniuk from '../images/team-modal/IevgenPlakhotniuk.jpg';
import MaximSidorenko from '../images/team-modal/MaximSidorenko.jpeg';
import ArtemFedorets from '../images/team-modal/ArtemFedorets.jpeg';
import VladyslavSolomakha from '../images/team-modal/VladyslavSolomakha.jpeg';
import SvitlanaBorovec from '../images/team-modal/SvitlanaBorovec.jpg';
import SemenZvehintsev from '../images/team-modal/SemenZvehintsev.jpg';
import SergeyKotcinskiy from '../images/team-modal/SergeyKotcinskiy.jpeg';
import DmitryYerenko from '../images/team-modal/DmitryYerenko.jpg';
import BogdanYanishevskyy from '../images/team-modal/BogdanYanishevskyy.jpg';

import symbolDefs from '../images/svg/symbol-defs.svg';

// console.log(img);
const dataTeam = [
  {
    name: 'Maxim Sidorenko',
    photo: `${MaximSidorenko}`,
    teamWrapper: 'Team-leader',
    facebook: '#',
    linkedin: 'https://www.linkedin.com/in/max-sidorenko-1a47bb243/',
    git: 'https://github.com/kenobiwins',
  },
  {
    name: 'Ievgen Plakhotniuk',
    photo: `${IevgenPlakhotniuk}`,
    teamWrapper: 'Scrum master',
    facebook: 'https://www.facebook.com/profile.php?id=100001253028429',
    linkedin: 'https://www.linkedin.com/in/ievgen-plakhotniuk-733ab3139/',
    git: 'https://github.com/ievsepl',
  },
  {
    name: 'Artem Fedorets',
    photo: `${ArtemFedorets}`,
    teamWrapper: 'Full-stack developer',
    facebook: 'https://www.facebook.com/profile.php?id=100008552139741',
    linkedin: 'https://www.linkedin.com/in/artem-fedorets-6015b3242/',
    git: 'https://github.com/fedorzvyk',
  },
  {
    name: 'VladyslavSolomakha',
    photo: `${VladyslavSolomakha}`,
    teamWrapper: 'Full-stack developer',
    facebook: '#',
    linkedin: 'https://www.linkedin.com/in/vladyslav-solomakha-281594259',
    git: 'https://github.com/Vladislav777888',
  },
  {
    name: 'Svitlana Borovec',
    photo: `${SvitlanaBorovec}`,
    teamWrapper: 'Full-stack developer',
    facebook: 'https://www.facebook.com/profile.php?id=100017139797534',
    linkedin: '#',
    git: '#',
  },
  {
    name: 'Dmitry Yerenko',
    photo: `${DmitryYerenko}`,
    teamWrapper: 'Full-stack developer',
    facebook: '#',
    linkedin: 'https://www.linkedin.com/in/dmitry-yerenko-70b796259/',
    git: '#',
  },
  {
    name: 'SemenZvehintsev',
    photo: `${SemenZvehintsev}`,
    teamWrapper: 'Full-stack developer',
    facebook: 'https://www.facebook.com/kvadratniibomzh/',
    linkedin: '#',
    git: '#',
  },
  {
    name: 'Sergey Kotcinskiy',
    photo: `${SergeyKotcinskiy}`,
    teamWrapper: 'Full-stack developer',
    facebook:
      'https://www.facebook.com/profile.php?id=100083799061802&mibextid=LQQJ4d',
    linkedin: 'http://linkedin.com/in/serhii-kotsynskyi-08156122a',
    git: '#',
  },
  {
    name: 'Bogdan Yanishevskyy',
    photo: `${BogdanYanishevskyy}`,
    teamWrapper: 'Full-stack developer',
    facebook: '#',
    linkedin: 'https://www.linkedin.com/in/bogdan-yanishevskyy-65357a151/',
    git: 'https://github.com/Bogdan-Yanish',
  },
];
const teamList = document.querySelector('.team__list');

const name = dataTeam
  .map(
    ({
      name,
      photo,
      teamWrapper,
      facebook,
      linkedin,
      git,
    }) => `<li class="team__item">
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
                ><svg width="20" height="20">
                  <use href=${symbolDefs}#icon-github></use></svg
              ></a>
            </li>
            <li>
              <a
                class="team__link"
                href="${linkedin}"
              >
                <svg width="20" height="20">
                  <use href='${symbolDefs}#icon-linkedin'></use>
                </svg>
              </a>
            </li>
             <li>
              <a class="team__link" href="${facebook}"
                ><svg width="20" height="20">
                  <use href='${symbolDefs}#icon-facebook'></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </li>`
  )
  .join('');

teamList.insertAdjacentHTML('afterbegin', name);
