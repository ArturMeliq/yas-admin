import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowDown } from '../../../../assets/icons/activity/Arrow_down.svg';
import classes from './navigation.module.scss';
import items from '../../../../helpers/staticData/staticData';

const Navigation = ({ isMenuOpen }) => {
  const { pathname } = useLocation();

  const [currentId, setCurrenId] = useState('');

  useEffect(() => {
    items.forEach(({ baseUrl }) => {
      if (pathname.includes(baseUrl)) setCurrenId(baseUrl);
    });
  }, []);

  return (
    <nav className={`${classes.sidebar_nav} ${!isMenuOpen ? classes.hide : ''}`}>
      <ul className={classes.side_bar_main_nav}>
        {items.map(({
          id, title, options, baseUrl, link,
        }) => (
          <li
            key={id}
            className={classes.sidebar_main_item}
            onClick={() => setCurrenId((prev) => (prev === baseUrl ? '' : baseUrl))}
          >
            <NavLink
              className={({ isActive }) => (((link || currentId === baseUrl) && isActive) || pathname.includes(baseUrl) ? classes.active_main : '')}
              onClick={(e) => !link && e.preventDefault()}
              to={link}
            >
              <p
                className={`${classes.sidebar_item_text_main} ${currentId === baseUrl ? classes.active_main : ''}`}
              >
                {title}
              </p>
              {!link && <ArrowDown className={`${currentId === baseUrl && classes.rotate_svg}`} />}
            </NavLink>

            {options && currentId === baseUrl && (
              <ul
                className={classes.side_bar_nav}
                onClick={(e) => e.stopPropagation()}
              >
                {options.map((o) => (
                  <li key={o.id} className={classes.sidebar_item}>
                    <NavLink
                      className={({ isActive }) => (isActive ? classes.active : '')}
                      to={o.link}
                    >
                      <p className={classes.sidebar_options_item_text}>{o.title}</p>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  isMenuOpen: PropTypes.bool,
};
Navigation.defaultProps = {
  isMenuOpen: false,
};
export default Navigation;
