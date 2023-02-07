const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
    fields: "name,capital,population,flags,languages",
});

export function fetchCountries(searchValue = "Ukraine") {
    return fetch(
        `${BASE_URL}${searchValue}?${searchParams}`
    )
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .catch(err => console.error(err));
}
