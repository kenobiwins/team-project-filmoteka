// import { save, load, remove } from './localStorageAPI/localstorage';

// let fetch = {};
// const watched = localStorage.getItem(`allWatchedMovies`);
// const queue = localStorage.getItem(`allQueueMovies`);

// export const allWatched = watched ? JSON.parse(watched) : [];
// export const allQueue = queue ? JSON.parse(queue) : [];

//   const addWatchedBtn = document.querySelector("selector for btn-watched");
//   const addQueuedBtn = document.querySelector("selector - .btn-queue");

//   addWatchedBtn.addEventListener("click", onAddWatchedClick);
//   addQueuedBtn.addEventListener("click", onAddQueueClick);


// function updateWatchedText(id) {
//     // const activeBtn = document.querySelector('selector for btn-watched');
//     const savedId = load("allWatchedMovies");
//     if (savedId) {
//         const userAuth = savedId.find(movie => movie.id === id);
//     if (userAuth) {
//         // activeBtn.classList.add("add class - 'is-active'")
//         activeBtn.textContent = "Remove from watched"
//     }
//     }
// }

// function onAddWatchedClick(event) {
//     // const currentActiveBtn = document.querySelector("selector btn-watched.is-active");
//     const savedLocalInfo = load("allWatchedMovies");
//     // event.currentTarget.classList.toggle("is-active");

//     if (currentActiveBtn) {
//         let index;
//         savedLocalInfo.forEach(({ id }, i) => (id === fetch.id ? (index = i) : i));
//         allWatched.splice(index, 1);
//         save(`allWatchedMovies`, allWatched);
//     }
 
//     const isInArray = savedLocalInfo
//     ? savedLocalInfo.find(({ id }) => id === fetch.id)
//     : false;
  
//     event.currentTarget.textContent = "add to Watched";

//     if (!!isInArray) {
//     return;
//     }

//     event.currentTarget.textContent = "Remove from watched";
//     allWatched.push(fetch);
//     save(`allWatchedMovies`, allWatched);
// }

//     

// function updateQueueText(id) {
// //   const activeBtn = document.querySelector('selector - .btn-queue');
//     const savedId = load("allQueueMovies");
//     if (savedId) {
//         const userAuth = savedId.find(movie => movie.id === id);
//     if (userAuth) {
//         // activeBtn.classList.add("add class - is-active")
//         activeBtn.textContent = "remove from queue"
//     }
//     }

// }

// function onAddQueueClick(event) {
// //   const currentActiveBtn = document.querySelector("selector - .btn-queue.is-active");
//     const savedLocalInfo = load("allQueueMovies");
//     // event.currentTarget.classList.toggle("is-active");

//     if (currentActiveBtn) {
//         let index;
//         savedLocalInfo.forEach(({ id }, i) => (id === fetch.id ? (index = i) : i));
//         allQueue.splice(index, 1);
//         save(`allQueueMovies`, allQueue);
//     }

//     const isInArray = savedLocalInfo
//     ? savedLocalInfo.find(({ id }) => id === fetch.id)
//     : false;
  
//     event.currentTarget.textContent = "add to Queue";

//     if (!!isInArray) {
//     return;
//     }

//     event.currentTarget.textContent = "Remove from Queue";
//     allQueue.push(fetch);
//     save(`allQueueMovies`, allQueue);
// }

