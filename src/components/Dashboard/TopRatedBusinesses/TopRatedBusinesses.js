import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classes from './TopRatedBusinesses.module.scss';
import CalendarRange from '../../_common/CalendarRange/CalendarRange';
import userPhoto from '../../../assets/photos/user_photo.png';
import StarRatingsMyComponent from '../../_common/StarRatings/StarRatingsMyComponent';
import Api from '../../../Api/Api';
import DateRangeWrapper from '../../../helpers/hok/DateRangeWrapper';

const TopRatedBusinesses = ({
  allowCalendar, rangeDate, changeDate, clearDate,
}) => {
  const [startDate, endDate] = rangeDate;

  useEffect(() => {
    (async () => {
      const oneMountAgo = moment().add(-1, 'month').format('YYYY-MM-DD');
      const endOfMonth = moment().format('YYYY-MM-DD');

      const { data: { topUsers } } = await Api.dashboardTopUsers({
        startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : oneMountAgo,
        endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : endOfMonth,
      });
      console.log(topUsers);
    })();
  }, [rangeDate]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.name_calendar}>
        {allowCalendar && (
        <CalendarRange
          isClearable
          clearDate={clearDate}
          changeDate={changeDate}
          rangeDate={rangeDate}
        />
        )}
      </div>
      <h3 className={classes.title}>Top Rated Businesses</h3>

      <div className={classes.top_businesses}>
        <div className={classes.image_wrapper}>
          <img src={userPhoto} alt="photo" />
        </div>

        <div className={classes.info_wrapper}>
          <p className={classes.name}>Florence</p>

          <StarRatingsMyComponent rating={1} />

          <p className={classes.category}>Restaurant</p>
        </div>
      </div>
      <div className={classes.top_businesses}>
        <div className={classes.image_wrapper}>
          <img src={userPhoto} alt="photo" />
        </div>

        <div className={classes.info_wrapper}>
          <p className={classes.name}>Florence</p>

          <StarRatingsMyComponent rating={1} />

          <p className={classes.category}>Restaurant</p>
        </div>
      </div>
      <div className={classes.top_businesses}>
        <div className={classes.image_wrapper}>
          <img src={userPhoto} alt="photo" />
        </div>

        <div className={classes.info_wrapper}>
          <p className={classes.name}>Florence</p>

          <StarRatingsMyComponent rating={1} />

          <p className={classes.category}>Restaurant</p>
        </div>
      </div>
      <div className={classes.top_businesses}>
        <div className={classes.image_wrapper}>
          <img src={userPhoto} alt="photo" />
        </div>

        <div className={classes.info_wrapper}>
          <p className={classes.name}>Florence</p>

          <StarRatingsMyComponent rating={1} />

          <p className={classes.category}>Restaurant</p>
        </div>
      </div>
    </div>
  );
};

TopRatedBusinesses.propTypes = {
  allowCalendar: PropTypes.bool.isRequired,
  rangeDate: PropTypes.array.isRequired,
  changeDate: PropTypes.func.isRequired,
  clearDate: PropTypes.func.isRequired,
};

export default DateRangeWrapper(TopRatedBusinesses);
