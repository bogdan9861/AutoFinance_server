const express = require("express");
const {
  createExpence,
  editExpence,
  removeExpence,
  getExpences,
} = require("../controllers/expencess");
const { auth } = require("../middleware/auth");
const router = express.Router();
const file = require("../middleware/file");

router.post("/", auth, file.single("file"), createExpence);
router.put("/:id", auth, file.single("file"), editExpence);
router.delete("/:id", auth, removeExpence);
router.get("/", auth, getExpences);

module.exports = router;
