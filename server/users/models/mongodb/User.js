const mongoose = require("mongoose");
const Address = require("./Address");
const Image = require("./Image");
const Name = require("./Name");
const {
  PHONE_REGEX,
  EMAIL_REGEX,
  regexType,
} = require("../../helpers/mongooseValidators");

const userSchema = new mongoose.Schema({
  name: Name,
  phone: regexType(PHONE_REGEX),
  email: regexType(EMAIL_REGEX, true, true),
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: Image,
  address: Address,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
