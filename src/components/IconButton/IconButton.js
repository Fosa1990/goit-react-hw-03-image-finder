import PropTypes from 'prop-types';
import styles from './IconButton.module.css';

const IconButton = ({ children, onClick, ...allyProps }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={styles.IconButton}
      {...allyProps}
    >
      {children}
    </button>
  );
};

IconButton.defaultProps = { onClick: () => null, children: null };

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};
export default IconButton;
