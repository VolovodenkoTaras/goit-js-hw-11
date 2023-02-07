import { fetchCountries } from './fetchCountries';
import { notifyInfoMessage, notifyFailureMessage } from './notify';
import { renderCountryCard, renderCountriesList } from './render';

import { refs } from './index';

function onSearch(e) {
    const searchQuery = e.target.value.trim();
    refs.countriesList.innerHTML = '';
    refs.countryCard.innerHTML = '';

    if (!searchQuery) {
        return;
    }

    fetchCountries(searchQuery)
        .then(country => {
            if (country.length > 10) {
                return notifyInfoMessage();
            }
            if (country.length > 1 && country.length <= 10) {
                refs.countriesList.innerHTML = renderCountriesList(country);
            } else {
                refs.countryCard.innerHTML = renderCountryCard(country);
            }
        })
        .catch(error => notifyFailureMessage());
}

export { onSearch };
