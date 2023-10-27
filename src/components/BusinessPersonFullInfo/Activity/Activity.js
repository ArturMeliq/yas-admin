import React, { useState } from 'react';
import classes from './activity.module.scss';
import Button from '../../_common/Form/Button/Button';
import ChartComponent from '../../_common/ChartComponent/ChartComponent';
import { ReactComponent as VectorIcon1 } from '../../../assets/icons/activity/Vector_1.svg';
import { ReactComponent as VectorIcon2 } from '../../../assets/icons/activity/Vector_2.svg';
import { ReactComponent as VectorIcon3 } from '../../../assets/icons/activity/Vector_3.svg';
import { ReactComponent as VectorIcon4 } from '../../../assets/icons/activity/Vector_4.svg';
import { ReactComponent as VectorIcon5 } from '../../../assets/icons/activity/Vector_5.svg';
import { ReactComponent as VectorIcon6 } from '../../../assets/icons/activity/Vector_6.svg';
import { ReactComponent as VectorIcon7 } from '../../../assets/icons/activity/Vector_7.svg';

const chartTemplate = {
  series: [
    {
      name: 'Customer Leads',
      data: [0, 10, 20, 50, 40, 90, 60, 70, 80, 0, 100],
    },
    {
      name: 'Total unique views',
      data: [0, 10, 50, 30, 40, 30, 60, 70, 80, 0, 100],
    },
    {
      name: 'User views',
      data: [0, 10, 50, 30, 40, 30, 60, 70, 80, 0, 100],
    },
    {
      name: 'Detailed views',
      data: [0, 10, 50, 30, 40, 30, 60, 70, 80, 0, 100],
    },
  ],
  options: {
    chart: {
      height: 450,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#233242', '#00C835', '#FF5C00', '#FBBC04'],

    stroke: {
      curve: 'straight',
      width: 2,
    },
    xaxis: {
      type: 'category',
      // tickPlacement: 'between',
      axisBorder: {
        show: true,
        color: '#ADAFDE',
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: '#ffff00',
        height: 5,
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: '#ADAFDE',
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: '#ff0000',
        width: 5,
      },
      labels: {
        style: {
          colors: '#233242',
        },
      },
    },

    markers: {
      seriesIndex: 0,
      dataPointIndex: 7,
      shape: ['circle'],
      colors: ['#233242', '#00C835', '#FF5C00', '#FBBC04'],
      strokeColors: ['#233242', '#00C835', '#FF5C00', '#FBBC04'],
      showNullDataPoints: true,
      size: 5,
      strokeWidth: 6,
      hover: {
        size: 5,
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'start',
      floating: false,
      offsetY: 0,
      offsetX: 0,
      height: 50,
      markers: {
        shape: ['square'],
        width: 15,
        radius: 5,
        height: 15,
        offsetY: 0,
      },
    },
  },
};

const info = [
  {
    label: '0 mobile Check-ins',
    Icon: VectorIcon1,
  },
  {
    label: '24 Clicks to your Website',
    Icon: VectorIcon5,
  },
  {
    label: '1 Directions & Map views',
    Icon: VectorIcon2,
  },
  {
    label: '0 User Uploaded photos',
    Icon: VectorIcon6,
  },
  {
    label: '2 Mobile Calls',
    Icon: VectorIcon3,
  },
  {
    label: '0 Yelp BookMarks',
    Icon: VectorIcon7,
  },
  {
    label: '2 Messages',
    Icon: VectorIcon4,
  },
];

const Activity = () => {
  const [activeCls, setActiveCls] = useState('website');
  return (
    <div className={classes.activity}>
      <h2 className={classes.activity_title}>Activity</h2>
      <div className={classes.information_btn_block}>

        <div>
          <Button
            className={`${classes.website_btn} ${activeCls === 'website' ? classes.active : ''}`}
            onClick={() => {
              setActiveCls('website');
            }}
          >
            Website
          </Button>

          <Button
            className={`${classes.mobile_app_btn} ${activeCls === 'mobile' ? classes.active : ''}`}
            onClick={() => {
              setActiveCls('mobile');
            }}
          >
            Mobile app
          </Button>
        </div>

        <div className={classes.period}>
          <p className={classes.period_text}>Period:</p>

          <Button
            className={classes.days_btn}
            onClick={() => {
            }}
          >
            30 Days
          </Button>

          <Button
            className={classes.middle_months_btn}
            onClick={() => {
            }}
          >
            12 Months
          </Button>
          <Button
            className={classes.end_months_btn}
            onClick={() => {
            }}
          >
            24 Months
          </Button>
        </div>

      </div>

      <div className={classes.chart_wrapper}>
        <ChartComponent chartTemplate={chartTemplate} type="line" />
      </div>

      <p className={classes.info_text}>Customer Leads Breakdown: November 2016 - October 2017 </p>

      <div className={classes.information}>
        {info.map(({ label, Icon }) => (
          <div key={label} className={classes.information_item}>

            <Icon className={classes.information_item_icon} />
            <span className={classes.information_item_label}>{label}</span>
          </div>
        ))}
        <p className={classes.change_text}>The forecasted value on the current month is an estimate and will change as the month progresses.</p>
      </div>
    </div>

  );
};

export default Activity;
