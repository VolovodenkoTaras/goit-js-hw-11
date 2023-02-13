import Notiflix from 'notiflix';

export const notifyFailureMessage = () => {
    return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        {
            opacity: 0.8,
            position: 'right-top',
            timeout: 300,
            cssAnimationDuration: 1500,
            backOverlayColor: 'rgba(50,198,130,0.2)',
            cssAnimationStyle: 'zoom',
        }
    );
};

export const notifySuccessMessage = (gallery) => {
    return Notiflix.Notify.success(
        `Hooray! We found: ${gallery.data.total} images,
       available for display: ${gallery.data.totalHits} images.`
        , {
            opacity: 0.8,
            position: 'right-top',
            timeout: 300,
            cssAnimationDuration: 1500,
            backOverlayColor: 'rgba(255,85,73,0.2)',
            cssAnimationStyle: 'zoom',
        });
};

export const notifyInfoMessage = () => {
    return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results.",
        {
            opacity: 1,
            position: 'center-center',
            timeout: 500,
            background: '#0c09db',
            backOverlay: true,
            cssAnimationDuration: 1000,
            backOverlayColor: 'rgba(0, 153, 255, 0.313)',
            cssAnimationStyle: 'zoom',
        }
    );
};

export const notifyInfoSearchMessage = () => {
    return Notiflix.Notify.info('Please fill the search field!', {
        opacity: 1,
        position: 'center-center',
        timeout: 1000,
        background: '#0c09db',
        backOverlay: true,
        cssAnimationDuration: 1000,
        backOverlayColor: 'rgba(0, 153, 255, 0.313)',
        cssAnimationStyle: 'fade',
    });
};
