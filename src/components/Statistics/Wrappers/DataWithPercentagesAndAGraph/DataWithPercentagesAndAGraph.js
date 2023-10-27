import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import classes from './dataWithPercentagesAndAGraph.module.scss';
import Percent from '../../Percent/Percent';
import ChartComponent from '../../../_common/ChartComponent/ChartComponent';
import Api from '../../../../Api/Api';
import useQuery from '../../../../helpers/hooks/useQuery';
import Loader from '../../../_common/Loader/Loader';

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
        show: false,
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

const DataWithPercentagesAndAGraph = () => {
  const { query } = useQuery();
  const {
    startDate,
    endDate,
  } = query;
  const [statics, setStatics] = useState({});

  const [chart, setChart] = useState(chartTemplate);

  useEffect(() => {
    const oneMountAgo = moment().add(-1, 'month').format('YYYY-MM-DD');
    const endOfMonth = moment().format('YYYY-MM-DD');
    const toDrawData = {};

    (async () => {
      setStatics({});
      const [{ data: { platformList } },
        { data: { countryList } }, { data: { cityList } }, { data: { views } }] = await Promise.all([
        Api.topPlatformsByRegisteredUser({
          startDate: startDate || oneMountAgo,
          endDate: endDate || endOfMonth,
        }),
        Api.topCountryByRegisteredUser({
          startDate: startDate || oneMountAgo,
          endDate: endDate || endOfMonth,
        }),
        Api.topCityByRegisteredUser({
          startDate: startDate || oneMountAgo,
          endDate: endDate || endOfMonth,
        }),
        Api.viewReportByRegister({
          startDate: startDate || oneMountAgo,
          endDate: endDate || endOfMonth,
        }),
      ]);

      const newChart = { ...chart };
      newChart.options.xaxis.categories = views.map((v, i) => i);

      newChart.series[0].data = views.map((v) => v?.total);

      setChart(newChart);

      toDrawData.platformList = platformList.map((p) => ({ ...p, percentName: p.os }));
      toDrawData.countryList = countryList.map((c) => ({ ...c, percentName: c.country }));
      toDrawData.cityList = cityList.map((c) => ({ ...c, percentName: c.city }));

      setStatics((prevState) => ({
        ...prevState,
        ...toDrawData,
      }));
    })();
  }, [startDate, endDate]);

  return (
    <div className={classes.wrapper}>
      {_.isEmpty(statics)
        ? (
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            margin: 'auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Loader />
          </div>
        )
        : (
          <>
            <div className={classes.left_side}>
              <div className={classes.percents_wrapper}>
                <Percent
                  name="Platform"
                  percents={statics?.platformList}
                />
              </div>
              <div className={classes.percents_wrapper}>
                <Percent
                  name="Country"
                  percents={statics?.countryList}
                />
              </div>

            </div>
            <div className={classes.right_side}>

              <div className={classes.chart_wrapper}>
                <ChartComponent
                  key={startDate}
                  chartTemplate={chart}
                  type="line"
                  className={classes.chart_width_height}
                  chartName="Website Activity"
                />
              </div>

              <div className={classes.percents_wrapper}>
                <Percent
                  name="City"
                  percents={statics.cityList}
                />
              </div>
            </div>
          </>
        )}

    </div>
  );
};
export default DataWithPercentagesAndAGraph;
