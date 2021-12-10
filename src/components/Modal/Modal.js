import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '../IconButton';
import styles from './Modal.module.css';
import { ReactComponent as CloseIcon } from '../../images/svg/close.svg';

const modalRoot = document.querySelector('#root-modal');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) this.props.onClose();
  };

  render() {
    return createPortal(
      <div className={styles.Backdrop} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <IconButton
            onClick={this.props.onClose}
            className={`${styles.CloseModal} IconButton`}
            aria-label="Close Modal Button"
          >
            <CloseIcon width="32" height="32" fill="#000000" />
          </IconButton>
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;

// При клике по элементу галереи должно открываться
// модальное окно с темным оверлеем и
// отображаться большая версия изображения.
// Модальное окно должно закрываться по нажатию клавиши ESC
// или по клику на оверлее.

// Внешний вид похож на функционал этого VanillaJS - плагина,
//   только вместо белого модального окна
//   рендерится изображение(в примере нажми Run).
//   Анимацию делать не нужно!

// https://basiclightbox.electerious.com/
