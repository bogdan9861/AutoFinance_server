const express = require("express");
const router = express.Router();

const fileMiddleware = require("../middleware/file");
const { auth } = require("../middleware/auth");
const {
  createReport,
  getAllReports,
  deleteReport,
} = require("../controllers/reports");
const { admin } = require("../middleware/admin");

router.post("/", auth, fileMiddleware.single("file"), createReport);
router.get("/", auth, getAllReports);
router.delete("/:id", auth, deleteReport);

module.exports = router;
