import axios from "axios";

export default token => {
  if (token !== undefined && token.length > 0)
    axios.defaults.headers.common["Authorization"] = token;
  else if (token === false) {
    delete axios.defaults.headers.common["Authorization"];
  }
};
