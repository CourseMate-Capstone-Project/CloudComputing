const db = require("../config/db");

const createPasswordReset = async (userId, email, otp) => {
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await db.query(
    `INSERT INTO password_resets (user_id, email, otp, expires_at) 
     VALUES (?, ?, ?, ?)`,
    [userId, email, otp, expiresAt]
  );
};

const verifyOTP = async (email, otp) => {
  const [rows] = await db.query(
    `SELECT * FROM password_resets 
     WHERE email = ? AND otp = ? AND expires_at > NOW()
     ORDER BY created_at DESC LIMIT 1`,
    [email, otp]
  );
  return rows[0];
};

const deletePasswordReset = async (email) => {
  await db.query("DELETE FROM password_resets WHERE email = ?", [email]);
};

module.exports = { createPasswordReset, verifyOTP, deletePasswordReset };
