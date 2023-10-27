import React, { useCallback, useRef, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ReactComponent as PlusIcon } from '../../../assets/icons/makingProgressIcons/plus-solid.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/makingProgressIcons/trash-can-solid.svg';
import classes from './photosAndVideos.module.scss';
import DownloadImage from './DownloadImage';
import Utils from '../../../helpers/utils/utils';

const allowImageFormats = '.jpeg, .jpg, .png';
const PhotosAndVideos = ({ photos, changeData }) => {
  const [hoverCls, setHoverCls] = useState('');
  const orderRef = useRef();
  const onDragOrMouseEnter = useCallback(() => {
    setHoverCls('hover');
  }, [hoverCls]);

  const onnDragOrMouseLeave = useCallback(() => {
    setHoverCls('');
  }, [hoverCls]);

  const imageUpload = (e) => {
    const { files } = e.target;

    let errorText = '';
    let newPhotos = [...photos];

    _.forEach(files, (file) => {
      if (!Utils.validateImage(file, 5, allowImageFormats)) {
        errorText = `Image max size 5mb and allow only ${allowImageFormats} formats`;
      } else {
        file._preview = URL.createObjectURL(file);
        newPhotos = [...newPhotos, { order: ((newPhotos[newPhotos.length - 1])?.order || 0) + 1, file }];
      }
    });

    if (errorText) {
      toast.error(errorText);
    }

    if (newPhotos.length > 10) {
      toast.error('You can add max 10 images');

      newPhotos = [...newPhotos.slice(0, 10)];
    }

    changeData('photos', newPhotos);
    e.target.value = '';
    setHoverCls('');
  };
  const deletePhoto = (deletedOrder) => {
    changeData('photos', photos.filter((photo) => photo.order !== deletedOrder)
      .map((photo) => (photo.order > deletedOrder ? { ...photo, order: photo.order - 1 } : photo)));
  };
  const onDragStart = (e, order) => {
    e.stopPropagation();
    orderRef.current = order;
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const imageOnDrop = (droppedOrder) => {
    let sortedData = [...photos];

    sortedData = _.orderBy(sortedData.map((single) => {
      if (single.order === orderRef.current) {
        return { ...single, order: droppedOrder };
      }
      if (droppedOrder <= single.order && orderRef.current > single.order) {
        return { ...single, order: single.order + 1 };
      }

      if (droppedOrder >= single.order && orderRef.current < single.order) {
        return { ...single, order: single.order - 1 };
      }

      return single;
    }), 'order');

    changeData('photos', sortedData);
  };

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.photosAndVideos_title}>
        Photos and Videos
      </h2>
      <div className={classes.images_wrapper}>
        {_.orderBy(photos, 'order').map((photo) => (
          <div
            key={photo.order}
            className={classes.single_image}
            draggable
            onDragOver={onDragOver}
            onDragStart={(e) => onDragStart(e, photo.order)}
            onDrop={() => imageOnDrop(photo.order)}
          >

            <img src={photo?.file?._preview || photo.file} alt="photo" />

            <DeleteIcon
              onClick={() => deletePhoto(photo.order)}
            />
          </div>
        ))}

        <label htmlFor="upload_img" className={classes.photos_label}>
          <div className={`${classes.dashed_border} ${classes[hoverCls]}`}>
            <PlusIcon />
          </div>

          <DownloadImage
            imageUpload={imageUpload}
            onDragOrMouseEnter={onDragOrMouseEnter}
            onnDragOrMouseLeave={onnDragOrMouseLeave}
          />
        </label>
      </div>
    </div>
  );
};
PhotosAndVideos.propTypes = {
  photos: PropTypes.array.isRequired,
  changeData: PropTypes.func.isRequired,
};
export default PhotosAndVideos;
