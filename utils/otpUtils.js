const crypto = require("crypto");

const generateOTP = () => {
  const buffer = crypto.randomBytes(3);
  const otp = String(parseInt(buffer.toString("hex"), 16)).slice(0, 6);
  return otp.padStart(6, "0");
};

module.exports = { generateOTP };
