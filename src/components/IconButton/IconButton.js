import PropTypes from 'prop-types';
import styles from './IconButton.module.css';

const IconButton = ({ children, onClick, className, ...allyProps }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${styles.IconButton} ${className}`}
      {...allyProps}
    >
      {children}
    </button>
  );
};

IconButton.defaultProps = { onClick: () => null, children: null };

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  'aria-label': PropTypes.string.isRequired,
};
export default IconButton;
