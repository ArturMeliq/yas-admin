import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './selectComponent.scss';
import _ from 'lodash';
import Chip from '../Chip/Chip';

const SelectComponent = ({
  options, placeholder, isDisabled, onChange, error, value, className,
  isSearchable, isMulti, isMenuStatic, isClearable, onOptionDelete,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isLabelActive, labelActiveToggle] = useState(false);

  useEffect(() => {
    setInputValue(_.upperFirst(value));
  }, [value]);

  const openOptionsMenu = useCallback((inputVal, action) => {
    if (action === 'input-change') {
      setInputValue(inputVal);
    }
  }, []);

  const props = {};
  if (isSearchable) props.inputValue = inputValue;

  let wrapperCls = 'select_main_block';

  if (error) wrapperCls = wrapperCls.concat(' error');
  if (isMenuStatic) wrapperCls = wrapperCls.concat(' position_static');
  if (className) wrapperCls = wrapperCls.concat(` ${className}`);

  return (
    <div
      className={wrapperCls}
    >
      <Select
        isSearchable={isSearchable}
        value={(isMulti ? value : options.find((o) => o.value.toLowerCase() === value.toLowerCase()) || null)}
        isDisabled={isDisabled}
        placeholder={placeholder}
        className="select_container"
        classNamePrefix="yas"
        onChange={(o) => onChange(isMulti ? o : (o?.value || ''))}
        options={options}
        isMulti={isMulti}
        isClearable={isClearable}
        closeMenuOnSelect={!isMulti}
        onFocus={() => labelActiveToggle(true)}
        onBlur={() => labelActiveToggle(false)}
        onInputChange={(newValue, { action }) => openOptionsMenu(newValue, action)}
        {...props}
      />

      {isMulti && <Chip onDelete={onOptionDelete} data={value} />}

      {error && <p>{error}</p>}

      {((value && value?.length) || isLabelActive) && <span className={value || isLabelActive ? 'in_focus' : ''}>{placeholder}</span>}
    </div>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  value: PropTypes.any,
  className: PropTypes.string,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  isMenuStatic: PropTypes.bool,
  isMulti: PropTypes.bool,
  onOptionDelete: PropTypes.func,
};

SelectComponent.defaultProps = {
  placeholder: '',
  isDisabled: false,
  isSearchable: false,
  isMulti: false,
  error: false,
  isMenuStatic: false,
  isClearable: false,
  value: '',
  className: '',
  onOptionDelete: () => {},
};

export default SelectComponent;
