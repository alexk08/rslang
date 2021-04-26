import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { App } from './components/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import { createStore } from "redux";
import { reducer } from './common/redux/store';
import { ActionCreator } from './common/redux/action-creator';
import thunk from 'redux-thunk';
import { loginUser } from './common/redux/login-action-creator';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f
  )
);

const userData = localStorage.user ? JSON.parse(localStorage.user) : null;

if (userData) {
  store.dispatch(loginUser(userData.name, userData.userId, userData.photo, userData.isAuth, userData.token));
} else {
  store.dispatch(loginUser(null, null, null, false, null));
}

store.dispatch(ActionCreator.getWords());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
