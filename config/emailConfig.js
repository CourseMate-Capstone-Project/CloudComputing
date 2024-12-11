const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Coursemate - Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 24px; margin: 0;">
            <span style="color: #000;">Course</span><span style="color: #456c8c;">Mate</span>
          </h1>
        </div>
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        <p style="color: #555; font-size: 16px; text-align: center;">
          You recently requested to reset your password for your Coursemate account.
        </p>
        <p style="color: #333; font-size: 18px; text-align: center; font-weight: bold;">
          Your OTP is: <span style="color: #007BFF; font-size: 22px;">${otp}</span>
        </p>
        <p style="color: #555; font-size: 14px; text-align: center;">
          This OTP will expire in <strong>15 minutes</strong>.
        </p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #888; font-size: 14px; text-align: center;">
          If you didn't request this, please ignore this email or contact our support team.
        </p>
        <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
          &copy; 2024 Coursemate. All rights reserved.
        </footer>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };
