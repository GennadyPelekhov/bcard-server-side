const mongoose = require("mongoose");
const Address = require("./Address");
const Image = require("./Image");
const {
  DEFAULT_VALIDATION,
  URL_REGEX,
  PHONE_REGEX,
  EMAIL_REGEX,
  regexType,
} = require("../../helpers/mongooseValidators");

// const URL_REGEX =
//   /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

// const DEFAULT_VALIDATION = {
//   type: String,
//   trim: true,
//   lowercase: true,
//   minLength: 2,
//   maxLength: 256,
//   required: true,
// };

// const regexType = (regex, required = true, unique = false) => {
//   return {
//     type: String,
//     required,
//     match: RegExp(regex),
//     unique,
//     trim: true,
//   };
// };

// const imageSchema = new mongoose.Schema({
//   url: regexType(URL_REGEX),
//   alt: DEFAULT_VALIDATION,
// });

// const addressSchema = new mongoose.Schema({
//   state: {
//     type: String,
//     maxLength: 256,
//     trim: true,
//     lowercase: true,
//   },
//   country: DEFAULT_VALIDATION,
//   city: DEFAULT_VALIDATION,
//   street: DEFAULT_VALIDATION,
//   houseNumber: {
//     type: Number,
//     minLength: 1,
//     required: true,
//   },
//   zip: {
//     type: Number,
//     minLength: 4,
//   },
// });

const cardSchema = new mongoose.Schema({
  title: DEFAULT_VALIDATION,
  subtitle: DEFAULT_VALIDATION,
  description: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 2,
    maxLength: 1024,
    required: true,
  },
  phone: regexType(PHONE_REGEX),
  email: regexType(EMAIL_REGEX, true, true),
  web: regexType(URL_REGEX, false),
  image: Image,
  address: Address,
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
