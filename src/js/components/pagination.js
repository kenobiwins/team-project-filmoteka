import { getPopularMovies, searchMovies } from '../API/API';
import { createGalery } from '../render';
import { refs } from '../refs/refs';
import { smoothScrollUp } from './scroll-up';
import { preload } from '../helpers/preloader';
import symbolDefs from '../../images/svg/symbol-defs.svg';

export const mqMoreThanMobile = window.matchMedia('(min-width: 768px)').matches;

let PAGE = 1;

export function pagination(page, pages) {
  let markup = '';

  PAGE = page;
  const PAGES = pages;
  const beforeTwoPage = page - 2;
  const beforeOnePage = page - 1;
  const afterOnePage = page + 1;
  const afterTwoPage = page + 2;

  // &#129144;<
  // &#129146;>
  // '/symbol-defs.31a6e949.svg#icon'
  // <svg width="16px" height="16px">
  //   <use href="/symbol-defs.31a6e949.svg#icon-arrow"></use>
  // </svg>;
  if (page > 1) {
    if (mqMoreThanMobile) {
      markup += `<li class='pagination__item' data-action='prev'>
        <svg width="16px" height="16px" class="icon icon--left">
     <use href="${symbolDefs}#icon-arrow"></use>
   </svg>
  </li>`;
      markup += `<li class='pagination__item'>1</li>`;
    } else {
      markup += `<li class='pagination__item' data-action='prev'>
        <svg width="16px" height="16px" class="icon icon--left">
     <use href="${symbolDefs}#icon-arrow"></use>
   </svg>
  </li>`;
    }
  }
  if (page > 4) {
    if (mqMoreThanMobile) {
      markup += `<li>...</li>`;
    }
  }
  if (!mqMoreThanMobile && page >= 3) {
    markup += `<li class='pagination__item'>${beforeTwoPage}</li>`;
  } else if (page > 3) {
    markup += `<li class='pagination__item'>${beforeTwoPage}</li>`;
  }
  if (!mqMoreThanMobile && page >= 2) {
    markup += `<li class='pagination__item'>${beforeOnePage}</li>`;
  } else if (page > 2) {
    markup += `<li class='pagination__item'>${beforeOnePage}</li>`;
  }
  markup += `<li class='pagination__item pagination__current-page'>${PAGE}</li>`;
  if (!mqMoreThanMobile && PAGES - 1 >= PAGE) {
    markup += `<li class='pagination__item'>${afterOnePage}</li>`;
  } else if (PAGES - 1 > PAGE) {
    markup += `<li class='pagination__item'>${afterOnePage}</li>`;
  }
  if (!mqMoreThanMobile && PAGES - 2 >= PAGE) {
    markup += `<li class='pagination__item'>${afterTwoPage}</li>`;
  } else if (PAGES - 2 > PAGE) {
    markup += `<li class='pagination__item'>${afterTwoPage}</li>`;
  }
  if (PAGES - 3 > PAGE) {
    if (mqMoreThanMobile) {
      markup += `<li>...</li>`;
    }
  }
  if (PAGES > PAGE) {
    if (mqMoreThanMobile) {
      markup += `<li class='pagination__item'>${PAGES}</li>`;
      markup += `<li class='pagination__item' data-action='next'>
      <svg width="16px" height="16px" class="icon icon--right" >
     <use href="${symbolDefs}#icon-arrow"></use>
   </svg>
   </li>`;
    } else {
      markup += `<li class='pagination__item' data-action='next'>
      <svg width="16px" height="16px" class="icon icon--right" >
     <use href="${symbolDefs}#icon-arrow"></use>
   </svg>
   </li>`;
    }
  }
  refs.pagination.innerHTML = markup;
}

const getPopularByPage = async page => {
  // loader
  preload();
  const response = await getPopularMovies(page);
  refs.galleryHome.innerHTML = createGalery(response);
  pagination(response.data.page, response.data.total_pages);
  // Loader remove
  setTimeout(() => {
    preload();
  }, 700);
  smoothScrollUp();
  return;
};

export async function paginationTrendMovie(e) {
  const { target, currentTarget } = e;

  if (target === currentTarget || target.textContent === '...') {
    return;
  }

  if (target.closest('li').dataset.action === 'next') {
    PAGE += 1;

    getPopularByPage(PAGE);
    // const response = await getPopularMovies(PAGE);
    // refs.galleryHome.innerHTML = createGalery(response);
    // pagination(response.data.page, response.data.total_pages);

    return;
  }
  if (target.closest('li').dataset.action === 'prev') {
    PAGE -= 1;
    getPopularByPage(PAGE);
    // const response = await getPopularMovies(PAGE);
    // refs.galleryHome.innerHTML = createGalery(response);
    // pagination(response.data.page, response.data.total_pages);

    return;
  }
  PAGE = Number(target.textContent);
  getPopularByPage(PAGE);
  // const response = await getPopularMovies(PAGE);
  // refs.galleryHome.innerHTML = createGalery(response);
  // pagination(response.data.page, response.data.total_pages);
}

const getBySearchPage = async page => {
  // Loader
  preload();

  let trueSearch = localStorage.getItem('trueSearch');
  const response = await searchMovies(trueSearch, PAGE);
  refs.galleryHome.innerHTML = createGalery(response);
  pagination(response.data.page, response.data.total_pages);
  // Loader remove
  setTimeout(() => {
    preload();
  }, 700);
  smoothScrollUp();
  return;
};

export async function paginationOnSearch(e) {
  const { target, currentTarget } = e;

  if (target === currentTarget || target.textContent === '...') {
    return;
  }
  if (target.closest('li').dataset.action === 'next') {
    PAGE += 1;
    getBySearchPage(PAGE);
    // const response = await searchMovies(refs.form.searchQuery.value, PAGE);
    // refs.galleryHome.innerHTML = createGalery(response);
    // pagination(response.data.page, response.data.total_pages);
    return;
  }
  if (target.closest('li').dataset.action === 'prev') {
    PAGE -= 1;
    getBySearchPage(PAGE);
    // const response = await searchMovies(refs.form.searchQuery.value, PAGE);
    // refs.galleryHome.innerHTML = createGalery(response);
    // pagination(response.data.page, response.data.total_pages);
    return;
  }
  PAGE = Number(target.textContent);
  getBySearchPage(PAGE);
  // const response = await searchMovies(refs.form.searchQuery.value, PAGE);
  // refs.galleryHome.innerHTML = createGalery(response);
  // pagination(response.data.page, response.data.total_pages);
}
