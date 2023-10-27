import React from 'react';
import PropTypes from 'prop-types';
import classes from './loader.module.scss';

const Loader = ({
  size, weight, color, className,
}) => (
  <div
    style={{
      height: size,
      width: size,
      borderWidth: weight,
      borderTopColor: color,
    }}
    className={`${classes.loader} ${className}`}
  />
);

Loader.propTypes = {
  size: PropTypes.number,
  weight: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

Loader.defaultProps = {
  size: 100,
  weight: 6,
  color: '#233242',
  className: '',
};

export default Loader;
