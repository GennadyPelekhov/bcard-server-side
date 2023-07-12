const normalizeCard = require("../cards/helpers/normalizeCard");
const validateCard = require("../cards/models/joi/validateCard");
const Card = require("../cards/models/mongodb/Card");
const normalizeUser = require("../users/helpers/normalizeUser");
const registerValidation = require("../users/models/joi/registerValidation");
const User = require("../users/models/mongodb/User");
const data = require("./initialData.json");
const chalk = require("chalk");

const generateInitialCards = async () => {
  const { cards } = data;
  const userId = "6490b0a0234b2a919bf90dcf";
  cards.forEach(async (card) => {
    try {
      const { error } = validateCard(card);
      if (error) throw new Error(`Joi Error: ${error.details[0].message}`);

      const normalizedCard = await normalizeCard(card, userId);
      const cardToDb = new Card(normalizedCard);
      await cardToDb.save();

      console.log(chalk.greenBright(`Generate card ${card.title} succesfully`));
    } catch (error) {
      console.log(chalk.redBright(`Initial Data Error: ${error.message}`));
    }
  });
};

const generateInitialUsers = async () => {
  const { users } = data;

  users.forEach(async (user) => {
    try {
      const { error } = registerValidation(user);
      if (error) throw new Error(`Joi Error: ${error.details[0].message}`);

      //   const { email } = user;
      //   const isUserExistInDB = await User.findOne({ email });
      //   if (isUserExistInDB) throw new Error("User already registered");

      const normalizedUser = normalizeUser(user);
      const userToDB = new User(normalizedUser);
      await userToDB.save();

      console.log(
        chalk.greenBright(
          `Generate user ${user.name.first + " " + user.name.last} succesfully`
        )
      );
    } catch (error) {
      console.log(chalk.redBright(`Initial Data Error: ${error.message}`));
    }
  });
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;
