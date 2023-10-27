import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classes from './modal.module.scss';
import { ReactComponent as Close } from '../../../assets/icons/modal/xmark-solid.svg';

const Modal = ({
  show, className, children, onClose,
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.width = `${document.body.getBoundingClientRect().width}px`;
      document.body.style.overflowY = 'hidden';
      document.body.ontouchmove = () => false;
    } else {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('width');
      document.body.ontouchmove = () => true;
    }
  }, [show]);

  useEffect(() => () => {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('width');
    document.body.ontouchmove = () => true;
  }, []);

  return show && createPortal(
    <div className={classes.wrapper}>
      <div
        onClickCapture={onClose}
        className={classes.backdrop}
      />

      <div className={`${classes.modal} ${className}`}>
        <Close onClickCapture={onClose} className={classes.close_button} />

        {children}
      </div>
    </div>,
    document.getElementById('root'),
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  className: '',
};

export default Modal;
