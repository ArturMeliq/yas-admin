import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import './chartComponent.scss';
import CalendarRange from '../CalendarRange/CalendarRange';

const ChartComponent = ({
  chartTemplate, type, chartName, allowCalendar, label, className,
  labelClassName, classNameForCalendar, changeDate, clearDate, rangeDate,

}) => (
  <div className="dashboard-main">
    {(chartName || allowCalendar) && (
    <div className="dashboard_name_calendar ">
      <p className="dashboard_name">{chartName}</p>

      {allowCalendar && (
      <div className={`calendar_wrapper ${classNameForCalendar}`}>
        <CalendarRange
          changeDate={changeDate}
          clearDate={clearDate}
          rangeDate={rangeDate}
          isClearable
        />
      </div>
      )}
    </div>
    ) }

    <div className={`dashboard-main-chart ${className}`}>
      <Chart
        options={chartTemplate.options}
        series={chartTemplate.series}
        type={type}
        height="100%"
        width="100%"
      />
      <p className={`label_chart ${labelClassName}`}>{label}</p>
    </div>
  </div>
);
ChartComponent.propTypes = {
  chartTemplate: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  chartName: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  classNameForCalendar: PropTypes.string,
  label: PropTypes.string,
  allowCalendar: PropTypes.bool,
  changeDate: PropTypes.func,
  clearDate: PropTypes.func,
  rangeDate: PropTypes.array,
};
ChartComponent.defaultProps = {
  chartName: '',
  className: '',
  labelClassName: '',
  classNameForCalendar: '',
  label: '',
  allowCalendar: false,
  changeDate: () => {},
  clearDate: () => {},
  rangeDate: [null, null],
};
export default ChartComponent;
