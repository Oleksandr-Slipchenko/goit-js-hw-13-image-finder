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

const imagesApiServer = new ImagesApiServer();

// loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
// document.addEventListener('scroll', handleScroll);
refs.input.addEventListener('input', debounce(onSearchImages, 500));
refs.gallery.addEventListener('click', onGalleryElClick);

// Данные для метода observer

const options = {
    rootMargin: '100px'
}
const observer = new IntersectionObserver (onEntry, options);

// Функция поиска каринок

async function onSearchImages(e) {
  e.preventDefault();
  imagesApiServer.query = e.target.value.trim();

  refs.gallery.innerHTML = '';
  if (!imagesApiServer.query) return;

  // loadMoreBtn.show();
  try {
  const reset = await imagesApiServer.resetPage();
  const addImages = await imagesApiServer.fetchGallery()
  .then(checkRender)
  } catch (error) {
  console.log(error)
  };
}

function checkRender(e) {
  if (imagesApiServer.img < e.totalHits) {
    observer.observe(refs.sentinel);
    renderImagesGallery(e.hits);
    imagesApiServer.img += e.hits.length;
  }

  if (imagesApiServer.img === e.totalHits) {
    observer.unobserve(refs.sentinel);
      return;
    }
}

// Бесконечный скрол - 2

function onEntry(entries) {
  console.log('dsadsa', entries);
    entries.forEach(entry => {
        if (entry.isIntersecting && imagesApiServer.query !== '') {
          console.log("LOADING...");
          imagesApiServer.incrementPage();
          imagesApiServer.fetchGallery().then(checkRender);
        }
    });
}

function onGalleryElClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const changeModalImage = `<img src='${event.target.dataset.source}' alt="icon" />`;
  const instance = basicLightbox.create(changeModalImage);
  instance.show();
}

      // Настройки кнопки "Показать ещё" при её использовании

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

        // Функция добавления новых картинок на странице

// async function onLoadMore(e) {
//   if (isLoading) {
//   return;
//   }
//   isLoading = true;
//   if (!imagesApiServer.query) return;

//   try {
//   const increment = await imagesApiServer.incrementPage();
//   const addImages = await imagesApiServer.fetchGallery()
//     .then(checkRender)
//     // .then(scrollPage)
//     .then(() => isLoading = false)
// } catch (error) {
//   console.log(error)
//   };
// }

              // Бесконечный скрол - 1 //

// let isLoading = false;

// function handleScroll(e) {
//   const st = window.pageYOffset + window.innerHeight;

//   if (window.scrollY + window.innerHeight + 400 > document.documentElement.scrollHeight) {
//     onLoadMore();
//   }
// }

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


