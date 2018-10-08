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

  handleRequiredErrors(required, data, errors);
  
  const commentLengths = [2, 300];
  if (!Validator.isLength(
    text, { min: commentLengths[0], max: commentLengths[1] }
  )) {
    errors.text = `Comment must be between ${commentLengths[0]} and`
      + ` ${commentLengths[1]} characters`;
  }
  console.log(errors);
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
