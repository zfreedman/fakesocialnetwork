const Validator = require("validator");

const handleRequiredErrors = require("./handleRequiredFields")
  .handleRequiredErrors;
const mapRequiredToEmpty = require("./handleRequiredFields")
  .mapRequiredToEmpty;
const isEmpty = require("./is-empty");

module.exports = data => {
  let errors = {};
  
  const required = [ "text" ];
  mapRequiredToEmpty(required, data);
  const { text } = data;
  
  const postLengths = [10, 300];
  if (!Validator.isLength(
    data.text, { min: postLengths[0], max: postLengths[1] }
  )) {
    errors.text = `Post must be between ${postLengths[0]} and`
      + ` ${postLengths[1]} characters`;
  }

  handleRequiredErrors(required, data, errors);

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
