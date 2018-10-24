import isEmpty from "../validation/isEmpty";

import {
  SET_USER,
} from "../actions/auth";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  
  switch (type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
      };

    default: return state;
  }
};
