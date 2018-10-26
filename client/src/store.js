import { createStore } from "redux";
import { Provider } from "react-redux";

import middleware from "./middleware";
import reducers from "./reducers";

const preloadedState = {};

// https://redux.js.org/api/createstore
const store = createStore(
  reducers,
  // preloadedState,
  middleware
);

export default store;
