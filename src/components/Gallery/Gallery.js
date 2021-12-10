import GalleryItem from '../GalleryItem';
import styles from './Gallery.module.css';

const Gallery = ({ gallery, onClick }) => {
  return (
    <ul className={styles.Gallery}>
      {gallery.map(image => GalleryItem(image, onClick))}
    </ul>
  );
};

export default Gallery;

// Список карточек изображений.
// Создает DOM - элемент следующей структуры.
