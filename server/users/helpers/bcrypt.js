const bcrypt = require("bcryptjs");

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (passwordFromClient, passwordFromDB) =>
  bcrypt.compareSync(passwordFromClient, passwordFromDB);

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;
