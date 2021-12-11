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
            className={styles.CloseModal}
            aria-label="Close Modal Button"
          >
            <CloseIcon width="32" height="32" />
          </IconButton>
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
