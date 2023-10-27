import React from 'react';
import PropTypes from 'prop-types';
import classes from './checkbox.module.scss';

const Checkbox = ({
  className, text, onChange, checked,
}) => (
  <label className={`${classes.container} ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={({ target }) => onChange(target.checked)}
    />
    <span className={classes.checkmark} />
    {text && <p className={classes.checkbox_text}>{text}</p>}
  </label>

);

Checkbox.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};
Checkbox.defaultProps = {
  checked: false,
  className: '',
  text: '',
};

export default Checkbox;
