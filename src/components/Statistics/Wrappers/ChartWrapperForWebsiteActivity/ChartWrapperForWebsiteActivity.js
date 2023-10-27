import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import ChartComponent from '../../../_common/ChartComponent/ChartComponent';
import classes from '../../../../pages/dashboard/dashboard.module.scss';
import Api from '../../../../Api/Api';
import DateRangeWrapper from '../../../../helpers/hok/DateRangeWrapper';

const chartTemplate = {
  series: [
    {
      name: 'Website Activity',
      data: [],
    },
  ],
  options: {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#233242'],

    stroke: {
      curve: 'straight',
      width: 2,
    },
    xaxis: {
      type: 'category',
      axisBorder: {
        show: true,
        color: '#233242',
      },

      labels: {
        style: {
          colors: '#233242',
        },
        rotate: -90,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
      },
      categories: [],
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: '#233242',
      },
      labels: {
        style: {
          colors: '#233242',
        },
      },
    },
  },
};
const ChartWrapperForWebsiteActivity = ({ rangeDate, changeDate, clearDate }) => {
  const [chart, setChart] = useState(chartTemplate);

  const [startDate, endDate] = rangeDate;

  useEffect(() => {
    const oneMountAgo = moment().add(-1, 'month').format('YYYY-MM-DD');
    const endOfMonth = moment().format('YYYY-MM-DD');

    Api.dashboardTopUsers({
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : oneMountAgo,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : endOfMonth,
    });

    const newChart = { ...chart };
    newChart.series[0].data = [0, 5];

    setChart(newChart);
  }, [rangeDate]);

  return (
    <ChartComponent
      chartTemplate={chart}
      chartName="Website Activity"
      allowCalendar
      type="line"
      className={classes.chart_width_height}
      changeDate={changeDate}
      clearDate={clearDate}
      rangeDate={rangeDate}
    />
  );
};

ChartWrapperForWebsiteActivity.propTypes = {
  rangeDate: PropTypes.array.isRequired,
  changeDate: PropTypes.func.isRequired,
  clearDate: PropTypes.func.isRequired,
};

export default DateRangeWrapper(ChartWrapperForWebsiteActivity);
