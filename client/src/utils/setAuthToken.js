import axios from "axios";

export default token => {
  axios.defaults.headers.common["Authorization"] = token !== undefined
    ? token
    : "";
};
