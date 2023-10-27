import React from 'react';
import classes from './toggleSwitch.module.scss';

const ToggleSwitch = () => (
  <label className={classes.switch}>
    <input className={classes.slider} type="checkbox" />
    <span />
  </label>
);

export default ToggleSwitch;
