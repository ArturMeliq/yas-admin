import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendarRange.scss';
import PropTypes from 'prop-types';
import { ReactComponent as RefreshIcon } from '../../../assets/icons/business/Refresh.svg';

const CalendarRange = ({
  isClearable, rangeDate, changeDate, clearDate,
}) => {
  const [activeClc, setActiveCls] = useState('');
  const [startDate, endDate] = rangeDate;

  return (
    <div className="range_c_wrapper">
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => changeDate(date)}
        dateFormat="dd.MM.yy"
      />
      {isClearable && (
      <div
        className={`clearable ${activeClc}`}
        onClick={() => {
          clearDate();
          setActiveCls('active');
        }}
        onMouseLeave={() => setActiveCls('')}
      >
        <RefreshIcon />
      </div>
      )}

    </div>
  );
};
CalendarRange.propTypes = {
  isClearable: PropTypes.bool,
  rangeDate: PropTypes.array.isRequired,
  changeDate: PropTypes.func.isRequired,
  clearDate: PropTypes.func.isRequired,
};
CalendarRange.defaultProps = {
  isClearable: false,
};
export default CalendarRange;
