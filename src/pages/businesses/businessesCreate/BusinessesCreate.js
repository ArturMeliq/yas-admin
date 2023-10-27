import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './businessesCreate.module.scss';
import BusinessFullCreate from '../../../components/Businesses/BusinessCreate/BusinessFullCreate/BusinessFullCreate';
import Stepper from '../../../components/Businesses/BusinessCreate/Stepper/Stepper';
import CreateResponsiblePerson
  from '../../../components/Businesses/BusinessCreate/CreateResponsiblePerson/CreateResponsiblePerson';
import MakingProgress from '../../../components/Businesses/BusinessCreate/MakingProgress/MakingProgrss';
import weekTemplate from '../../../helpers/staticData/weekTemplate/WeekTemplate';
import Utils from '../../../helpers/utils/utils';
import { createBusinessRequest, getBusinessCategoriesRequest } from '../../../store/actions/business';
import Loader from '../../../components/_common/Loader/Loader';
import Api from '../../../Api/Api';

const steps = [{
  step: 1,
  title: 'Business information',
  errorFields: [
    'name', 'email', 'phone', 'businessCategories', 'address', 'otherBusinessCategory',
  ],
},
{
  step: 2,
  title: 'Person information',
  errorFields: [
    'fName', 'lName', 'businessEmailOrPhone',
  ],
},
{
  step: 3,
  title: 'Making Progress',
  errorFields: [
    'specialities', 'photos', 'weekdays',
  ],
}];

const addressTemplate = {
  country: 'Armenia',
  state: '',
  city: '',
  zip: '',
  streetName: '',
};

const BusinessesCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    businessCategories: [],
    otherBusinessCategory: [],
    address: [
      addressTemplate,
    ],
    fName: '',
    lName: '',
    weekdays: weekTemplate,
    businessEmailOrPhone: '',
    specialities: '',
    photos: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({ address: [] });

  const [makingType, setMakingType] = useState('businessHours');

  const businessCategoriesStatus = useSelector((state) => state.business.businessCategoriesStatus);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [makingType, currentStep]);

  useEffect(() => {
    (async () => {
      await dispatch(getBusinessCategoriesRequest());
    })();
  }, []);

  const changeBusinessData = useCallback((path, value, key = null, index = null) => {
    setBusinessData((prev) => {
      let changingValue = { [path]: value };

      if (path === 'weekdays') {
        let currentWeekData = { [key]: value };

        if (key === 'isClosed' || (key === 'isAlwaysOpen' && !value)) {
          currentWeekData = {
            ...currentWeekData,
            startDate: '09:00',
            endDate: '18:00',
            isAlwaysOpen: false,
          };
        } else if (key === 'isAlwaysOpen') {
          currentWeekData = {
            ...currentWeekData,
            startDate: '00:00',
            endDate: '23:59',
            isClosed: false,
          };
        } else if (key === ('startDate' || 'endDate')) {
          currentWeekData = {
            ...currentWeekData,
            isAlwaysOpen: false,
            isClosed: false,
          };
        }

        changingValue = {
          weekdays: prev.weekdays.map((p) => (p.weekDay === index
            ? { ...p, ...currentWeekData }
            : p)),
        };
      } else if (key === 'address') {
        changingValue = {
          [key]: prev[key].map((p, i) => (i === index ? {
            ...p,
            [path]: value,
          } : p)),
        };
      } else if (path === 'addNewAddress') {
        changingValue = { address: [...prev.address, addressTemplate] };
      } else if (path === 'deleteAddress' && prev.address.length > 1) {
        changingValue = { address: prev.address.filter((v, i) => i !== index) };
      } else if ((path === 'specialities' && (value.length > 1500))) {
        changingValue = { [path]: value.slice(0, 1500) };
      } else if ((path === 'deleteCategory')) {
        changingValue = { [key]: prev[key].filter((v, i) => i !== index) };
      }

      return {
        ...prev,
        ...changingValue,
      };
    });

    if (path !== 'addNewAddress') {
      setErrors((prev) => {
        let changingError = { [path]: false };

        if (path === 'weekdays') {
          let currentError = {
            [index]: {
              ...(prev[path]?.[index] || {}),
              [key]: false,
            },
          };

          if (key === 'isAlwaysOpen' || key === 'isClosed') {
            currentError = {
              [index]: {
                startDate: false,
                endDate: false,
              },
            };
          }

          changingError = { [path]: { ...prev[path], ...currentError } };
        } else if (key === 'address') {
          changingError = {
            [key]: prev[key].map((p, i) => (i === index ? {
              ...p,
              [path]: false,
            } : p)),
          };
        } else if (path === 'deleteAddress') {
          changingError = { address: prev.address.filter((v, i) => i !== index) };
        }

        return {
          ...prev,
          ...changingError,
        };
      });
    }
  }, []);

  const setError = (path, key = null, index = null) => {
    if (path === 'address') {
      setErrors((prev) => {
        let address = [...prev[path], {
          index,
          [key]: true,
        }];

        if (prev[path].find((p) => p.index === index)) {
          address = prev[path].map((p) => (p.index === index ? {
            ...p,
            [key]: true,
          } : p));
        }

        return {
          ...prev,
          [path]: address,
        };
      });
    } else if (path === 'weekdays') {
      setErrors((prev) => ({
        ...prev,
        [path]: {
          ...prev[path],
          [key]: {
            startDate: !businessData[path][index].startDate,
            endDate: !businessData[path][index].endDate,
          },
        },
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [path]: true,
      }));
    }
  };

  const changeStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < 3) {
        return prev + 1;
      }

      return prev;
    });
  }, []);

  const saveData = async (status) => {
    let hasError = false;
    let errorText = '';
    await setErrors({ address: [] });

    const checkingData = { ...businessData };

    delete checkingData.website;

    const draftRequiredFields = ['name', 'email', 'phone'];

    const dontCheckOtherBusinessCategory = !(checkingData.businessCategories.find((o) => o.value === 'other')
      && !checkingData.otherBusinessCategory.length);

    if (dontCheckOtherBusinessCategory) {
      delete checkingData.otherBusinessCategory;
    }

    _.forEach(checkingData, (value, path) => {
      const checkValue = typeof value === 'string' ? !value.trim() : !value?.length;

      const checkRequiredFields = (status === 'ACTIVE')
        || (status === 'DRAFT' && draftRequiredFields.includes(path));

      if (checkRequiredFields) {
        if (path === 'address') {
          value.forEach((v, i) => {
            _.forEach(v, (val, key) => {
              if (!val.trim()) {
                setError(path, key, i);
                hasError = true;
                errorText = 'Fill this fields';
              }
            });
          });
        } else if (path === 'weekdays') {
          value.forEach((val, i) => {
            if ((!val.endDate || !val.startDate) && !val.isClosed) {
              setError(path, val.weekDay, i);
              hasError = true;
            }
          });
        } else if (path === 'specialities' && value?.length && value?.length < 50) {
          hasError = true;
          errorText = 'Length must be at least 50 characters long';
          setError(path);
        } else if (checkValue) {
          setError(path);
          hasError = true;
          errorText = 'Fill this fields';
        }
      }

      const checkEmails = status === 'DRAFT'
        ? businessData.businessEmailOrPhone || businessData.email
        : businessData.businessEmailOrPhone && businessData.email;

      if (checkEmails && path.toLowerCase()
        .includes('email') && value.trim()
        && !Utils.isEmail(value) && !Utils.validateNumber(value)) {
        setError(path);
        hasError = true;
        errorText = path.toLowerCase()
          .includes('phone')
          ? 'Email or Phone number is invalid'
          : 'Email is invalid';
      }
    });

    if (!hasError) {
      const sendingData = { ...businessData };
      sendingData.status = status;
      sendingData.phone = `+${businessData.phone}`;
      sendingData.businessCategories = [
        ...businessData.businessCategories
          .filter(({ value }) => value !== 'other')
          .map(({ value }) => value),
        ...businessData.otherBusinessCategory.map((category) => category.toLowerCase()),
      ];
      sendingData.photos = [];
      delete sendingData.otherBusinessCategory;

      if (businessData.photos.length) {
        for (const photo of businessData.photos) {
          const p = await Api.uploadImage({
            image: photo.file,
            key: 'business',
            businessId: 'admin',
          });
          sendingData.photos.push(p.data.url);
        }
      }
      setLoading(true);
      const { payload: { data } } = await dispatch(createBusinessRequest(sendingData));
      setLoading(false);
      if (data.status === 'ok') {
        toast.success('Business successfully created');
        navigate('/businesses/list');
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(errorText);
    }
  };

  return (
    <div className={classes.businesses_create_wrapper}>
      <Stepper
        errors={errors}
        currentStep={currentStep}
        steps={steps}
        setCurrentStep={setCurrentStep}
      />
      {businessCategoriesStatus !== 'ok'
        ? (
          <div className={classes.loader_wrapper}>
            <Loader />
          </div>
        )
        : (
          <div className={classes.info}>
            {currentStep === 1 && (
              <BusinessFullCreate
                errors={errors}
                data={businessData}
                loading={loading}
                onChange={changeBusinessData}
                changeStep={changeStep}
                saveData={saveData}
                className={classes.width}
                title="Get started by telling us how customers can reach you"
              />
            )}

            {currentStep === 2 && (
              <CreateResponsiblePerson
                errors={errors}
                data={businessData}
                onChange={changeBusinessData}
                changeStep={changeStep}
                saveData={saveData}
              />
            )}

            {currentStep === 3 && (
              <MakingProgress
                errors={errors}
                setMakingType={setMakingType}
                data={businessData}
                changeData={changeBusinessData}
                makingType={makingType}
                saveData={saveData}
              />
            )}
          </div>
        )}
    </div>
  );
};

export default BusinessesCreate;
