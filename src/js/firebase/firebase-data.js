import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase-init';
import { refs } from '../refs/refs';
// import { closeModalOnBtn, showInfoFromFirebase } from '../render/renderModal';
import { closeModal, fullFilmInfo } from '../render';
// import { ALT_IMAGE_URL, insertMarkup } from '../render/renderCards';
// import { FAKE_POSTER } from '../render';
import Notiflix from 'notiflix';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, handleSignOut } from './firebase-auth';
import { preload } from '../helpers/preloader';
import fakePoster from '../../images/no-poster/no-poster.jpg';

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
  preload();
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
    preload();
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
  preload();
  setTimeout(() => {
    preload();
  }, 300);
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
        // insertMarkup(refs.galleryLibrary, await renderByFirebase(data));
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
  preload();
  setTimeout(() => {
    preload();
  }, 300);
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
        // insertMarkup(refs.galleryLibrary, await renderByFirebase(data));
        return;
      }

      insertMarkup(refs.galleryLibrary, await renderByFirebase(data));

      // addQueueBtn.classList.remove('visually-hidden');
      // addQueueBtn.textContent = 'Delete from queue';
      // addWatchedBtn.classList.add('visually-hidden');
      refs.galleryLibrary.addEventListener('click', fullFilmInfo);

      //   refs.addQueueBtn.addEventListener('click', deleteQueue);
    })
    .catch(error => {
      console.log(error);
    });
}

function renderByFirebase(data) {
  return data.reduce(
    (
      acc,
      {
        poster_path,
        title,
        genres,
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
      // console.log(poster_path);
      if (
        typeof poster_path === 'undefined' ||
        typeof poster_path === 'object' ||
        poster_path.includes('no-poster')
      ) {
        poster_path = fakePoster;
      } else {
        poster_path = 'https://image.tmdb.org/t/p/w500/' + poster_path;
      }
      acc += `<li class="films-list__item" data-id="${id}" firebase-id="${baseId}">
        <a href="" class="films-list__link">
          <img
            src="${poster_path}"
            alt="${title}"
            class="films-list__img"
            loading="lazy"
          />
          <h3 class="films-list__title">${title}</h3>
          <p class="films-list__text-ganres">
            ${genres} | ${
        release_date.split('-')[0]
      }  <span class="films-list__text-rating"
        >${String(vote_average).slice(0, 3)}</span
      >
          </p>
        </a>
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
      // console.log(snapshot);
      return getData(snapshot);
    })
    .then(async data => {
      if (data.length === 0 && path_to_folder.includes('watched')) {
        refs.modalFilm.classList.add('is-hidden');
        return showEmptyData(`watched`);
      } else if (data.length === 0 && path_to_folder.includes('queue')) {
        refs.modalFilm.classList.add('is-hidden');
        return showEmptyData('queue');
      } else {
        insertMarkup(refs.galleryLibrary, await renderByFirebase(data));
        refs.modalFilm.classList.add('is-hidden');
        return;
      }
      //   closeModal();
    });
}

function deleteQueue(e) {
  return handleDeleteData(e, `${USER_ID}/queue/movies`, colRefQueue);
}

function deleteWatched(e) {
  return handleDeleteData(e, `${USER_ID}/watched/movies`, colRefWatched);
}

function showEmptyData(name) {
  // Notiflix.Notify.info(`Your ${name} tab is empty 😔`);

  refs.galleryLibrary.innerHTML = `<p>Your ${name} tab is empty 😔</p>`;
}

export {
  colRefQueue,
  colRefWatched,
  deleteWatched,
  deleteQueue,
  handleDeleteData,
};
