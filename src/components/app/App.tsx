import React from 'react';
import { Footer } from '../footer';
import { Header } from '../header';
import { Switcher } from "../../common/navigation";
import { BrowserRouter } from "react-router-dom";
import { Settings } from "../settings";
import { LoginForm } from '../loginform';
import { SignUpForm } from '../signupform';

const App: React.FC = () => {

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

export {App};
