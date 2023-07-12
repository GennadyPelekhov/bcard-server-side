const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");
const ENVIRONMENT = config.get("NODE_ENV");

const DB_NAME = config.get("DB_NAME");
const DB_PASSWORD = config.get("DB_PASSWORD");

if (ENVIRONMENT === "development")
  mongoose
    .connect("mongodb://127.0.0.1:27017/gennadi_business_card_app")
    .then(() =>
      console.log(
        chalk.magentaBright(
          "You have been connected to MongoDB Locally succesfully!"
        )
      )
    )
    .catch((error) =>
      console.log(
        chalk.redBright(`Could not connect to mongoDB locally:${error}`)
      )
    );

if (ENVIRONMENT === "production")
  mongoose
    .connect(
      `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.yjscz55.mongodb.net/`
    )
    .then(() =>
      console.log(
        chalk.magentaBright(
          "You have been connected to MongoDB Atlas succesfully!"
        )
      )
    )
    .catch((error) =>
      console.log(
        chalk.redBright(`Could not connect to mongoDB Atlas:${error}`)
      )
    );
