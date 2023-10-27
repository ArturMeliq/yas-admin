import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment/moment';
import ChartComponent from '../../../_common/ChartComponent/ChartComponent';
import classes from '../../../../pages/dashboard/dashboard.module.scss';
import Api from '../../../../Api/Api';
import Loader from '../../../_common/Loader/Loader';

const chartTemplateRadialBar = {

  series: [],
  options: {
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

const ChartWrapperNewUsersAndViewQuantity = () => {
  const [rangeDate, setDateRange] = useState([null, null]);
  const [viewChart, setViewChart] = useState(chartTemplateRadialBar);

  const [startDate, endDate] = rangeDate;

  useEffect(() => {
    (async () => {
      const oneMountAgo = moment().add(-1, 'month').format('YYYY-MM-DD');
      const endOfMonth = moment().format('YYYY-MM-DD');

      const { data: { quantity } } = await Api.dashViewQuantity({
        startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : oneMountAgo,
        endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : endOfMonth,
      });
      setViewChart((prev) => ({
        ...prev,
        series: [quantity],
      }));
    })();
  }, [rangeDate]);

  const changeDate = useCallback((date) => {
    setDateRange(date);
  }, [rangeDate]);

  const clearDate = useCallback(() => {
    setDateRange([null, null]);
  }, [rangeDate]);

  return (
    <div className={classes.new_user_view_wrapper}>
      <div className={classes.one_char_without_calendar}>
        {!viewChart.series.length
          ? (
            <div style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -34,
            }}
            >
              <Loader />
            </div>
          )
          : (
            <ChartComponent
              chartTemplate={viewChart}
              labelClassName={classes.label}
              allowCalendar={false}
              type="radialBar"
              label="New Users Quantity"
            />
          )}

      </div>

      <div className={classes.one_char}>
        {!viewChart.series.length
          ? (
            <div style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <Loader />
            </div>
          )
          : (
            <ChartComponent
              chartTemplate={viewChart}
              labelClassName={classes.label}
              allowCalendar
              type="radialBar"
              label="View quantity"
              classNameForCalendar={classes.margin_left}
              changeDate={changeDate}
              clearDate={clearDate}
              rangeDate={rangeDate}
            />
          )}

      </div>
    </div>

  );
};

export default ChartWrapperNewUsersAndViewQuantity;
