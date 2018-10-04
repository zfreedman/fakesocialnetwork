const Validator = require("validator");

const isEmpty = require("./is-empty");

module.exports =  data => {
  let errors = {};

  let { email, pass, } = data;
  // note: validator only works with string values
  email = isEmpty(email) ? "" : email;
  pass = isEmpty(pass) ? "" : pass;

  // 
  // email
  // 
  // valid email
  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  // email not empty
  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  }
  
  // 
  // pass
  // 
  // length
  const passLengths = { min: 6, max: 30 };
  if (!Validator.isLength(pass, passLengths)) {
    errors.pass = `Password must be between ${passLengths.min} and `
      + `${passLengths.max} characters`;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
