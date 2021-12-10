import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={styles.Button} type="button" onClick={onClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;

// При нажатии на кнопку Load more должна догружаться
// следующая порция изображений и рендериться вместе
// с предыдущими.Кнопка должна рендерится только тогда,
//   когда есть какие - то загруженные изобаржения.
// Если массив изображений пуст,
// кнопка не рендерится.
