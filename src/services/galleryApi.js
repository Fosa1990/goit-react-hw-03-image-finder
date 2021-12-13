import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '23935285-7259499af9fe05c3ca983c7fa';
const BASE_URL = 'https://pixabay.com/api/';

const fetchGallery = (query, currentPage) => {
  const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    q: query,
    page: currentPage,
    per_page: 12,
    key: API_KEY,
  });

  const url = `${BASE_URL}?${searchParams}`;

  return axios.get(url).then(response => {
    if (response.status === 200 && response.data.hits.length !== 0) {
      return response.data.hits;
    } else {
      return Promise.reject(
        new Error(console.log(`No images by name "${query}", Your Majesty`)),
      );
    }
  });
};

fetchGallery.propTypes = {
  query: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default fetchGallery;
