const express = require("express");
const {
  createExpence,
  editExpence,
  removeExpence,
  getExpences,
} = require("../controllers/expencess");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createExpence);
router.put("/:id", auth, editExpence);
router.delete("/:id", auth, removeExpence);
router.get("/", auth, getExpences);

module.exports = router;
