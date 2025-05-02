// controllers/googleAuthController.js
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const handleGoogleLogin = async (req, res) => {
  const { tokenId, phone } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    if (!email)
      return res.status(400).json({ error: "Email not found from Google" });

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user (use phone if passed from frontend after verification)
      user = await User.create({
        username: name,
        email,
        password: "", // password not required for Google sign-in
        phone,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({ error: "Google login failed" });
  }
};
