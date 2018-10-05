const Validator = require("validator");

const isEmpty = require("./is-empty");
const splitCamelCase = require("./splitCamelCase");

module.exports = data => {
  let errors = {};

  // required fields
  const required = [ "degree", "fieldOfStudy", "from", "school", ];
  required.map(key => {
    const val = data[key];
    data[key] = !isEmpty(val) ? val : "";
    
    if (Validator.isEmpty(data[key])) {
      const phrase = splitCamelCase(key).join(" ");
      errors[key] = `${phrase[0].toUpperCase()}`
        + `${phrase.substr(1).toLowerCase()} is required`;
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
