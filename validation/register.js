const Validator = require("validator");

const isEmpty = require("./is-empty");

module.exports = data => {
  let errors = {};

  let { email, name, pass, pass2, } = data;
  // note: validator only works with string values
  email = isEmpty(email) ? "" : email;
  name = isEmpty(name) ? "" : name;
  pass = isEmpty(pass) ? "" : pass;
  pass2 = isEmpty(pass2) ? "" : pass2;

  // 
  // email
  // 
  // email not empty
  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  }
  // valid email
  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  // 
  // name
  // 
  // validate that data's name prop has a length value within [2, 30]
  if (!Validator.isLength(name, { min: 2, max: 30})) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  // not empty name
  if (Validator.isEmpty(name)) {
    errors.name = "Name is required";
  }
  
  // 
  // pass
  // 
  // not empty
  if (Validator.isEmpty(pass)) {
    errors.pass = "Password is required";
  }
  // length
  const passLengths = { min: 6, max: 30 };
  if (!Validator.isLength(pass, passLengths)) {
    errors.pass = `Password must be between ${passLengths.min} and `
      + `${passLengths.max} characters`;
  }

  // 
  // pass2
  // 
  // not empty
  if (Validator.isEmpty(pass2)) {
    errors.pass2 = "Password confirmation is required";
  }
  // matches pass
  if (!Validator.equals(pass, pass2)) {
    errors.pass2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
