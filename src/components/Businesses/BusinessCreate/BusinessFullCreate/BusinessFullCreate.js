import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import Input from '../../../_common/Form/Input/Input';
import Button from '../../../_common/Form/Button/Button';
import PhoneNumberInput from '../../../_common/Form/Input/PhoneNumberInput/PhoneNumberInput';
import SelectComponent from '../../../_common/Form/Select/SelectComponent/SelectComponent';
import armRegions from '../../../../helpers/staticData/am_regions.json';
import utils from '../../../../helpers/utils/utils';
import { ReactComponent as SaveIcon } from '../../../../assets/icons/business/floppy-disk-solid.svg';
import 'react-phone-input-2/lib/style.css';
import classes from './businessFullCreate.module.scss';
import Chip from '../../../_common/Form/Select/Chip/Chip';

const stateOptions = armRegions.map((a) => ({
  label: a.region.province.EN,
  value: a.region.province.EN.toLowerCase(),
}));

const countryOptions = [
  {
    label: 'Armenia',
    value: 'Armenia',
  },
];

const cityOptions = (state) => {
  const cities = _.find(armRegions, (r) => r.region.province.EN.toLowerCase() === state?.toLowerCase())?.cities
    ?.map((c) => ({ label: c.city.EN, value: c.city.EN.toLowerCase() }));

  return cities || [{
    label: '',
    value: '',
  }];
};

const BusinessFullCreate = ({
  data, onChange, changeStep, errors, saveData, className, title, showButtons, loading,
}) => {
  const businessCategories = useSelector((state) => [
    ...state.business.businessCategories.map(({ name }) => ({
      label: _.upperFirst(name),
      value: name,
    })),
    {
      label: 'Other',
      value: 'other',
    }]);
  const [otherCategoryValue, setOtherCategoryValue] = useState('');

  const fieldsTemplate = (state) => [
    {
      path: 'name',
      label: 'Business Name',
      type: 'input',
      order: 1,
    },
    {
      path: 'email',
      label: 'Your business email address',
      type: 'input',
      order: 2,
    },
    {
      path: 'phone',
      label: 'Phone Number',
      type: 'phoneInput',
      order: 3,
    },
    {
      path: 'website',
      label: 'Website',
      type: 'input',
      order: 5,
    },
    {
      path: 'businessCategories',
      label: 'Business Category',
      options: businessCategories,
      type: 'select',
      order: 4,
    },
    {
      path: 'country',
      label: 'Country',
      options: countryOptions,
      isSearchable: true,
      type: 'select',
      order: 1,
    },
    {
      path: 'state',
      label: 'State',
      options: stateOptions,
      isSearchable: true,
      type: 'select',
      order: 2,
    },
    {
      path: 'city',
      label: 'City',
      options: cityOptions(state),
      isSearchable: true,
      type: 'select',
      order: 3,
    },
    {
      path: 'zip',
      label: 'ZIP code',
      type: 'input',
      order: 4,
    },
    {
      path: 'streetName',
      label: 'Street address',
      type: 'input',
      order: 5,
    },
  ];
  const onKeyPress = (e, type, isPast) => {
    if (type === 'zip') {
      utils.keyPressOnlyNumber(e, isPast);
    }
  };

  const addCategory = (e) => {
    e.preventDefault();

    if (otherCategoryValue.trim()) {
      onChange('otherBusinessCategory', [...data.otherBusinessCategory, otherCategoryValue]);
      setOtherCategoryValue('');
    }
  };

  const renderFields = (fields, path, index) => _.map(fields, (value, key) => {
    const findField = fieldsTemplate(data?.[path]?.[index]?.state).find((f) => f.path === key);

    if (findField) {
      return (
        <div key={key} style={{ order: findField.order }}>
          {findField.type === 'select'
            ? (
              <>
                <SelectComponent
                  error={errors?.[path]?.find((err) => err.index === index)?.[key] || errors[key]}
                  isSearchable={findField.isSearchable}
                  onChange={(val) => onChange(key, val, path, index)}
                  options={findField.options}
                  isDisabled={key === 'city' && !data[path][index].state}
                  placeholder={findField.label}
                  value={value}
                  isMulti={key === 'businessCategories'}
                  onOptionDelete={(i) => onChange('deleteCategory', null, key, i)}
                  className={classes.wrapper}
                  isMenuStatic={key === 'businessCategories'}
                />

                {key === 'businessCategories' && value.find((v) => v.value === 'other')
                  && (
                    <div className={classes.others_block}>
                      <form
                        className={classes.others_form}
                        onSubmit={addCategory}
                      >
                        <Input
                          error={errors.otherBusinessCategory}
                          placeholder="Other"
                          className={classes.wrapper}
                          value={otherCategoryValue}
                          onChange={setOtherCategoryValue}
                        />

                        <button type="submit" className={classes.others_form_save_button}>
                          <SaveIcon />
                        </button>
                      </form>

                      <Chip
                        onDelete={(i) => onChange('deleteCategory', null, 'otherBusinessCategory', i)}
                        data={data.otherBusinessCategory}
                      />
                    </div>
                  )}
              </>
            )
            : findField.type === 'phoneInput'
              ? (
                <PhoneNumberInput
                  error={errors[key]}
                  onChange={(val) => onChange(key, val)}
                  value={value}
                  className={classes.wrapper}
                  placeholder={findField.label}
                />
              )
              : (
                <Input
                  error={errors?.[path]?.find((err) => err.index === index)?.[key] || errors[key]}
                  className={classes.wrapper}
                  value={value}
                  onKeyPress={(e) => onKeyPress(e, key)}
                  onPaste={(e) => onKeyPress(e, key, true)}
                  onChange={(val) => onChange(key, val, path, index)}
                  placeholder={findField.label}
                />
              )}
        </div>
      );
    }

    if (key === 'address' || key === 'addresses') {
      return (
        <div
          key={key + index}
          style={{ width: '100%', order: 6 }}
        >
          {value.map((v, i) => (
            <div
              key={`${key + i}`}
              className={classes.address_wrapper}
            >
              {renderFields(v, key, i)}
            </div>
          ))}

        </div>
      );
    }

    return null;
  });

  return (
    <div className={`${classes.full_create} ${className || ''}`}>

      <h2 className={classes.full_create_title}>{title}</h2>

      {renderFields(data)}

      {showButtons && (
      <div className={classes.btns}>
        <Button className={classes.createBtn} onClick={changeStep}>Continue</Button>

        <div>
          <Button
            loading={loading}
            className={classes.save_as_draft}
            onClick={() => saveData('DRAFT')}
          >
            Save as Draft
          </Button>

          <Button
            loading={loading}
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

BusinessFullCreate.propTypes = {
  onChange: PropTypes.func.isRequired,
  changeStep: PropTypes.func,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  saveData: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  showButtons: PropTypes.bool,
  loading: PropTypes.bool,
};
BusinessFullCreate.defaultProps = {
  changeStep: () => {},
  saveData: () => {},
  className: '',
  title: '',
  showButtons: true,
  loading: false,
};
export default BusinessFullCreate;
