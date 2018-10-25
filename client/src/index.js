import * as serviceWorker from './serviceWorker';
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import setAuthToken from "./utils/setAuthToken";
import { setUser } from "./actions/auth";
import store from "./store";

// check for token
const { jwtToken } = localStorage;
if (jwtToken !== undefined) {
  // set auth token header auth
  setAuthToken(jwtToken);

  // decode token and get user info/exp
  const decoded = jwt_decode(jwtToken);

  // set user and isAuthenticated
  store.dispatch(setUser(decoded));
}

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
