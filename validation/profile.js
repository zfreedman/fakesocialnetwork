const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = data => {
  let errors = {};

  // handle required inputs
  const required = [ "handle", "skills", "status", ];
  required.map(key => {
    const val = data[key];
    data[key] = !isEmpty(val) ? val : ""
  });

  // 
  // required fields
  // 
  required.map(key => {
    const val = data[key];
    if (Validator.isEmpty(val)) {
      errors[key] = (
        key[0].toUpperCase() + key.substr(1) + " is required"
      );
    }
  });

  // 
  // handle
  // 
  // length in [2, 40]
  const handleLength = { min: 2, max: 40 };
  if (!Validator.isLength(data.handle, handleLength))
    errors.handle = "Handle needs to be between " + handleLength.min
      + " and " + handleLength.max + " characters";

  // 
  // url fields
  // 
  const urls = [
    "facebook",
    "instagram",
    "linkedIn",
    "twitter",
    "website",
    "youtube",
  ];
  urls.map(key => {
    if (!isEmpty(data[key]) && !Validator.isURL(data[key]))
      errors[key] = "Not a valid URL";
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
