import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ReactComponent as ClockIcon } from '../../../../assets/icons/makingProgressIcons/clock-regular.svg';
import { ReactComponent as SpecialistIcon } from '../../../../assets/icons/makingProgressIcons/spec.svg';
import { ReactComponent as PhotoIcon } from '../../../../assets/icons/makingProgressIcons/image-regular.svg';
import BusinessHours from './BusinessHours/BusinessHours';
import classes from './makingProgrss.module.scss';
import Specialities from './Specialities/Specialities';
import BusinessPhotos from './BusinessPhotos/BusinessPhotos';

const steps = [{
  stepName: 'businessHours',
  title: 'Business hours',
  Icon: ClockIcon,
  errorFields: [
    'weekdays',
  ],
},
{
  stepName: 'specialities',
  title: 'Specialities',
  Icon: SpecialistIcon,
  errorFields: [
    'specialities',
  ],
},
{
  stepName: 'photos',
  title: 'Photos',
  Icon: PhotoIcon,
  errorFields: [
    'photos',
  ],
}];

const MakingProgress = ({
  data, changeData, makingType, setMakingType, saveData, errors,
}) => {
  const changeType = (type) => {
    setMakingType(type);
  };

  return (
    <div className={classes.main_block}>
      <div className={classes.layout_wrapper}>
        <h3>Making Progress</h3>

        <ul className={classes.inner_side_bar}>
          {steps.map(({
            stepName, title, Icon, errorFields,
          }) => {
            const innerSideBarItemCls = [classes.inner_side_bar_item];

            let hasError = false;

            errorFields.forEach((err) => {
              if (typeof errors[err] !== 'object') {
                if (errors[err]) hasError = true;
              } else {
                _.forEach(errors[err], (error) => {
                  _.forEach(error, (e) => {
                    if (typeof e === 'boolean' && e) hasError = true;
                  });
                });
              }
            });

            if (makingType === stepName) innerSideBarItemCls.push(classes.active);
            if (hasError) innerSideBarItemCls.push(classes.error);

            return (
              <li
                key={stepName}
                onClick={() => changeType(stepName)}
                className={innerSideBarItemCls.join(' ')}
              >
                <Icon />
                <p>{title}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={classes.content_wrapper}>
        {makingType === 'businessHours' && (
        <BusinessHours
          weekData={data.weekdays}
          onChange={changeData}
          changeStep={setMakingType}
          errors={errors}
          saveData={saveData}
          title="Business hours"
        />
        )}

        {makingType === 'specialities' && (
          <Specialities
            data={data}
            changeData={changeData}
            changeStep={setMakingType}
            errors={errors}
            saveData={saveData}
          />
        )}

        {makingType === 'photos' && (
          <BusinessPhotos
            photos={data.photos}
            changeData={changeData}
            changeStep={setMakingType}
            error={errors?.photos}
            saveData={saveData}
          />
        )}
      </div>
    </div>
  );
};

MakingProgress.propTypes = {
  changeData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  makingType: PropTypes.string.isRequired,
  setMakingType: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

MakingProgress.defaultProps = {

};

export default MakingProgress;
