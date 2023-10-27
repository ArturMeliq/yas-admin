import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment/moment';
import ChartComponent from '../../../_common/ChartComponent/ChartComponent';
import classes from '../../../../pages/dashboard/dashboard.module.scss';
import Api from '../../../../Api/Api';

const chartTemplateRadialBar = {

  series: [67],
  options: {
    chart: {
      height: 200,
      width: 200,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: '65%',
          background: '#233242',
        },
        track: {
          dropShadow: {
            enabled: true,
            opacity: 0.15,
          },
          background: '#FF5C00',
        },
        dataLabels: {
          value: {
            color: '#FFFFFF',
            offsetY: -30,
            fontSize: '20px',
            show: true,
            formatter(val) {
              return val;
            },
          },

          name: {
            offsetY: 20,
            color: '#FFFFFF',
            fontSize: '17px',
          },
        },
      },
    },
    fill: {
      type: 'gradient',
    },
    colors: ['#233242'],
    stroke: {
      lineCap: 'round',
      width: 1,
      dashArray: 0,
    },
    labels: [''],
  },

};

const ChartWrapperBusinessQuantity = () => {
  const [rangeDate, setDateRange] = useState([null, null]);

  const [startDate, endDate] = rangeDate;

  useEffect(() => {
    const oneMountAgo = moment().add(-1, 'month').format('YYYY-MM-DD');
    const endOfMonth = moment().format('YYYY-MM-DD');

    Api.updateResponsiblePerson({
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : oneMountAgo,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : endOfMonth,
    });
  }, [rangeDate]);

  const changeDate = useCallback((date) => {
    setDateRange(date);
  }, [rangeDate]);

  const clearDate = useCallback(() => {
    setDateRange([null, null]);
  }, [rangeDate]);

  return (
    <ChartComponent
      chartTemplate={chartTemplateRadialBar}
      allowCalendar
      type="radialBar"
      label="Business Quantity"
      className={classes.radialBar_one_char}
      changeDate={changeDate}
      clearDate={clearDate}
      rangeDate={rangeDate}
    />
  );
};

export default ChartWrapperBusinessQuantity;
