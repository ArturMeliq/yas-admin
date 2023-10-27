import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classes from './topUsers.module.scss';
import CalendarRange from '../../_common/CalendarRange/CalendarRange';
import userPhoto from '../../../assets/photos/user_photo.png';
import Api from '../../../Api/Api';
import DateRangeWrapper from '../../../helpers/hok/DateRangeWrapper';
import Loader from '../../_common/Loader/Loader';

const TopUsers = ({
  topUsersName, allowCalendar, rangeDate, changeDate, clearDate,
}) => {
  const [startDate, endDate] = rangeDate;
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    (async () => {
      const oneMountAgo = moment().add(-1, 'month').format('YYYY-MM-DD');
      const endOfMonth = moment().format('YYYY-MM-DD');

      if (topUsersName === 'Top Active Users') {
        const { data: { topUsers } } = await Api.dashboardTopUsers({
          startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : oneMountAgo,
          endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : endOfMonth,
        });
        setUsersList(topUsers);
      }
    })();
  }, [rangeDate]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.name_calendar}>
        <p className={classes.user_name}>{topUsersName}</p>

        {allowCalendar && (
        <CalendarRange
          isClearable
          rangeDate={rangeDate}
          changeDate={changeDate}
          clearDate={clearDate}
        />
        )}
      </div>
      {!usersList.length
        ? (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            width: 'max-content',
            height: 'max-content',
          }}
          >
            <Loader />
          </div>

        )
        : usersList.map(({ city, name }, i) => (
          <div key={city} className={classes.users}>
            <div className={classes.users_wrapper}>

              <p className={classes.index}>{i + 1}</p>

              <div className={classes.image_name_wrapper}>
                <div className={classes.image_wrapper}>
                  <img src={userPhoto} alt="photo" />
                </div>

                <div>
                  <p className={classes.name}>{name}</p>
                  <p className={classes.city}>{city}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
TopUsers.propTypes = {
  topUsersName: PropTypes.string,
  allowCalendar: PropTypes.bool,
  rangeDate: PropTypes.array.isRequired,
  changeDate: PropTypes.func.isRequired,
  clearDate: PropTypes.func.isRequired,
};
TopUsers.defaultProps = {
  topUsersName: '',
  allowCalendar: true,
};
export default DateRangeWrapper(TopUsers);
