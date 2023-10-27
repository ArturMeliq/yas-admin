import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { ReactComponent as StartIcon } from '../../../assets/icons/_common/Star.svg';
import classes from './StarRatingsMyComponent.module.scss';

const StarRatingsMyComponent = ({ rating, className }) => (
  <div className={classes.wrapper}>
    {_.range(1, 6).map((i) => (
      <div
        key={i}
        id={i}
        className={`${classes.star} ${rating >= +i ? classes.active : ''} ${className}`}
      >
        <StartIcon />
      </div>
    ))}
  </div>
);

StarRatingsMyComponent.propTypes = {
  rating: PropTypes.number.isRequired,
  className: PropTypes.string,
};
StarRatingsMyComponent.defaultProps = {
  className: '',
};

export default StarRatingsMyComponent;
