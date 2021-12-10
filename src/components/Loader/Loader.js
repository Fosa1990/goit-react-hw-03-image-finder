// Компонент спинера, отображется пока идет загрузка изобаржений.
// Используй любой готовый компонент,
// например react - loader - spinner или любой другой.

// https://github.com/mhnpd/react-loader-spinner

import Loader from 'react-loader-spinner';
import './Loader.css';

const LoaderSpinner = () => {
  return (
    <Loader
      className="Loader App-logo"
      type="Circles"
      color="#00BFFF"
      height={300}
      width={300}
      timeout={3000000} // 3000
    />
  );
};

export default LoaderSpinner;
