import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { loginUser, toggleLoginOpen } from '../../common/redux/login-action-creator';
import { signUpUser } from '../../common/redux/signup-action-creator';
import { SideMenu } from '../side-menu';
import { Overlay } from '../overlay';

interface user {
  userId: null | string,
  name: null | string,
  photo: null | string,
}

interface HeaderProps {
  isLoginOpen: boolean,
  isSignUpOpen: boolean,
  isAuth: boolean,
  user: user,
  toggleLoginOpen: (isLoginOpen: boolean) => void,
  signUpUser: (name: string | null, id: string | null, email: string | null, photo: string | null) => void,
  loginUser: (name: string | null, userId: string | null, photo: string | null, isAuth: boolean, token: string | null) => void
}

const HeaderRedux: React.FC<HeaderProps> = ({ isLoginOpen, isSignUpOpen, isAuth, user, toggleLoginOpen, signUpUser, loginUser }) => {

  const [isMenuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!isMenuActive);
    document.body.classList.toggle('no-scroll');
  }
  return (
    <header className="header">
      <nav className="header__site-nav main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item">
            <Link to={'/'} >
              <svg className="main-nav__logo" width="149" height="77" viewBox="0 0 149 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.92773 55.083H9.69336V43.7393H14.6309L20.6934 55.083H28.1621L21.3652 42.6455C25.0059 41.083 27.0215 37.9111 27.0215 33.5361C27.0215 27.1768 22.8184 23.083 15.5527 23.083H2.92773V55.083ZM9.69336 38.3018V28.6143H14.2559C18.1621 28.6143 20.0527 30.3486 20.0527 33.5361C20.0527 36.708 18.1621 38.3018 14.2871 38.3018H9.69336ZM49.1621 32.2861H55.6465C55.5527 26.583 50.8652 22.6455 43.7402 22.6455C36.7246 22.6455 31.584 26.5205 31.6152 32.333C31.5996 37.0518 34.9277 39.7549 40.334 41.0518L43.8184 41.9268C47.3027 42.7705 49.2402 43.7705 49.2559 45.9268C49.2402 48.2705 47.0215 49.8643 43.584 49.8643C40.0684 49.8643 37.5371 48.2393 37.3184 45.0361H30.7715C30.9434 51.958 35.8965 55.5361 43.6621 55.5361C51.4746 55.5361 56.0684 51.8018 56.084 45.9424C56.0684 40.6143 52.0527 37.7861 46.4902 36.5361L43.6152 35.8486C40.834 35.208 38.5059 34.1768 38.5527 31.8799C38.5527 29.8174 40.3809 28.3018 43.6934 28.3018C46.9277 28.3018 48.9121 29.7705 49.1621 32.2861Z" fill="#323232" />
                <path d="M83.9371 55.4949C87.1616 55.4949 89.2496 54.0887 90.315 52.0574H90.4854V55.083H96.2241V40.3671C96.2241 35.1682 91.8207 32.9807 86.9627 32.9807C81.7354 32.9807 78.2979 35.4807 77.4599 39.458L83.0565 39.9126C83.4684 38.4637 84.761 37.3983 86.9343 37.3983C88.994 37.3983 90.1729 38.4353 90.1729 40.2251V40.3103C90.1729 41.7165 88.6815 41.9012 84.8888 42.2705C80.5707 42.6682 76.6928 44.1171 76.6928 48.9893C76.6928 53.3074 79.7752 55.4949 83.9371 55.4949ZM85.6701 51.3188C83.8093 51.3188 82.4741 50.4523 82.4741 48.7904C82.4741 47.0858 83.8803 46.2478 86.011 45.9495C87.332 45.7648 89.4911 45.4523 90.2156 44.9694V47.2847C90.2156 49.5716 88.3263 51.3188 85.6701 51.3188ZM106.97 42.4694C106.984 39.6569 108.66 38.0091 111.103 38.0091C113.532 38.0091 114.995 39.6001 114.981 42.2705V55.083H121.032V41.191C121.032 36.1057 118.049 32.9807 113.504 32.9807C110.265 32.9807 107.922 34.5716 106.941 37.1143H106.686V33.2648H100.919V55.083H106.97V42.4694ZM135.631 63.7194C141.867 63.7194 146.299 60.8785 146.299 55.2961V33.2648H140.29V36.9296H140.063C139.253 35.154 137.478 32.9807 133.827 32.9807C129.04 32.9807 124.992 36.7023 124.992 44.1313C124.992 51.3898 128.926 54.7705 133.841 54.7705C137.321 54.7705 139.267 53.0233 140.063 51.2194H140.319V55.2108C140.319 58.208 138.401 59.3728 135.773 59.3728C133.103 59.3728 131.753 58.208 131.256 56.887L125.659 57.6398C126.384 61.0773 129.75 63.7194 135.631 63.7194ZM135.759 50.2251C132.79 50.2251 131.171 47.8671 131.171 44.1029C131.171 40.3955 132.762 37.7961 135.759 37.7961C138.699 37.7961 140.347 40.2819 140.347 44.1029C140.347 47.9523 138.671 50.2251 135.759 50.2251Z" fill="#323232" />
                <path d="M56.2077 41.0676L71.0216 55.8814L75.0555 51.8475L65.1344 41.9264L84.2421 22.8187L79.3494 17.9259L56.2077 41.0676Z" fill="#F7CC7E" />
              </svg>
            </Link>
          </li>
          <Link to={'/'} className="main-nav__item additional-item" >
              Главная
          </Link>
          <Link to={'/team'} className="main-nav__item additional-item">
              О Команде
          </Link>
        </ul>
      </nav>
      <div className="header__right-column-wrapper right-column-wrapper">
        {
          user.photo ?
          <img src={user.photo} alt="avatar" width="55px" height="55px" />
          : null
        }
        {
          user.name ?
          <div>{user.name}</div>
          : null
        }
        {
          user.userId ?
            <button disabled={isLoginOpen || isSignUpOpen} className="btn right-column-wrapper__login-btn-green" onClick={ () => {
              signUpUser(null, null, null, null);
              loginUser(null, null, null, false, null);
            }}>
              Выйти
            </button>
          :
            <button disabled={isLoginOpen || isSignUpOpen} className="btn right-column-wrapper__login-btn-yellow" onClick={ () => toggleLoginOpen(true) }>
              Войти
            </button>
        }
        <nav className="site-nav">
          <button className="site-nav__btn"
                  onClick={toggleMenu}>
            <span className="visually-hidden">
              Открыть меню
            </span>
          </button>
          <SideMenu isAuth={isAuth}
                    isMenuOpen={isMenuActive}
                    onMenuLinkClick={toggleMenu}/>
        </nav>
      </div>
      <Overlay isMenuOpen={isMenuActive}
               onOverlayClick={toggleMenu}/>
    </header>
  )
}

const mapStateToProps = (state: any) => ({
  isLoginOpen: state.login.isLoginOpen,
  isSignUpOpen: state.signup.isSignUpOpen,
  user: state.login.user,
  isAuth: state.login.isAuth,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleLoginOpen: (isLoginOpen: boolean) => {
    dispatch(toggleLoginOpen(isLoginOpen));
  },
  signUpUser: (name: string | null, id: string | null, email: string | null, photo: string | null) => {
    dispatch(signUpUser(name, id, email, photo));
  },
  loginUser: (name: string | null, userId: string | null, photo: string | null, isAuth: boolean, token: string | null) => {
    dispatch(loginUser(name, userId, photo, isAuth, token));
  },
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderRedux);

export { Header };
