import axios from "axios";

import { getErrors } from "./errors";

export const TEST_DISPATCH = "TEST_DISPATCH";

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
