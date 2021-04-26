import React from 'react';
import { connect } from 'react-redux';

import {MainPageNav} from '../main-page-nav';

interface MainPageProps {
  isAuth: boolean
}

const MainPageRedux: React.FC<MainPageProps> = ({ isAuth }) => {
  const clazz = isAuth ? 'main-page__video-btn--auth' : '';
  return (
      <main className="main-page">
        <h1 className="visually-hidden">Главная страница</h1>
        <section className="main-page__promo">
          <h2 className="main-page__title">
            Увеличь словарный запас с RSLang
          </h2>
          <p className="main-page__description">
            Традиционные и новые эффективные подходы к изучению слов, мотивация в виде статистики,
            различные уровни сложности - все это ты найдешь в RSLang.
          </p>
          <button className={`main-page__video-btn ${clazz} btn`}>Смотреть видео</button>
        </section>
        <div className="main-page__bg-wrapper">
          <MainPageNav/>
        </div>
      </main>
  );
}

const mapStateToProps = (state: any) => ({
  isAuth: state.login.isAuth
});

const MainPage = connect(mapStateToProps)(MainPageRedux);

export {MainPage};
