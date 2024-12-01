const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  findUserByUsername,
  findUserByEmail,
  createUser,
} = require("../models/userModel");
require("dotenv").config();

const register = async (req, res) => {
  const { username, fullName, email, password } = req.body;

  try {
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, fullName, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
