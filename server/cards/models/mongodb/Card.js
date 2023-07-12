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
