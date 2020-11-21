import './styles.css';
import getRefs from './js/getRefs';
import renderForm from './js/renderForm';
import renderImagesGallery from './js/renderImagesGallery';
import ImagesApiServer from './js/apiService';
import LoadMoreBtn from './js/loadMoreBtn';
import debounce from 'lodash.debounce';

// const materialIcons = require('material-design-icons');

renderForm();
const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imagesApiServer = new ImagesApiServer();

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.input.addEventListener('input', debounce(onSearchImages, 500));

function onSearchImages(e) {
  e.preventDefault();
  imagesApiServer.query = e.target.value.trim();

  refs.gallery.innerHTML = '';
  if (!imagesApiServer.query) return;

  loadMoreBtn.show();
  imagesApiServer.resetPage();
  imagesApiServer.fetchGallery( (data) => console.log(data))
  .then(renderImagesGallery)
  .catch(error => console.log(error));
}

function onLoadMore(e) {
  if (!imagesApiServer.query) return;

  imagesApiServer.incrementPage();
  imagesApiServer.fetchGallery()
  .then(renderImagesGallery)
  .catch(error => console.log(error));
}