const db = require("../config/db");

const findUserByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

const createUser = async (username, fullName, email, hashedPassword) => {
  await db.query(
    "INSERT INTO users (username, full_name, email, password) VALUES (?, ?, ?, ?)",
    [username, fullName, email, hashedPassword]
  );
};

const updateProfile = async (userId, username, profilePicture) => {
  const query = `
    UPDATE users 
    SET username = ?, 
    profile_picture = ?
    WHERE id = ?
  `;

  await db.query(query, [username, profilePicture, userId]);
};

const getUserProfile = async (userId) => {
  const [rows] = await db.query(
    "SELECT id, username, full_name, email, profile_picture FROM users WHERE id = ?",
    [userId]
  );
  return rows[0];
};

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
  updateProfile,
  getUserProfile,
};