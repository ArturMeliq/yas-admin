import React, { useId } from 'react';
import PropTypes from 'prop-types';
import classes from './percent.module.scss';
import CalendarRange from '../../_common/CalendarRange/CalendarRange';

const Percent = ({
  name, percents, allowCalendar, className, rangeDate, clearDate, changeDate,
}) => {
  const currentId = useId();
  return (
    <div className={`${classes.wrapper} ${className}`}>
      <div className={classes.name_select}>

        <p className={classes.name}>{name}</p>

        {allowCalendar && (
        <CalendarRange
          rangeDate={rangeDate}
          clearDate={clearDate}
          changeDate={changeDate}
          isClearable
        />
        )}
      </div>

      { percents.map(({ percentage, percentName }) => (
        <div key={percentName + currentId} className={classes.content}>
          <span className={classes.percent_name}>{percentName}</span>

          <div className={classes.max_percent}>
            <div style={{ width: percentage }} className={classes.percent} />
          </div>

          <span className={classes.percent_numb}>{percentage}</span>
        </div>
      ))}
    </div>

  );
};
Percent.propTypes = {
  percents: PropTypes.array.isRequired,
  name: PropTypes.string,
  allowCalendar: PropTypes.bool,
  className: PropTypes.string,
  rangeDate: PropTypes.array,
  clearDate: PropTypes.func,
  changeDate: PropTypes.func,
};
Percent.defaultProps = {
  name: '',
  className: '',
  allowCalendar: false,
  rangeDate: [null, null],
  clearDate: () => {},
  changeDate: () => {},
};
export default Percent;
