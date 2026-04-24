const express = require("express");
const {
  createMaintance,
  editMaintance,
  getMaintance,
  removeMaintence,
} = require("../controllers/maintance");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createMaintance);
router.put("/:id", auth, editMaintance);
router.get("/", auth, getMaintance);
router.delete("/:id", auth, removeMaintence);

module.exports = router;
