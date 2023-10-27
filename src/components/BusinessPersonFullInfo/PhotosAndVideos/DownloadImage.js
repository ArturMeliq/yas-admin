import React from 'react';
import PropTypes from 'prop-types';
import classes from './photosAndVideos.module.scss';

const DownloadImage = ({ imageUpload, onDragOrMouseEnter, onnDragOrMouseLeave }) => (
  <input
    className={classes.photos_input}
    id="upload_img"
    type="file"
    accept=".jpeg, .jpg, .png"
    multiple
    onChange={imageUpload}
    onMouseEnter={onDragOrMouseEnter}
    onMouseLeave={onnDragOrMouseLeave}
    onDragEnter={onDragOrMouseEnter}
    onDragLeave={onnDragOrMouseLeave}
  />
);
DownloadImage.propTypes = {
  imageUpload: PropTypes.func.isRequired,
  onDragOrMouseEnter: PropTypes.func.isRequired,
  onnDragOrMouseLeave: PropTypes.func.isRequired,
};
export default DownloadImage;
