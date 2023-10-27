import React from 'react';
import classes from './dashboard.module.scss';
import TopRatedBusinesses from '../../components/Dashboard/TopRatedBusinesses/TopRatedBusinesses';
import TopUsers from '../../components/Dashboard/TopUsers/TopUsers';
import ChartWrapperForWebsiteActivity
  from '../../components/Statistics/Wrappers/ChartWrapperForWebsiteActivity/ChartWrapperForWebsiteActivity';
import PercentWrapperForActivityCountry
  from '../../components/Statistics/Wrappers/PercentWrapperForActivityCountry/PercentWrapperForActivityCountry';
import ChartWrapperForUserQuantity
  from '../../components/Statistics/Wrappers/ChartWrapperForUserQuantity/ChartWrapperForUserQuantity';
import ChartWrapperReviewQuantity
  from '../../components/Statistics/Wrappers/ChartWrapperReviewQuantity/ChartWrapperReviewQuantity';
import ChartWrapperBusinessQuantity
  from '../../components/Statistics/Wrappers/ChartWrapperBusinessQuantity/ChartWrapperReviewQuantity';
import ChartWrapperNewUsersAndViewQuantity
  from '../../components/Statistics/Wrappers/ChartWrapperNewUsersAndViewQuantity/ChartWrapperNewUsersAndViewQuantity';

const Dashboard = () => (
  <div className={classes.wrapper}>
    <div className={classes.left_side}>

      <div className={classes.chart_wrapper}>
        <ChartWrapperForWebsiteActivity />
      </div>
      <div className={classes.percents_users_wrapper}>

        <div className={classes.percents_wrapper}>
          <PercentWrapperForActivityCountry />
        </div>

        <TopRatedBusinesses
          allowCalendar
        />
      </div>

    </div>
    <div className={classes.right_side}>
      <div className={classes.charts_wrapper}>

        <div className={classes.one_char}>
          <ChartWrapperForUserQuantity />
        </div>

        <div className={classes.one_char}>
          <ChartWrapperReviewQuantity />
        </div>

        <div className={classes.one_char}>
          <ChartWrapperBusinessQuantity />
        </div>
      </div>

      <div className={classes.views_users_wrapper}>
        <TopUsers
          topUsersName="Top Active Users"
        />

        <div className={classes.quantity_users_wrapper}>

          <ChartWrapperNewUsersAndViewQuantity />

          <div className={classes.top_commented_users}>
            <TopUsers
              topUsersName="Top commented Users"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
);

export default Dashboard;
