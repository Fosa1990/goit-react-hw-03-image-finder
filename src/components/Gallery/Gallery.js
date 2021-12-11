import GalleryItem from '../GalleryItem';
import PropTypes from 'prop-types';
import styles from './Gallery.module.css';

const Gallery = ({ gallery, onClick }) => {
  return (
    <ul className={styles.Gallery}>
      {gallery.map(image => GalleryItem(image, onClick))}
    </ul>
  );
};

Gallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object),
};

export default Gallery;

// Список карточек изображений.
// Создает DOM - элемент следующей структуры.
