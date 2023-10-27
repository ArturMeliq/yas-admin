import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './layout.module.scss';
import SideBar from './SideBar/SideBar';
import Button from '../_common/Form/Button/Button';
import Modal from '../_common/Modal/Modal';
import accountHelpers from '../../helpers/utils/accountHelpers';

const Layout = () => {
  const [isMenuOpen, openingMenu] = useState(true);
  const [showModal, showingModal] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate('/login', { replace: true });
  }, []);

  const showLogOutModal = useCallback(() => {
    showingModal((prev) => !prev);
  }, []);

  const logout = useCallback(() => {
    accountHelpers.removeLocalStorage();
    window.location.href = '/login';
  }, []);

  const goToCreateBusiness = () => {
    navigate('businesses/create');
  };

  return (
    <div className={classes.layout_wrapper}>
      <SideBar isMenuOpen={isMenuOpen} openingMenu={openingMenu} />

      <div
        className={`${classes.content_wrapper} ${isMenuOpen ? '' : classes.hide}`}
      >
        <div className={classes.log_out_header}>
          <Button className={classes.create_new_business_btn} onClick={goToCreateBusiness}>
            Create new
            business
          </Button>

          <Button className={classes.log_out_icon} onClick={showLogOutModal}>
            Log Out
          </Button>

          <Modal
            show={showModal}
            onClose={showLogOutModal}
            className={classes.modal_wrapper}
          >
            <div className={classes.modal_content_wrapper}>
              <h2 className={classes.question}>Are you sure?</h2>

              <div className={classes.btns_wrapper}>
                <Button onClick={logout}>
                  Yes
                </Button>

                <Button cancel onClick={showLogOutModal}>
                  No
                </Button>
              </div>
            </div>
          </Modal>
        </div>

        <div className={classes.outlet_wrapper}>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;
