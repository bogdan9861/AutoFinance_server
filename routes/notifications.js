const express = require("express");
const router = express.Router();

const fileMiddleware = require("../middleware/file");
const { auth } = require("../middleware/auth");
const { getNotifications } = require("../controllers/notifications");
const { admin } = require("../middleware/admin");

router.get("/", auth, getNotifications);

module.exports = router;
