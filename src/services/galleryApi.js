import axios from 'axios';

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
      return null;
    }
  });
};

export default fetchGallery;
