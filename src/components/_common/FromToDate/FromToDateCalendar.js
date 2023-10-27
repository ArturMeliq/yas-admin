import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import classes from './fromToDate.module.scss';
import Calendar from '../Calendar/Calendar';
import { ReactComponent as RefreshIcon } from '../../../assets/icons/business/Refresh.svg';

const FromToDateCalendar = ({
  startDate, endDate, changeDate, onRefreshDate, page,
}) => {
  const [activeClc, setActiveCls] = useState('');

  const minDate = startDate ? new Date(moment(startDate).add(1, 'day').format('YYYY-MM-DD')) : null;

  return (
    <div className={classes.wrapper}>
      <div className={classes.from}>
        <p className={classes.text}>From</p>

        <Calendar
          selected={startDate ? new Date(startDate) : null}
          onChange={(date) => changeDate('startDate', date, page)}
        />
      </div>

      <div className={classes.to}>
        <p className={classes.text}>To</p>

        <Calendar
          selected={endDate ? new Date(endDate) : null}
          onChange={(date) => changeDate('endDate', date, page)}
          disabled={!startDate}
          minDate={minDate}
        />
      </div>

      <div
        className={`${classes.refresh} ${activeClc}`}
        onClick={() => {
          onRefreshDate(page);
          setActiveCls(classes.active);
        }}
        onMouseLeave={() => setActiveCls('')}
      >
        <RefreshIcon />
      </div>
    </div>
  );
};

FromToDateCalendar.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  changeDate: PropTypes.func.isRequired,
  onRefreshDate: PropTypes.func.isRequired,
  page: PropTypes.number,
};
FromToDateCalendar.defaultProps = {
  page: 1,
  startDate: '',
  endDate: '',
};

export default FromToDateCalendar;
