const express = require("express");
const {
  getCards,
  getCard,
  getMyCards,
  createCard,
  updateCard,
  likeCard,
  changeBizNumber,
  deleteCard,
} = require("../controllers/cardsController");
const auth = require("../../auth/authService");
const router = express.Router();

router.get("/", getCards);
router.get("/my-cards", auth, getMyCards);
router.get("/:cardId", getCard);
router.post("/", auth, createCard);
router.put("/:cardId", auth, updateCard);
router.patch("/:cardId", auth, likeCard);
router.patch("/biz-number/:cardId", auth, changeBizNumber);
router.delete("/:cardId", auth, deleteCard);

module.exports = router;
