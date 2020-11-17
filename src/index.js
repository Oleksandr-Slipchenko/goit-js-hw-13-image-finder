import './styles.css';
import renderImagesGallery from './js/renderImagesGallery.js';
import API from './js/apiService';
import getRefs from './js/getRefs';

// const materialIcons = require('material-design-icons');

// const debounce = require('lodash.debounce');

// refs.searchForm.addEventListener('input', debounce(onSearchImages, 500));
const refs = getRefs();

refs.searchForm.addEventListener('input', onSearchImages);

function onSearchImages(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const searchQuery = form.elements.query.value.trim();
  refs.gallery.innerHTML = '';

  if (!searchQuery) return;

  API.fetchGallery(searchQuery)
  .then(renderImagesGallery)
  .catch(error => console.log(error))
  // .finally(() => form.reset());
}
