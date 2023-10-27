import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classes from './statistics.module.scss';
import RegisteredUsers from './registeredUsers/RegisteredUsers';
import UncompletedRegistration from './uncompletedRegistration/UncompletedRegistration';
import UnregisteredVisitors from './unregisteredVisitors/UnregisteredVisitors';

const steps = [{
  stepName: 'registered-users',
  title: 'Registered Users',
},
{
  stepName: 'uncompleted-registration',
  title: 'Uncompleted Registration',

},
{
  stepName: 'unregistered-visitors',
  title: 'Unregistered visitors',

},
];

const Statistics = () => {
  const { type } = useParams();

  return (
    <div className={classes.wrapper}>
      <div className={classes.steps}>

        {steps.map(({ title, stepName }) => (
          <NavLink
            to={`/statistics/${stepName}`}
            key={title}
            className={({ isActive }) => `${classes.step} ${isActive ? classes.active : ''}`}
          >
            {title}
          </NavLink>
        ))}
      </div>

      <div className={classes.content_wrapper}>
        {type === 'registered-users'
          && (
            <RegisteredUsers />
          )}
        { type === 'uncompleted-registration'
          && (
            <UncompletedRegistration />
          )}
        { type === 'unregistered-visitors'
          && (
            <UnregisteredVisitors />
          )}
      </div>
    </div>
  );
};

export default Statistics;
