import {
  registerUser,
} from "../actions/auth";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {

    default: return state;
  }
};
