//Компонент элемента списка с изображением.
//Создает DOM - элемент следующей структуры.

import styles from './GalleryItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, onClick }) => {
  return (
    <li className={styles.GalleryItem} key={`__id-${id}__`}>
      <img
        onClick={onClick}
        className={styles.GalleryItem__image}
        src={webformatURL}
        alt="searched img"
        data-large={largeImageURL}
      />
    </li>
  );
};

export default ImageGalleryItem;
