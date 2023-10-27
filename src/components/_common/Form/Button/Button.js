import React from 'react';
import PropTypes from 'prop-types';
import classes from './button.module.scss';
import Loader from '../../Loader/Loader';

const Button = ({
  children, onClick, cancel, className, disabled, type, loading,
}) => {
  const buttonCls = [classes.main_button];

  if (cancel) buttonCls.push(classes.cancel);

  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={`${buttonCls.join(' ')} ${className}`}
    >
      {loading
        ? <Loader size={20} weight={2} />
        : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  cancel: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'button']),
};

Button.defaultProps = {
  cancel: false,
  className: '',
  disabled: false,
  loading: false,
  type: 'button',
  onClick: () => {},
};

export default Button;
