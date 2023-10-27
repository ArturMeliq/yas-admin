import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/modal/xmark-solid.svg';
import classes from './chip.module.scss';

const Chip = ({ data, onDelete }) => (
  !!data.length && (
    <div className={classes.others_block_item}>
      {data.map((d, i) => (
        <div className={classes.others_item} key={d?.label || d}>
          <p>{d?.label || d}</p>

          <DeleteIcon onClick={() => onDelete(i)} />
        </div>
      ))}
    </div>
  )
);

Chip.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Chip;
