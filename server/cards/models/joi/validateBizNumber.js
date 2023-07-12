const Joi = require("joi");

const validateBizNumber = (bizNumber) => {
  const schema = Joi.number().min(1_000_000).max(9_999_999);
  return schema.validate(bizNumber);
};

module.exports = validateBizNumber;
