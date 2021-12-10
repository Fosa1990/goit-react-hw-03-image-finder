import styles from './GalleryItem.module.css';

const GalleryItem = ({ id, webformatURL, largeImageURL }, onClick) => {
  return (
    <li className={styles.GalleryItem} key={`id-${id}`}>
      <img
        onClick={onClick}
        src={webformatURL}
        data-large={largeImageURL}
        alt="searched img"
        className={styles.GalleryItem__image}
      />
    </li>
  );
};

export default GalleryItem;

//Компонент элемента списка с изображением.
//Создает DOM - элемент следующей структуры.
