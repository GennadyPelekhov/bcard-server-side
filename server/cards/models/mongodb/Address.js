const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");

const Address = new mongoose.Schema({
  state: {
    type: String,
    maxLength: 256,
    trim: true,
    lowercase: true,
  },
  country: DEFAULT_VALIDATION,
  city: DEFAULT_VALIDATION,
  street: DEFAULT_VALIDATION,
  houseNumber: {
    type: Number,
    minLength: 1,
    required: true,
  },
  zip: {
    type: Number,
    minLength: 4,
  },
});

module.exports = Address;
