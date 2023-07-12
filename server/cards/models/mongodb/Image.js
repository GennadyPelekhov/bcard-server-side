const mongoose = require("mongoose");
const {
  DEFAULT_VALIDATION,
  regexType,
  URL_REGEX,
} = require("../../helpers/mongooseValidators");

const Image = new mongoose.Schema({
  url: regexType(URL_REGEX),
  alt: DEFAULT_VALIDATION,
});

module.exports = Image;
