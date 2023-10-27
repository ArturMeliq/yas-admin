import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import classes from './accountInformation.module.scss';
import Input from '../../_common/Form/Input/Input';
import Button from '../../_common/Form/Button/Button';
import userPhoto from '../../../assets/photos/user_photo.png';
import { ReactComponent as PersonIcon } from '../../../assets/icons/activity/person.svg';
import { singleOwnerRequest } from '../../../store/actions/business';
import Loader from '../../_common/Loader/Loader';
import { ReactComponent as Delete } from '../../../assets/icons/makingProgressIcons/trash-can-solid.svg';
import Utils from '../../../helpers/utils/utils';
import Api from '../../../Api/Api';
import Modal from '../../_common/Modal/Modal';

const AccountInformation = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const singleResponsiblePerson = useSelector((state) => state.business.singleResponsiblePerson);

  const [personData, setPersonData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, loadingToggle] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBtnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    (async () => {
      loadingToggle(true);
      await dispatch(singleOwnerRequest(id));
      loadingToggle(false);
    })();
  }, []);

  useEffect(() => {
    setPersonData(singleResponsiblePerson);
  }, [singleResponsiblePerson]);

  const changeData = (path, value) => {
    setPersonData((prev) => ({
      ...prev,
      [path]: value,
    }));

    setErrors((prev) => (
      {
        ...prev,
        [path]: false,
      }
    ));
  };

  const saveData = async () => {
    const sendingData = { ...personData };
    let hasError = false;
    let errorText = '';
    delete sendingData?.avatar;
    sendingData.id = id;

    _.map(sendingData, (value, path) => {
      if (path.toLowerCase()
        .includes('email')) {
        if ((!Utils.isEmail(value) && !Utils.validateNumber(value))
          || !value.trim()) {
          hasError = true;
          errorText = 'Email or Phone number is invalid';
          setErrors((prev) => (
            {
              ...prev,
              [path]: true,
            }
          ));
        }
      } else if (!value.trim()) {
        hasError = true;
        errorText = 'Fill this fields';
        setErrors((prev) => (
          {
            ...prev,
            [path]: true,
          }
        ));
      }
    });
    if (!hasError) {
      await Api.updateResponsiblePerson(sendingData);
      errorText = 'Person successfully updated';
      toast.success(errorText);
    } else {
      toast.error(errorText);
    }
  };

  const deleteSingleBusiness = async (businessID) => {
    setBtnLoading(true);
    await Api.deleteBusiness(businessID);
    setBtnLoading(false);
    navigate('/businesses/list');
    setShowModal(false);
  };
  // console.log(loading);
  return (
    loading
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
        <div className={classes.wrapper}>
          <h2 className={classes.account_information_title}>
            Account Information
          </h2>

          <p className={classes.business_account_information}>
            Business Account Information
          </p>

          <div className={classes.user_info_image_wrapper}>

            <div className={classes.person_img}>
              <div className={classes.person_img_main}>
                <img src={personData?.avatar || userPhoto} alt="user_photo" />
                <PersonIcon className={classes.person_icon} />
              </div>
            </div>
          </div>

          <div className={classes.person_info_data}>
            <Input
              placeholder="Name"
              error={errors.firstName}
              value={personData.firstName}
              onChange={(val) => changeData('firstName', val)}
            />

            <Input
              placeholder="Last Name"
              error={errors.lastName}
              value={personData.lastName}
              onChange={(val) => changeData('lastName', val)}
            />

            <Input
              placeholder="+37477778877 / test@mail.com"
              error={errors.emailOrPhone}
              onChange={(val) => changeData('emailOrPhone', val)}
              value={personData.emailOrPhone}
            />

            <Input
              placeholder="Person"
              value="Owner"
              onChange={() => {
              }}
            />

            <Button
              className={classes.save_btn}
              onClick={saveData}
            >
              {(singleResponsiblePerson.emailOrPhone
              || singleResponsiblePerson.firstName
              || singleResponsiblePerson.lastName)
                ? 'Save' : 'Create'}
            </Button>
            <div className={classes.delete_business_wrapper}>
              <div className={classes.delete_business} onClick={() => setShowModal(true)}>
                <Delete />
                <span>Delete Business</span>
              </div>
            </div>
          </div>

          <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
          >
            <div className={classes.delete_modal_wrapper}>
              <p className={classes.delete_modal_text}>
                Are you sure to delete this business?
              </p>

              <div style={{ display: 'flex' }}>
                <Button
                  className={classes.delete}
                  onClick={() => deleteSingleBusiness(id)}
                >
                  {showBtnLoading ? <Loader size={25} weight={2} /> : 'Delete'}
                </Button>

                <Button
                  className={classes.cancel_btn}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )
  );
};

export default AccountInformation;
