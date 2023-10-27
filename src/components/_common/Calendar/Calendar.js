import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.scss';
import PropTypes from 'prop-types';

const Calendar = ({
  selected, onChange, disabled, minDate,
}) => (
  <div className="normal_c_wrapper">
    <DatePicker
      onChange={(date) => onChange(date)}
      selected={selected}
      minDate={minDate}
      dateFormat="dd.MM.yy"
      disabled={disabled}
    />
  </div>

);
Calendar.propTypes = {
  selected: PropTypes.object,
  minDate: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
Calendar.defaultProps = {
  selected: null,
  minDate: null,
  disabled: false,
};
export default Calendar;
