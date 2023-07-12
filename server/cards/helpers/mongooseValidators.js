const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const PHONE_REGEX = /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/;

const EMAIL_REGEX =
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

const DEFAULT_VALIDATION = {
  type: String,
  trim: true,
  lowercase: true,
  minLength: 2,
  maxLength: 256,
  required: true,
};

const regexType = (regex, required = true, unique = false) => {
  return {
    type: String,
    required,
    match: RegExp(regex),
    unique,
    trim: true,
  };
};

exports.URL_REGEX = URL_REGEX;
exports.PHONE_REGEX = PHONE_REGEX;
exports.EMAIL_REGEX = EMAIL_REGEX;
exports.DEFAULT_VALIDATION = DEFAULT_VALIDATION;
exports.regexType = regexType;
