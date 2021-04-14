import React from 'react';
import { NavLink } from 'react-router-dom';

import { navLink, menuLinks } from '../../data';
import {toggleOpen} from "../../common/redux/action";
import {connect} from "react-redux";
import {toggleLoginOpen} from "../../common/redux/login-action-creator";

interface SideMenuProps {
  isAuth: boolean
  isMenuOpen: boolean
  onMenuLinkClick: () => void,
  toggleOpen: any,
  toggleLoginOpen: (isLoginOpen: boolean) => void,
}

const SideMenuRedux: React.FC<SideMenuProps> = ({isAuth, isMenuOpen, onMenuLinkClick, toggleOpen, toggleLoginOpen }) => {
  const clazz = isAuth ? 'side-menu--auth' : '';
  const isVisible = isMenuOpen ? 'side-menu--show' : '';

  return (
    <div className={`side-menu ${clazz} ${isVisible}`}>
      <ul className="side-menu__list">
        {menuLinks.map((item: string) => {
          if (isAuth === false && item === 'Словарь') {
            return null;
          }

          const clazz: string = item === 'Войти' ? 'side-menu__item--login' : ''; 
          
          return (
            <li className={`side-menu__item ${clazz}`} key={item}>
              {(item === 'Настройка') ?
                <span  onClick={() => { onMenuLinkClick(); toggleOpen(true)}}>{item}</span> :
                <NavLink exact to={`/${navLink[item]}`}
                         onClick = {(item === 'Войти') ?  () => {onMenuLinkClick(); toggleLoginOpen(true)} :  onMenuLinkClick}
                         activeClassName='active'>
                  {item}
                </NavLink>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const mapDispatchToProps = {
  toggleOpen,
  toggleLoginOpen,
  };

const SideMenu = connect(null, mapDispatchToProps)(SideMenuRedux);
export {SideMenu};
