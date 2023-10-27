import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classes from './sideBar.module.scss';
import { ReactComponent as OpenCloseIcon } from '../../../assets/icons/sideBarItemIcons/angle-left-solid.svg';
import { ReactComponent as LogoIcon } from '../../../assets/icons/logo_icon/Asset.svg';
import Navigation from './navigation/Navigation';

function SideBar({ isMenuOpen, openingMenu }) {
  const navigate = useNavigate();
  const mainClasses = [classes.main_block];
  if (isMenuOpen) mainClasses.push(classes.is_open);
  const [isMenuTouched, menuTouchedToggle] = useState(false);

  const menuOpening = (open) => {
    openingMenu(open);
    menuTouchedToggle(!open);
  };

  return (
    <div
      className={mainClasses.join(' ')}
    >
      <div
        onClickCapture={() => menuOpening(!isMenuOpen)}
        className={classes.button_wrapper}
      >
        <OpenCloseIcon />
      </div>

      <div className={classes.sidebar_brand}>
        <div
          className={classes.logo_icon1}
          onClick={() => {
            navigate('/');
          }}
        >
          <LogoIcon />
        </div>
      </div>

      <div
        style={{ height: '90vh' }}
        onMouseEnter={() => isMenuTouched && openingMenu((prev) => !prev)}
        onMouseLeave={() => isMenuTouched && openingMenu((prev) => !prev)}
      >
        {isMenuOpen && <Navigation isMenuOpen={isMenuOpen} />}

      </div>
    </div>
  );
}

SideBar.propTypes = {
  isMenuOpen: PropTypes.bool,
  openingMenu: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  isMenuOpen: false,
};
export default SideBar;
