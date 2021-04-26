import React, {useEffect} from 'react';
import { Footer } from '../footer';
import { Header } from '../header';
import { Switcher } from "../../common/navigation";
import { BrowserRouter } from "react-router-dom";
import { Settings } from "../settings";
import { LoginForm } from '../loginform';
import { SignUpForm } from '../signupform';
import {ActionCreator} from "../../common/redux/action-creator";
import {connect} from "react-redux";

interface AppProps {
  isAuth: boolean,
  getWords: () => void,
}

const AppRedux: React.FC<AppProps> = ({isAuth, getWords}) => {

  useEffect(() => {
    getWords();
  }, [isAuth]);

  return (
    <BrowserRouter>
      <Header />
      <div className="main-wrapper">
        <Switcher />
      </div>
      <Settings />
      <LoginForm />
      <SignUpForm />
      <Footer />
    </BrowserRouter>
  );
}

const mapStateToProps = (state: any) => ({
  isAuth: state.login.isAuth,
});

const mapDispatchToProps = (dispatch: any) => ({
  getWords: () => {
    dispatch(ActionCreator.getWords());
  },
});


const App = connect(mapStateToProps, mapDispatchToProps)(AppRedux);
export {App};
