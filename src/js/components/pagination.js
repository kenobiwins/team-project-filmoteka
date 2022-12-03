export const mqMoreThanMobile = window.matchMedia('(min-width: 768px)').matches;

export function pagination(page, pages) {
  let markup = '';

  PAGE = page;
  const beforeTwoPage = page - 2;
  const beforeOnePage = page - 1;
  const afterOnePage = page + 1;
  const afterTwoPage = page + 2;
  // &#129144;<
  // &#129146;>
  if (page > 1) {
    if (mqMoreThanMobile) {
      markup += `<li class='pagination__item' data-action='prev'>&#129144;</li>`;
      markup += `<li class='pagination__item'>1</li>`;
    } else {
      markup += `<li class='pagination__item' data-action='prev'>&#129144;</li>`;
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
  if (!mqMoreThanMobile && pages - 1 >= PAGE) {
    markup += `<li class='pagination__item'>${afterOnePage}</li>`;
  } else if (pages - 1 > PAGE) {
    markup += `<li class='pagination__item'>${afterOnePage}</li>`;
  }
  if (!mqMoreThanMobile && pages - 2 >= PAGE) {
    markup += `<li class='pagination__item'>${afterTwoPage}</li>`;
  } else if (pages - 2 > PAGE) {
    markup += `<li class='pagination__item'>${afterTwoPage}</li>`;
  }
  if (pages - 3 > PAGE) {
    if (mqMoreThanMobile) {
      markup += `<li>...</li>`;
    }
  }
  if (pages > PAGE) {
    if (mqMoreThanMobile) {
      markup += `<li class='pagination__item'>${pages}</li>`;
      markup += `<li class='pagination__item' data-action='next'>&#129146;</li>`;
    } else {
      markup += `<li class='pagination__item' data-action='next'>&#129146;</li>`;
    }
  }
  refs.pagination.innerHTML = markup;
}

export function paginationTrendMovie(e) {
  const { target, currentTarget } = e;

  if (target === currentTarget || target === '...') {
    return;
  }

  if (target.dataset.action === 'next') {
    PAGE += 1;
    // const response = await fetchTrendingMovies(PAGE);
    // insertMarkup(refs.mainContainer, await renderCards(response.data));
    // pagination(response.data.page, response.data.total_pages);

    return;
  }
  if (target.dataset.action === 'prev') {
    PAGE -= 1;
    // const response = await fetchTrendingMovies(PAGE);
    // insertMarkup(refs.mainContainer, await renderCards(response.data));
    // pagination(response.data.page, response.data.total_pages);

    return;
  }
  PAGE = Number(target.textContent);
  //   const response = await fetchTrendingMovies(PAGE);
  //   insertMarkup(refs.mainContainer, await renderCards(response.data));
  //   pagination(response.data.page, response.data.total_pages);
}

export function paginationOnSearch(e) {
  const { target, currentTarget } = e;

  if (target === currentTarget || target === '...') {
    return;
  }
  if (target.dataset.action === 'next') {
    PAGE += 1;
    // const response = await fetchMovies(refs.form.searchQuery.value, PAGE);
    // insertMarkup(refs.mainContainer, await renderCards(response.data));
    // pagination(response.data.page, response.data.total_pages);
    return;
  }
  if (target.dataset.action === 'prev') {
    PAGE -= 1;
    // const response = await fetchMovies(refs.form.searchQuery.value, PAGE);
    // insertMarkup(refs.mainContainer, await renderCards(response.data));
    // pagination(response.data.page, response.data.total_pages);
    return;
  }
  PAGE = Number(target.textContent);
  //   const response = await fetchMovies(refs.form.searchQuery.value, PAGE);
  //   insertMarkup(refs.mainContainer, await renderCards(response.data));
  //   pagination(response.data.page, response.data.total_pages);
}
