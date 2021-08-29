import '../sass/main.scss';

// pnotify
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';
defaults.maxTextHeight = null;

// inner
import FetchAPI from './apiService';
import getRefs from './refs';
import imagesCard from '../templates/template.hbs';
import BtnCondition from './load_more_btn';
import makeImgLarger from './larger_img';

const fetchAPI = new FetchAPI();
const refs = getRefs();

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', fetchImages);
refs.galleryContainer.addEventListener('click', makeImgLarger);

const btnCondition = new BtnCondition({
  selector: 'refs.loadMore',
  hidden: true,
});

function onSearch(e) {
  e.preventDefault();
  fetchAPI.query = e.currentTarget.elements.query.value.trim();

  if (fetchAPI.query === '') {
    return error({
      text: 'Please, type what do you want',
      styling: 'brighttheme',
    });
  }

  fetchAPI.resetPage();
  btnCondition.show();
  fetchImages();
  clearGalleryContainer();
}

function fetchImages() {
  btnCondition.disable();
  fetchAPI.fetchGallery().then(hits => {
    appendGalleryMarkup(hits);
    btnCondition.enable();
    scrollImg();
  });
}

// mark
function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imagesCard(hits));
}
function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function scrollImg() {
  refs.loadMore.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
