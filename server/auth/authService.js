const { handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./Providers/jwt");
const config = require("config");

const KEY = config.get("JWT_KEY");

const auth = (req, res, next) => {
  try {
    const tokenFromClient = req.header("x-auth-token");
    if (!tokenFromClient) throw new Error("Authentication Error: Please Login");

    const userPayload = verifyToken(tokenFromClient, KEY);
    if (!userPayload)
      throw new Error("Authentication Error: Unauthorized user");

    req.user = userPayload;
    return next();
  } catch (error) {
    return handleError(res, 403, error.message);
  }
};

module.exports = auth;
