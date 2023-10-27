import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ClockIcon } from '../../../../../assets/icons/makingProgressIcons/clock-regular.svg';
import classes from './businessHours.module.scss';
import SelectComponent from '../../../../_common/Form/Select/SelectComponent/SelectComponent';
import Checkbox from '../../../../_common/Form/Checkbox/Checkbox';
import utils from '../../../../../helpers/utils/utils';
import Button from '../../../../_common/Form/Button/Button';

const BusinessHours = ({
  weekData, onChange, changeStep, saveData, errors, showAllowFields, title, className,
}) => {
  const hoursOption = useMemo(() => utils.hoursOption(), []);

  return (
    <div className={`${classes.main_block}`}>
      <section className={classes.main_section}>
        <h2 className={classes.main_section_title}>{title}</h2>

        {showAllowFields && (
        <p className={classes.main_section_text}>
          Add your business hours so customers know
          when you’re open. You can add upcoming holiday
          hours or any special hours on Business information.
        </p>
        )}

        {showAllowFields && (
        <div className={classes.title_wrapper}>
          <ClockIcon className={classes.title_wrapper_icon} />
          <h3 className={classes.title_wrapper_text}>When are you open</h3>
        </div>
        )}

        <div className={`${classes.hours_info} ${className}`}>
          {weekData.map(({
            weekDay, startDate, endDate, isAlwaysOpen, isClosed, id,
          }) => (
            <div
              key={weekDay}
              className={classes.single_hours_info}
            >
              <p className={classes.weekdays}>{weekDay}</p>

              <div className={classes.selects}>
                <SelectComponent
                  className={classes.option_text_aline}
                  value={startDate}
                  onChange={(val) => onChange('weekdays', val, 'startDate', weekDay)}
                  isSearchable
                  error={errors?.weekdays?.[weekDay]?.startDate}
                  options={!endDate
                    ? hoursOption
                    : hoursOption.filter((option) => +(+option.value.replace(':', '')).toFixed() < +endDate.replace(':', ''))}
                  isDisabled={isClosed}
                />

                <div className={classes.middle_line} />

                <SelectComponent
                  isDisabled={isClosed || !startDate}
                  value={endDate}
                  isSearchable
                  className={classes.option_text_aline}
                  error={errors?.weekdays?.[weekDay]?.endDate}
                  onChange={(val) => onChange('weekdays', val, 'endDate', weekDay)}
                  options={
                    !startDate
                      ? hoursOption
                      : hoursOption.filter((option) => +option.value.replace(':', '') > +startDate.replace(':', ''))
                  }
                />
              </div>

              <div className={classes.checkbox_wrapper}>
                <Checkbox
                  className={classes.checkbox_item}
                  checked={isAlwaysOpen}
                  onChange={(val) => onChange('weekdays', val, 'isAlwaysOpen', weekDay)}
                  text="Open 24 hours"
                  id={`${id}_isAlwaysOpen`}
                />

                <Checkbox
                  className={classes.checkbox_item}
                  checked={isClosed}
                  onChange={(val) => onChange('weekdays', val, 'isClosed', weekDay)}
                  text="Close"
                  id={`${id}_isClosed`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {showAllowFields && (
      <div className={classes.btns}>
        <Button
          onClick={() => changeStep('specialities')}
          className={classes.buttons_space}
        >
          Continue
        </Button>
        <div>
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
      )}
    </div>

  );
};
BusinessHours.propTypes = {
  weekData: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  changeStep: PropTypes.func,
  saveData: PropTypes.func,
  errors: PropTypes.object.isRequired,
  title: PropTypes.string,
  showAllowFields: PropTypes.bool,
  className: PropTypes.string,
};
BusinessHours.defaultProps = {
  changeStep: () => {},
  saveData: () => {},
  title: false,
  showAllowFields: true,
  className: '',
};
export default BusinessHours;
