const express = require("express");
const router = express.Router();

const fileMiddleware = require("../middleware/file");
const { auth } = require("../middleware/auth");
const {
  register,
  login,
  current,
  edit,
  changePassword,
  removeUser,
  getAllUsers,
} = require("../controllers/users");
const { admin } = require("../middleware/admin");

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, current);
router.get("/all", auth, getAllUsers);
router.put("/", auth, fileMiddleware.single("image"), edit);
router.delete("/:id", auth, removeUser);
router.put("/change-password", auth, changePassword);

module.exports = router;
