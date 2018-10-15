import {
  applyMiddleware,
  compose
} from "redux";
import thunk from "redux-thunk";

export default compose(
  applyMiddleware(
    thunk,
  ),
  (
    window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
