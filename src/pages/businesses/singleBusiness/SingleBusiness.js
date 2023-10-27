import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import BusinessInformation from '../../../components/BusinessPersonFullInfo/BusinessInformation/BusinessInformation';
import { getBusinessCategoriesRequest, singleBusinessRequest } from '../../../store/actions/business';
import Loader from '../../../components/_common/Loader/Loader';
import Api from '../../../Api/Api';
import Utils from '../../../helpers/utils/utils';
import PhotosAndVideos from '../../../components/BusinessPersonFullInfo/PhotosAndVideos/PhotosAndVideos';

const addressesTemplate = {
  country: 'Armenia',
  state: '',
  city: '',
  zip: '',
  streetName: '',
};
const SingleBusiness = ({ showAllowButtons, type }) => {
  const dispatch = useDispatch();
  const singleBusiness = useSelector((state) => state.business.singleBusiness);

  const [businessData, setBusinessData] = useState(singleBusiness);
  const [loading, loadingToggle] = useState(true);

  const [errors, setErrors] = useState({ addresses: [] });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      loadingToggle(true);

      await Promise.all([
        dispatch(singleBusinessRequest(id)),
        dispatch(getBusinessCategoriesRequest()),
      ]);

      loadingToggle(false);
    })();
  }, []);

  useEffect(() => {
    if (singleBusiness.businessId) {
      setBusinessData(singleBusiness);
    }
  }, [singleBusiness]);

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
      } else if (key === 'addresses') {
        changingValue = {
          [key]: prev[key].map((p, i) => (i === index ? {
            ...p,
            [path]: value,
          } : p)),
        };
      } else if (path === 'addNewAddress') {
        changingValue = { addresses: [...prev.addresses, addressesTemplate] };
      } else if (path === 'deleteAddress' && prev.addresses.length > 1) {
        changingValue = { addresses: prev.addresses.filter((v, i) => i !== index) };
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
        } else if (key === 'addresses') {
          changingError = {
            [key]: prev[key].map((p, i) => (i === index ? {
              ...p,
              [path]: false,
            } : p)),
          };
        } else if (path === 'deleteAddress') {
          changingError = { addresses: prev.addresses.filter((v, i) => i !== index) };
        }

        return {
          ...prev,
          ...changingError,
        };
      });
    }
  }, []);

  const setError = (path, key = null, index = null) => {
    if (path === 'addresses') {
      setErrors((prev) => {
        let addresses = [...prev[path], {
          index,
          [key]: true,
        }];

        if (prev[path].find((p) => p.index === index)) {
          addresses = prev[path].map((p) => (p.index === index ? {
            ...p,
            [key]: true,
          } : p));
        }

        return {
          ...prev,
          [path]: addresses,
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
  const saveData = async (status) => {
    let hasError = false;
    let errorText = '';
    await setErrors({ addresses: [] });

    const checkingData = { ...businessData };

    delete checkingData.website;
    delete checkingData.photos;

    const draftRequiredFields = ['name', 'email', 'phone'];

    const dontCheckOtherBusinessCategory = !(checkingData.businessCategories.find((o) => o.value === 'other')
      && !checkingData.otherBusinessCategory.length);

    if (dontCheckOtherBusinessCategory) {
      delete checkingData.otherBusinessCategory;
    }

    _.forEach(checkingData, (value, path) => {
      const checkValue = typeof value === 'string' ? !value.trim() : !value?.length;

      const checkRequiredFields = (status === 'ACTIVE') || (status === 'PENDING_VERIFICATION')
        || (status === 'DRAFT' && draftRequiredFields.includes(path));

      if (checkRequiredFields) {
        if (path === 'addresses') {
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

      if (path.toLowerCase()
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
      sendingData.phone = `+${businessData.phone}`;
      sendingData.businessCategories = [
        ...businessData.businessCategories
          .filter(({ value }) => value !== 'other')
          .map(({ value }) => value),
        ...businessData.otherBusinessCategory.map((category) => category.toLowerCase()),
      ];
      delete sendingData.otherBusinessCategory;

      sendingData.photos = [];

      sendingData.status = status;
      sendingData.businessEmailOrPhone = sendingData.email;

      if (businessData?.photos?.length) {
        for (const photo of businessData.photos) {
          if (photo.file._preview) {
            const { data } = await Api.uploadImage({
              image: photo.file,
              key: 'business',
              businessId: 'admin',
            });
            sendingData.photos.push(data.url);
          } else {
            sendingData.photos.push(photo.file);
          }
        }
      }
      loadingToggle(true);
      const { data } = await Api.updateBusiness(sendingData);
      loadingToggle(false);

      if (data.status === 'ok') {
        toast.success('Business successfully updated');
        navigate('/businesses/list');
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(errorText);
    }
  };

  return (
    <div>
      {loading
        ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 80px)',
            padding: 20,
          }}
          >
            <Loader />
          </div>
        )
        : (
          type === 'photosAndVideos'

            ? (
              <PhotosAndVideos
                photos={businessData.photos}
                changeData={changeBusinessData}
              />
            )

            : (
              <BusinessInformation
                businessData={businessData}
                changeBusinessData={changeBusinessData}
                saveData={saveData}
                errors={errors}
                showGoogleMap={false}
                showAllowButtons={showAllowButtons}
              />
            )
        )}
    </div>
  );
};
SingleBusiness.propTypes = {
  showAllowButtons: PropTypes.bool,
  type: PropTypes.string,
};
SingleBusiness.defaultProps = {
  showAllowButtons: true,
  type: '',
};
export default SingleBusiness;
