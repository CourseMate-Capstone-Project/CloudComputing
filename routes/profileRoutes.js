const express = require("express");
const {
  multer,
  getProfile,
  updateUserProfile,
} = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getProfile);

router.put("/", multer.single("profilePicture"), updateUserProfile);

module.exports = router;
