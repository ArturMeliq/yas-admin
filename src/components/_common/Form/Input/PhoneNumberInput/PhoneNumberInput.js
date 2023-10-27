import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import PropTypes from 'prop-types';
import classes from './phoneNumberInput.module.scss';

const PhoneNumberInput = ({
  value, onChange, error, placeholder, className,
}) => {
  const [isLabelActive, labelActiveToggle] = useState(false);
  return (
    <div className={`${classes.phone_input_block} ${className || ''}`}>
      <PhoneInput
        value={value}
        inputProps={{
          name: 'phone',
          required: true,
        }}
        placeholder={placeholder}
        country="am"
        onChange={(val) => onChange(val)}
        onFocus={() => labelActiveToggle(true)}
        onBlur={() => labelActiveToggle(false)}
        containerClass={`${classes.phone_input_container} ${error ? classes.error : ''}`}
        inputClass={classes.phone_input}
        buttonClass={classes.phone_input_btn}
        dropdownClass={classes.phone_input_dropdown}
        searchClass={classes.phone_input_search}
      />
      <span className={value || isLabelActive ? classes.in_focus : ''}>Phone Number</span>
    </div>

  );
};
PhoneNumberInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};
PhoneNumberInput.defaultProps = {
  error: false,
  className: '',
  placeholder: '',
};

export default PhoneNumberInput;
