import React, {
  useEffect, useId, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowDownIcon } from '../../../../../assets/icons/activity/Arrow_down.svg';
import classes from './mySelectComponent.module.scss';

const MySelectComponent = ({
  value, options, onChange, placeholder, error,
  classNameCurrentWrapper, classNameCurrentOptionText, classNameOptionsWrapper, classNameOptions, hideBorder,
  disabled,
}) => {
  const uniqId = useId();
  const valueRef = useRef();
  const [showOptions, showOptionsToggle] = useState(false);
  const [isLabelActive, labelActiveToggle] = useState(false);

  const changeValue = (option) => {
    onChange(option);
    showOptionsToggle(false);
  };

  useEffect(() => {
    window.addEventListener('click', closeMenu, true);

    return () => {
      window.removeEventListener('click', closeMenu, true);
    };
  }, []);

  const closeMenu = (e) => {
    if (!e.target.closest(`[id="select_wrapper_${uniqId}"]`)) {
      showOptionsToggle(false);
    }
  };

  return (
    <div
      id={`select_wrapper_${uniqId}`}
      className={`${classes.select_wrapper}`}
    >
      <div
        className={`${classes.current_option_wrapper} ${error && classes.error} 
        ${classNameCurrentWrapper || ''} ${disabled && classes.disabled}`}
        style={{ border: hideBorder && 'none' }}
        onClick={() => showOptionsToggle((prev) => !prev)}
        onFocus={() => labelActiveToggle(true)}
        onBlur={() => labelActiveToggle(false)}
        ref={valueRef}
      >
        <p
          className={`${classes.current_option_text} ${!value && classes.placeholder} 
          ${classNameCurrentOptionText || ''} ${disabled && classes.disabled}`}
        >
          {value || placeholder}
        </p>
        <ArrowDownIcon
          className={`${classes.arrow_icon} ${showOptions && classes.active_icon}
           ${disabled && classes.disabled}`}
        />
      </div>

      {(showOptions && !disabled) && (
        <ul
          style={{ top: `${(valueRef.current?.offsetHeight || 0)}px` }}
          className={`${classes.options_wrapper} ${classNameOptionsWrapper || ''}`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => changeValue(option)}
              className={
              `${classes.option} 
              ${option.toUpperCase() === value.toUpperCase() ? classes.active : ''}
               ${classNameOptions || ''}`
}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {((value && value?.length && !hideBorder) || isLabelActive)
        && <span className={value || isLabelActive ? classes.in_focus : ''}>{placeholder}</span>}
    </div>
  );
};

MySelectComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  hideBorder: PropTypes.bool,
  error: PropTypes.any,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  classNameCurrentWrapper: PropTypes.string,
  classNameCurrentOptionText: PropTypes.string,
  classNameOptionsWrapper: PropTypes.string,
  classNameOptions: PropTypes.string,
};

MySelectComponent.defaultProps = {
  placeholder: '',
  error: '',
  disabled: false,
  hideBorder: false,
  classNameCurrentWrapper: '',
  classNameCurrentOptionText: '',
  classNameOptionsWrapper: '',
  classNameOptions: '',
};
export default MySelectComponent;
