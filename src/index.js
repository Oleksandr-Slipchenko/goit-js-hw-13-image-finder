import './styles.css';
import getRefs from './js/getRefs';
import renderForm from './js/renderForm';
import renderImagesGallery from './js/renderImagesGallery';
import ImagesApiServer from './js/apiService';
// import LoadMoreBtn from './js/loadMoreBtn';
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


renderForm();
const refs = getRefs();

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
const imagesApiServer = new ImagesApiServer();

// loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
document.addEventListener('scroll', handleScroll);
refs.input.addEventListener('input', debounce(onSearchImages, 500));
refs.gallery.addEventListener('click', onGalleryElClick);

let isLoading = false;

function handleScroll(e) {
  const st = window.pageYOffset + window.innerHeight;

  if (window.scrollY + window.innerHeight + 400 > document.documentElement.scrollHeight) {
    onLoadMore();
  }
}

async function onSearchImages(e) {
  e.preventDefault();
  imagesApiServer.query = e.target.value.trim();

  refs.gallery.innerHTML = '';
  if (!imagesApiServer.query) return;

  // loadMoreBtn.show();
  try {
  const reset = await imagesApiServer.resetPage();
  const addImages = await imagesApiServer.fetchGallery((data) => console.log(data))
  .then(renderImagesGallery)
  } catch (error) {
  console.log(error)
  };
}



//



//


async function onLoadMore(e) {
  if (isLoading) {
  return;
  }
  isLoading = true;
  if (!imagesApiServer.query) return;

  try {
  const increment = await imagesApiServer.incrementPage();
  const addImages = await imagesApiServer.fetchGallery()
    .then(renderImagesGallery)
    // .then(scrollPage)
    .then(() => isLoading = false)
} catch (error) {
  console.log(error)
  };
}

function onGalleryElClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const changeModalImage = `<img src='${event.target.dataset.source}' alt="icon" />`;
  const instance = basicLightbox.create(changeModalImage);
  instance.show();
}


// Функция автоматического скрола //

// function scrollPage() {
//   try {
//     setTimeout(() => {
//       window.scrollTo({
//         top: document.body.scrollHeight,
//         left: 0,
//         behavior: 'smooth',
//       });
//     }, 1000);
//   } catch (error) {
//     console.log(error);
//   }
// }


