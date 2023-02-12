import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const PRIVATE_KEY = '29610060-546b0d52217012a7fbe24491a';
export const PER_PAGE = 40;

const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
});

export async function fetchPhotoApi(searchValue, pageNumber = 1) {
    try {
        const response = await axios.get(
            `${BASE_URL}?key=${PRIVATE_KEY}&q=${searchValue}&${searchParams}&page=${pageNumber}&per_page=${PER_PAGE}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}
