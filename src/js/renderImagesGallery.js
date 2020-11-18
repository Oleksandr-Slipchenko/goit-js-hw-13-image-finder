import imagesTpl from '../templates/images.hbs';
import getRefs from '../js/getRefs';

const refs = getRefs();

export default function renderImagesGallery(data) {
  const markup = imagesTpl(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}