import React from 'react';
import PropTypes from 'prop-types';
import classes from './createResponsiblePerson.module.scss';
import Input from '../../../_common/Form/Input/Input';
import Button from '../../../_common/Form/Button/Button';

const CreateResponsiblePerson = ({
  onChange, data, changeStep, errors, saveData,
}) => (
  <div className={classes.block}>
    <h2>Great! Now create your business account</h2>

    <p>
      A business account enables you to manage your page, upload
      photos, and respond to reviews on Yes.
    </p>

    <div className={classes.FLName}>
      <Input
        error={errors.fName}
        className={classes.fName_input}
        onChange={(val) => onChange('fName', val)}
        value={data.fName}
        name="FirstName"
        placeholder="First Name"
      />

      <Input
        error={errors.lName}
        onChange={(val) => onChange('lName', val)}
        value={data.lName}
        name="LastName"
        placeholder="Last Name"
      />
    </div>

    <Input
      className={classes.email_input}
      placeholder="+37477000000 / yas@mail.com"
      value={data.businessEmailOrPhone}
      onChange={(val) => onChange('businessEmailOrPhone', val)}
      name="businessEmailOrPhone"
      error={errors.businessEmailOrPhone}
    />

    <div className={classes.btns}>
      <Button className={classes.createBtn} onClick={changeStep}>Continue</Button>

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
  </div>
);

CreateResponsiblePerson.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  changeStep: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

CreateResponsiblePerson.defaultProps = {

};
export default CreateResponsiblePerson;
