const express = require("express");
const {
  getUsers,
  getUser,
  register,
  login,
  editUser,
  changeBizStatus,
  deleteUser,
} = require("../controllers/usersController");
const auth = require("../../auth/authService");
const router = express.Router();

router.get("/", auth, getUsers);
router.get("/:userId", auth, getUser);
router.post("/login", login);
router.post("/", register);
router.put("/:userId", auth, editUser);
router.patch("/:userId", auth, changeBizStatus);
router.delete("/:userId", auth, deleteUser);

module.exports = router;
