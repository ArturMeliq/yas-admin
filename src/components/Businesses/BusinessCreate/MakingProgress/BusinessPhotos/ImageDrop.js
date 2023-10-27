import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PlusIcon } from '../../../../../assets/icons/makingProgressIcons/plus-solid.svg';
import classes from './businessPhotos.module.scss';

const ImageDrop = ({
  uploadImage, hideText, hoverCls, setHoverCls, error,
}) => {
  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHoverCls(classes.hover);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHoverCls('');
  };

  const photoUploadWrap = [classes.photos_info];
  if (hoverCls) photoUploadWrap.push(hoverCls);
  if (hideText) photoUploadWrap.push(classes.hide_text);
  if (error) photoUploadWrap.push(classes.error);

  return (
    <div className={photoUploadWrap.join(' ')}>
      <p className={classes.photos_info_text}>
        <PlusIcon />
        Browse photos or drag here to add
      </p>

      <input
        id="file_upload"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        type="file"
        multiple
        accept=".jpeg, .jpg, .png"
        onChange={uploadImage}
      />
    </div>
  );
};

ImageDrop.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  setHoverCls: PropTypes.func,
  hideText: PropTypes.bool,
  hoverCls: PropTypes.string,
  error: PropTypes.bool,
};

ImageDrop.defaultProps = {
  hideText: false,
  hoverCls: '',
  setHoverCls: () => {},
  error: false,
};

export default ImageDrop;
