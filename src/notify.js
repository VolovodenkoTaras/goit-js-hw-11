import Notiflix from 'notiflix';

export const notifyFailureMessage = () => {
    return Notiflix.Notify.failure('Oops, there is no country with that name', {
        opacity: 0.8,
        position: 'center-top',
        timeout: 200,
        cssAnimationDuration: 1500,
        cssAnimationStyle: 'from-top',
    });
};

export const notifyInfoMessage = () => {
    return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.',
        {
            opacity: 0.8,
            position: 'center-top',
            timeout: 200,
            cssAnimationDuration: 1500,
            cssAnimationStyle: 'from-top',
        }
    );
};
