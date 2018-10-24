import axios from "axios";
import jwt_decode from "jwt-decode";

import { getErrors } from "./errors";
import setAuthToken from "../utils/setAuthToken";

export const SET_USER = "SET_USER";
export const TEST_DISPATCH = "TEST_DISPATCH";

// register
export const registerUser = (user, history) => dispatch => {
  // push data to server
  return axios.post("/api/users/register", user)

  // succes
  .then(result => {
    history.push("/login")
  })

  // error
  .catch(err => {
    dispatch(getErrors(err.response.data));
  });
};

// login (get user token)
export const loginUser = user => dispatch => {
  axios.post("/api/users/login", user)
  
  .then(res => {
    console.log(res.data);

    // save JWT to local storage
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);

    // set token to Auth header
    setAuthToken(token);

    // decode token for user info and store in redux
    const decoded = jwt_decode(token);
    dispatch(setUser(decoded));
  })

  .catch(err => {
    dispatch(getErrors(err.response.data));
  });
};

// set logged in user
export const setUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded,
  };
};

