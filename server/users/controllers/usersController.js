const registerValidation = require("../models/joi/registerValidation");
const { handleError } = require("../../utils/handleErrors");
const normalizeUser = require("../helpers/normalizeUser");
const User = require("../models/mongodb/User");
const loginValidation = require("../models/joi/loginValidation");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");

const getUsers = async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin)
      throw new Error(
        "Authorization Error: You must be a admin type user in order to see all users in the database"
      );
    const users = await User.find({}, { password: 0, __v: 0 });
    return res.send(users);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};
const getUser = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    if (userId !== user._id && !user.isAdmin)
      throw new Error(
        "Authorization Error: You must be a registered user or the admin type of user  in order to see this user details"
      );
    const userFromDB = await User.findById(userId, {
      password: 0,
      __v: 0,
    });
    if (!userFromDB)
      throw new Error("Could not find this user in the database");
    return res.send(userFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const register = async (req, res) => {
  try {
    const user = req.body;

    const { error } = registerValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const { email } = user;
    const isUserExistInDB = await User.findOne({ email });
    if (isUserExistInDB) throw new Error("User already registered");

    const normalizedUser = await normalizeUser(user);

    const userToDB = new User(normalizedUser);
    const userFromDB = await userToDB.save();
    return res.send(userFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    const { error } = loginValidation(user);

    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const userInDb = await User.findOne({ email });
    if (!userInDb)
      throw new Error("Authentication Error: Invalid email or password");

    const isPasswordValid = comparePassword(user.password, userInDb.password);
    if (!isPasswordValid)
      throw new Error("Authentication Error: Invalid email or password");

    const { _id, isBusiness, isAdmin } = userInDb;
    const token = generateAuthToken({ _id, isBusiness, isAdmin });

    return res.send(token);
  } catch (error) {
    const isAuthError =
      error.message === "Authentication Error: Invalid email or password";

    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose Error: ${error.message}`
    );
  }
};

const editUser = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    const userToUpdate = req.body;
    if (user._id !== userToUpdate._id)
      throw new Error(
        "Authorization Error: You must be a registered user in order to edit this user details"
      );
    const normalizedUser = await normalizeUser(userToUpdate);

    const userFromDB = await User.findByIdAndUpdate(userId, normalizedUser, {
      new: true,
    });
    if (!userFromDB)
      throw new Error(
        "Could not update this user because a user with this ID cannot be found in the database"
      );
    return res.send(userFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const changeBizStatus = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    if (user._id !== userId && !user.isAdmin)
      throw new Error(
        "Authorization Error: You must be a registered user or admin type user in order to change business status"
      );
    const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
    const configuration = { new: true };
    const userFromDb = await User.findByIdAndUpdate(
      userId,
      pipeline,
      configuration
    );
    if (!userFromDb)
      throw new Error(
        "Could not update this user business status because a user with this ID cannot be found in the database"
      );
    return res.send(userFromDb);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    if (user._id !== userId && !user.isAdmin)
      throw new Error(
        "Authorization Error: You must be a registered user or admin type user in order to delete this user "
      );
    const deletedUserFromDB = await User.findByIdAndDelete(userId);
    if (!deletedUserFromDB) throw new Error("Did not found user with this id");
    return res.send(deletedUserFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.register = register;
exports.login = login;
exports.editUser = editUser;
exports.changeBizStatus = changeBizStatus;
exports.deleteUser = deleteUser;
