const BASE_URL = 'https://pixabay.com/api';
const KEY = '19150317-d8041bc31c78eccc0e4f69a2b';

function fetchGallery(query) {
  return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=1&per_page=12&key=${KEY}`).then(res => { return res.json() });
}

export default { fetchGallery };