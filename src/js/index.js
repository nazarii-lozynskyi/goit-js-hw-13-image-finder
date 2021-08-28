// import '../js/js-test/r-get';
// import '..js/js-test/c-post';
// import '../js/js-test/u-patch';
// import '../js/js-test/d-delete';

import ImagesApiService from '../js/apiService';

import imagesTpl from '../templates/image-card.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.btn-search-form'),
  loadMoreBtn: document.querySelector('.btn-more'),
  gallery: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearGallery();

  imagesApiService.query = e.currentTarget.elements.searchForm.value;

  if (imagesApiService.query === '') {
    return alert('aloha');
  }
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(appendImagesMarkup);
}

function onLoadMore() {
  imagesApiService.fetchImages().then(appendImagesMarkup);

  const element = document.getElementById('moreBtn');

  //console.log(element);
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function appendImagesMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesTpl(hits));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
