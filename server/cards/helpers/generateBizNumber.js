const lodash = require("lodash");
const { handleError } = require("../../utils/handleErrors");
const Card = require("../models/mongodb/Card");

const generateBizNumber = async () => {
  try {
    const random = lodash.random(1_000_000, 9_999_999);
    const isExist = await Card.findOne(
      { bizNumber: random },
      { bizNumber: 1, _id: 0 }
    );
    if (isExist) return generateBizNumber();
    return random;
  } catch (error) {
    return `GenerateBizNumber: ${error.message}`;
  }
};

module.exports = generateBizNumber;
