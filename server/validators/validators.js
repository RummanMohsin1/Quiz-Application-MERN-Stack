const isEmpty = require("is-empty");
const validator = require("validator");

module.exports.loginValidator = (data) => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  let emailError = validator.isEmpty(data.email)
    ? "Email is required"
    : !validator.isEmail(data.email)
    ? "Please provide a valid email"
    : "";
  let passwordError = validator.isEmpty(data.password)
    ? "Password is required"
    : "";

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.registerValidator = (data) => {
  console.log(data);
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  let emailError = validator.isEmpty(data.email)
    ? "Email is required"
    : !validator.isEmail(data.email)
    ? "Please provide a valid email"
    : "";
  let passwordError = validator.isEmpty(data.password)
    ? "Password is required"
    : "";
  let nameError = validator.isEmpty(data.name) ? "Name is required" : "";

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (nameError) errors.name = "Full name is required";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
