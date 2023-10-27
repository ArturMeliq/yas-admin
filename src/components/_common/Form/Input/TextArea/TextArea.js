import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './textArea.module.scss';

const TextArea = ({
  value, placeholder, onChange, className, error, isAllowCharacters,
}) => {
  const [isLabelActive, labelActiveToggle] = useState(false);

  return (
    <div className={`${classes.textAreBlock} ${className}`}>
      <textarea
        value={value}
        placeholder={placeholder}
        onFocus={() => labelActiveToggle(true)}
        onBlur={() => labelActiveToggle(false)}
        className={`${classes.textarea} ${error ? classes.error : ''}`}
        onChange={({ target }) => onChange(target.value)}
      />

      {(value || isLabelActive)
        && (
        <span
          className={`${classes.textAre_span} ${value || isLabelActive ? classes.in_focus : ''}`}
        >
          {placeholder}
        </span>
        ) }

      {isAllowCharacters && (
      <span className={classes.max_length_character}>
        {value.length}
        /1500
      </span>
      )}
    </div>
  );
};
TextArea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  error: PropTypes.bool,
  isAllowCharacters: PropTypes.bool,
};
TextArea.defaultProps = {
  value: '',
  placeholder: '',
  className: '',
  error: false,
  isAllowCharacters: false,
};

export default TextArea;
