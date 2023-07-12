const Joi = require("joi");

const message = (regex, message, required = true) => {
  if (required)
    return Joi.string()
      .ruleset.regex(regex)
      .rule({ message: message })
      .required();
  return Joi.string().ruleset.regex(regex).rule({ message: message }).allow("");
};

const loginValidation = (user) => {
  const schema = Joi.object({
    email: message(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      'user "email" must be a valid email'
    ),
    password: message(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/,
      'user "password" must be at least seven characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-'
    ),
  });
  return schema.validate(user);
};

module.exports = loginValidation;
