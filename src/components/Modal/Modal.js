import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '../IconButton';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from '../../images/svg/close.svg';

const modalRoot = document.querySelector('#root-modal');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

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
    const { onClose, children } = this.props;

    return createPortal(
      <div className={styles.Backdrop} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <IconButton
            onClick={onClose}
            className={styles.CloseModal}
            aria-label="Close Modal Button"
          >
            <CloseIcon width="32" height="32" />
          </IconButton>
          {children}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
