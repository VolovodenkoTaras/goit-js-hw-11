import './css/styles.css';

import { fetchPhotoApi, PER_PAGE } from './js/fetchData';
import { refs } from './js/refs';

import { simpleGallery } from './js/simple-lightbox';
import {
    notifyInfoMessage,
    notifySuccessMessage,
    notifyFailureMessage,
    notifyInfoSearchMessage,
} from './js/notify';

import { addMarkup } from './js/markup';

let searchQuery = '';
let pageNumber = 1;
let totalHits = '';

refs.searchFormRef.addEventListener('submit', onSearch);

async function onSearch(event) {
    event.preventDefault();
    pageNumber = 1;
    observer.unobserve(refs.guardRef);
    searchQuery = event.currentTarget.searchQuery.value.trim();
    refs.galleryRef.innerHTML = '';
    event.currentTarget.reset();

    if (!searchQuery) {
        refs.galleryRef.innerHTML = '';
        notifyInfoSearchMessage();
        return;
    }

    await fetchPhotoApi(searchQuery, pageNumber)
        .then(gallery => {
            totalHits = gallery.data.totalHits;

            if (!totalHits) {
                return notifyFailureMessage();
            }
            notifySuccessMessage(totalHits);
            addMarkup(gallery.data.hits);

            simpleGallery.refresh();

            observer.observe(refs.guardRef);
        })
        .catch(error => console.log(error));
}

export { onSearch, searchQuery };

const options = {
    root: null,
    rootMargin: '200px',
    threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);

async function onLoad(entries, observer) {
    await entries.forEach(entry => {
        if (entry.isIntersecting) {
            pageNumber += 1;

            function smoothImagesScroll() {
                const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: 'smooth',
                });
            }

            fetchPhotoApi(searchQuery, pageNumber)
                .then(gallery => {
                    addMarkup(gallery.data.hits);
                    simpleGallery.refresh();
                    smoothImagesScroll()
                })
                .catch(error => {
                    console.error(error);
                });

            if (pageNumber === Math.round(totalHits / PER_PAGE)) {
                observer.unobserve(refs.guardRef);
                observerBottom.observe(refs.guardRef);
                pageNumber = 1;
            }
        }
    });
}

const optionsBottom = {
    root: null,
    rootMargin: '1px',
    threshold: 1.0,
};
// Observer message
const observerBottom = new IntersectionObserver(
    OnBottomMessage,
    optionsBottom
);

function OnBottomMessage(entries, observerBottom) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            notifyInfoMessage();
        }
    });
}
