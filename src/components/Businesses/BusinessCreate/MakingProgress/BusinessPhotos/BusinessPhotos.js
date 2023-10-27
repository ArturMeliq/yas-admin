import React, { useRef, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ReactComponent as PhotoIcon } from '../../../../../assets/icons/makingProgressIcons/images-regular.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/modal/xmark-solid.svg';
import ImageDrop from './ImageDrop';
import Button from '../../../../_common/Form/Button/Button';
import Utils from '../../../../../helpers/utils/utils';
import classes from './businessPhotos.module.scss';

const allowImageFormats = '.jpeg, .jpg, .png';
const BusinessPhotos = ({
  photos, changeData, saveData, error,
}) => {
  const currentItemOrder = useRef();
  const [hoverCls, setHoverCls] = useState('');

  const uploadImage = (e) => {
    const { files } = e.target;

    let errorText = '';
    let newPhotos = [...photos];

    _.forEach(files, (file) => {
      if (!Utils.validateImage(file, 5, allowImageFormats)) {
        errorText = `Image max size 5mb and allow only ${allowImageFormats} formats`;
      } else {
        file._preview = URL.createObjectURL(file);
        newPhotos = [...newPhotos, { order: (newPhotos[newPhotos.length - 1]?.order || 0) + 1, file }];
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
    newPhotos = [];
  };

  const onDragStart = (e, order) => {
    e.stopPropagation();
    currentItemOrder.current = order;
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof currentItemOrder.current !== 'number') {
      setHoverCls(classes.hover);
    }
  };

  const imageOnDrop = (e, order) => {
    let sortedData = [...photos];

    sortedData = _.orderBy(photos.map((p) => {
      if (p.order === currentItemOrder.current) {
        return { ...p, order };
      }

      if (p.order <= order && currentItemOrder.current < p.order) {
        return { ...p, order: p.order - 1 };
      }
      if (p.order >= order && currentItemOrder.current > p.order) {
        return { ...p, order: p.order + 1 };
      }

      return p;
    }), 'order');

    changeData('photos', sortedData);
  };

  const deleteItem = (order) => {
    changeData('photos', photos.filter((p) => p.order !== order)
      .map((p) => (p.order > order ? { ...p, order: p.order - 1 } : p)));
  };

  return (
    <div className={classes.photos_block}>
      <section className={classes.main_section}>
        <h2 className={classes.main_section_title}>Photos</h2>

        <p className={classes.main_section_text}>
          Photos are essential to presenting your business on Yes. To help customers learn about and
          close your business, upload multiple photos to look your test.
        </p>

        <div className={classes.title_wrapper}>
          <PhotoIcon className={classes.title_wrapper_icon} />

          <h3 className={classes.title_wrapper_text}>Upload and manage photos</h3>
        </div>

        <div
          style={{ paddingBottom: photos.length ? 40 : 25 }}
          className={classes.images_wrapper}
          onDragEnter={onDragEnter}
        >
          <div className={classes.images_block}>
            {_.orderBy(photos, 'order').map(({ order, file }) => (
              <div
                key={order}
                className={classes.images_item}
                onDragStart={(e) => onDragStart(e, order)}
                onDragOver={onDragOver}
                onDrop={(e) => imageOnDrop(e, order)}
                draggable
              >
                <DeleteIcon className={classes.image_delete} onClick={() => deleteItem(order)} />

                <img
                  className={classes.business_image}
                  src={file._preview}
                  alt="photos"
                  draggable={false}
                />
              </div>
            ))}

            <label htmlFor="file_upload" />
          </div>

          <ImageDrop
            error={error}
            uploadImage={uploadImage}
            hoverCls={hoverCls}
            setHoverCls={setHoverCls}
            hideText={!!photos.length}
          />
        </div>
      </section>

      <div className={classes.btns}>
        <Button
          className={classes.save_as_draft}
          onClick={() => saveData('DRAFT')}
        >
          Save as Draft
        </Button>

        <Button
          className={classes.save}
          onClick={() => saveData('ACTIVE')}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

BusinessPhotos.propTypes = {
  photos: PropTypes.array.isRequired,
  saveData: PropTypes.func.isRequired,
  changeData: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

BusinessPhotos.defaultProps = {
  error: false,
};

export default BusinessPhotos;
