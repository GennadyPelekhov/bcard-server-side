const jwt = require("jsonwebtoken");
const config = require("config");

const KEY = config.get("JWT_KEY");

const generateAuthToken = (user) => {
  const { _id, isBusiness, isAdmin } = user;
  const token = jwt.sign(user, KEY);
  return token;
};

// const generateAuthToken = user => jwt.sign(user, KEY);

const verifyToken = (tokenFromClient) => {
  try {
    const userPayload = jwt.verify(tokenFromClient, KEY);
    return userPayload;
  } catch {
    return null;
  }
};

// const verifyToken = tokenFromClient => jwt.verify(tokenFromClient, KEY);

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;
