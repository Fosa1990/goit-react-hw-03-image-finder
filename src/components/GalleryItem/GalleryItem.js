import PropTypes from 'prop-types';
import styles from './GalleryItem.module.css';

const GalleryItem = ({ id, webformatURL, largeImageURL, tags }, onClick) => {
  return (
    <li className={styles.GalleryItem} key={`id-${id}`}>
      <img
        onClick={onClick}
        src={webformatURL}
        data-src={largeImageURL}
        alt={tags}
        className={styles.GalleryItem__image}
      />
    </li>
  );
};

GalleryItem.defaultProps = { onClick: () => null };

GalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GalleryItem;
