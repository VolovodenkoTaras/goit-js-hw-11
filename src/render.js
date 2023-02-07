function renderCountriesList(arr) {
    return arr
        .map(country => {
            const { flags, name } = country;
            return `
    <li class="country__item">
      <img class="country__img" src="${flags.svg}" alt="${name}" width="80">
      <h2>${name.official}</h2>
    </li>`;
        })
        .join('');
}

function renderCountryCard(arr) {
    return arr
        .map(country => {
            const { flags, name, capital, population, languages } = country;
            return `<div class="country-wrapper">
      <img src="${flags.svg}" alt="${name}" width="160">
      <h2 class='country__title'>${name.official}</h2>
      <p class='country__descr'>Capital:<span> ${capital}</span></p>
      <p class='country__descr'>Polulation:<span> ${population}</span></p>
      <p class='country__descr'>Languages:<span> ${Object.values(languages)}</span></p></div>`;
        })
        .join('');
}

export { renderCountriesList, renderCountryCard };
