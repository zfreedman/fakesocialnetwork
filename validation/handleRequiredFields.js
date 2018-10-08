const Validator = require("validator");

const isEmpty = require("./is-empty");
const splitCamelCase = require("./splitCamelCase");

module.exports.mapRequiredToEmpty = (requiredKeys, data) => {
  requiredKeys.map(key => {
    const val = data[key];
    data[key] = !isEmpty(val) ? val : "";
  });
};

module.exports.handleRequiredErrors = (requiredKeys, data, errors) => {
  requiredKeys.map(key => {
    if (Validator.isEmpty(data[key])) {
      const phrase = splitCamelCase(key).join(" ");
      errors[key] = `${phrase[0].toUpperCase()}`
        + `${phrase.substr(1).toLowerCase()} is required`;
    }
  });
};
