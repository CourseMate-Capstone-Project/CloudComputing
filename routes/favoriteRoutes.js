const express = require("express");
const {
  toggleFavorite,
  getFavorites,
} = require("../controllers/favoriteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.post("/toggle", toggleFavorite);
router.get("/", getFavorites);

module.exports = router;
