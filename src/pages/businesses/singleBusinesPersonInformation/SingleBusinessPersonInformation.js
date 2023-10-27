import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Activity from '../../../components/BusinessPersonFullInfo/Activity/Activity';
import Reviews from '../../../components/BusinessPersonFullInfo/Reviews/Reviews';
import AccountInformation from '../../../components/BusinessPersonFullInfo/AccountInformation/AccountInformation';
import classes from './singleBusinessPersonInformation.module.scss';
import SingleBusiness from '../singleBusiness/SingleBusiness';

const steps = [{
  stepName: 'activity',
  title: 'Activity',
},
{
  stepName: 'businessInformation',
  title: 'Business Information',

},
{
  stepName: 'reviews',
  title: 'Reviews',

},
{
  stepName: 'photosAndVideos',
  title: 'Photos and Videos',

},
{
  stepName: 'accountInformation',
  title: 'Account information',

}];

const SingleBusinessPersonInformation = () => {
  const { id, type } = useParams();

  return (
    <div className={classes.wrapper}>

      <div className={classes.left_bar}>
        <h3 className={classes.inner_side_bar_title}>Business Information</h3>

        <ul className={classes.inner_side_bar}>
          {steps.map(({
            title,
            stepName,
          }) => (
            <NavLink
              to={`/businesses/${stepName}/${id}`}
              key={title}
              className={({ isActive }) => `${classes.inner_side_bar_item} ${isActive ? classes.active : ''}`}
            >
              {title}
            </NavLink>
          ))}
        </ul>
      </div>

      <div className={classes.dashboard_content_wrapper}>
        {type === 'activity'
          && <Activity />}

        {(type === 'businessInformation' || type === 'photosAndVideos')
          && (
            <SingleBusiness
              showAllowButtons={false}
              type={type}
            />
          )}

        {type === 'reviews'
          && (
            <Reviews />
          )}

        {type === 'accountInformation'
          && (
            <AccountInformation />
          )}
      </div>
    </div>
  );
};

export default SingleBusinessPersonInformation;
