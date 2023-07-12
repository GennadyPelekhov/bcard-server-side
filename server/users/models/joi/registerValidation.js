const Joi = require("joi");

const REQUIRED_FIELD = Joi.string().min(2).max(256).required();
const NOT_REQUIRED_FIELD = Joi.string().min(2).max(256).allow("");

const URL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const message = (regex, message, required = true) => {
  if (required)
    return Joi.string()
      .ruleset.regex(regex)
      .rule({ message: message })
      .required();
  return Joi.string().ruleset.regex(regex).rule({ message: message }).allow("");
};

const registerValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object()
      .keys({
        first: REQUIRED_FIELD,
        middle: NOT_REQUIRED_FIELD,
        last: REQUIRED_FIELD,
      })
      .required(),
    phone: message(
      /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
      'user "phone" must be a valid phone number'
    ),
    email: message(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      'user "email" must be a valid email'
    ),
    password: message(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/,
      'user "password" must be at least seven characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-'
    ),
    image: Joi.object().keys({
      url: message(URL, 'user.image "url" must be a valid url', false),
      alt: NOT_REQUIRED_FIELD,
    }),
    address: Joi.object()
      .keys({
        state: NOT_REQUIRED_FIELD,
        country: REQUIRED_FIELD,
        city: REQUIRED_FIELD,
        street: REQUIRED_FIELD,
        houseNumber: Joi.number().required(),
        zip: Joi.number().allow(""),
      })
      .required(),
    isBusiness: Joi.boolean().allow(""),
    isAdmin: Joi.boolean().allow(""),
  });
  return schema.validate(user);
};

module.exports = registerValidation;
