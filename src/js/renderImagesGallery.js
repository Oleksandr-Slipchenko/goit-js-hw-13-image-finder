import imagesGalleryTpl from '../templates/images.hbs';
import getRefs from '../js/getRefs';

const refs = getRefs();

export default function renderImagesGallery(data) {
  const markup = imagesGalleryTpl(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}