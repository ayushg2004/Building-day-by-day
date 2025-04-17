import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // Store OTP in-memory (or Redis for production)
    global.otpStore = global.otpStore || {};
    global.otpStore[phone] = otp;

    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  if (global.otpStore?.[phone] == otp) {
    delete global.otpStore[phone];
    res.status(200).json({ verified: true });
  } else {
    res.status(400).json({ verified: false, error: "Invalid OTP" });
  }
};
