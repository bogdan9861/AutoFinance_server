const express = require("express");
const router = express.Router();

const fileMiddleware = require("../middleware/file");
const { auth } = require("../middleware/auth");
const {
  createCar,
  editCar,
  removeCar,
  getCars,
} = require("../controllers/cars");

router.post("/", auth, fileMiddleware.single("image"), createCar);
router.put("/:id", auth, fileMiddleware.single("image"), editCar);
router.get("/", auth, getCars);
router.delete("/:id", auth, removeCar);

module.exports = router;
