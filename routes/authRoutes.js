const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register); // Menggunakan username, email, dan password
router.post("/login", login); // Menggunakan username dan password

module.exports = router;
