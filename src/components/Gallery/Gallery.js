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

Gallery.defaultProps = { onClick: () => null };

Gallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};

export default Gallery;
