import React from 'react';
import PropTypes from 'prop-types';
import classes from './specialities.module.scss';
import TextArea from '../../../../_common/Form/Input/TextArea/TextArea';
import Button from '../../../../_common/Form/Button/Button';

const Specialities = ({
  changeStep, data, changeData, saveData, errors, showAllowFields,
}) => (
  <div className={classes.spec}>
    <section className={classes.main_section}>

      <h2 className={classes.main_section_title}>Specialities</h2>

      {showAllowFields && (
      <p className={classes.main_section_text}>
        Add a brief description of your business and make yourself stand out to customers.
      </p>
      )}

      {showAllowFields && (
      <div className={classes.title_wrapper}>
        <h3 className={classes.title_wrapper_text}>What makes your business unique?</h3>
      </div>
      )}

      <TextArea
        error={errors.specialities}
        className={classes.height}
        value={data.specialities}
        onChange={(value) => changeData('specialities', value)}
        placeholder="Business unique"
        isAllowCharacters
      />
    </section>
    {showAllowFields && (
    <div className={classes.btns}>
      <Button
        className={classes.buttons_space}
        onClick={() => changeStep('photos')}
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

Specialities.propTypes = {
  changeStep: PropTypes.func,
  data: PropTypes.object.isRequired,
  changeData: PropTypes.func.isRequired,
  saveData: PropTypes.func,
  errors: PropTypes.object,
  showAllowFields: PropTypes.bool,
};

Specialities.defaultProps = {
  changeStep: () => {},
  saveData: () => {},
  errors: {},
  showAllowFields: true,
};
export default Specialities;
