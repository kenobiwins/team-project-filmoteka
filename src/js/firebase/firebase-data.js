import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase-init';
import { refs } from '../refs/refs';
// import { closeModalOnBtn, showInfoFromFirebase } from '../render/renderModal';
import { closeModal, fullFilmInfo } from '../render';
// import { ALT_IMAGE_URL, insertMarkup } from '../render/renderCards';
import { FAKE_POSTER } from '../render';
import Notiflix from 'notiflix';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, handleSignOut } from './firebase-auth';

// collection ref
let colRefWatched = collection(db, 'watched/');
let colRefQueue = collection(db, 'queue/');
let USER_ID = '';
// func for insert
function insertMarkup(refOnContainer, markup) {
  return (refOnContainer.innerHTML = markup);
}

onAuthStateChanged(auth, user => {
  if (user) {
    USER_ID = user.uid;
    colRefWatched = collection(db, `${user.uid}/watched/movies/`);
    colRefQueue = collection(db, `${user.uid}/queue/movies/`);
  }
});

if (document.title === 'My library') {
  onAuthStateChanged(auth, user => {
    if (user) {
      USER_ID = user.uid;
      colRefWatched = collection(db, `${user.uid}/watched/movies/`);
      colRefQueue = collection(db, `${user.uid}/queue/movies/`);

      // getWatchedCollection();
    } else {
      return;
    }
    getWatchedCollection();
  });

  //  loader start
  // get collection data watched
  refs.getWatchedDataBtn.addEventListener('click', getWatchedCollection);
  // get collection data queue
  refs.getQueueDataBtn.addEventListener('click', getQueueCollection);
  // loader remove

  return;
} else {
  return;
}

async function getWatchedCollection(e) {
  // Notiflix.Loading.standard();

  // refs.getQueueDataBtn.classList.contains('button--active')
  //   ? refs.getQueueDataBtn.classList.remove('button--active')
  //   : null;

  // refs.getWatchedDataBtn.classList.add('button--active');

  getDocs(colRefWatched)
    .then(async snapshot => {
      return getData(snapshot);
    })
    .then(async data => {
      // Notiflix.Loading.remove();

      if (data.length === 0) {
        showEmptyData('watched');
        return;
      }

      insertMarkup(refs.galleryLibrary, await renderByFirebase(data));

      //   refs.addWatchedBtn.classList.remove('visually-hidden');
      //   refs.addWatchedBtn.textContent = 'Delete from watched';
      //   refs.addQueueBtn.classList.add('visually-hidden');
      refs.galleryLibrary.addEventListener('click', fullFilmInfo);
      //   refs.addWatchedBtn.addEventListener('click', deleteWatched);
    })
    .catch(error => {
      console.log(error);
    });
}

function getQueueCollection(e) {
  // Notiflix.Loading.standard();

  // refs.getWatchedDataBtn.classList.contains('button--active')
  //   ? refs.getWatchedDataBtn.classList.remove('button--active')
  //   : null;

  // refs.getQueueDataBtn.classList.add('button--active');

  getDocs(colRefQueue)
    .then(async snapshot => {
      return getData(snapshot);
    })
    .then(async data => {
      // Notiflix.Loading.remove();
      if (data.length === 0) {
        showEmptyData('queue');
        return;
      }

      insertMarkup(refs.galleryLibrary, await renderByFirebase(data));

      //   refs.addQueueBtn.classList.remove('visually-hidden');
      //   refs.addQueueBtn.textContent = 'Delete from queue';
      //   refs.addWatchedBtn.classList.add('visually-hidden');
      refs.galleryLibrary.addEventListener('click', fullFilmInfo);

      //   refs.addQueueBtn.addEventListener('click', deleteQueue);
    })
    .catch(error => {
      console.log(error);
    });
}

function renderByFirebase(data) {
  console.log(data);
  return data.reduce(
    (
      acc,
      {
        poster_path,
        title,
        genre_ids = "haven't genres",
        vote_average,
        name,
        release_date,
        id,
        baseId,
      },
      i
    ) => {
      //   const genres = data[i].genres.map(el => {
      //     return el.name;
      //   });

      if (
        typeof poster_path === 'undefined' ||
        typeof poster_path === 'object'
      ) {
        poster_path = FAKE_POSTER;
      } else {
        poster_path = 'https://image.tmdb.org/t/p/w500/' + poster_path;
      }
      //       acc += `<li class="films-list__item" data-id="${id}" firebase-id="${baseId}">
      //   <a href="" class="films-list__link">
      //     <img
      //       src="${poster_path}"
      //       alt="${title}"
      //       class="films-list__img"
      //       loading="lazy"
      //     />
      //     <h2 class="films-list__title">${title}</h2>
      //     <span class="films-list__text-ganres">${genre_ids}</span>
      //     <span class="films-list__span">|</span>
      //     <span class="films-list__text-date">${release_date}|</span>
      //     <span class="films-list__text-rating">${vote_average}</span>
      //   </a>
      // </li>`;
      acc += `<li class="films-list__item"  data-id='${id}' firebase-id="${baseId}">
        <img src='${poster_path}' loading='lazy'/>
        <h3 class="movie-card__name">${title || name}</h3>
        <p class="movie-card__genres">
          ${
            // genres.length === 0 ? "haven't genre" : genres.join(', ')
            'genres'
          }
           <span class="movie-card__ratio">${
             vote_average ? vote_average : "haven't ratio"
           }</span>
        </p>
      </li>`;
      return acc;
    },
    ''
  );
}

function getData(snapshot) {
  let collection = [];

  snapshot.docs.forEach(doc => {
    collection.push({ ...doc.data(), baseId: doc.id });
  });
  return collection;
}

function deleteData(path_to_folder, e) {
  // const { target } = e;
  const filmId = e.target.closest('div').getAttribute('firebase-id');
  // console.log(filmId);
  const docRef = doc(db, `${path_to_folder}`, filmId);
  deleteDoc(docRef);
  document.body.style.overflow = 'auto';
}

function handleDeleteData(e, path_to_folder, coolectionRef) {
  deleteData(`${path_to_folder}`, e);
  // const { target } = e;
  // const filmId = target.closest('div').getAttribute('firebase-id');

  // const docRef = doc(db, 'watched', filmId);
  // deleteDoc(docRef);
  getDocs(coolectionRef)
    .then(snapshot => {
      console.log(snapshot);
      return getData(snapshot);
    })
    .then(async data => {
      insertMarkup(refs.galleryLibrary, await renderByFirebase(data));
      //   closeModal();
      refs.modalFilm.classList.add('is-hidden');
    });
}

function deleteQueue(e) {
  return handleDeleteData(e, `${USER_ID}/queue/movies`, colRefQueue);
}

function deleteWatched(e) {
  return handleDeleteData(e, `${USER_ID}/watched/movies`, colRefWatched);
}

function showEmptyData(name) {
  Notiflix.Notify.info(`Your ${name} tab is empty 😔`);
}

export {
  colRefQueue,
  colRefWatched,
  deleteWatched,
  deleteQueue,
  handleDeleteData,
  saveData,
};
