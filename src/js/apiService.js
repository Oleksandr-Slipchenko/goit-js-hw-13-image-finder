const BASE_URL = 'https://pixabay.com/api';
const KEY = '19150317-d8041bc31c78eccc0e4f69a2b';

export default class ImagesApiServer {
  constructor() {
    this.searchQuery;
    this.page = 1;
  }
  // fetchGallery() {
  //   return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=3&key=${KEY}`)
  //     .then(res => { return res.json() })
  // }
  async fetchGallery() {
    const response = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=3&key=${KEY}`);
    const images = await response.json();
    return images;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}