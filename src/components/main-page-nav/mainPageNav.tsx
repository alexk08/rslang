import React from 'react';
import {NavLink} from "react-router-dom";
import {navLink} from "../../data";
import {toggleOpen} from "../../common/redux/action";
import {connect} from "react-redux";

interface MainPageNavProps {
  toggleOpen: any,
  isAuth: boolean
}

const MainPageNavRedux: React.FC<MainPageNavProps> = ({toggleOpen, isAuth}) => {
  let mainPageNav: string[];

  isAuth ?
    mainPageNav = ["Учебник", "Мини-игры", "Словарь", "Статистика", "Настройка"] :
    mainPageNav = ["Учебник", "Мини-игры", "Статистика", "Настройка"];

  return (
    <nav className="main-page-nav">
      <ul className="main-page-nav__list">
        {mainPageNav.map((item: string) => {
          return (
            (item === 'Настройка') ?
              <span key={item} className="main-page-nav__item" onClick={() => toggleOpen(true)}>{item}</span> :
              <NavLink to={`/${navLink[item]}`} key={item} className="main-page-nav__item">
                {item}
              </NavLink>
          )
        })}
      </ul>
    </nav>
  )
}

const mapDispatchToProps = {
  toggleOpen,
};

const mapStateToProps = (state: any) => ({
  isAuth: state.login.isAuth
});

const MainPageNav = connect(mapStateToProps, mapDispatchToProps)(MainPageNavRedux);
export {MainPageNav};
