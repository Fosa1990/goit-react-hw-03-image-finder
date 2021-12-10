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

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

// id - уникальный идентификатор
// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение для модального окна
