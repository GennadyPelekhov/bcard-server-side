const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");

const Name = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  middle: {
    type: String,
    trim: true,
    lowercase: true,
    maxLength: 256,
  },
  last: DEFAULT_VALIDATION,
});

module.exports = Name;
