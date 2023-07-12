const { handleError } = require("../../utils/handleErrors");
const { isBizNumberExists } = require("../helpers/generateBizNumber");
const normalizeCard = require("../helpers/normalizeCard");
const validateBizNumber = require("../models/joi/validateBizNumber");
const validateCard = require("../models/joi/validateCard");
const Card = require("../models/mongodb/Card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: "asc" });
    if (!cards) throw new Error("Did not found cards in the DB");
    return res.send(cards);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) throw new Error("Could not find this card in the database");
    return res.send(card);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getMyCards = async (req, res) => {
  try {
    const user = req.user;
    if (!user.isBusiness)
      throw new Error(
        "You must be a business type user in order to see your business cards"
      );
    const cards = await Card.find({ user_id: user._id });
    if (!cards) throw new Error("Could not find any card in the database”");
    return res.send(cards);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const createCard = async (req, res) => {
  try {
    const card = req.body;
    const user = req.user;

    if (!user.isBusiness)
      throw new Error(
        "You must be a business type user in order to create a new business card"
      );

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedCard = await normalizeCard(card, user._id);

    const cardToDb = new Card(normalizedCard);
    const cardFromDB = await cardToDb.save();
    return res.send(cardFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const updateCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = req.body;
    const user = req.user;

    if (user._id !== card.user_id)
      return handleError(
        res,
        403,
        "Authorization Error: Only the user who created the business card can update its details"
      );

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedCard = await normalizeCard(card, user._id);

    const cardFromDB = await Card.findByIdAndUpdate(cardId, normalizedCard, {
      new: true,
    });
    if (!cardFromDB)
      throw new Error(
        "Could not update this card because a card with this ID cannot be found in the database"
      );
    return res.send(cardFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    let card = await Card.findById(cardId);
    if (!card)
      throw new Error(
        "Could not change card likes because a card with this ID cannot be found in the database"
      );
    const cardLikes = card.likes.find((id) => id === userId);
    if (!cardLikes) {
      card.likes.push(userId);
      card = await card.save();
      return res.send(card);
    }
    const index = card.likes.indexOf(userId);
    card.likes.splice(index, 1);
    card = await card.save();
    return res.send(card);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const changeBizNumber = async (req, res) => {
  try {
    const { cardId } = req.params;
    const user = req.user;
    const { bizNumber } = req.body;
    if (!user.isAdmin)
      throw new Error(
        "You must be a Admin type user in order to change business number"
      );
      
    const { error } = validateBizNumber(bizNumber);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const isBizNumExists = await Card.findOne(
      { bizNumber },
      { bizNumber: 1, _id: 0 }
    );
    if (isBizNumExists)
      throw new Error("Card with this Business number already exists");

    const card = await Card.findByIdAndUpdate(
      cardId,
      { bizNumber },
      { new: true }
    );
    if (!card)
      throw new Error("A card with this ID cannot be found in the database");
    return res.send(card);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const user = req.user;
    let card = await Card.findById(cardId);
    if (!card)
      throw new Error(
        "Could not delete this card because a card with this ID cannot be found in the database"
      );

    if (!user.isAdmin && user._id !== String(card.user_id))
      throw new Error(
        "Authorization Error: Only the user who created the business card or admin can delete this card"
      );
    card = await Card.findByIdAndDelete(cardId);

    return res.send(card);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.getCards = getCards;
exports.getCard = getCard;
exports.getMyCards = getMyCards;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.likeCard = likeCard;
exports.changeBizNumber = changeBizNumber;
exports.deleteCard = deleteCard;
