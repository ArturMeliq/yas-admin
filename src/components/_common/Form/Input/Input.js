import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './input.module.scss';

const Input = ({
  placeholder, name, onChange, value,
  disabled, error, onKeyPress, onPaste,
  className, inputClassName,
}) => {
  const [isLabelActive, labelActiveToggle] = useState(false);

  return (
    <div className={`${classes.input_block} ${className}`}>
      <label className={classes.label}>

        <input
          disabled={disabled}
          value={value}
          name={name}
          onChange={({ target }) => onChange(target.value)}
          className={`${classes.input} ${error ? classes.error : ''} ${inputClassName}`}
          placeholder={placeholder}
          onKeyPress={onKeyPress}
          onPaste={onPaste}
          onFocus={() => labelActiveToggle(true)}
          onBlur={() => labelActiveToggle(false)}
        />
        {error && typeof error === 'string' && <p>{error}</p>}

        {(value || isLabelActive)
          && <span className={value || isLabelActive ? classes.in_focus : ''}>{name === 'businessEmailOrPhone' ? 'Email address or phone' : placeholder}</span> }
      </label>
    </div>

  );
};

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  onKeyPress: PropTypes.func,
  onPaste: PropTypes.func,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

Input.defaultProps = {
  error: false,
  value: '',
  name: '',
  placeholder: '',
  disabled: false,
  onKeyPress: () => {},
  onPaste: () => {},
  className: '',
  inputClassName: '',
};
export default Input;
