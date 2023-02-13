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

window.onscroll = () => changeFormBackground();

function changeFormBackground() {
    const formOffsetTrigger = refs.searchFormRef.offsetTop;
    const pageOffset = window.pageYOffset;

    if (pageOffset > formOffsetTrigger) {
        refs.searchFormRef.classList.add('no-transparency');
    } else {
        refs.searchFormRef.classList.remove('no-transparency');
    }
}

refs.searchFormRef.addEventListener('submit', onSearch);

async function onSearch(event) {
    event.preventDefault();
    pageNumber = 1;
    observer.unobserve(refs.guardRef);
    searchQuery = event.currentTarget.searchQuery.value.trim();
    refs.galleryRef.innerHTML = '';
    // event.currentTarget.reset();

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
            notifySuccessMessage(gallery);
            addMarkup(gallery.data.hits);

            simpleGallery.refresh();

            if (gallery.data.hits.length >= PER_PAGE) {
                observer.observe(refs.guardRef);
            }

        })
        .catch(error => console.log(error));
}

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

                    if (pageNumber === Math.ceil(totalHits / PER_PAGE)) {
                        observer.unobserve(refs.guardRef);
                        observerBottom.observe(refs.guardRef);
                        pageNumber = 1;
                    }
                })
                .catch(error => {
                    console.error(error);
                });

        }
    });
}

const optionsBottom = {
    root: null,
    rootMargin: '1px',
    threshold: 1.0,
};

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
