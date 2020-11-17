import './styles.css';
import getRefs from './js/getRefs';
import ImagesApiServer from './js/apiService';

// const materialIcons = require('material-design-icons');

// const debounce = require('lodash.debounce');

// refs.searchForm.addEventListener('input', debounce(onSearchImages, 500));

const refs = getRefs();

const imagesApiServer = new ImagesApiServer();

refs.searchForm.addEventListener('input', onSearchImages);
refs.LoadMoreBtn.addEventListener('click', onLoadMore);

function onSearchImages(e) {
  e.preventDefault();
  const form = e.currentTarget;
  imagesApiServer.query = form.elements.query.value.trim();
  refs.gallery.innerHTML = '';
  if (!imagesApiServer.query) return;

  imagesApiServer.fetchGallery()
}

function onLoadMore(e) {
  if (!imagesApiServer.query) return;

  imagesApiServer.fetchGallery();
}